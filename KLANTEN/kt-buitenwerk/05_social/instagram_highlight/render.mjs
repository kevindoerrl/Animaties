// Exporteert highlight.html naar PNG's: stories (1080×1920) en highlight-covers (1080×1080).
// Gebruik: node KLANTEN/kt-buitenwerk/05_social/instagram_highlight/render.mjs [--hd]
// --hd: dubbele resolutie (2160×3840 / 2160×2160) naar export_hd/, extra scherp na Instagram-compressie.
// Vereist Playwright (npm i -g playwright) en internet voor de Google Fonts.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require("playwright"); }
catch { playwright = require(path.join(process.env.npm_config_prefix || "/opt/node22", "lib/node_modules/playwright")); }

const map = path.dirname(fileURLToPath(import.meta.url));
const hd = process.argv.includes("--hd");
const exportMap = path.join(map, hd ? "export_hd" : "export");
const uit = { story: path.join(exportMap, "stories"), cover: path.join(exportMap, "covers") };
Object.values(uit).forEach((d) => fs.mkdirSync(d, { recursive: true }));

const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: hd ? 2 : 1 });
await page.goto(pathToFileURL(path.join(map, "highlight.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.body.classList.add("render"));
await page.evaluate(() => document.fonts.ready);

const slides = await page.evaluate(() => window.SLIDES);
for (const s of slides) {
  await page.evaluate((naam) => {
    document.querySelectorAll(".slide").forEach((el) => el.classList.toggle("actief", el.dataset.naam === naam));
  }, s.naam);
  const el = page.locator(`.slide[data-naam="${s.naam}"]`);
  const doel = path.join(uit[s.type], `${s.naam}.png`);
  await el.screenshot({ path: doel });
  console.log("✔", path.relative(map, doel));
}
await browser.close();
