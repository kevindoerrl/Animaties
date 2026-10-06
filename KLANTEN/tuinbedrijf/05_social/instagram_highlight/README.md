# Instagram highlight: diensten tuinbedrijf

Klaar om te uploaden staat in `export/`:

| Map | Wat | Formaat |
|---|---|---|
| `export/stories/` | 8 story-slides (intro, 5 diensten, werkwijze, contact) | 1080×1920 |
| `export/covers/` | 8 highlight-covers (één per highlight) | 1080×1080 |

## Plaatsen op Instagram
1. Plaats de stories in volgorde (`00` t/m `07`) als story.
2. Profiel → **+** (Nieuw) → Highlight → selecteer de stories → kies **Cover bewerken** → upload de cover uit `export/covers/`.
3. Één highlight "Diensten" met alles erin (cover `cover_00_diensten.png`), of per dienst een eigen highlight met de bijbehorende cover.

## Aanpassen
Alle teksten, de bedrijfsnaam, het Instagram-account en eventuele foto's staan bovenin het `CONFIG`-blok van `highlight.html`.
- **Bedrijfsnaam / @-naam:** `bedrijfsnaam`, `instagram`
- **Echte foto's per dienst:** zet een foto in deze map en vul `foto: "foto/aanleg.jpg"` in. Dan vervangt de foto het groene illustratievlak.
- **Kleuren:** de `:root`-variabelen bovenaan de `<style>`.

Opnieuw exporteren: `node KLANTEN/tuinbedrijf/05_social/instagram_highlight/render.mjs` (vereist Playwright).
