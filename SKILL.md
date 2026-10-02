---
name: animaties
description: Open animation-factory voor video's. Levert MOV-animaties met transparante achtergrond (alpha channel) die een bestaande video versterken. Brand-aware per klant via brand.json. Gebruik deze skill wanneer een gebruiker een MP4 aanlevert en vraagt om animaties, motion graphics, overlay-animaties, mockups, counters, klokken, lower-thirds, text reveals, logo-animaties, UI-animaties, highlights, notifications, charts, OR "iets dat de video sterker maakt". Triggers: "maak animaties voor deze video", "voeg animaties toe", "overlay animaties", "motion graphics", "animaties skill", of wanneer een MP4 wordt gedeeld.
---

# Animaties v2 — Premium animation factory

## Filosofie

**LEES DIT VOOR ELKE RUN.**

De skill is een **premium animation factory** — geen template-picker. Elke animatie wordt gebouwd vanuit het verhaal van de video en ziet eruit als professioneel motion design werk. Het referentieniveau is LottieFiles / CreatorSet-kwaliteit.

De 3 vragen voor elke animatie:
1. **Versterkt dit het verhaal?** (niet: versiert het de video)
2. **Ziet het er premium uit?** (vloeiende easing, goede timing, coherent met de andere animaties)
3. **Klopt de duur met de spoken-cadence?** (animatie eindigt vóórdat spreker verder gaat)

---

## Harde regels

