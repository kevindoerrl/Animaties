# {{KLANT}}

| | |
|---|---|
| **Website** | {{WEBSITE}} |
| **Contactpersoon** | |
| **E-mail / telefoon** | |
| **Aangemaakt** | {{DATUM}} |

## Afspraken & oplevering
- Standaardformaat: {{FORMAAT}}, ProRes 4444 MOV met alpha (staat in `01_brand/brand.json` → `formaat`; per video kan het afwijken, zie `video.json`)
- Aantal hook-varianten per video: 2
- Vaste outro: ja / nee (staat in `01_brand/brand.json` → `fixed_outro`)

## Tone of voice
_Kort: hoe praat dit merk? Wat past wel, wat absoluut niet?_

## Do's & don'ts
- 

## Mappen
| Map | Wat erin hoort |
|---|---|
| `00_admin/` | Briefings, offertes, contracten, planning, factuuroverzicht (niet in git) |
| `01_brand/brand.json` | Kleuren, fonts, logo-paden: de enige bron voor brand-kleuren |
| `01_brand/brandguide/` | Brand guide-PDF's, tone-of-voice-documenten, huisstijlhandboek |
| `01_brand/logo/` | Logo's (SVG voorkeur), licht/donker/wit-versies |
| `01_brand/fonts/` | Font-bestanden (.otf/.ttf/.woff2) + licentie |
| `01_brand/iconen/` | Officiële merk-iconen (altijd deze gebruiken, nooit zelf tekenen) |
| `01_brand/beeldmateriaal/` | Productfoto's, app-screenshots, mockup-materiaal |
| `01_brand/lottie/` | Klant-specifieke Lottie JSON's |
| `01_brand/premiere/` | Vaste intro/outro, `.mogrt`-templates, LUT's, export-presets |
| `02_feedback/feedback_log.md` | Geleerde voorkeuren: **lees dit vóór elke run** |
| `03_referenties/` | Voorbeeldvideo's/stijlen die de klant goed vindt |
| `04_videos/<datum>_<video>/` | Alles per video: bron → analyse → stills → animaties → Premiere → export (zie `VIDEO.md` in elke videomap) |
