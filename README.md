# Yên Digital Company — Website
YenDigital.co

## Project structure

```
yen-digital/
├── index.html          ← Entry point. Open this in VS Code / browser.
├── css/
│   └── styles.css      ← All styles. Brand tokens at the top as CSS vars.
├── js/
│   ├── pages.js        ← All page HTML templates (home, video, photos, retainers, contact)
│   ├── app.js          ← Router, cursor glow, filter logic
│   └── intro.js        ← Water ripple canvas animation
└── assets/
    ├── images/         ← Drop your photos + video thumbnails here
    └── fonts/          ← Optional local font files
```

```css
:root {
  --dk: #545b43;   /* Olive Grove — nav, body background    */
  --di: #0E1B2A;   /* Deep Ink    — hero orb accent         */
  --mg: #EEF2F4;   /* Mist Gray   — body text               */
  --jq: #A8C3A0;   /* Jade Quiet  — primary accent, nav     */
  --ws: #faf5ed;   /* Warm Sand   — card borders            */
  --pc: #FFBA89;   /* Peach       — hover accent, eyebrow   */
  --hf: 'Cormorant Garamond', serif;   /* headings          */
  --bf: 'Inter', sans-serif;           /* body / UI         */
}
```

### Colour usage guide

| Token | Colour | Used for |
|---|---|---|
| `--dk` | Olive Grove `#545b43` | Nav background, body background |
| `--di` | Deep Ink `#0E1B2A` | Hero orb accent |
| `--mg` | Mist Gray `#EEF2F4` | Body text, headings |
| `--jq` | Jade Quiet `#A8C3A0` | Primary accent — nav hover, logo, buttons |
| `--ws` | Warm Sand `#faf5ed` | Card borders |
| `--pc` | Peach `#FFBA89` | Hover accent — eyebrow labels, hero italic, retainer buttons, form submit |
