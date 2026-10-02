# Animaties

Animatie-factory voor klantvideo's: Remotion → ProRes 4444 MOV met alpha → Premiere Pro.
Werkt op Windows én Mac. De werkregels voor Claude staan in [`SKILL.md`](SKILL.md).

## Eenmalig instellen (Windows)

De projectmap staat in **Verkenner → Video's → Animaties** (`%USERPROFILE%\Videos\Animaties`).
Premiere leest daar van je eigen schijf, dus geen gedoe met de Google Drive-mount.

1. Download de ZIP van deze repo (GitHub → *Code* → *Download ZIP*), pak hem uit in je map
   **Video's** en hernoem de uitgepakte map naar `Animaties`.
   Heb je git: `git clone <repo-url> "$env:USERPROFILE\Videos\Animaties"`.
2. Tools installeren en de root instellen (PowerShell):

```powershell
winget install OpenJS.NodeJS.LTS
winget install Gyan.FFmpeg
setx ANIMATIES_ROOT "$env:USERPROFILE\Videos\Animaties"
```
Open daarna een nieuwe terminal.

Liever op Google Drive (bv. om met meerdere pc's te werken)? Zet `ANIMATIES_ROOT` dan op de Drive-map
en zet Drive for desktop op **Bestanden spiegelen**, anders leest Premiere van de stream-mount.

## Dagelijks gebruik

Alles vanuit de root-map (`cd $env:ANIMATIES_ROOT`):

| Commando | Wat het doet |
|---|---|
| `npm run klant -- "Karpeto Huis" --website https://karpeto.nl --formaat tiktok` | Nieuwe klant met complete mappenstructuur + standaardformaat |
| `npm run video -- karpeto-huis "hook test" --bron C:\pad\video.mp4` | Nieuwe videomap `04_videos\<datum>_hook-test\`, bron gekopieerd, formaat gemeten → `video.json` |
| `npm run structuur` | Bestaande klanten/video's aanvullen na een sjabloonwijziging (voegt alleen toe) |
| `npm run preview -- still_v1.png video.mp4 4.2` | Alpha-still over het videoframe leggen om te beoordelen (staand, liggend of vierkant) |
| `npm run check -- <map of .mov>` | Premiere-check: ProRes 4444, alpha, prores_ks, geen audio, juiste formaat/fps uit `video.json`, volledige decode |
| `npm run prores -- <bestand.mov of png-map>` | (Her)encoderen naar Premiere-veilige ProRes 4444 (oude versie gaat naar `_archief\`) |
| `npm run png -- <bestand.mov>` | Noodroute: PNG-sequence met alpha |
| `npm run lokaal -- <videomap>` | MOV's naar `%USERPROFILE%\Videos\Animaties\` + SHA-256-verificatie |
| `npm run migreer` / `npm run migreer -- --uitvoeren` | Oude `BRANDS/IN/OUT/ARCHIVE`-structuur omzetten (kopieert alleen) |

## Structuur per klant

```
KLANTEN/<klant>/
├── KLANT.md                 contact, afspraken, tone of voice, do's & don'ts
├── 00_admin/                briefings, offertes, contracten, planning
├── 01_brand/                brand.json (kleuren, fonts, formaat), brandguide/, logo/, fonts/,
│                            iconen/, beeldmateriaal/, lottie/, premiere/ (outro, .mogrt, LUT's)
├── 02_feedback/             feedback_log.md
├── 03_referenties/          voorbeelden die de klant goed vindt
└── 04_videos/<datum>_<video>/
    ├── VIDEO.md             status + animatielijst
    ├── video.json           formaat van deze video (breedte × hoogte @ fps)
    ├── 01_bron/             aangeleverde video (nooit aanpassen)
    ├── 02_analyse/          transcript, frames, notities
    ├── 03_stills/           stills + previews ter goedkeuring
    ├── 04_animaties/        ProRes 4444 MOV's met alpha → Premiere
    ├── 05_premiere/         .prproj
    ├── 06_export/           eindvideo
    ├── _archief/            back-ups vóór overschrijven
    └── _code/               broncode van de animaties (in git, om later opnieuw te renderen)
```

**Formaten:** `tiktok`/`reels`/`shorts`/`staand` = 1080×1920, `youtube`/`liggend` = 1920×1080,
`vierkant` = 1080×1080, `feed` = 1080×1350, of zelf: `1920x1080@60`. Standaard 30fps.

## MOV op Windows?

Ja. MOV is alleen de container; de codec erin (ProRes 4444) leest Premiere Pro op Windows
native, mét transparantie. Dat Verkenner geen thumbnail toont of Windows Mediaspeler hem niet afspeelt
is normaal en maakt niet uit. Wil je hem toch buiten Premiere bekijken: VLC speelt ProRes af.
Details en troubleshooting: `SKILL.md` → *Windows & Premiere Pro*.

## Git

Media (`.mov`, `.mp4`, `.prproj`, alles in `04_videos/` behalve `.md`, `video.json` en `_code/`)
en `00_admin/` staan in `.gitignore`. Die bestanden horen op Google Drive.
Git trackt structuur, scripts, brand.json, notities en de animatiecode.
