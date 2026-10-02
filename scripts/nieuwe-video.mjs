// Gebruik: npm run video -- <klant> "video naam" [--bron pad/naar/video.mp4] [--formaat youtube@60] [--datum 2026-10-02]
// Formaat: --formaat wint, anders gemeten uit de bronvideo, anders de klant-standaard uit brand.json.
import fs from "node:fs";
import path from "node:path";
import {
  VIDEO_TEMPLATE, copyTemplate, klantDir, slug, vandaag, parseArgs, fail, openMap,
  parseFormaat, probeFormaat, formaatTekst, verwachtFormaat, isVideo, run,
} from "./lib.mjs";

const { pos, opt } = parseArgs();
const [klant, ...rest] = pos;
const video = rest.join(" ").trim();
if (!klant || !video) fail('Gebruik: npm run video -- <klant> "video naam" --bron video.mp4');

const kdir = klantDir(klant);
const datum = opt.datum || vandaag();
const dir = path.join(kdir, "04_videos", `${datum}_${slug(video)}`);
if (fs.existsSync(dir)) fail(`Bestaat al: ${dir}`);
if (opt.bron && !fs.existsSync(opt.bron)) fail(`Bronbestand niet gevonden: ${opt.bron}`);

const brand = JSON.parse(fs.readFileSync(path.join(kdir, "01_brand", "brand.json"), "utf8"));
let formaat, herkomst;
if (opt.formaat) [formaat, herkomst] = [parseFormaat(opt.formaat), "opgegeven met --formaat"];
else if (opt.bron && isVideo(opt.bron) && (formaat = probeFormaat(opt.bron))) herkomst = "gemeten uit de bronvideo";
else {
  const { bron, ...f } = verwachtFormaat(kdir);
  [formaat, herkomst] = [f, bron === "standaard" ? "standaard" : "klant-standaard (brand.json)"];
}

let duur = "";
if (opt.bron && isVideo(opt.bron)) {
  const r = run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", opt.bron], { quiet: true });
  if (r.status === 0 && +r.stdout) duur = `${(+r.stdout).toFixed(2).replace(".", ",")}s`;
}

copyTemplate(VIDEO_TEMPLATE, dir, { KLANT: brand.naam || klant, VIDEO: video, DATUM: datum, FORMAAT: formaatTekst(formaat), DUUR: duur });
fs.writeFileSync(path.join(dir, "video.json"), JSON.stringify({
  klant: slug(klant), video, datum, formaat, bron: opt.bron ? path.basename(opt.bron) : null,
}, null, 2) + "\n");
if (opt.bron) fs.copyFileSync(opt.bron, path.join(dir, "01_bron", path.basename(opt.bron)));

console.log(`✔ Video-map aangemaakt: ${dir}
  Formaat: ${formaatTekst(formaat)} (${herkomst})${opt.bron ? "\n  Bron gekopieerd naar 01_bron/" : "\n  Zet de aangeleverde MP4/MP3/script in 01_bron/"}`);
openMap(dir);
