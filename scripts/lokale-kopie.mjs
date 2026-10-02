// Kopieert de MOV's van een video naar een lokale map (buiten Google Drive) en verifieert
// byte-voor-byte via SHA-256. Importeer in Premiere vanaf de lokale kopie.
// Gebruik: npm run lokaal -- <videomap of 04_animaties-map> [--naar D:\\Premiere\\Animaties]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseArgs, fail, sha256, openMap } from "./lib.mjs";

const { pos, opt } = parseArgs();
let src = pos[0];
if (!src || !fs.existsSync(src)) fail("Gebruik: npm run lokaal -- <videomap> [--naar doelmap]");
if (fs.existsSync(path.join(src, "04_animaties"))) src = path.join(src, "04_animaties");

const videoDir = path.basename(src) === "04_animaties" ? path.dirname(src) : src;
const klant = path.basename(path.dirname(path.dirname(videoDir)));
const basis = opt.naar || process.env.ANIMATIES_LOKAAL || path.join(os.homedir(), "Videos", "Animaties");
const doel = path.join(basis, `${klant}_${path.basename(videoDir)}`);
fs.mkdirSync(doel, { recursive: true });

const movs = fs.readdirSync(src).filter((f) => f.toLowerCase().endsWith(".mov"));
if (!movs.length) fail(`Geen MOV's in ${src}`);
let fout = 0;
for (const f of movs) {
  const a = path.join(src, f), b = path.join(doel, f);
  fs.copyFileSync(a, b);
  const ok = sha256(a) === sha256(b);
  if (!ok) fout++;
  console.log(`${ok ? "✔" : "✖ NIET IDENTIEK"} ${f}`);
}
console.log(`\n→ ${doel}`);
openMap(doel);
process.exit(fout ? 1 : 0);
