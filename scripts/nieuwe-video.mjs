// Gebruik: npm run video -- <klant> "video naam" [--bron pad/naar/video.mp4] [--datum 2026-10-02]
import fs from "node:fs";
import path from "node:path";
import { VIDEO_TEMPLATE, copyTemplate, klantDir, slug, vandaag, parseArgs, fail, openMap } from "./lib.mjs";

const { pos, opt } = parseArgs();
const [klant, ...rest] = pos;
const video = rest.join(" ").trim();
if (!klant || !video) fail('Gebruik: npm run video -- <klant> "video naam" --bron video.mp4');

const kdir = klantDir(klant);
const datum = opt.datum || vandaag();
const dir = path.join(kdir, "04_videos", `${datum}_${slug(video)}`);
if (fs.existsSync(dir)) fail(`Bestaat al: ${dir}`);

const klantNaam = JSON.parse(fs.readFileSync(path.join(kdir, "01_brand", "brand.json"), "utf8")).naam || klant;
copyTemplate(VIDEO_TEMPLATE, dir, { KLANT: klantNaam, VIDEO: video, DATUM: datum });

if (opt.bron) {
  if (!fs.existsSync(opt.bron)) fail(`Bronbestand niet gevonden: ${opt.bron}`);
  fs.copyFileSync(opt.bron, path.join(dir, "01_bron", path.basename(opt.bron)));
}
console.log(`✔ Video-map aangemaakt: ${dir}${opt.bron ? "\n  Bron gekopieerd naar 01_bron/" : "\n  Zet de aangeleverde MP4/MP3/script in 01_bron/"}`);
openMap(dir);