- **ELKE ANIMATIE MOET EEN REDEN HEBBEN — uit het gesproken woord (alle klanten, hoogste prioriteit).** De spreker zegt iets, en de animatie is dáárop gebaseerd en versterkt het. Werk altijd vanuit het transcript. Stel per animatie de toets: *welk woord of welke zin lokt dit uit, en op welke seconde valt dat?* Kun je dat niet beantwoorden → de animatie hoort er niet. Plaats hem exact op het moment dat het woord valt, niet ervoor of erna. Concreet ding genoemd → toon dat ding (letterlijk object of inzet-clip). Richting/trend → vorm die die beweging maakt, achter de persoon. Opsomming → genummerde kaarten/balken. Lijst of systeem → volledig insert-screen. Resultaatclaim → bewijs-insert met cijfers. Fout benoemd → doorhaling of rode markering. CTA → alleen caption, geen graphic. Ingebrande captions in bestaande footage zijn een bruikbaar tijd-gelijk transcript. Volledige onderbouwing: `REFERENCES/devinjatho_analyse.pdf`.
- **DE EERSTE 4 SECONDEN ZIJN DE HOOK — strak geregisseerd.** 0,0-0,1s: lockup staat er direct (of whip/motion-blur transitie, nooit een leeg openingsbeeld). 0,1-0,5s: punch-in, beeld én tekst schalen samen van 0,90 → 1,00 (outExpo, ~12 frames). 0,5-1,5s: lockup staat stil, evt. badge-pill eronder. **1,5-2,5s: tweede gebeurtenis** — graphic achter de persoon of modificatie op de tekst (doorhaling, glitch). ~3,0s: lockup verdwijnt, normale captions nemen over.
- **HOOK-STIJL: tweeregelige kleur-split + punch-in (default).** Zie `REFERENCES/devinjatho_hook_style.md` — door Amix aangedragen als dé referentie ("deze hooks zijn top"), frame-voor-frame geanalyseerd. Kort: hookzin in twee gestapelde regels, zware condensed uppercase, één regel wit / één regel in accentkleur (of één accentwoord mid-zin), dikke zwarte outline + shadow, midden in beeld op borsthoogte. **Entrance = punch-in op de hele compositie (scale 0.9→1.0, ~12 frames, outExpo) — NOOIT een fade-in van de tekst; die staat er vanaf frame 1.** Daarna staat de lockup stil. Optioneel: glitch/RGB-split op één sleutelwoord, UI-element half-transparant donker achter een uitgeknipte persoon. Lees dat bestand vóór je een hook bouwt.
- **HOOKS: altijd PAKKEND, nooit een logo.** Een hook moet direct laten ZIEN waar de video over gaat — visueel, niet met tekst+logo. Kijk naar het script en bedenk: "hoe ziet dit onderwerp er in het echt uit?" en simuleer DAT. Voorbeelden: video over ambulancemeldingen → realistische push-notification; video over flitspalen → kaartweergave met snelheid; video over parkeren → parkeermeter-animatie. NOOIT terugvallen op "merk-logo + beschrijvend woord" — dat is saai en zegt niks. De hook moet iets LIJPS/VETS zijn: een pakkende visuele simulatie die de kijker direct triggert.
- **CTA/OUTRO TEKST MOET UIT HET SCRIPT KOMEN.** Nooit zelf een CTA-zin bedenken. Lees het transcript en pak de exacte call-to-action die de spreker uitspreekt. Als het script vraagt om reacties → maak een TikTok-comment animatie. Als het script verwijst naar een link → URL/swipe-up animatie. De visuele uitwerking mag creatief zijn, maar de TEKST komt uit het script.
- **GEEN verzonnen bijtekst (alle klanten).** On-screen tekst is KORT, SIMPEL, KRACHTIG en ondersteunt puur de animatie. Gebruik alleen woorden uit het transcript/de kern (gerecht-naam, cijfer, één accentwoord). NOOIT zelf extra zinnen, kickers, taglines of "random" labels erbij verzinnen. Bij twijfel: minder tekst.
- **GEEN decoratieve/sfeer-tekst.** Tekst die geen informatie toevoegt aan het doel van de animatie moet WEG — ook al "past" het qua vibe. Voorbeelden die NIET mogen: "Dik & zacht", "Premium", "Zo mooi", losse payoff-regels onder een cijfer. Bij een cijfer-animatie: alleen het cijfer + zijn context-label (bv. "Poolhoogte 35 mm"), verder niets. De animatie/het beeld draagt de sfeer, niet extra woorden.
- **NOOIT overlappende tekst.** Regels/elementen mogen elkaar nooit raken of overlappen — altijd duidelijke ruimte ertussen (ruime `line-height`, `gap`/marges tussen regels, cijfer los van label). Zeker bij meerregelige koppen en cijfer+label-combinaties: check de still hierop vóór je 'm toont.
- **POSITIE (alle klanten, elke niet-fullscreen animatie): horizontaal GECENTREERD, verticaal NET ONDER HET MIDDEN.** Zwaartepunt ~y1050-1250 op het 1920-canvas; de ruimte erboven blijft vrij zodat de ingebrande ondertitels er nog boven passen. NOOIT links, rechts, of in een hoek — nooit links-boven. Fullscreen-beats vullen uiteraard wel het hele scherm. (Amix, 23-07-2026, geldt merk-onafhankelijk.) **Uitzondering liggend (YouTube, 16:9) zonder ingebrande ondertitels:** plaats in de vrije zone naast de spreker (check de frame-analyse), zoals de Curaçao-kaart linksboven bij `vlog/2026-10-02_jan-thiel-beach` (gekozen 02-10-2026).
- **MAX animaties per video: 12-15 absoluut maximum** — per video bepalen hoeveel er écht nodig zijn. Richtlijn: 3-4 voor ≤30s, 5-8 voor >45s, meer alleen als de klant er expliciet om vraagt. Referentieniveau: 1 event per ~7-8 seconden (Dries de goede UGC-stijl)
- **Graphic Insert Screens tellen ook mee** — een volledig grijs/wit scherm dat de video vervangt is ook een animatie-event
- **Altijd MOV met alpha-channel** (ProRes 4444 + yuva444p10le)
- **Formaat per klant én per video.** Standaard 9:16 staand, 1080×1920, 30fps (TikTok/Reels/Shorts). Het formaat staat in `KLANTEN/<klant>/01_brand/brand.json` → `formaat` (klant-standaard) en per video in `video.json` (`npm run video` meet het uit de bron). Render ALTIJD op het formaat uit `video.json`: een liggende YouTube-vlog van 1920×1080 @ 60fps krijgt dus een 1920×1080 @ 60fps-MOV. `npm run check` en `npm run preview` lezen dit zelf.
- **GEEN SFX** — Amix doet dit zelf in Premiere Pro
- **TWEE HOOK-VARIANTEN PER VIDEO (DeVakshop, en standaard een goed idee bij elke klant).** Lever voor elke video twee écht verschillende hook-animaties op zodat Amix kan kiezen. Verschil moet in de hookzin en de opbouw zitten — niet twee posities of twee kleuren van hetzelfde ding. Zie `KLANTEN/devakshop/01_brand/brand.json` → `oplevering`.
- **CODE BEWERK JE OP DRIVE, NIET IN DE WERKKOPIE.** Wijzig altijd `remotion/src/...` op de Drive en kopieer dat daarna naar de lokale werkkopie (`%TEMP%\<klant>-remotion` op Windows, `/private/tmp/<klant>-remotion` op Mac). Andersom raak je de wijziging kwijt als tmp wordt opgeruimd. Dit is al een keer misgegaan met de `FMCanvas`-fix. Geldt ook voor `node_modules`: die kan in tmp half gewist raken en geeft dan een vage `ERR_MODULE_NOT_FOUND`. Los op met `npm ci` in de werkkopie.
- **GEBRUIK ALTIJD ABSOLUTE OUT-PADEN IN RENDER-MANIFESTS.** Een relatief pad als `KLANTEN/<klant>/...` landt in de wérkmap, en die staat in tmp. Precies zo zijn de CJIB-animaties verloren gegaan.
- **NOOIT EEN EINDBESTAND IN /tmp — dat wordt gewist en dan is het werk weg.** Alle MOV's gaan naar `KLANTEN/<klant>/04_videos/<video>/04_animaties/` en stills naar `.../03_stills/` op de Drive. De `out`-paden in het render-manifest wijzen daar altijd naartoe. Wél in tmp: de werkkopie van het Remotion-project (`%TEMP%\<klant>-remotion` / `/private/tmp/<klant>-remotion`) en tussentijdse PNG-sequences — dat is puur voor snelheid, want bundelen op de Drive-mount duurt 13+ minuten tegen 2 seconden lokaal. **Controleer na elke render dat het bestand op de Drive-locatie staat** (`npm run check -- <map>`) en ruim tussentijdse sequences op. (Amix 08-08-2026, na verlies van `01_fb_comment.mov`.)
- **CODEC: ProRes 4444 via `prores_ks` (software), NOOIT `prores_videotoolbox`, NOOIT `qtrle`.** Vaste regel: `-c:v prores_ks -profile:v 4 -pix_fmt yuva444p10le -qscale:v 4 -vendor apl0 -color_primaries bt709 -color_trc bt709 -colorspace bt709 -an`.
  - **`qtrle`** (QuickTime Animation): Premiere leest het als diagonale strepen/ruis. Afgekeurd 08-08-2026.
  - **`prores_videotoolbox`** (Apple hardware-encoder): produceert een ProRes-bitstream die ffmpeg foutloos decodeert, maar waar Premiere op struikelt met *"Error retrieving frame N ... substituting frame N-1, plus N errors"*. Dit is het terugkerende frame-retrieval-probleem geweest — NIET (alleen) de Drive-mount. Bewijs (18-08-2026): een videotoolbox-MOV gaf 148 frame-errors in Premiere óók vanaf een lokale kopie; her-encoden met `prores_ks` (identieke pixels) loste het op. Een werkend en een falend bestand hadden identieke ffprobe-eigenschappen (ap4h, yuva444p12le, 30fps) — het verschil zit puur in de encoder-bitstream, niet in de high-level codec.
  - **`prores_ks`** is de referentie-encoder en produceert Premiere-veilige ProRes 4444 met alpha. Iets langzamer dan videotoolbox, maar dat is het waard. Verifieer na afloop met `npm run check -- <bestand of map>` (volledige decode, codec, alpha, encoder, geen audio). Een bestand van de verkeerde encoder repareer je met `npm run prores -- <bestand.mov>`.
  - Let op: ffprobe blijft `yuva444p12le` rapporteren, ongeacht `-pix_fmt` — dat is de decode-representatie van ProRes 4444, geen betrouwbare encoder-check. Controleer de encoder via `stream_tags=encoder`.
