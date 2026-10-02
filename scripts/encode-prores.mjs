// (Her)encodeert naar Premiere-veilige ProRes 4444 met alpha via prores_ks.
// Input: een MOV (bv. videotoolbox/qtrle die Premiere niet pakt) of een PNG-sequence-map.
// Gebruik: npm run prores -- <input.mov | map-met-pngs> [--out uit.mov] [--fps 30]
import fs from "node:fs";
import path from "node:path";
import { run, parseArgs, fail, PRORES_ARGS, backupVoorOverschrijven } from "./lib.mjs";

const { pos, opt } = parseArgs();
const input = pos[0];
if (!input || !fs.existsSync(input)) fail("Gebruik: npm run prores -- <input.mov | map-met-pngs> [--out uit.mov]");

const isMap = fs.statSync(input).isDirectory();
let inArgs;
if (isMap) {
  const pngs = fs.readdirSync(input).filter((f) => f.toLowerCase().endsWith(".png")).sort();
  if (!pngs.length) fail("Geen PNG's in de map.");
  // Verwacht <prefix><nummer>.png, bv. frame_0001.png
  const m = pngs[0].match(/^(.*?)(\d+)\.png$/i);
  if (!m) fail(`Kan nummering niet afleiden uit "${pngs[0]}" (verwacht bv. frame_0001.png)`);
  const pattern = path.join(input, `${m[1]}%0${m[2].length}d.png`);
  inArgs = ["-framerate", String(opt.fps || 30), "-start_number", String(Number(m[2])), "-i", pattern];
} else inArgs = ["-i", input];

const out = opt.out || (isMap ? `${input.replace(/[\\/]+$/, "")}.mov` : input.replace(/\.mov$/i, "") + "_prores.mov");
const backup = backupVoorOverschrijven(out);
run("ffmpeg", ["-v", "error", "-y", ...inArgs, ...PRORES_ARGS, out]);
console.log(`✔ ${out}${backup ? `\n  Vorige versie bewaard: ${backup}` : ""}\n  Controleer met: npm run check -- "${out}"`);
