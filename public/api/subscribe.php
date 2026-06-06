<?php
// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  BREVO SUBSCRIBE PROXY                                                 ║
// ║                                                                        ║
// ║  Keeps the Brevo API key off the client. Receives a JSON POST from     ║
// ║  the React app and forwards it to Brevo's REST API v3.                 ║
// ║                                                                        ║
// ║  SETUP (one-time):                                                     ║
// ║  1. Sign up at brevo.com (free)                                        ║
// ║  2. Create a list called e.g. "Grenadier Brief"                        ║
// ║  3. Note the LIST ID (visible in the URL when you open the list)       ║
// ║  4. Enable double opt-in: Settings → "Double opt-in" template          ║
// ║  5. Create API key: Settings → SMTP & API → API Keys                   ║
// ║  6. Copy the key                                                       ║
// ║  7. Create /home/carelp/grenadiers2026.com/api/.env on the server with:  ║
// ║     BREVO_API_KEY=xkeysib-xxxxxxxxxx                                   ║
// ║     BREVO_LIST_ID=2                                                    ║
// ║     BREVO_DOI_TEMPLATE_ID=1                                            ║
// ║     BREVO_REDIRECT_URL=https://grenadiers2026.com/?subscribed=1          ║
// ║  8. chmod 600 .env (only PHP can read it)                              ║
// ╚═══════════════════════════════════════════════════════════════════════╝

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

// Load .env
$env_path = __DIR__ . "/.env";
if (!file_exists($env_path)) {
    http_response_code(500);
    echo json_encode(["error" => "Server not configured"]);
    exit;
}
$env = parse_ini_file($env_path, false, INI_SCANNER_RAW);
$api_key = $env["BREVO_API_KEY"] ?? null;
$list_id = (int)($env["BREVO_LIST_ID"] ?? 0);
$redirect_url = $env["BREVO_REDIRECT_URL"] ?? "https://grenadiers2026.com/";

if (!$api_key || !$list_id) {
    http_response_code(500);
    echo json_encode(["error" => "Server not configured"]);
    exit;
}

// Parse body
$body = json_decode(file_get_contents("php://input"), true);
$email = trim($body["email"] ?? "");
$lang = strtolower(trim($body["lang"] ?? "en"));
$source = trim($body["source"] ?? "unknown");

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email"]);
    exit;
}
if (!in_array($lang, ["en", "fr", "ht"])) {
    $lang = "en";
}

// Build Brevo create-contact payload (no double-opt-in — just adds to list directly)
// Docs: https://developers.brevo.com/reference/createcontact
$payload = [
    "email" => $email,
    "listIds" => [$list_id],
    "updateEnabled" => true, // if contact exists, just add them to the list
    "attributes" => [
        "LANGUAGE" => strtoupper($lang),
        "SOURCE" => $source,
        "OPT_IN" => true,
    ],
];

$ch = curl_init("https://api.brevo.com/v3/contacts");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "accept: application/json",
    "content-type: application/json",
    "api-key: " . $api_key,
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

if ($err) {
    http_response_code(502);
    echo json_encode(["error" => "Unable to reach subscription service"]);
    exit;
}

// Brevo returns 204 No Content on success
if ($http_code === 204 || $http_code === 201) {
    echo json_encode(["ok" => true]);
    exit;
}

// Brevo returns 400 with "Contact already exists" — treat as success since they're already in list
$decoded = json_decode($response, true);
$code = $decoded["code"] ?? "";
if ($code === "duplicate_parameter" || str_contains(strtolower($decoded["message"] ?? ""), "already")) {
    echo json_encode(["ok" => true, "note" => "already subscribed"]);
    exit;
}

http_response_code(502);
echo json_encode(["error" => $decoded["message"] ?? "Subscription failed"]);