- **PREMIERE LEEST ONBETROUWBAAR VANAF DE GOOGLE DRIVE-MOUNT — lever ALTIJD ook een lokale kopie.** Symptoom: "Error retrieving frame N at time ..." terwijl `ffmpeg -v error -i <file> -f null -` het bestand foutloos decodeert en de bestandsgrootte stabiel is. **Het ligt NIET aan de bestandsgrootte** — dat is twee keer verkeerd gediagnosticeerd (eerst bij 380 MB 4K, daarna bij 53 MB 1080p). De gemene deler is de mount, niet de omvang. Werkwijze: eindbestand naar `KLANTEN/<klant>/04_videos/<video>/04_animaties/` op Drive (dat blijft de bewaarplek), daarna `npm run lokaal -- <videomap>`. Dat kopieert naar `%USERPROFILE%\Videos\Animaties\<klant>_<video>\` (Mac: `~/Videos/Animaties/...`), verifieert met SHA-256 dat de kopie byte-identiek is en opent de map. Importeer die lokale versie in Premiere. **Windows-alternatief:** zet Google Drive for desktop op *Bestanden spiegelen* (of rechtsklik op de klantmap → *Offline beschikbaar*); dan staan de bestanden echt op schijf en speelt het mount-probleem waarschijnlijk niet.
- **STILLS EERST, dan MOV — en STOP na de stills.** Toon de stills en wacht op een expliciet akkoord van Amix. Ook als de stills er goed uitzien, ook als hij eerder in de sessie enthousiast was, ook bij een kleine wijziging: akkoord op een vorige versie geldt niet voor de nieuwe. Pas na een duidelijk "ja"/"render maar" de MOV maken.
- **NOOIT een audiospoor** — geldt voor alle klanten en alle animaties, ook een leeg/stil spoor. `render.mjs` is hiervoor gefixt (`muted: true` + `audioCodec: null` in `renderMedia`) — die regels niet weghalen. Bij directe CLI `--muted`, bij ffmpeg `-an`. **Controleer na elke MOV-render** met `npm run check -- <file>` (checkt o.a. dat er alleen een videospoor is).
- **CONTEXT IS HEILIG** — elke animatie met een cijfer/stat moet duidelijk zijn zonder de rest van de video. "40% via Facebook" zonder klantnaam = ⛔. Altijd eyebrow/context toevoegen.
- **Brand-strict**: kleuren/fonts ALLEEN uit `KLANTEN/<klant>/01_brand/brand.json`. Bij twijfel: check de brand guide in `01_brand/brandguide/`, en anders vraag het.
- **GEBRUIK ECHTE BRAND-ICONEN.** Heeft een klant iconen in de `KLANTEN/<klant>/01_brand/iconen/` map? Gebruik die via `<FMPin name="bestandsnaam" size={X} />` (of equivalent per klant). NOOIT zelf SVG-iconen tekenen als er echte assets beschikbaar zijn. Check altijd eerst de icons-map.
- **HERKENBARE KAARTEN.** Landkaarten moeten altijd herkenbare, echte landcontouren gebruiken — haal ze van een betrouwbare SVG-bron (bijv. simplemaps world-map). NOOIT zelf grove polygonen tekenen die niet op het echte land lijken. Bij Flitsmeister-video's: kaart van Europa/Nederland moet er professioneel uitzien.
- **VRAAG BIJ ONDUIDELIJKHEID.** Als je tijdens het bouwen van animaties twijfelt over icoontjes, tekst, kaartdata, of creatieve keuzes: vraag het in de chat. Beter even vragen dan iets slechts opleveren.
- **Exit-fade eindigt op `durationInFrames - 1`** — nooit op `durationInFrames`
- **Duur = spoken-duur × 1.3** — animatie is iets langer dan de spoken-trigger, nooit korter
- **Versies altijd nummeren** — stills en MOVs als v1, v2, v3 etc. Nooit overschrijven.
- **Z-as op elke entrance/exit (187N-regel)** — niets verschijnt op eindgrootte. Scale × blur × kleursaturatie bewegen sámen: dichtbij = groot + blurry, ver = klein + bleek. Cutaways openen met een pull-back (container start ~2.2x + blur → zoomt uit naar 1x scherp) of elementen komen van "ver" naar voren. Beat-wissels bínnen een cutaway via zoom-throughs (oud groeit voorbij kader + blurt weg, nieuw komt van ver), niet via cuts. Alle cutaway-elementen hebben continue idle-drift; screenshots leven (Ken Burns + live counters). Volledige breakdown: `REFERENCES/187n_agency_demo.md`.
- **Full-screen animaties hebben ALTIJD een echte slide/roll-IN én slide/roll-OUT.** Nooit hard-cutten naar een statisch vlak — ook niet op frame 0: de compositie-basis is TRANSPARANT en het brand-vlak wipet/rolt/slidet zelf in beeld (~12-26 frames, varieer richting per comp). Aan het eind animeert het vlak ook weer UIT (omgekeerde wipe/roll, klaar vóór `durationInFrames - 1`), zodat Amix in Premiere nooit een harde kleur-cut ziet. Consequentie: **render fullscreen covers óók als alpha-MOV** — tijdens de in/out is de onderliggende video zichtbaar. Referenties: `AlaproFullBg` (`lib/alaproTheme.tsx`, props `direction` + `inDuration`), `Kp2Vergelijk` (uitrol-in + oprol-uit).

---

## Stap 0 — Lees feedback_log EERST

**ALTIJD als eerste stap:** check of `KLANTEN/<klant>/02_feedback/feedback_log.md` bestaat. Zo ja: lees het volledig. Dit zijn geleerde voorkeuren van eerdere runs. Neem ze mee in elk concept en elke animatie-beslissing.

Als de klant nieuw is (geen map in `KLANTEN/`): `npm run klant -- "Klant Naam" --website https://... --formaat tiktok|youtube|1920x1080@60`. Dat maakt de complete mappenstructuur aan, inclusief een feedback_log met datum + "eerste run" en het standaardformaat in brand.json.

Elke nieuwe video: `npm run video -- <klant> "video naam" --bron pad\naar\video.mp4`. Dat geeft `KLANTEN/<klant>/04_videos/<datum>_<video>/` met de bron al in `01_bron/` en een `video.json` met het formaat (gemeten uit de bron; overschrijven met `--formaat`). Werk daarna alleen in die videomap. Animatiecode die niet in `remotion/` thuishoort (losse composities, render-scripts) gaat in `_code/` van de video: die staat in git.

