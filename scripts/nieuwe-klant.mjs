// Gebruik: npm run klant -- "Klant Naam" [--website https://...] [--formaat tiktok|youtube|1920x1080@60]
import fs from "node:fs";
import path from "node:path";
import { KLANTEN, TEMPLATE, copyTemplate, slug, vandaag, parseArgs, fail, openMap, parseFormaat, formaatTekst, STANDAARD_FORMAAT } from "./lib.mjs";

const { pos, opt } = parseArgs();
const naam = pos.join(" ").trim();
if (!naam) fail('Geef een klantnaam op: npm run klant -- "Klant Naam" --website https://klant.nl --formaat tiktok');

const dir = path.join(KLANTEN, slug(naam));
if (fs.existsSync(dir)) fail(`Bestaat al: ${dir}`);

const formaat = opt.formaat ? parseFormaat(opt.formaat) : STANDAARD_FORMAAT;
copyTemplate(TEMPLATE, dir, { KLANT: naam, WEBSITE: opt.website || "", DATUM: vandaag(), FORMAAT: formaatTekst(formaat) }, ["_VIDEO_TEMPLATE"]);

const bj = path.join(dir, "01_brand", "brand.json");
const brand = JSON.parse(fs.readFileSync(bj, "utf8"));
brand.formaat = formaat;
fs.writeFileSync(bj, JSON.stringify(brand, null, 2) + "\n");

console.log(`✔ Klant aangemaakt: ${dir}
  Standaardformaat: ${formaatTekst(formaat)}

Volgende stappen:
  1. Briefing / offerte / contract → 00_admin/
  2. Brand guide-PDF's           → 01_brand/brandguide/
  3. Logo's, fonts, iconen       → 01_brand/logo/, fonts/, iconen/
  4. Vaste outro, .mogrt, LUT's  → 01_brand/premiere/
  5. Kleuren + fonts invullen in 01_brand/brand.json
  6. Eerste video: npm run video -- ${slug(naam)} "video naam" --bron pad\\naar\\video.mp4`);
openMap(dir);
