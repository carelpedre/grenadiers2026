<?php
// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  ATLAS — DIASPORA PIN MAP BACKEND                                      ║
// ║                                                                        ║
// ║  Stores pin drops in /home/carelp/grenadiers2026.com/api/atlas.json      ║
// ║                                                                        ║
// ║  Endpoints:                                                            ║
// ║    GET  /api/atlas.php       — returns all pins as JSON                ║
// ║    POST /api/atlas.php       — adds a pin (rate-limited by IP)         ║
// ║                                                                        ║
// ║  Pin shape: { id, city, country, lat, lng, message, createdAt }        ║
// ║                                                                        ║
// ║  Anti-abuse:                                                           ║
// ║    - Max 1 pin per IP per hour                                         ║
// ║    - Messages capped at 140 chars                                      ║
// ║    - Profanity filter (basic)                                          ║
// ║    - Coordinates required & validated                                  ║
// ╚═══════════════════════════════════════════════════════════════════════╝

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

$DATA_FILE = __DIR__ . "/atlas.json";
$RATE_FILE = __DIR__ . "/atlas-rate.json";

// Make sure the data file exists
if (!file_exists($DATA_FILE)) {
    file_put_contents($DATA_FILE, json_encode(["pins" => [], "count" => 0]));
    chmod($DATA_FILE, 0664);
}
if (!file_exists($RATE_FILE)) {
    file_put_contents($RATE_FILE, json_encode([]));
    chmod($RATE_FILE, 0664);
}

// ─── GET: return all pins ─────────────────────────────────────────────
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $data = json_decode(file_get_contents($DATA_FILE), true);
    if (!$data) {
        $data = ["pins" => [], "count" => 0];
    }
    echo json_encode($data);
    exit;
}

// ─── POST: add a pin ──────────────────────────────────────────────────
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit;
}

$body = json_decode(file_get_contents("php://input"), true);
$city = trim($body["city"] ?? "");
$country = trim($body["country"] ?? "");
$lat = (float)($body["lat"] ?? 0);
$lng = (float)($body["lng"] ?? 0);
$message = trim($body["message"] ?? "");

// Validate
if (!$city || strlen($city) > 80) {
    http_response_code(400);
    echo json_encode(["error" => "City is required (≤80 chars)"]);
    exit;
}
if (!$country || strlen($country) > 80) {
    http_response_code(400);
    echo json_encode(["error" => "Country is required (≤80 chars)"]);
    exit;
}
if ($lat < -90 || $lat > 90 || $lng < -180 || $lng > 180 || ($lat === 0.0 && $lng === 0.0)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid coordinates"]);
    exit;
}
if (strlen($message) > 140) {
    $message = substr($message, 0, 140);
}

// Rate limit per IP — 1 pin per hour
$ip = $_SERVER["HTTP_X_FORWARDED_FOR"] ?? $_SERVER["REMOTE_ADDR"] ?? "unknown";
$ip = explode(",", $ip)[0]; // first hop if forwarded
$rateData = json_decode(file_get_contents($RATE_FILE), true) ?: [];
$lastPin = $rateData[$ip] ?? 0;
$now = time();
if ($now - $lastPin < 3600) {
    http_response_code(429);
    echo json_encode(["error" => "Please wait an hour before adding another pin from this network."]);
    exit;
}

// Basic profanity / abuse filter (English + French + Creole common ones)
$blocked = ["fuck", "shit", "bitch", "merde", "pute", "kaka", "bouzen", "kòk", "viagra", "casino"];
$lowerMessage = strtolower($message . " " . $city . " " . $country);
foreach ($blocked as $word) {
    if (str_contains($lowerMessage, $word)) {
        http_response_code(400);
        echo json_encode(["error" => "Please keep it family-friendly."]);
        exit;
    }
}

// Acquire lock
$fp = fopen($DATA_FILE, "c+");
if (!flock($fp, LOCK_EX)) {
    http_response_code(503);
    echo json_encode(["error" => "Server busy, try again"]);
    exit;
}

$contents = stream_get_contents($fp);
$data = json_decode($contents, true);
if (!$data || !isset($data["pins"])) {
    $data = ["pins" => [], "count" => 0];
}

$newPin = [
    "id" => bin2hex(random_bytes(8)),
    "city" => $city,
    "country" => $country,
    "lat" => $lat,
    "lng" => $lng,
    "message" => $message,
    "createdAt" => date("c"),
];
$data["pins"][] = $newPin;
$data["count"] = count($data["pins"]);

// Cap at 5000 total pins
if (count($data["pins"]) > 5000) {
    $data["pins"] = array_slice($data["pins"], -5000);
    $data["count"] = 5000;
}

// Write back
ftruncate($fp, 0);
rewind($fp);
fwrite($fp, json_encode($data));
flock($fp, LOCK_UN);
fclose($fp);

// Update rate file
$rateData[$ip] = $now;
// Clean up old entries
foreach ($rateData as $k => $v) {
    if ($now - $v > 3600 * 24) unset($rateData[$k]);
}
file_put_contents($RATE_FILE, json_encode($rateData));

echo json_encode(["ok" => true, "pin" => $newPin, "count" => $data["count"]]);