Na een sjabloonwijziging: `npm run structuur` vult bestaande klanten en video's aan (voegt alleen toe, overschrijft nooit).

---

## Auto-patroondetectie — detecteer vóór je concepten schrijft

Scan het transcript automatisch op deze patronen en neem het gevonden concept mee als kandidaat:

| Patroon in transcript | → Automatisch concept |
|---|---|
| "X stappen / X voordelen / X tips" (getal 2-6) | → Stap-sequence animatie (alle stappen tegelijk of één voor één) |
| "X procent / X euro / X gebruikers / X aanvragen" | → Counter animatie (telt op naar X) |
| "versus / in vergelijking met / het verschil" | → Split-screen vergelijking |
| "check / vinkje / voordeel / zeker weten" (meervoud) | → Checkmark-serie |
| "bel / download / ga naar / kijk op [URL]" | → CTA animatie (URL/actie in beeld) |
| "verboden / niet toegestaan / mag niet" | → Warning/verbod-stempel |
| "snel / in X minuten / direct" | → Timer of countdown |
| "jouw concurrent / anderen doen dit al / terwijl jij..." | → GraphicInsertScreen met icoon-metafoor |
| "probleem / uitdaging / frustrerend / tijdrovend" | → IconGrid (rood = probleem-items) |
| "oplossing / wat werkt / het verschil is" | → IconGridTransition (rood → groen) of MixedKineticType |
| "zo eenvoudig / zo werkt het / één klik" | → AppCard met product screenshot |
| "niet tevreden / garantie / risico-vrij / geld terug" | → MixedKineticType ("Je geld / TERUG"-stijl) |

---

## Kwaliteits-checklist — run dit INTERN vóór je still toont

Vóórdat je een still presenteert, doorloop je zelf:

- [ ] Duur klopt met spoken-moment? (niet te lang, niet te kort)
- [ ] Geen overlappende tekst? (regels raken elkaar niet, cijfer los van label, ruime line-height/gap)
- [ ] Alleen noodzakelijke tekst? (kort/simpel/krachtig, geen zelf-verzonnen bijzinnen of labels)
- [ ] Positie vrij van spreker? (check frame-analyse)
- [ ] Gebruik ik premium easing? (`ease.outExpo` / `ease.outBack` / `ease.inOutCubic` — NIET raw `spring()`)
- [ ] Brand-kleuren correct uit brand.json?
- [ ] Tekst leesbaar op zowel lichte als donkere video-achtergrond? (gebruik text-shadow of semi-transparante pill)
- [ ] Consistentie met andere animaties in dezelfde video? (zelfde easing-familie, zelfde font-weight, zelfde marge-systeem)
- [ ] Is er een Lottie-animatie beschikbaar die dit beter doet dan custom code? (check `remotion/src/lottie/`)

Als een van deze checks faalt: fix het eerst, toon dan pas de still.

---

## Pipeline (7 stappen)

### Stap 1 — Lees feedback_log + brand.json + KLANT.md
```
KLANTEN/<klant>/02_feedback/feedback_log.md  ← lees volledig
KLANTEN/<klant>/01_brand/brand.json          ← kleuren, fonts, fixed_outro
KLANTEN/<klant>/KLANT.md                     ← afspraken, tone of voice, do's & don'ts
KLANTEN/<klant>/01_brand/brandguide/         ← brand guide-PDF's (lees bij twijfel)
```
Als klant onbekend: **auto brand-scrape** (zie hieronder).

### Stap 2 — Transcribeer + analyseer frames

Kies de route op basis van de input:

**A) MP4 (video)** — volledige analyse:
Paden relatief aan de videomap (`KLANTEN/<klant>/04_videos/<video>/`):
- `ffmpeg -i 01_bron/input.mp4 -vn 02_analyse/audio.mp3`
- Whisper NL: `whisper 02_analyse/audio.mp3 --language nl --output_format json --output_dir 02_analyse/`
- Frames: `ffmpeg -i 01_bron/input.mp4 -vf "fps=0.5,scale=480:-1" 02_analyse/frames/frame_%04d.jpg -y`
- Read elk frame multimodaal: annoteer scene, spreker-positie, lege canvas-zones, on-screen tekst

**B) MP3 (alleen audio)** — transcribeer met Whisper (zoals boven), maar er is GEEN
frame-analyse. Je kent de spreker-positie/lege zones niet → ontwerp animaties die
plaatsings-flexibel zijn (of full-screen), en zet in de concept-goedkeuring expliciet
"plek nog te bevestigen tegen de video".

**C) Tekst (geplakt script, geen media)** — sla transcriptie én frame-analyse over:
- Behandel de aangeleverde tekst als het "transcript" voor de patroondetectie.
- Geen timings uit audio → schat duur per beat op leestempo (~2,5 woorden/sec) × 1.3,
  of vraag Amix om de gewenste duur per animatie.
- Geen framing bekend → zelfde regel als B: plaatsing later bevestigen, of standalone/
  full-screen ontwerpen. Vermeld dit in de concept-goedkeuring.

### Stap 3 — Auto-patroondetectie + concept-brainstorm
1. Run de patroondetectie op het transcript (zie tabel hierboven)
2. Brainstorm 6-8 mogelijke momenten — CREATIEF, niet beperkt tot library
3. Filter naar TOP 3-4 (korte video) of 5-8 (lange video >45s) die het verhaal het meest versterken
4. Check: is er een Lottie-animatie in `src/lottie/` die dit concept beter doet dan custom code?
5. Overweeg Graphic Insert Screens voor conceptuele momenten (metaforen, vergelijkingen, probleemframe)

### Stap 4 — Concept-goedkeuring

Presenteer in dit format:

