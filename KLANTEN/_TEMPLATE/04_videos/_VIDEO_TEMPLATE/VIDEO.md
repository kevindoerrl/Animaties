# {{VIDEO}} · {{KLANT}}

| | |
|---|---|
| **Aangemaakt** | {{DATUM}} |
| **Bron** | `01_bron/` |
| **Formaat** | {{FORMAAT}} (vastgelegd in `video.json`) |
| **Duur** | {{DUUR}} |
| **Status** | concept · stills · akkoord · MOV's geleverd · in Premiere · geëxporteerd |

## Concept (na akkoord hier vastleggen)

| # | Tijd | Type | Spoken trigger | Status |
|---|---|---|---|---|
| 1 | 00:00.0 → 00:03.0 | HOOK A | "" | concept |
| 2 | 00:00.0 → 00:03.0 | HOOK B | "" | concept |

## Mappen
- `01_bron/`: aangeleverde MP4 / MP3 / script (nooit aanpassen)
- `02_analyse/`: `transcript.json`, `frames/`, concept-notities
- `03_stills/`: `<naam>_v1.png` + `<naam>_v1_preview.png` (over videoframe)
- `04_animaties/`: **ProRes 4444 MOV's met alpha: dit importeer je in Premiere**
- `05_premiere/`: `.prproj` van deze video
- `06_export/`: eindvideo uit Premiere
- `_archief/`: automatische back-ups vóór overschrijven
- `_code/`: broncode van de animaties van deze video (compositie, render-script). Staat in git, zodat je later opnieuw kunt renderen
