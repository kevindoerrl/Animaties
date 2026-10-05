# spijkenisse · Vlog

| | |
|---|---|
| **Aangemaakt** | 2026-10-05 |
| **Bron** | `01_bron/` |
| **Formaat** | 1080×1920 @ 60fps (vastgelegd in `video.json`) |
| **Duur** | 2,50s |
| **Status** | concept · stills · akkoord · MOV's geleverd · in Premiere · geëxporteerd |

## Concept (na akkoord hier vastleggen)

| # | Tijd | Type | Spoken trigger | Status |
|---|---|---|---|---|
| A | 00:00.767 → 00:02.42 (frame 46 →) | Locatie: kaartje Nederland, pin valt op Spijkenisse | ondertitel "In Beverveen" (frame 46–89) | stills v1 |
| B | idem | Locatie: blauw plaatsnaambord "Beverveen / Spijkenisse" klapt naar voren | idem | stills v1 |
| C | idem | Locatie: sticker met pin, "BEVERVEEN" typt in | idem | stills v1 |

MOV = hele clip (2,5s, 150 frames): op 0:00 boven de clip leggen, dan start hij precies op "In Beverveen".
Plek: gecentreerd onder de ingebrande ondertitel (y≈1290–1630). Code: `_code/` (zie `_code/comp.html`).

## Mappen
- `01_bron/`: aangeleverde MP4 / MP3 / script (nooit aanpassen)
- `02_analyse/`: `transcript.json`, `frames/`, concept-notities
- `03_stills/`: `<naam>_v1.png` + `<naam>_v1_preview.png` (over videoframe)
- `04_animaties/`: **ProRes 4444 MOV's met alpha: dit importeer je in Premiere**
- `05_premiere/`: `.prproj` van deze video
- `06_export/`: eindvideo uit Premiere
- `_archief/`: automatische back-ups vóór overschrijven
- `_code/`: broncode van de animaties van deze video (compositie, render-script). Staat in git, zodat je later opnieuw kunt renderen