```
🎬 ANIMATIE CONCEPT — [video naam] · [klant]

1. [00:04.2 → 00:06.8] COUNTER
   Spoken: "we krijgen zo'n 700 supportaanvragen per week"
   Concept: 0 → 700 telt op met outExpo easing, "SUPPORTAANVRAGEN" bold eronder
   Duur: 4.0s (spoken 2.6s × 1.3 + introtijd)
   Plek: Midden canvas, spreker links → rechterhelft vrij (frame 0:04)
   Render: Remotion custom | Lottie: geen
   Asset: geen

2. [00:12.5 → 00:14.8] STAP-SEQUENCE (3 stappen)
   Spoken: "in drie stappen..."
   Concept: Stap 1 → 2 → 3 poppen in met 8-frame stagger, elk met icoon + label
   Duur: 5.0s
   Plek: Onderste 40%, spreker midden-boven
   Render: Remotion custom
   Asset: geen

Akkoord? Per nummer: ✅ / ✏️ aanpassen / ❌ skippen
```

**WACHT op goedkeuring voor je begint.**

### Stap 5 — Bouw + render STILL (v1)

Voor elke goedgekeurde animatie:
- Gebruik **premium easing** uit `src/lib/easing.ts` — NIET raw spring()
- Lottie-variant: laad JSON uit `src/lottie/`, brandeer met `brandLottie()` uit `src/lib/LottieComp.tsx`
- Render still op frame waar animatie "af" is (niet halverwege de counter)
- Sla op als `[naam]_v1.png` in `KLANTEN/<klant>/04_videos/<video>/03_stills/`. **NOOIT naar Desktop**

```bash
node render.mjs --entry src/index.<klant>.ts --comp [CompositionId] \
  --still [frame-waar-animatie-af-is] --out "<ROOT>/KLANTEN/<klant>/04_videos/<video>/03_stills/[naam]_v1.png"
```

**Beoordeelbaar maken (bij een MP4):** een alpha-still op transparant is nauwelijks te
beoordelen. Leg 'm over het echte videoframe op de plek waar de animatie komt:
```bash
npm run preview -- 03_stills/[naam]_v1.png 01_bron/input.mp4 [timestamp]
# → 03_stills/[naam]_v1_preview.png
```
Toon de **preview** in chat (niet de kale transparante PNG). Open daarna één Verkenner-venster
op de stills-map (Windows: `explorer "<videomap>\03_stills"`, Mac: `open`) zodat Amix de bestanden direct heeft.
Wacht op goedkeuring.

### Stap 6 — Render MOV (v1)

Na goedkeuring van de still (zelfde runner, `--mov`), direct naar `04_animaties/` op de Drive:
```bash
node render.mjs --entry src/index.<klant>.ts --comp [CompositionId] \
  --mov --out "<ROOT>/KLANTEN/<klant>/04_videos/<video>/04_animaties/[naam]_v1.mov"
```

Naamgeving: `[klant]_[type]_v1.mov` — bv `flitsmeister_counter_v1.mov`

**Levering (verplicht, elke render-batch):**
1. Output ALLEEN in Drive: `KLANTEN/<klant>/04_videos/<video>/` (`03_stills/` + `04_animaties/`). NOOIT op het bureaublad; ruim eventuele Desktop-kopieën op.
2. **Check de batch:** `npm run check -- "<videomap>/04_animaties"`. Alles moet ✔ zijn vóór je oplevert.
3. **Lokale kopie voor Premiere + map openen:** `npm run lokaal -- "<videomap>"` (opent Verkenner op de lokale kopie). Staat Drive in spiegel-/offline-modus, open dan gewoon de map: `explorer "<videomap>\04_animaties"`.
   Eén keer per batch (niet per bestand).
4. Werk de animatielijst in `VIDEO.md` bij (status per animatie).

### Stap 7 — Sla feedback op na iteratie

Als Amix feedback geeft → DIRECT opslaan in `KLANTEN/<klant>/02_feedback/feedback_log.md`:

```markdown
## [datum] — [animatie-naam]

**Feedback:** [exacte woorden van Amix]
**Was:** [wat er stond]
**Werd:** [wat er van gemaakt is]
**Leer-regel:** [wat ik hieruit leer voor volgende keer]
```

Bij volgende run voor dezelfde klant: lees dit eerst.

---

## Auto brand-scraping — nieuwe klant

Als `KLANTEN/<klant>/` niet bestaat:

1. Vraag: "Wat is de website van [klant]?"
2. Scrape via Chrome MCP:
   ```js
   // Pak primaire kleuren uit CSS
   getComputedStyle(document.querySelector('button') || document.body)
   // + zoek logo img/svg
   document.querySelectorAll('img[src*="logo"], svg')
   ```
3. `npm run klant -- "<klant>" --website <url>`, vul `01_brand/brand.json` met gevonden kleuren + sla logo op in `01_brand/logo/`
4. Vraag Amix te bevestigen: "Ik heb deze kleuren gevonden: [lijst]. Klopt dit?"

---

## Lottie-integratie

### Wanneer Lottie gebruiken
Gebruik een Lottie-animatie als basis wanneer:
- Het concept een organische of complexe motion heeft (particle-effects, vloeiende curves, animated icons)
- De animatie in LottieFiles beschikbaar is als gratis download in passende stijl
- Custom bouwen in Remotion meer dan 45 minuten zou kosten voor hetzelfde resultaat

### Workflow Lottie
1. Download gratis Lottie JSON van lottiefiles.com (let op: alleen gratis/free licentie)
2. Sla op in `remotion/src/lottie/[naam].json`
3. Importeer in component:
   ```tsx
   import { LottieComp, brandLottie } from "../lib/LottieComp";
   import rawJson from "../lottie/counter.json";
   const branded = brandLottie(rawJson, { "#3D7BFF": brand.primary });
   // In JSX:
   <LottieComp animationData={branded} width={400} height={400} />
   ```
4. Wikkel in `AbsoluteFill` met `backgroundColor: "transparent"`
5. Lottie speelt automatisch synchroon met Remotion-frame

### Lottie library (bestaand)
Sla gedownloade JSONs op in `remotion/src/lottie/` en update dit overzicht:
```
(leeg — download on-demand per video)
```

---

## Premium motion — gebruik ALTIJD deze easing

Importeer uit `src/lib/easing.ts`:

```tsx
import { ease, eased, stagger } from "../lib/easing";

// Entry animatie (element komt in beeld)
const opacity = eased(frame, 0, 20, ease.outExpo);
const y = (1 - eased(frame, 0, 20, ease.outBack)) * 40; // slide omhoog

// Exit animatie (element verdwijnt)
const exitOp = 1 - eased(frame, totalFrames - 15, totalFrames - 1, ease.inExpo);

// Staggered elementen (bijv. 3 stappen één voor één)
const items = ["Stap 1", "Stap 2", "Stap 3"];
items.map((item, i) => {
  const p = eased(frame, stagger(i, 8, 10), stagger(i, 8, 10) + 20, ease.outBack);
  // ...
});
```

