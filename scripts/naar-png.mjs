// Noodroute: MOV → PNG-sequence met alpha. Premiere: Importeren → eerste PNG → vink "Image Sequence" aan.
// Gebruik: npm run png -- <bestand.mov>
import fs from "node:fs";
import path from "node:path";
import { run, parseArgs, fail, openMap } from "./lib.mjs";

const { pos } = parseArgs();
const input = pos[0];
if (!input || !fs.existsSync(input)) fail("Gebruik: npm run png -- <bestand.mov>");

const out = input.replace(/\.mov$/i, "") + "_png";
fs.mkdirSync(out, { recursive: true });
const naam = path.basename(input, path.extname(input));
run("ffmpeg", ["-v", "error", "-y", "-i", input, "-pix_fmt", "rgba", path.join(out, `${naam}_%04d.png`)]);
console.log(`✔ ${fs.readdirSync(out).length} frames → ${out}`);
openMap(out);
