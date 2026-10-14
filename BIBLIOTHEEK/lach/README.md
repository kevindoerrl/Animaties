# Lach · "hij lacht"

Herbruikbare overlay voor het moment dat iemand lacht (tegenhanger van `stop_kruis`). Niet gebonden aan één video.
Transparant, 2,2 s: in 0–0,3 s · lachen/schudden · uit 1,85–2,2 s.

| Stijl | Wat |
|---|---|
| A | Comic "HAHA": letters knallen erin en schudden, gele stralenkrans erachter |
| B | 😂-explosie: grote 😂 in het midden + regen van 😂 alle kanten op |
| C | Combinatie: grote 😂 + "HAHA" eronder + stralen + kleine 😂-regen |

Emoji's: Noto Color Emoji (Google, open licentie). Formaat via `?w=&h=` (16:9 en 9:16).

## Opnieuw renderen
```powershell
cd BIBLIOTHEEK\lach\_code
npm i playwright; npx playwright install chromium        # eenmalig (Noto Color Emoji moet geïnstalleerd zijn)
node render.mjs frames 1920x1080 60 $env:TEMP\lach_A A
cd ..\..\..
npm run prores -- "$env:TEMP\lach_A" --fps 60 --out "BIBLIOTHEEK\lach\animaties\lach_A_16x9_60fps_v1.mov"
```
