# Instagram highlight: KT Buitenwerk

Klaar om te uploaden staat in `export/`:

| Map | Wat | Formaat |
|---|---|---|
| `export/stories/` | 10 story-slides: wie zijn wij, diensten, tuinonderhoud, snoeiwerk, opknappen, klussen, voor & na, werkwijze, belofte, contact | 1080×1920 |
| `export/covers/` | 9 highlight-covers | 1080×1080 |

## Plaatsen op Instagram
1. Plaats de stories in volgorde (`00` t/m `09`) als story.
2. Profiel → **+** (Nieuw) → Highlight → selecteer de stories → **Cover bewerken** → upload een cover uit `export/covers/`.
3. Eén highlight "Diensten" met alles erin (cover `cover_01_diensten.png` of `cover_00_over-ons.png`), of meerdere highlights met elk hun eigen cover.

## Aanpassen
Alle teksten staan bovenin het `CONFIG`-blok van `highlight.html`.
- **Naam / socials:** `merk`, `instagram`, `tiktok`
- **Foto:** `over.foto` (staat in `foto/`), uitsnede via `over.fotoPositie`
- **Kleuren:** de `:root`-variabelen bovenaan de `<style>`

Opnieuw exporteren: `node KLANTEN/kt-buitenwerk/05_social/instagram_highlight/render.mjs` (vereist Playwright).
