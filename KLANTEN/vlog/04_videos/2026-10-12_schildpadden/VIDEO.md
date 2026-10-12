# schildpadden · Vlog

| | |
|---|---|
| **Aangemaakt** | 2026-10-12 |
| **Bron** | `01_bron/` |
| **Formaat** | 1920×1080 @ 60fps (vastgelegd in `video.json`) |
| **Duur** | 10,33s |
| **Status** | concept · stills · akkoord · MOV's geleverd · in Premiere · geëxporteerd |

## Concept (na akkoord hier vastleggen)

| # | Tijd | Type | Spoken trigger | Status |
|---|---|---|---|---|
| A | 00:00.00 → 00:01.45 | Titel "SCHILDPADDEN" + opstijgende bubbels (punch-in) | geen spraak: snorkelaars springen erin | stills v1 |
| B | 00:06.07 → 00:07.35 | Getekende cirkels om de 2 schildpadden (tracking) + ×2-badge | beeld: twee schildpadden | stills v1 |
| C | 00:07.45 → 00:10.20 | Documentaire-onderschrift "Groene zeeschildpad · Chelonia mydas" | beeld: close-up | stills v1 (soort nog bevestigen) |
| D | 00:01.45 → 00:04.80 | Locatiekaart Curaçao, pin op Playa Grandi + zwemmend schildpadje, "PLAYA GRANDI · zwemmen met schildpadden" (Jan Thiel-stijl), rechtsonder | verzoek: "we zijn in Playa Grandi en kunnen met schildpadden zwemmen" | stills v1 · vervangt A in preview v2 |

Cuts: 1,45 · 3,85 · 6,07 · 7,35. Geen spraak in de video (stil audiospoor).

## Muziek
`05_premiere/audio/schildpadden_muziek_v1.wav`: origineel, zelf gecomponeerd en gesynthetiseerd (`_code/muziek.py`), dus geen copyright.
101,7 BPM in F, intro-swell tot 1,45 → groove start op de eerste schildpad, kalimba bij de twee schildpadden (6,07), glockenspiel bij de close-up (7,35). -14 LUFS.
Preview (video + animaties + muziek): `03_stills/schildpadden_preview_v1.mp4` (A+B+C), `03_stills/schildpadden_preview_v2.mp4` (D+B+C).

## Mappen
- `01_bron/`: aangeleverde MP4 / MP3 / script (nooit aanpassen)
- `02_analyse/`: `transcript.json`, `frames/`, concept-notities
- `03_stills/`: `<naam>_v1.png` + `<naam>_v1_preview.png` (over videoframe)
- `04_animaties/`: **ProRes 4444 MOV's met alpha: dit importeer je in Premiere**
- `05_premiere/`: `.prproj` van deze video
- `06_export/`: eindvideo uit Premiere
- `_archief/`: automatische back-ups vóór overschrijven
- `_code/`: broncode van de animaties van deze video (compositie, render-script). Staat in git, zodat je later opnieuw kunt renderen
