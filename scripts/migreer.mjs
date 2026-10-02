// Zet de oude structuur (BRANDS/, IN/, OUT/, ARCHIVE/) om naar KLANTEN/<klant>/...
// KOPIEERT alleen, verwijdert niets. Standaard droge run; voeg --uitvoeren toe om echt te kopiëren.
// Gebruik: npm run migreer -- --van "G:\Mijn Drive\...\animaties" [--uitvoeren]
import fs from "node:fs";
import path from "node:path";
import { ROOT, KLANTEN, TEMPLATE, VIDEO_TEMPLATE, copyTemplate, slug, vandaag, parseArgs, STANDAARD_FORMAAT, formaatTekst } from "./lib.mjs";

const { opt } = parseArgs();
const van = path.resolve(opt.van || ROOT);
const echt = !!opt.uitvoeren;
const acties = [];
const ls = (p) => (fs.existsSync(p) ? fs.readdirSync(p, { withFileTypes: true }).filter((e) => e.isDirectory() && !e.name.startsWith(".")).map((e) => e.name) : []);

function kopieer(src, dst) {
  if (!fs.existsSync(src)) return;
  acties.push(`${path.relative(van, src)}  →  ${path.relative(ROOT, dst)}`);
  if (echt) fs.cpSync(src, dst, { recursive: true, force: false, errorOnExist: false });
}

function zorgKlant(k) {
  const dir = path.join(KLANTEN, slug(k));
  if (echt && !fs.existsSync(dir)) copyTemplate(TEMPLATE, dir, { KLANT: k, WEBSITE: "", DATUM: vandaag(), FORMAAT: formaatTekst(STANDAARD_FORMAAT) }, ["_VIDEO_TEMPLATE"]);
  return dir;
}

function zorgVideo(kdir, video) {
  const dir = path.join(kdir, "04_videos", slug(video));
  if (echt && !fs.existsSync(dir)) copyTemplate(VIDEO_TEMPLATE, dir, { KLANT: path.basename(kdir), VIDEO: video, DATUM: vandaag(), FORMAAT: formaatTekst(STANDAARD_FORMAAT), DUUR: "" });
  return dir;
}

// BRANDS/<klant>/
for (const k of ls(path.join(van, "BRANDS"))) {
  const src = path.join(van, "BRANDS", k), kdir = zorgKlant(k);
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    if (e.name === "feedback_log.md") kopieer(s, path.join(kdir, "02_feedback", e.name));
    else if (e.name === "brand.json") kopieer(s, path.join(kdir, "01_brand", e.name));
    else if (e.name === "icons") kopieer(s, path.join(kdir, "01_brand", "iconen"));
    else if (e.name === "assets") kopieer(s, path.join(kdir, "01_brand", "beeldmateriaal"));
    else if (/\.pdf$/i.test(e.name)) kopieer(s, path.join(kdir, "01_brand", "brandguide", e.name));
    else kopieer(s, path.join(kdir, "01_brand", e.name));
  }
}

// IN/<klant>/<video>/ → 01_bron
for (const k of ls(path.join(van, "IN")))
  for (const v of ls(path.join(van, "IN", k)))
    kopieer(path.join(van, "IN", k, v), path.join(zorgVideo(zorgKlant(k), v), "01_bron"));

// OUT/<klant>/<video>/ → stills/ → 03_stills, losse_animaties/ + losse MOV's → 04_animaties
for (const k of ls(path.join(van, "OUT")))
  for (const v of ls(path.join(van, "OUT", k))) {
    const src = path.join(van, "OUT", k, v), vdir = zorgVideo(zorgKlant(k), v);
    for (const e of fs.readdirSync(src, { withFileTypes: true })) {
      const s = path.join(src, e.name);
      if (e.name === "stills") kopieer(s, path.join(vdir, "03_stills"));
      else if (e.name === "losse_animaties") kopieer(s, path.join(vdir, "04_animaties"));
      else if (/\.mov$/i.test(e.name)) kopieer(s, path.join(vdir, "04_animaties", e.name));
      else if (/\.png$/i.test(e.name)) kopieer(s, path.join(vdir, "03_stills", e.name));
      else kopieer(s, path.join(vdir, "02_analyse", e.name));
    }
  }

// ARCHIVE/<klant>/<video>/ → _archief
for (const k of ls(path.join(van, "ARCHIVE")))
  for (const v of ls(path.join(van, "ARCHIVE", k)))
    kopieer(path.join(van, "ARCHIVE", k, v), path.join(zorgVideo(zorgKlant(k), v), "_archief"));

console.log(acties.length ? acties.join("\n") : "Niets gevonden om te migreren (geen BRANDS/, IN/, OUT/ of ARCHIVE/ in " + van + ").");
console.log(echt ? `\n✔ ${acties.length} items gekopieerd. Oude mappen staan er nog; verwijder ze pas na controle.`
                 : `\n(droge run: ${acties.length} items) Voeg --uitvoeren toe om echt te kopiëren.`);
