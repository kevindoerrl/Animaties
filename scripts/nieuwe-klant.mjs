// Gebruik: npm run klant -- "Klant Naam" [--website https://...]
import fs from "node:fs";
import path from "node:path";
import { KLANTEN, TEMPLATE, copyTemplate, slug, vandaag, parseArgs, fail, openMap } from "./lib.mjs";

const { pos, opt } = parseArgs();
const naam = pos.join(" ").trim();
if (!naam) fail('Geef een klantnaam op: npm run klant -- "Klant Naam" --website https://klant.nl');

const dir = path.join(KLANTEN, slug(naam));
if (fs.existsSync(dir)) fail(`Bestaat al: ${dir}`);

copyTemplate(TEMPLATE, dir, { KLANT: naam, WEBSITE: opt.website || "", DATUM: vandaag() }, ["_VIDEO_TEMPLATE"]);
console.log(`✔ Klant aangemaakt: ${dir}

Volgende stappen:
  1. Brand guide-PDF's   → 01_brand/brandguide/
  2. Logo's, fonts, iconen → 01_brand/logo/, fonts/, iconen/
  3. Kleuren + fonts invullen in 01_brand/brand.json
  4. Eerste video: npm run video -- ${slug(naam)} "video naam" --bron pad\\naar\\video.mp4`);
openMap(dir);
