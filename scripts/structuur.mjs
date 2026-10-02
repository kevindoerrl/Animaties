// Brengt alle bestaande klanten en video's op de actuele sjabloonstructuur.
// Voegt alleen ontbrekende mappen/bestanden toe, overschrijft NOOIT iets.
// - ontbrekende mappen uit KLANTEN/_TEMPLATE (bv. 00_admin/, 01_brand/premiere/, _code/)
// - "formaat" in brand.json als die ontbreekt (standaard 1080×1920 @ 30fps)
// - video.json per video als die ontbreekt (formaat gemeten uit 01_bron/, anders klant-standaard)
// Gebruik: npm run structuur [-- --droog]   (--droog = alleen tonen wat er zou gebeuren)
import fs from "node:fs";
import path from "node:path";
import {
  KLANTEN, TEMPLATE, VIDEO_TEMPLATE, parseArgs, STANDAARD_FORMAAT, probeFormaat, formaatTekst, isVideo,
} from "./lib.mjs";

const { opt } = parseArgs();
const droog = !!opt.droog;
let n = 0;
const meld = (wat) => { n++; console.log(`  + ${path.relative(KLANTEN, wat)}`); };
const dirs = (p) => fs.readdirSync(p, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);

// Alleen mappen + .gitkeep aanvullen; .md/.json-sjablonen worden niet over bestaande heen gezet.
function vulAan(sjabloon, doel, skip = []) {
  for (const e of fs.readdirSync(sjabloon, { withFileTypes: true })) {
    if (!e.isDirectory() || skip.includes(e.name)) continue;
    const d = path.join(doel, e.name);
    if (!fs.existsSync(d)) {
      meld(d + path.sep);
      if (!droog) { fs.mkdirSync(d, { recursive: true }); fs.writeFileSync(path.join(d, ".gitkeep"), ""); }
    }
    if (fs.existsSync(d) || droog) vulAan(path.join(sjabloon, e.name), d, skip);
  }
}

const schrijfJson = (f, data) => { meld(f); if (!droog) fs.writeFileSync(f, JSON.stringify(data, null, 2) + "\n"); };

for (const k of dirs(KLANTEN).filter((k) => !k.startsWith("_") && !k.startsWith("."))) {
  const kdir = path.join(KLANTEN, k);
  console.log(`\n${k}`);
  vulAan(TEMPLATE, kdir, ["_VIDEO_TEMPLATE"]);

  const bj = path.join(kdir, "01_brand", "brand.json");
  let klantFormaat = STANDAARD_FORMAAT;
  if (fs.existsSync(bj)) {
    const brand = JSON.parse(fs.readFileSync(bj, "utf8"));
    if (brand.formaat) klantFormaat = brand.formaat;
    else {
      // formaat vóór fixed_outro invoegen, rest ongemoeid
      const nieuw = {};
      for (const [key, val] of Object.entries(brand)) { if (key === "fixed_outro") nieuw.formaat = STANDAARD_FORMAAT; nieuw[key] = val; }
      if (!nieuw.formaat) nieuw.formaat = STANDAARD_FORMAAT;
      schrijfJson(bj, nieuw);
      console.log(`    formaat → ${formaatTekst(STANDAARD_FORMAAT)} (pas aan als deze klant liggend/vierkant levert)`);
    }
  }

  const vdirs = path.join(kdir, "04_videos");
  if (!fs.existsSync(vdirs)) continue;
  for (const v of dirs(vdirs).filter((v) => !v.startsWith("_"))) {
    const vdir = path.join(vdirs, v);
    vulAan(VIDEO_TEMPLATE, vdir);
    const vj = path.join(vdir, "video.json");
    if (fs.existsSync(vj)) continue;
    const bronDir = path.join(vdir, "01_bron");
    const bron = fs.existsSync(bronDir) ? fs.readdirSync(bronDir).find(isVideo) : null;
    const gemeten = bron && probeFormaat(path.join(bronDir, bron));
    const m = v.match(/^(\d{4}-\d{2}-\d{2})_(.+)$/);
    schrijfJson(vj, {
      klant: k, video: m ? m[2].replace(/-/g, " ") : v, datum: m ? m[1] : null,
      formaat: gemeten || klantFormaat, bron: bron || null,
    });
    console.log(`    formaat → ${formaatTekst(gemeten || klantFormaat)} (${gemeten ? "gemeten uit " + bron : "klant-standaard"})`);
  }
}
console.log(n ? `\n${droog ? "Zou toevoegen" : "Toegevoegd"}: ${n} item(s). Niets overschreven.` : "\nAlles is al up-to-date.");
