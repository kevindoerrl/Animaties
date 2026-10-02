# Animatiecode · Jan Thiel Beach

Compositie voor de locatie-animaties van deze video. Gekozen: **stijl A (kaart + pin)**.

| Bestand | Wat |
|---|---|
| `comp.html` | De animatie zelf: stijl A (kaart), B (titel), C (stempel). Tijdlijn in `render(stijl, t)`, duur `D = 3.0`s |
| `render.mjs` | Rendert een still of alle frames als PNG met alpha (Playwright/Chromium) |
| `curacao.json` | Echte omtrek van Curaçao (Natural Earth 10m) |
| `fonts/` | Anton, Caveat Brush, Inter (Google Fonts, OFL-licentie) |

## Opnieuw renderen (Windows, PowerShell)

```powershell
cd "$env:ANIMATIES_ROOT\KLANTEN\vlog\04_videos\2026-10-02_jan-thiel-beach\_code"
npm i playwright; npx playwright install chromium     # eenmalig

# Still om te beoordelen (A op 1,6s)
node render.mjs still A 1.6 ..\03_stills\vlog_locatie_kaart_v2.png

# Alle frames → ProRes 4444 MOV met alpha (fps uit video.json: 60)
node render.mjs frames A 60 $env:TEMP\kaart_frames
cd $env:ANIMATIES_ROOT
npm run prores -- "$env:TEMP\kaart_frames" --out "KLANTEN\vlog\04_videos\2026-10-02_jan-thiel-beach\04_animaties\vlog_locatie_kaart_v2.mov"
npm run check -- "KLANTEN\vlog\04_videos\2026-10-02_jan-thiel-beach\04_animaties"
```

Versie ophogen (v2, v3, …), nooit overschrijven.
