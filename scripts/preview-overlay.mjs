// Legt een alpha-still over het echte videoframe zodat hij te beoordelen is.
// Gebruik: npm run preview -- <still.png> <video.mp4> <timestamp, bv. 4.2 of 00:00:04.2> [--out preview.png]
import fs from "node:fs";
import { run, parseArgs, fail } from "./lib.mjs";

const { pos, opt } = parseArgs();
const [still, video, ts] = pos;
if (!still || !video || !ts) fail("Gebruik: npm run preview -- <still.png> <video.mp4> <timestamp>");
for (const f of [still, video]) if (!fs.existsSync(f)) fail(`Niet gevonden: ${f}`);

const out = opt.out || still.replace(/\.png$/i, "") + "_preview.png";
run("ffmpeg", [
  "-v", "error", "-y", "-ss", String(ts), "-i", video, "-i", still,
  "-filter_complex", "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920[bg];[bg][1:v]overlay=0:0",
  "-frames:v", "1", out,
]);
console.log(`✔ ${out}`);
