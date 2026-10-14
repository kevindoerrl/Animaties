# Stop-kruis · "de video stopt"

Herbruikbare overlay: het beeld dimt licht naar grijs en een rood kwastkruis tekent zich in twee
streken (droge-kwasttextuur, rode gloed). De video blijft erachter zichtbaar. Niet gebonden aan één video.

| | |
|---|---|
| Duur | 2,0 s: dim 0–0,25 s · streek 1 0,05–0,22 s · streek 2 0,20–0,37 s · daarna blijft het kruis staan |
| Formaten | 16:9 (1920×1080) en 9:16 (1080×1920), elk formaat via `?w=&h=` |
| Geleverd | `animaties/stop_kruis_16x9_60fps_v1.mov` (1920×1080, 60fps, ProRes 4444 q8, 84 MB) |
| Gebruik | Leg de MOV op het moment dat de video "stopt". Langer nodig? Verleng in Premiere het laatste frame (*Frame Hold*). |

## Opnieuw renderen
```powershell
cd BIBLIOTHEEK\stop_kruis\_code
npm i playwright; npx playwright install chromium        # eenmalig
node render.mjs frames 1920x1080 60 $env:TEMP\stop_16x9
cd ..\..\..
npm run prores -- "$env:TEMP\stop_16x9" --fps 60 --out "BIBLIOTHEEK\stop_kruis\animaties\stop_kruis_16x9_v1.mov"
```

Let op: de dim is bewust egaal (geen verloop). Chromium dithert verlopen, waardoor het alfakanaal van
de MOV korrelig wordt en het bestand 150 MB in plaats van 84 MB werd. ProRes q8 i.p.v. q4: geen zichtbaar verschil op kruis en waas.
