# Stop-kruis · "de video stopt"

Herbruikbare overlay: het beeld dimt licht naar grijs en een rood kwastkruis tekent zich in twee
streken (droge-kwasttextuur, rode gloed). De video blijft erachter zichtbaar. Niet gebonden aan één video.

| | |
|---|---|
| Duur | 2,0 s: dim 0–0,25 s · streek 1 0,05–0,22 s · streek 2 0,20–0,37 s · daarna blijft het kruis staan |
| Formaten | 16:9 (1920×1080) en 9:16 (1080×1920), elk formaat via `?w=&h=` |
| Gebruik | Leg de MOV op het moment dat de video "stopt". Langer nodig? Verleng in Premiere het laatste frame (*Frame Hold*). |

## Opnieuw renderen
```powershell
cd BIBLIOTHEEK\stop_kruis\_code
npm i playwright; npx playwright install chromium        # eenmalig
node render.mjs frames 1920x1080 60 $env:TEMP\stop_16x9
cd ..\..\..
npm run prores -- "$env:TEMP\stop_16x9" --fps 60 --out "BIBLIOTHEEK\stop_kruis\animaties\stop_kruis_16x9_v1.mov"
```
