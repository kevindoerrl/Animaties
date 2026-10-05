// Rendert de compositie (comp.html) met Playwright/Chromium naar PNG's met alpha.
// Gebruik: node render.mjs still <A|B|C> <seconden> <out.png>
//          node render.mjs frames <A|B|C> <fps> <outDir>
// Zie README.md in deze map voor de complete stappen (ook op Windows).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
let chromium;
try { ({ chromium } = await import("playwright")); }
catch { console.error("Playwright ontbreekt. Eenmalig in deze map: npm i playwright && npx playwright install chromium"); process.exit(1); }

const dir = path.dirname(fileURLToPath(import.meta.url));
const types = { ".html": "text/html", ".json": "application/json", ".ttf": "font/ttf" };
const srv = http.createServer((q, r) => {
  const f = path.join(dir, decodeURIComponent(q.url.split("?")[0]));
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(r);
}).listen(0);
const port = srv.address().port;

const [mode, style, a, out] = process.argv.slice(2);
const browser = await chromium.launch();
const { breedte: width, hoogte: height } = JSON.parse(fs.readFileSync(path.join(dir, "..", "video.json"), "utf8")).formaat;
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(`http://localhost:${port}/comp.html`);
await page.evaluate(() => window.init());

const shot = async (t, file) => {
  await page.evaluate(([s, t]) => window.render(s, t), [style, t]);
  await page.screenshot({ path: file, omitBackground: true });
};
if (mode === "still") await shot(+a, out);
else {
  const fps = +a, D = await page.evaluate(() => window.D), n = Math.round(D * fps);
  fs.mkdirSync(out, { recursive: true });
  for (let i = 0; i < n; i++) await shot(i / fps, path.join(out, `f_${String(i).padStart(4, "0")}.png`));
  console.log(`${n} frames`);
}
await browser.close(); srv.close();
