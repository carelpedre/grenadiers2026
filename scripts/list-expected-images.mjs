#!/usr/bin/env node
// ╔═══════════════════════════════════════════════════════════════════════╗
// ║  EXPECTED IMAGES MANIFEST                                              ║
// ║                                                                        ║
// ║  Scans the codebase + data files for every image path the site         ║
// ║  references, organized by folder. Use this as a checklist.             ║
// ║                                                                        ║
// ║  Run: node scripts/list-expected-images.mjs                            ║
// ║                                                                        ║
// ║  To see which ones exist locally:                                      ║
// ║    node scripts/list-expected-images.mjs --check                       ║
// ║                                                                        ║
// ║  To see which ones exist on the server (via SSH):                      ║
// ║    node scripts/list-expected-images.mjs --remote                      ║
// ╚═══════════════════════════════════════════════════════════════════════╝

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC_DIR = `${ROOT}/public`;

const SSH_USER = "carelp";
const SSH_HOST = "iad1-shared-b7-32.dreamhost.com";
const REMOTE_PATH = "/home/carelp/grenadiers2026.com";

const args = process.argv.slice(2);
const CHECK_LOCAL = args.includes("--check");
const CHECK_REMOTE = args.includes("--remote");

// Recursively read all source files
function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist" || entry.name.startsWith(".")) continue;
    const full = `${dir}/${entry.name}`;
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jsx?|tsx?|js|mjs)$/.test(entry.name)) yield full;
  }
}

// Find all "/images/..." paths in source code
const imagePaths = new Set();
for (const file of walk(`${ROOT}/src`)) {
  const content = readFileSync(file, "utf-8");
  const matches = content.matchAll(/["'`](\/images\/[a-zA-Z0-9_\-/.]+\.(jpg|jpeg|png|webp|svg|gif))["'`]/g);
  for (const m of matches) imagePaths.add(m[1]);
  // Also catch /audio/
  const audioMatches = content.matchAll(/["'`](\/audio\/[a-zA-Z0-9_\-/.]+\.(mp3|m4a|aac|wav|ogg))["'`]/g);
  for (const m of audioMatches) imagePaths.add(m[1]);
}

// Group by folder
const byFolder = {};
for (const path of imagePaths) {
  const folder = path.substring(0, path.lastIndexOf("/"));
  if (!byFolder[folder]) byFolder[folder] = [];
  byFolder[folder].push(path);
}

// Check local existence
function localExists(path) {
  return existsSync(`${PUBLIC_DIR}${path}`);
}

// Check remote existence
let remoteFiles = new Set();
if (CHECK_REMOTE) {
  console.log("📡 Fetching remote file list (this may take a few seconds)...\n");
  try {
    const result = execSync(`ssh ${SSH_USER}@${SSH_HOST} "find ${REMOTE_PATH}/images ${REMOTE_PATH}/audio -type f 2>/dev/null"`, { encoding: "utf-8" });
    for (const line of result.split("\n")) {
      if (line.trim()) {
        remoteFiles.add(line.trim().replace(REMOTE_PATH, ""));
      }
    }
  } catch (err) {
    console.error("❌ Could not connect to server. Make sure SSH is set up.\n");
  }
}

function remoteExists(path) {
  return remoteFiles.has(path);
}

// Print the report
console.log("╔══════════════════════════════════════════════════════════════════╗");
console.log("║  EXPECTED IMAGES & AUDIO FOR grenadiers2026.com                 ║");
console.log("╚══════════════════════════════════════════════════════════════════╝\n");

const folders = Object.keys(byFolder).sort();
let totalCount = 0;
let localCount = 0;
let remoteCount = 0;

for (const folder of folders) {
  const files = byFolder[folder].sort();
  console.log(`\n📁 ${folder}/  (${files.length} files)`);
  console.log("─".repeat(70));
  for (const path of files) {
    totalCount++;
    const filename = path.split("/").pop();
    let status = "  ";
    if (CHECK_LOCAL) {
      const exists = localExists(path);
      if (exists) localCount++;
      status += exists ? "✅" : "❌";
      status += " ";
    }
    if (CHECK_REMOTE) {
      const exists = remoteExists(path);
      if (exists) remoteCount++;
      status += exists ? "🌐" : "⛔";
      status += " ";
    }
    console.log(`  ${status}${filename}`);
  }
}

console.log("\n" + "─".repeat(70));
console.log(`Total expected files: ${totalCount}`);
if (CHECK_LOCAL) console.log(`  ✅ Local (public/):   ${localCount} / ${totalCount}`);
if (CHECK_REMOTE) console.log(`  🌐 Remote (server):   ${remoteCount} / ${totalCount}`);
console.log("");

if (!CHECK_LOCAL && !CHECK_REMOTE) {
  console.log("Tip: add --check to see which files exist locally");
  console.log("     add --remote to check which files are on the live server\n");
}
