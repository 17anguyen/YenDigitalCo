# Yên Digital Company — Website

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

## Getting started in VS Code

1. Open the `yen-digital/` folder in VS Code
2. Install the **Live Server** extension (ritwickdey.LiveServer)
3. Right-click `index.html` → **Open with Live Server**
4. The site opens at `http://127.0.0.1:5500`

> **Note:** The Google Fonts link requires an internet connection. For offline dev, download the fonts and place them in `assets/fonts/`.

---

## Brand tokens (app/globals.css)

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

---

## Adding your real media

### Photos
Replace gradient placeholder divs in `js/pages.js` with:
```html
<img src="assets/images/photo-01.jpg" style="width:100%;height:100%;object-fit:cover">
```

### Video thumbnails
Same pattern — swap the gradient `<div>` for a `<img>` of your thumbnail.
Add `onclick="openVideo('YOUR_YOUTUBE_OR_VIMEO_URL')"` to each `.gi` card for a lightbox.

### About photo
In `homePage()` inside `pages.js`, find `.about-visual` and add:
```html
<img src="assets/images/about.jpg" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;">
```

### Case study logos
Find `.cs-logo-box` elements and replace initials with:
```html
<img src="assets/images/logo-clientname.png" style="width:32px;height:32px;object-fit:contain;filter:brightness(0) invert(0.7);">
```

---

## Adding / editing pages

All page content lives in `js/pages.js` as functions:
- `homePage()`
- `videoPage()`
- `photosPage()`
- `retainersPage()`
- `contactPage()`

To add a new page:
1. Add a function `myPage()` to `pages.js`
2. Add it to the `pages` object in `app.js`: `mypage: myPage`
3. Add a nav link in `index.html`: `<li><a onclick="go('mypage')" id="nav-mypage">My Page</a></li>`

---

## Wiring up the contact form

The form in `contactPage()` currently has no action. Options:

- **Formspree** (free): `<form action="https://formspree.io/f/YOUR_ID" method="POST">`
- **Netlify Forms**: add `netlify` attribute if deploying to Netlify
- **EmailJS**: call their SDK on form submit

---

## Deployment

Works as a plain static site — no build step needed.

- **Netlify**: drag the `yen-digital/` folder onto netlify.com/drop
- **Vercel**: `vercel deploy` from the project folder
- **GitHub Pages**: push to a repo, enable Pages on the `main` branch

---

## TODO checklist

- [ ] Replace all gradient placeholder cards with real photos / video thumbnails
- [ ] Add real client logos to case study cards
- [ ] Fill in contact details (email, phone) in `contactPage()`
- [ ] Wire up contact form (Formspree / Netlify)
- [ ] Add video lightbox for gallery click events
- [ ] Update "Seattle, WA" location if needed
- [ ] Add favicon (`<link rel="icon" href="assets/images/favicon.ico">`)
- [ ] Update © year in footer
