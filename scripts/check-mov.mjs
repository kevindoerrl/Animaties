// Controleert of MOV's Premiere-veilig zijn: ProRes 4444 + alpha, prores_ks, geen audio,
// 1080×1920 @ 30fps, en volledig decodeerbaar (incl. laatste frame).
// Gebruik: npm run check -- <bestand.mov | map>
import fs from "node:fs";
import path from "node:path";
import { run, parseArgs, fail } from "./lib.mjs";

const { pos, opt } = parseArgs();
if (!pos.length) fail("Gebruik: npm run check -- <bestand.mov | map met MOV's>");

const files = pos.flatMap((p) =>
  fs.statSync(p).isDirectory()
    ? fs.readdirSync(p).filter((f) => f.toLowerCase().endsWith(".mov")).map((f) => path.join(p, f))
    : [p]);
if (!files.length) fail("Geen .mov-bestanden gevonden.");

let fouten = 0;
for (const f of files) {
  const probe = JSON.parse(run("ffprobe", ["-v", "error", "-show_streams", "-of", "json", f]).stdout);
  const v = probe.streams.find((s) => s.codec_type === "video");
  const andere = probe.streams.filter((s) => s.codec_type !== "video").map((s) => s.codec_type);
  const enc = v?.tags?.encoder || "";
  const [num, den] = (v?.r_frame_rate || "0/1").split("/").map(Number);
  const checks = [
    ["ProRes 4444 (ap4h)", v?.codec_name === "prores" && v?.codec_tag_string === "ap4h"],
    ["alpha-kanaal", /^yuva/.test(v?.pix_fmt || "")],
    ["encoder prores_ks (geen videotoolbox)", !/videotoolbox/i.test(enc) && (enc === "" || /prores_ks|Lavc/i.test(enc))],
    ["geen audiospoor", andere.length === 0],
    ["1080×1920", v?.width === 1080 && v?.height === 1920],
    ["30 fps", Math.abs(num / den - 30) < 0.01],
  ];
  if (!opt.snel) {
    const dec = run("ffmpeg", ["-v", "error", "-i", f, "-f", "null", "-"], { quiet: true });
    checks.push(["volledig decodeerbaar", dec.status === 0 && !dec.stderr.trim()]);
  }
  const ok = checks.every(([, c]) => c);
  if (!ok) fouten++;
  console.log(`\n${ok ? "✔" : "✖"} ${path.basename(f)}`);
  for (const [naam, c] of checks) if (!c || opt.uitgebreid) console.log(`   ${c ? "✔" : "✖"} ${naam}`);
  if (!ok && checks[2][1] === false) console.log("   → Fix: npm run prores -- \"" + f + "\"  (her-encodeert met prores_ks)");
}
console.log(`\n${files.length - fouten}/${files.length} bestanden OK`);
process.exit(fouten ? 1 : 0);
