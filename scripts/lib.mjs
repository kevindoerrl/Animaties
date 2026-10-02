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
  try {
    const c = spawn(cmd, args, { detached: true, stdio: "ignore" });
    c.on("error", () => {}); // geen bestandsbeheer (server/container): gewoon overslaan
    c.unref();
  } catch {}
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

// ---------- Formaat (breedte × hoogte @ fps) ----------
// Per klant een standaard in 01_brand/brand.json → "formaat", per video vastgelegd in video.json.
export const STANDAARD_FORMAAT = { breedte: 1080, hoogte: 1920, fps: 30 };
export const FORMAAT_PRESETS = {
  staand: { breedte: 1080, hoogte: 1920, fps: 30 }, // TikTok / Reels / Shorts
  tiktok: { breedte: 1080, hoogte: 1920, fps: 30 },
  reels: { breedte: 1080, hoogte: 1920, fps: 30 },
  shorts: { breedte: 1080, hoogte: 1920, fps: 30 },
  youtube: { breedte: 1920, hoogte: 1080, fps: 30 },
  liggend: { breedte: 1920, hoogte: 1080, fps: 30 },
  "youtube-4k": { breedte: 3840, hoogte: 2160, fps: 30 },
  vierkant: { breedte: 1080, hoogte: 1080, fps: 30 },
  feed: { breedte: 1080, hoogte: 1350, fps: 30 }, // 4:5
};

// "youtube" | "1920x1080" | "1920x1080@60" | "youtube@60" → { breedte, hoogte, fps }
export function parseFormaat(txt) {
  const [basis, fps] = String(txt).toLowerCase().trim().split("@");
  let f = FORMAAT_PRESETS[basis] ? { ...FORMAAT_PRESETS[basis] } : null;
  const m = basis.match(/^(\d+)\s*[x×]\s*(\d+)$/);
  if (m) f = { breedte: +m[1], hoogte: +m[2], fps: 30 };
  if (!f) fail(`Onbekend formaat "${txt}". Gebruik bv. youtube, tiktok, 1920x1080@60. Presets: ${Object.keys(FORMAAT_PRESETS).join(", ")}`);
  if (fps) f.fps = +fps;
  if (!(f.fps > 0)) fail(`Ongeldige fps in "${txt}"`);
  return f;
}

export const formaatTekst = (f) => `${f.breedte}×${f.hoogte} @ ${f.fps}fps`;

// Leest breedte/hoogte/fps uit een videobestand (rotatie meegenomen). null als het geen video is.
export function probeFormaat(file) {
  const r = run("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries",
    "stream=width,height,r_frame_rate:stream_side_data=rotation:stream_tags=rotate", "-of", "json", file], { quiet: true });
  if (r.status !== 0) return null;
  const v = JSON.parse(r.stdout).streams?.[0];
  if (!v?.width) return null;
  const rot = Math.abs(+(v.side_data_list?.find((d) => d.rotation != null)?.rotation ?? v.tags?.rotate ?? 0));
  const [num, den] = (v.r_frame_rate || "30/1").split("/").map(Number);
  const gedraaid = rot === 90 || rot === 270;
  return {
    breedte: gedraaid ? v.height : v.width,
    hoogte: gedraaid ? v.width : v.height,
    fps: Math.round((num / den) * 100) / 100,
  };
}

const leesJson = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };

// Verwacht formaat voor een bestand of map: dichtstbijzijnde video.json → klant brand.json → standaard.
export function verwachtFormaat(p) {
  let dir = path.resolve(fs.existsSync(p) && fs.statSync(p).isDirectory() ? p : path.dirname(p));
  while (dir !== path.dirname(dir)) {
    const vj = leesJson(path.join(dir, "video.json"));
    if (vj?.formaat) return { ...vj.formaat, bron: path.join(dir, "video.json") };
    const bj = leesJson(path.join(dir, "01_brand", "brand.json"));
    if (bj?.formaat) return { ...bj.formaat, bron: path.join(dir, "01_brand", "brand.json") };
    dir = path.dirname(dir);
  }
  return { ...STANDAARD_FORMAAT, bron: "standaard" };
}

export const isVideo = (f) => /\.(mp4|mov|m4v|mkv|webm|avi|mxf)$/i.test(f);
