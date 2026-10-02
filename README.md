# Animaties

Animatie-factory voor klantvideo's: Remotion → ProRes 4444 MOV met alpha → Premiere Pro.
Werkt op Windows én Mac. De werkregels voor Claude staan in [`SKILL.md`](SKILL.md).

## Eenmalig instellen (Windows)

```powershell
winget install OpenJS.NodeJS.LTS
winget install Gyan.FFmpeg
setx ANIMATIES_ROOT "G:\Mijn Drive\Amix Claude Code\Skills\animaties"
```
Open daarna een nieuwe terminal. Tip: zet Google Drive for desktop op **Bestanden spiegelen**
(of maak `KLANTEN\` *offline beschikbaar*). Premiere leest dan van echte schijf in plaats van de stream-mount.

## Dagelijks gebruik

Alles vanuit de root-map (`cd $env:ANIMATIES_ROOT`):

| Commando | Wat het doet |
|---|---|
| `npm run klant -- "Karpeto Huis" --website https://karpeto.nl` | Nieuwe klant met complete mappenstructuur |
| `npm run video -- karpeto-huis "hook test" --bron C:\pad\video.mp4` | Nieuwe videomap `04_videos\<datum>_hook-test\`, bron gekopieerd |
| `npm run preview -- still_v1.png video.mp4 4.2` | Alpha-still over het videoframe leggen om te beoordelen |
| `npm run check -- <map of .mov>` | Premiere-check: ProRes 4444, alpha, prores_ks, geen audio, 1080×1920, 30fps, volledige decode |
| `npm run prores -- <bestand.mov of png-map>` | (Her)encoderen naar Premiere-veilige ProRes 4444 (oude versie gaat naar `_archief\`) |
| `npm run png -- <bestand.mov>` | Noodroute: PNG-sequence met alpha |
| `npm run lokaal -- <videomap>` | MOV's naar `%USERPROFILE%\Videos\Animaties\` + SHA-256-verificatie |
| `npm run migreer` / `npm run migreer -- --uitvoeren` | Oude `BRANDS/IN/OUT/ARCHIVE`-structuur omzetten (kopieert alleen) |

## Structuur per klant

```
KLANTEN/<klant>/
├── KLANT.md                 contact, afspraken, tone of voice
├── 01_brand/                brand.json, brandguide/, logo/, fonts/, iconen/, beeldmateriaal/, lottie/
├── 02_feedback/             feedback_log.md
├── 03_referenties/          voorbeelden die de klant goed vindt
└── 04_videos/<datum>_<video>/
    ├── VIDEO.md             status + animatielijst
    ├── 01_bron/  02_analyse/  03_stills/  04_animaties/  05_premiere/  06_export/  _archief/
```

## MOV op Windows?

Ja. MOV is alleen de container; de codec erin (ProRes 4444) leest Premiere Pro op Windows
native, mét transparantie. Dat Verkenner geen thumbnail toont of Windows Mediaspeler hem niet afspeelt
is normaal en maakt niet uit. Details en troubleshooting: `SKILL.md` → *Windows & Premiere Pro*.

## Git

Media (`.mov`, `.mp4`, `.prproj`, alles in `04_videos/` behalve `.md`) staat in `.gitignore`.
Die bestanden horen op Google Drive. Git trackt structuur, scripts, brand.json en notities.