**Verboden:** `spring({ frame, fps })` als enige easing — geeft altijd hetzelfde standaard gevoel. Gebruik spring alleen als je expliciet een fysieke bounce wil.

---

## Versiesysteem

Elke iteratie krijgt een versienummer. **Nooit overschrijven.**

```
KLANTEN/flitsmeister/04_videos/2026-10-02_<video>/
  03_stills/flitsmeister_counter_v1.png        ← eerste still
  03_stills/flitsmeister_counter_v2.png        ← na feedback
  04_animaties/flitsmeister_counter_v1.mov     ← eerste MOV
  04_animaties/flitsmeister_counter_v2.mov     ← verbeterde MOV
```

Bij feedback van Amix:
1. Pas de component aan
2. Render new still als v2
3. Toon in chat
4. Na goedkeuring: render v2 MOV
5. Log de feedback in `feedback_log.md`

### Overschrijven mag alleen mét back-up — HARDE REGEL

Amix vraagt regelmatig expliciet om te overschrijven ("render hem als
`1_hook.mov` zodat hij overwrite"). Dat mag, **maar zet het bestaande bestand
eerst weg.** Media staat niet in git: overschrijf je zonder back-up, dan
is de vorige versie definitief weg en kun je een "draai het terug" alleen nog
oplossen als de oude code toevallig nog in de sessie staat.

Vóór élke `cp` over een bestaand bestand heen:

Back-ups gaan naar `_archief/` in de videomap zelf. `npm run prores` doet dit automatisch. Handmatig:

```bash
ARCH="KLANTEN/<klant>/04_videos/<video>/_archief"
mkdir -p "$ARCH"
[ -f "$DOEL" ] && cp "$DOEL" "$ARCH/$(basename "${DOEL%.*}")_$(date +%Y%m%d-%H%M%S).${DOEL##*.}"
cp "$NIEUW" "$DOEL"
```

Dat geldt ook voor SRT's, stills en brand-bestanden. Vermeld in je antwoord
waar de back-up staat, zodat terugdraaien één commando is.

---

## Referentie-analyses

Uitgewerkte breakdowns van voorbeeldvideo's staan in `REFERENCES/`:
- `187n_agency_demo.md` — brand-canvas met grid, DOF-diepte, idle-drift op alles, re-flow lijsten, swarm-morph (veel→één), cluster-rearrange per VO-frase, perspective-mapped tekst, speaker-PiP.
Raadpleeg deze bij concept-brainstorms; de technieken zijn klant-onafhankelijk toepasbaar.
Klant-specifieke referenties ("zo wil de klant het") staan in `KLANTEN/<klant>/03_referenties/`.

---

## Catalogus — animatie-types

### Tekst & typografie
- **TextReveal** — woord-voor-woord opbouw, staggered met outExpo
- **KineticType** — groot woord knalt in beeld, outBack easing, scale + opacity combo
- **Typewriter** — letter-voor-letter, outQuart per karakter
- **HeroStatement** — full-canvas statement, fade door spoken cadence
- **MixedKineticType** — 2 regels, 2 stijlen: regel 1 in licht/script (wit, 600w, italic of cursief), regel 2 in ultra-bold gekleurd (brand-kleur, 900w, grote caps). Ref: "Je geld / TERUG" op talking head. Direct op video, geen card/pill.

### Cijfers & data
- **Counter** — 0 → X met inOutCubic easing (niet lineair, niet spring)
- **PercentageCounter** — 0% → X%
- **StatCard** — cijfer + label + eyebrow, floating (geen card)
- **ProgressBar** — vult zich met outExpo
- **BarChart** — staven groeien op met stagger

### Steps & checklists ← nieuw focus-type
- **StepSequence** — N stappen poppen in met stagger (8 frames tussen elk). Getal + label + optioneel icoon
- **CheckmarkSeries** — N vinkjes verschijnen één voor één, groen, met schaal-pop
- **VersusCard** — twee opties naast elkaar, slide-in van links/rechts

### Graphic Insert Screens ← UGC-standaard (nieuw)
- **GraphicInsertScreen** — vervangt de video volledig: lichtgrijze (#EBEBEB) of witte achtergrond, gecentreerd illustratie-element + caption eronder. Gebruikt als metafoor, probleemframe of vergelijking. Component heeft GEEN transparante bg — volledige opaque compositie op eigen layer in Premiere.
- **IconGrid** — N×M grid van identieke iconen, pop-in met stagger. Optioneel: kleur-transitie (bv. rood → groen) om "voor vs na" te tonen. Grid van 24-32 kleine iconen geeft de meeste impact.
- **IconGridTransition** — IconGrid variant waarbij sommige iconen van kleur wisselen met outExpo timing + headline die erboven verschijnt. Referentie: YouTube-iconen die rood → groen kleuren.

### Mockups & devices
- **IPhoneMockup** — slide-in van rechts, screenshot erin
- **AppNotification** — push notification vanuit boven
- **AppCard** — floating rounded card (border-radius 24px) met app UI screenshot erin, subtle drop-shadow, slide-up animatie. Gebruik voor SaaS/app demos.
- **StackedCards** — 3 cards gefand/gestapeld, middelste prominent. Cards slidein van rechts met stagger 8 frames.

### Branding & CTA
- **URLPill** — URL in een blauwe/brand-gekleurde pill, slide-in
- **FollowCTA** — "volg ons" animatie met platform-icoon
- **LogoReveal** — logo scale-in met glow

### Waarschuwing & alert
- **VerbodStempel** — rood verbodsbord ploft in, trilling, fade
- **AlertBadge** — oranje/rood badge met uitroepteken
- **WarningStripe** — diagonale strepenpatroon + tekst

### Custom / dynamisch
Wat niet in de catalogus past: schrijf nieuwe component in `remotion/src/compositions/`. Na render: vraag Amix of het de library in mag.

---

## Render-commando

**Canonieke route = `remotion/render.mjs`** (generieke runner). Bundelt één keer per
entry, rendert stills (PNG-alpha) én alpha-MOV, gebruikt systeem-Chrome en de juiste
codec/pixelformat automatisch. Gebruik dit i.p.v. losse `npx remotion still/render`
commando's: die her-bundelen élke keer alle ~150 comps (traag vanaf de Drive-mount).

Windows (PowerShell). `$V` is de videomap, altijd een **absoluut** pad:

```powershell
cd "$env:ANIMATIES_ROOT\remotion"
$V = "$env:ANIMATIES_ROOT\KLANTEN\karpeto\04_videos\2026-10-02_<video>"

# STILL (frame waar de animatie "af" is)
node render.mjs --entry src/index.karpetoHuis.ts --comp kp-huis-hook `
  --still 66 --out "$V\03_stills\karpeto_hook_v1.png"

# MOV (alpha, ProRes 4444)
node render.mjs --entry src/index.karpetoHuis.ts --comp kp-huis-hook `
  --mov --out "$V\04_animaties\karpeto_hook_v1.mov"

# Meerdere jobs in één bundle → manifest (aanrader per video):
node render.mjs --manifest jobs.json
# jobs.json (absolute paden, in JSON backslashes verdubbelen of forward slashes gebruiken):
# { "entry": "src/index.<klant>.ts", "jobs": [
#   { "comp": "<id>", "still": 66, "out": "G:/Mijn Drive/.../KLANTEN/<klant>/04_videos/<video>/03_stills/<naam>_v1.png" },
#   { "comp": "<id>", "mov": true, "out": "G:/Mijn Drive/.../KLANTEN/<klant>/04_videos/<video>/04_animaties/<naam>_v1.mov" } ] }

# Daarna altijd:
cd $env:ANIMATIES_ROOT
npm run check -- "$V\04_animaties"
npm run lokaal -- "$V"
```

Mac: zelfde commando's, met `/` in paden en `\` als regel-vervolg i.p.v. `` ` ``.

Optioneel: `--props '{"from":0,"to":700}'` en `--chrome "C:\Program Files\Google\Chrome\Application\chrome.exe"`.
Voor topsnelheid: draai `render.mjs` vanaf een lokale kopie (`%TEMP%\<klant>-remotion`)
i.p.v. de Drive-mount. Zie "SNEL renderen" hieronder.

> Val alleen terug op directe `npx remotion still/render`-CLI als `render.mjs` niet
> bruikbaar is; forceer dan altijd `--browser-executable` (systeem-Chrome) en voor MOV
> `--codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --concurrency=1`.
> Remotion gebruikt zijn eigen meegeleverde ffmpeg met `prores_ks`, dus dat is Premiere-veilig.
> Twijfel je? `npm run check`.

### ⚡ SNEL renderen: NIET vanaf de Drive-mount bundelen

**Probleem:** `npx remotion render/still` bundelt élke keer het hele project (150+ comps)
vanaf de Google Drive-mount. Google Drive for desktop haalt node_modules-bestandjes
on-demand op, waardoor het bundelen minutenlang op I/O hangt. Dit is de bottleneck, niet het renderen zelf.

**Werkwijze (Windows):**

1. **Slanke render-entry** die ALLEEN de comps van deze klant/video registreert
   (`src/RootKlant.tsx` + `src/index.klant.ts` met `registerRoot`). Zie `RootKarpetoHuis.tsx`
   als voorbeeld. Veel kleinere webpack-graph.
2. **Draai vanaf lokale schijf, niet de Drive-mount.** Kopieer alleen wat nodig is naar
   `%TEMP%\<klant>-remotion\`:
   ```powershell
   $W = "$env:TEMP\<klant>-remotion"
   robocopy "$env:ANIMATIES_ROOT\remotion" $W package.json package-lock.json remotion.config.ts tsconfig.json render.mjs
   robocopy "$env:ANIMATIES_ROOT\remotion\src" "$W\src" /E
   robocopy "$env:ANIMATIES_ROOT\remotion\public\brands\<klant>" "$W\public\brands\<klant>" /E
   cd $W; npm ci --prefer-offline
   ```
   **`node_modules` NIET kopiëren**: `npm ci` lokaal is sneller dan Drive.
   (`scripts/setup_local.sh` is de Mac-versie hiervan; op Windows bovenstaande gebruiken.)
3. **Bundel één keer, render alle stills/MOVs in één node-proces** via `@remotion/bundler`
   (`bundle()`) + `@remotion/renderer` (`renderStill` / `renderMedia`). Zie
   `remotion/render_local.mjs` (stills) en `render_mov.mjs` (MOV) als template.
   Resultaat: bundle ~1s, elke still ~3s, elke MOV ~20-30s.
4. **Alpha-MOV via de renderer-API:** `renderMedia({ codec:"prores", proResProfile:"4444",
   pixelFormat:"yuva444p10le", imageFormat:"png", ... })`. `imageFormat:"png"` is VERPLICHT:
   zonder valt hij terug op jpeg en faalt de alpha-combinatie. (ffmpeg schrijft 12-bit
   `yuva444p12le`; dat heeft gewoon een alpha-channel, prima.)
5. `--out`-paden wijzen direct naar de Drive-videomap (absoluut!). Daarna `npm run check` +
   `npm run lokaal` (zie Levering-regels bij Stap 6) en sync gewijzigde componenten terug
   naar de Drive (bron van waarheid).

Voor snelle iteratie op stills kan ook `remotion studio` persistent draaien (bundelt één keer,
met hot-reload) i.p.v. per iteratie te herbundelen.

---

## Windows & Premiere Pro: MOV met alpha

**MOV is géén Mac-only formaat.** Het is een container; wat telt is de codec erin.
ProRes 4444 wordt sinds Premiere Pro 2018 (12.1) **native op Windows** gedecodeerd,
inclusief alpha-kanaal. QuickTime hoeft niet geïnstalleerd te zijn.

| Situatie | Oplossing |
|---|---|
| Normaal | ProRes 4444 MOV (`prores_ks`) → gewoon importeren in Premiere. Transparantie werkt direct. |
| Verkenner toont geen thumbnail / Windows-speler speelt hem niet | Normaal. Windows heeft geen ProRes-codec; Premiere wel. Geen probleem. |
| Achtergrond zwart i.p.v. transparant in Premiere | Rechtsklik clip → *Modify → Interpret Footage* → *Alpha Channel*: "Ignore Alpha" uit. Of `npm run check`: mist het alpha-kanaal, dan is de render fout. |
| "Error retrieving frame N" | 1) `npm run check -- <file>`: encoder videotoolbox? → `npm run prores -- <file>`. 2) Importeer vanaf de lokale kopie (`npm run lokaal`) of zet Drive op *spiegelen/offline*. |
| Oude Premiere (< 12.1) of andere NLE die echt geen ProRes leest | `npm run png -- <file.mov>` → PNG-sequence met alpha. Premiere: *Import* → eerste PNG → vink *Image Sequence* aan. |

**Bewust NIET gebruiken:**
- `qtrle` (QuickTime Animation): Premiere toont strepen/ruis (afgekeurd 08-08-2026).
- `prores_videotoolbox`: frame-retrieval-errors in Premiere (18-08-2026).
- CineForm via ffmpeg: de ffmpeg-encoder eist een breedte die deelbaar is door 16, en 1080 is dat niet.
- WebM/VP9 met alpha: Premiere leest de alpha niet betrouwbaar.

**Vereist op de Windows-machine:** Node 18+ en ffmpeg op PATH (`winget install Gyan.FFmpeg`,
daarna nieuwe terminal). Zet eenmalig de root als omgevingsvariabele:
```powershell
setx ANIMATIES_ROOT "G:\Mijn Drive\Amix Claude Code\Skills\animaties"
```

---

## Base path

De root is de map waarin deze `SKILL.md` staat (`$env:ANIMATIES_ROOT`):

```
Windows:  G:\Mijn Drive\Amix Claude Code\Skills\animaties\        (driveletter kan per pc verschillen)
Mac:      /Users/amix/Library/CloudStorage/GoogleDrive-amixyt.contact@gmail.com/Mijn Drive/Amix Claude Code/Skills/animaties/
```

Gebruik altijd dit pad als root. Alle relatieve paden in dit bestand zijn relatief aan deze root.
De `npm run`-scripts vinden de root zelf; die werken vanaf elke pc zonder aanpassing.

## Mappenstructuur

```
animaties/
├── SKILL.md                         ← deze file
├── README.md                        ← snelstart + alle commando's
├── package.json                     ← npm run klant / video / structuur / check / prores / png / preview / lokaal / migreer
├── scripts/                         ← tooling (Node, werkt op Windows + Mac)
├── REFERENCES/                      ← klant-onafhankelijke stijl-analyses
├── LOTTIE_LIBRARY/                  ← herbruikbare Lottie JSON's
├── remotion/                        ← Remotion-project (zie hieronder)
└── KLANTEN/
    ├── _TEMPLATE/                   ← sjabloon, NIET handmatig kopiëren, gebruik npm run klant
    └── <klant>/
        ├── KLANT.md                 ← contact, afspraken, tone of voice, do's & don'ts
        ├── 00_admin/                ← briefings, offertes, contracten, planning (niet in git)
        ├── 01_brand/
        │   ├── brand.json           ← kleuren, fonts, logo-paden, formaat, fixed_outro, oplevering
        │   ├── brandguide/          ← brand guide-PDF's, huisstijlhandboek
        │   ├── logo/                ← SVG/PNG, licht/donker/wit
        │   ├── fonts/               ← .otf/.ttf/.woff2 + licentie
        │   ├── iconen/              ← officiële merk-iconen
        │   ├── beeldmateriaal/      ← productfoto's, screenshots
        │   ├── lottie/              ← klant-specifieke Lottie's
        │   └── premiere/            ← vaste intro/outro, .mogrt-templates, LUT's, export-presets
        ├── 02_feedback/
        │   └── feedback_log.md      ← LEES VÓÓR ELKE RUN
        ├── 03_referenties/          ← voorbeeldvideo's die de klant goed vindt
        └── 04_videos/
            └── <JJJJ-MM-DD>_<video>/
                ├── VIDEO.md         ← status + goedgekeurd concept + animatielijst
                ├── video.json       ← formaat (breedte, hoogte, fps) + bron: hier rendert alles op
                ├── 01_bron/         ← aangeleverde MP4/MP3/script (nooit wijzigen)
                ├── 02_analyse/      ← transcript.json, frames/, concept-notities
                ├── 03_stills/       ← <naam>_v1.png + <naam>_v1_preview.png
                ├── 04_animaties/    ← ProRes 4444 MOV's met alpha → Premiere
                ├── 05_premiere/     ← .prproj van deze video
                ├── 06_export/       ← eindvideo uit Premiere
                ├── _archief/        ← back-ups vóór overschrijven
                └── _code/           ← broncode van de animaties van deze video (in git)
```

**Remotion-assets:** Remotion leest assets uit `remotion/public/brands/<klant>/`. Bron van
waarheid blijft `KLANTEN/<klant>/01_brand/`; kopieer wat een comp nodig heeft naar `public/`.

**Oude structuur** (`BRANDS/`, `IN/`, `OUT/`, `ARCHIVE/`): eenmalig omzetten met
`npm run migreer` (droge run) en daarna `npm run migreer -- --uitvoeren`. Kopieert alleen;
oude mappen pas weggooien na controle.

---

## Wat NIET te doen

- ❌ Geen SFX — Amix doet dit zelf in Premiere
- ❌ Geen raw `spring()` als enige easing
- ❌ Geen render zonder still-goedkeuring
- ❌ Geen animaties zonder eyebrow/context bij stats/cijfers
- ❌ Geen kleuren buiten `brand.json`
- ❌ Nooit een versie overschrijven
- ❌ Geen MP4-output (altijd MOV met alpha)
- ❌ Geen bestanden buiten `KLANTEN/<klant>/04_videos/<video>/` (niet op Desktop, niet in tmp, niet in losse `OUT/`-mappen)
- ❌ Geen MOV opleveren zonder groene `npm run check` (controleert tegen het formaat in `video.json`)
- ❌ Niet meer dan 4 animaties per video
- ❌ Feedback niet loggen is niet toegestaan — elke iteratie → feedback_log.md
