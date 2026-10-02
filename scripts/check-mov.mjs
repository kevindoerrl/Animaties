// Controleert of MOV's Premiere-veilig zijn: ProRes 4444 + alpha, prores_ks, geen audio,
// juiste formaat, en volledig decodeerbaar (incl. laatste frame).
// Het verwachte formaat komt uit video.json van de videomap (anders brand.json van de klant,
// anders 1080×1920 @ 30fps). Overschrijven kan met --formaat youtube@60 / 1920x1080@60.
// Gebruik: npm run check -- <bestand.mov | map> [--formaat ...] [--uitgebreid] [--snel]
import fs from "node:fs";
import path from "node:path";
import { run, parseArgs, fail, verwachtFormaat, parseFormaat, formaatTekst } from "./lib.mjs";

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
  const fm = opt.formaat ? parseFormaat(opt.formaat) : verwachtFormaat(f);
  const checks = [
    ["ProRes 4444 (ap4h)", v?.codec_name === "prores" && v?.codec_tag_string === "ap4h"],
    ["alpha-kanaal", /^yuva/.test(v?.pix_fmt || "")],
    ["encoder prores_ks (geen videotoolbox)", !/videotoolbox/i.test(enc) && (enc === "" || /prores_ks|Lavc/i.test(enc))],
    ["geen audiospoor", andere.length === 0],
    [`${fm.breedte}×${fm.hoogte} (is ${v?.width}×${v?.height})`, v?.width === fm.breedte && v?.height === fm.hoogte],
    [`${fm.fps} fps (is ${Math.round((num / den) * 100) / 100})`, Math.abs(num / den - fm.fps) < 0.01],
  ];
  if (!opt.snel) {
    const dec = run("ffmpeg", ["-v", "error", "-i", f, "-f", "null", "-"], { quiet: true });
    checks.push(["volledig decodeerbaar", dec.status === 0 && !dec.stderr.trim()]);
  }
  const ok = checks.every(([, c]) => c);
  if (!ok) fouten++;
  console.log(`\n${ok ? "✔" : "✖"} ${path.basename(f)}   [verwacht ${formaatTekst(fm)}${fm.bron && !opt.formaat ? ` · uit ${fm.bron === "standaard" ? "standaard" : path.basename(fm.bron)}` : ""}]`);
  for (const [naam, c] of checks) if (!c || opt.uitgebreid) console.log(`   ${c ? "✔" : "✖"} ${naam}`);
  if (!ok && checks[2][1] === false) console.log("   → Fix: npm run prores -- \"" + f + "\"  (her-encodeert met prores_ks)");
}
console.log(`\n${files.length - fouten}/${files.length} bestanden OK`);
process.exit(fouten ? 1 : 0);
