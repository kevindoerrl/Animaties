// Rendert comp.html (Playwright/Chromium) naar PNG's met alpha.
// Gebruik: node render.mjs still  <B>x<H> <seconden> <out.png>
//          node render.mjs frames <B>x<H> <fps> <outDir>
// Voorbeeld: node render.mjs frames 1920x1080 60 C:\temp\stop_frames  → daarna npm run prores -- <map> --fps 60 --out <x.mov>
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
let chromium;
try { ({ chromium } = await import("playwright")); }
catch { console.error("Playwright ontbreekt. Eenmalig in deze map: npm i playwright && npx playwright install chromium"); process.exit(1); }

const dir = path.dirname(fileURLToPath(import.meta.url));
const srv = http.createServer((q, r) => {
  const f = path.join(dir, decodeURIComponent(q.url.split("?")[0]));
  if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { "content-type": f.endsWith(".html") ? "text/html" : "application/octet-stream" });
  fs.createReadStream(f).pipe(r);
}).listen(0);

const [mode, maat, a, out] = process.argv.slice(2);
const [width, height] = maat.split("x").map(Number);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(`http://localhost:${srv.address().port}/comp.html?w=${width}&h=${height}`);
await page.evaluate(() => window.init());
const shot = async (t, file) => {
  await page.evaluate((t) => window.render(null, t), t);
  await page.screenshot({ path: file, omitBackground: true });
};
if (mode === "still") await shot(+a, out);
else {
  const fps = +a, n = Math.round((await page.evaluate(() => window.D)) * fps);
  fs.mkdirSync(out, { recursive: true });
  for (let i = 0; i < n; i++) await shot(i / fps, path.join(out, `f_${String(i).padStart(4, "0")}.png`));
  console.log(`${n} frames`);
}
await browser.close(); srv.close();
