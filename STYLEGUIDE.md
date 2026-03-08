# Timotion Studio — Style Guide

## Brand Overview

Timotion Studio is a cinematic photo & video production company. The visual identity is bold, editorial, and dark — built around a deep midnight navy, a signature pink for display type, and gold accents that evoke warmth and prestige.

---

## Colors

| Role            | Name          | Hex       | Usage |
|-----------------|---------------|-----------|-------|
| Background      | Midnight Navy | `#000021` | Page background, nav on scroll, footer |
| Surface         | Deep Navy     | `#00002e` | Section alternate bg, cards, form inputs |
| Surface Lift    | Navy Lift     | `#0a0a40` | Gradient starts, thumbnail placeholders |
| Title           | Rose Pink     | `#ff7bac` | All h1/h2/h3 headings (Playfair Display) |
| Subheading Text | White         | `#ffffff`  | h3, card titles, blockquotes, nav links |
| Body Text       | Muted White   | `#c8c8d8`  | Paragraphs, descriptions, body copy |
| Muted Text      | Dim White     | `#c8c8d8` at 60–80% opacity | Captions, meta, placeholders |
| Accent          | Gold          | `#d4a853` | Category tags, CTAs, quote marks, highlights |
| Accent Hover    | Deep Gold     | `#c49843` | Hover state for gold buttons |

---

## Typography

### Display / Headings
- **Font:** Playfair Display
- **Weight:** Bold (700)
- **Color:** `#ff7bac`
- **Usage:** h1, h2, h3, logo wordmark, blockquotes
- **Style:** Italic variant used for quotes and subheadings

### Body
- **Font:** Poppins
- **Weight:** Regular (400) — Light (300) for captions
- **Color:** `#f0f0f0`
- **Usage:** All body copy, nav links, form fields, descriptions

### Labels / Eyebrows
- **Font:** Poppins
- **Weight:** Regular (400)
- **Size:** 10px
- **Style:** All-caps, letter-spacing: `tracking-widest` (0.1em+)
- **Color:** `#f0f0f0` at 60% opacity
- **Usage:** Section pre-titles ("Our Work", "Testimonials")

### Category Tags
- **Font:** Poppins
- **Weight:** Regular (400)
- **Size:** 10px
- **Style:** All-caps, tracking-widest
- **Color:** `#d4a853` (Gold)
- **Usage:** Project card categories ("FASHION | FILM")

---

## Spacing

| Token        | Value    | Usage |
|--------------|----------|-------|
| Section py   | `py-24`  | Minimum vertical padding for all sections |
| Container    | `max-w-7xl` | Standard page-width container |
| Card gap     | `gap-6`  | Project grid gutters |
| Section gap  | `gap-8`  | Testimonials, service grids |

---

## Buttons

### Outlined (Primary CTA)
- Border: `1px solid #f0f0f0` at 60% opacity
- Text: `#f0f0f0`
- Hover: `bg-[#f0f0f0]`, `text-[#000021]`
- Padding: `px-10 py-4`
- Font: Poppins 400, 10px, all-caps, tracking `0.3em`

### Filled (Secondary CTA / Submit)
- Background: `#d4a853`
- Text: `#000021`
- Hover: `bg-[#c49843]`
- Font: Poppins 600, 10px, all-caps, tracking `0.3em`

---

## Components

### Project Card
- Background: `#00002e`
- Thumbnail: `aspect-video`, gradient `from-[#0a0a40] to-[#000021]`
- On hover: `scale-[1.02]`, play icon fades in
- Category tag: Gold (`#d4a853`), 10px all-caps
- Title: Rose Pink (`#ff7bac`), Playfair Display, 20px, capitalize
- Always: `cursor-pointer`

### Service Card
- Background: `#00002e`
- Decorative number: Rose Pink at 15% opacity, Playfair Display, 48px
- Title: Rose Pink, Playfair Display, 20px
- Description: Off-white at 55% opacity, Poppins 14px

### Testimonial Card
- Background: `#00002e`
- Border: `1px solid rgba(240,240,240,0.05)`
- Quote icon: Rose Pink at 40% opacity
- Quote text: Off-white, Playfair Display italic
- Client name: Gold, 10px all-caps
- Role: Off-white at 35% opacity, 10px all-caps

### Form Inputs
- Background: `#00002e`
- Border: `rgba(240,240,240,0.10)` — Focus: `#ff7bac`
- Text: `#f0f0f0`
- Placeholder: `#f0f0f0` at 25% opacity

---

## Interactions

| Element          | Transition                        |
|------------------|-----------------------------------|
| Nav links        | `hover:text-[#ff7bac]` 300ms      |
| Logo             | `hover:text-[#d4a853]` 300ms      |
| Project cards    | `scale-[1.02]` 500ms              |
| Play icon        | `opacity-0 → opacity-100` 300ms   |
| Buttons          | Color/bg transition 300ms         |
| Form borders     | `border-color` transition 300ms   |
| Social links     | `hover:text-[#ff7bac]` 300ms      |
| Nav background   | Transparent → `#000021` 500ms on scroll |

---

## Fonts (Google Fonts Import)

```css
/* Loaded via next/font/google in layout.tsx */
Playfair Display: weights 400, 600, 700, 900 (normal + italic)
Poppins: weights 300, 400, 500, 600
```

CSS Variables:
```css
--font-playfair  /* injected by next/font on <html> */
--font-poppins   /* injected by next/font on <html> */
```

Tailwind usage:
```html
font-[family-name:var(--font-playfair)]   /* display/headings */
font-[family-name:var(--font-poppins)]    /* body (default) */
```

---

## Section Structure

| Section      | Bg                | Alt Bg     |
|--------------|-------------------|------------|
| Hero         | gradient `#000021 → #000040` | — |
| Projects     | `#000021`         | Cards: `#00002e` |
| Services     | `#00002e`         | Cards: `#00002e` |
| Testimonials | `#000021`         | Cards: `#00002e` |
| About        | `#00002e`         | — |
| Contact      | `#000021`         | Inputs: `#00002e` |
| Footer       | `#000021`         | — |
