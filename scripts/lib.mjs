// Gedeelde helpers voor alle scripts. Alleen Node built-ins + ffmpeg/ffprobe op PATH.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const KLANTEN = path.join(ROOT, "KLANTEN");
export const TEMPLATE = path.join(KLANTEN, "_TEMPLATE");
export const VIDEO_TEMPLATE = path.join(TEMPLATE, "04_videos", "_VIDEO_TEMPLATE");

// Premiere-veilige ProRes 4444 met alpha. Zie SKILL.md → CODEC. Niet aanpassen zonder test in Premiere.
export const PRORES_ARGS = [
  "-c:v", "prores_ks", "-profile:v", "4", "-pix_fmt", "yuva444p10le", "-qscale:v", "4",
  "-vendor", "apl0", "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709", "-an",
];

export const vandaag = () => new Date().toISOString().slice(0, 10);

// "Karpeto Huis!" → "karpeto-huis"
export const slug = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export function parseArgs(argv = process.argv.slice(2)) {
  const pos = [], opt = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const k = a.slice(2);
      const next = argv[i + 1];
      opt[k] = next && !next.startsWith("--") ? (i++, next) : true;
    } else pos.push(a);
  }
  return { pos, opt };
}

export function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

export function klantDir(klant) {
  const dir = path.join(KLANTEN, slug(klant));
  if (!fs.existsSync(dir)) fail(`Klant "${klant}" bestaat niet. Maak hem aan met: npm run klant -- "${klant}"`);
  return dir;
}

// Kopieert een map recursief en vervangt {{PLACEHOLDERS}} in .md/.json.
export function copyTemplate(src, dst, vars, skip = []) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (skip.includes(e.name)) continue;
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyTemplate(s, d, vars, skip);
    else if (e.name === ".gitkeep") fs.writeFileSync(d, "");
    else if (/\.(md|json)$/.test(e.name)) {
      let txt = fs.readFileSync(s, "utf8");
      for (const [k, v] of Object.entries(vars)) txt = txt.replaceAll(`{{${k}}}`, v);
      fs.writeFileSync(d, txt);
    } else fs.copyFileSync(s, d);
  }
}

export function sha256(file) {
  const h = crypto.createHash("sha256");
  const fd = fs.openSync(file, "r");
  const buf = Buffer.alloc(1 << 20);
  let n;
  while ((n = fs.readSync(fd, buf, 0, buf.length, null)) > 0) h.update(buf.subarray(0, n));
  fs.closeSync(fd);
  return h.digest("hex");
}

export function run(cmd, args, { quiet = false } = {}) {
  const r = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: 64 << 20 });
  if (r.error?.code === "ENOENT") fail(`"${cmd}" niet gevonden. Installeer ffmpeg (Windows: winget install Gyan.FFmpeg) en open een nieuwe terminal.`);
  if (!quiet && r.status !== 0) fail(`${cmd} faalde:\n${r.stderr}`);
  return r;
}

// Opent een map in Verkenner / Finder / bestandsbeheer.
export function openMap(dir) {
  if (process.env.GEEN_OPEN) return;
  const [cmd, args] =
    process.platform === "win32" ? ["explorer.exe", [path.resolve(dir)]] :
    process.platform === "darwin" ? ["open", [dir]] : ["xdg-open", [dir]];
  try { spawn(cmd, args, { detached: true, stdio: "ignore" }).unref(); } catch {}
}

// Back-up vóór overschrijven → <videomap>/_archief/<naam>_<timestamp>.<ext>
export function backupVoorOverschrijven(doel) {
  if (!fs.existsSync(doel)) return null;
  const videoDir = path.dirname(path.dirname(doel));
  const arch = path.join(videoDir, "_archief");
  fs.mkdirSync(arch, { recursive: true });
  const ts = new Date().toISOString().replace(/[-:]/g, "").replace("T", "-").slice(0, 15);
  const ext = path.extname(doel);
  const kopie = path.join(arch, `${path.basename(doel, ext)}_${ts}${ext}`);
  fs.copyFileSync(doel, kopie);
  return kopie;
}
