# Timotion Studio — Design Styleguide
> Derived from visual analysis of timotion.studio · March 2025

---

## 1. Brand Identity

| Property | Value |
|----------|-------|
| Studio Name | **TIMOTION STUDIO** |
| Tagline | *emotion \| magic \| art* |
| Industry | Cinematic Photography & Film Production |
| Tone | Cinematic · Premium · Human · Bold |
| Contact | hello@timotion.studio |
| Vimeo | vimeo.com/timotionstudio |
| Instagram | instagram.com/timotion.studio |

---

## 2. Color Palette

### Primary Colors

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | **Deep Navy Black** | `#0B0C1A` | Page background, all sections |
| Primary Text | **Off White** | `#F0F0F0` | Body copy, nav links |
| Accent / Highlight | **Hot Magenta** | `#FF3D8A` | Hero headline, project titles, CTAs |
| Tag / Category | **Cyan Teal** | `#00E5D4` | Project category labels (e.g. "FASHION \| FILM") |
| Contact Accent | **Electric Cyan** | `#00FFEE` | Email address in contact section |

### Secondary Colors

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| CTA Button | **Coral Pink** | `#FF6B6B` | "CONTACT" nav button background |
| Overlay Dark | **Semi-black** | `rgba(11, 12, 26, 0.75)` | Hero image overlay |
| Card Background | **Dark Navy** | `#12132A` | Project cards, testimonial cards |
| Divider | **Muted Navy** | `#1E1F38` | Section borders, subtle separators |

### Color Usage Rules
- **Never** use white backgrounds — the entire site lives in dark tones
- Magenta (`#FF3D8A`) is reserved for editorial impact: headlines and project titles only
- Cyan (`#00E5D4`) is used exclusively for category/type labels
- Body text stays `#F0F0F0` — pure white (`#FFFFFF`) is too harsh against the dark bg

---

## 3. Typography

### Font Stack

| Role | Font | Style | Source |
|------|------|-------|--------|
| Logo / Brand | Display serif or custom logotype | Bold, tracked | Custom / Canela / Editorial New |
| Headlines | **Display Serif** (e.g. Canela, PP Editorial New, or Playfair Display) | Regular / Light italic | Google Fonts or Type foundry |
| Body / UI | **Inter** or **DM Sans** | Regular 400, Medium 500 | Google Fonts |
| Category Tags | **Inter** | Bold 700, ALL CAPS, wide tracking | Google Fonts |

> **Recommended Google Fonts pairing:**
> ```
> @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;700&display=swap');
> ```

### Type Scale

| Element | Size | Weight | Transform | Color | Tracking |
|---------|------|--------|-----------|-------|---------|
| Hero Headline (H1) | `clamp(2.5rem, 6vw, 5rem)` | 400–700 | lowercase | `#FF3D8A` | Normal |
| Section Headline (H2) | `clamp(2rem, 4vw, 3.5rem)` | 400 | lowercase | `#FF3D8A` | Normal |
| Card Title (H3) | `1.5rem – 2rem` | 400 | lowercase | `#FF3D8A` | Normal |
| Category Tag | `0.65rem` | 700 | UPPERCASE | `#00E5D4` | `0.15em` |
| Nav Links | `0.75rem` | 500 | UPPERCASE | `#F0F0F0` | `0.1em` |
| Body Copy | `0.9rem – 1rem` | 400 | none | `#F0F0F0` | Normal |
| Tagline (`emotion \| magic \| art`) | `clamp(1.5rem, 3vw, 2.5rem)` | 400 | lowercase | `#F0F0F0` | `0.05em` |
| Email / CTA Text | `1.5rem – 2.5rem` | 400 | lowercase | `#00FFEE` | Normal |

### Typography Rules
- Headlines are **always lowercase** — this is a key brand signature
- Body copy is sentence case, conversational
- Category tags are the **only** all-caps elements
- Never use bold for headlines — the display serif does the work at weight 400

---

## 4. Layout & Spacing

### Grid System
- **Max content width:** `1280px`
- **Page padding (mobile):** `24px`
- **Page padding (desktop):** `80px – 120px`
- **Section vertical padding:** `min 96px (py-24)`, often `128px–160px`
- **Column gap (project grid):** `16px – 24px`

### Section Structure

```
┌────────────────────────────────────────┐
│  NAV (transparent → solid on scroll)  │
├────────────────────────────────────────┤
│  HERO (100vh, split: image + text)     │
├────────────────────────────────────────┤
│  PROJECTS (2-col asymmetric grid)      │
├────────────────────────────────────────┤
│  SERVICES (toggle: Photo / Video)      │
├────────────────────────────────────────┤
│  TESTIMONIALS (2-col quote cards)      │
├────────────────────────────────────────┤
│  CONTACT (centered, full-width dark)   │
├────────────────────────────────────────┤
│  FOOTER (logo + socials + copyright)   │
└────────────────────────────────────────┘
```

### Hero Layout
- **Left column (40%):** Full-height portrait/editorial image with dark overlay
- **Right column (60%):** Logo, headline, tagline, scroll prompt
- On mobile: Stack vertically, image becomes background with overlay

### Project Grid
- **Desktop:** 2 asymmetric columns — left column wider, projects staggered
- **Mobile:** Single column, full-width cards
- Card aspect ratio: `3:4` (portrait) for photography, `16:9` for video

---

## 5. Components

### Navigation

```
[TIMOTION STUDIO logo]          [PROJECTS]  [TESTIMONIALS]  [CONTACT ←button]
```

- **Default state:** `background: transparent`, `position: fixed`, `z-index: 100`
- **Scrolled state:** `background: #0B0C1A`, subtle `box-shadow`
- Logo: Left-aligned, logotype treatment
- Links: Uppercase, `0.75rem`, letter-spaced
- Contact link styled as a filled coral button: `bg: #FF6B6B`, `color: white`, `px: 16px`, `py: 8px`

### Project Cards

```
┌──────────────────────┐
│                      │
│   [IMAGE / VIDEO]    │  ← fills card, dark tint on hover
│                      │
│ [FASHION | FILM]     │  ← cyan tag, top-left overlay
│                      │
│ project title        │  ← magenta, bottom-left overlay
│                      │
└──────────────────────┘
```

- Background: `#12132A`
- Category tag: `color: #00E5D4`, `font-size: 0.65rem`, `letter-spacing: 0.15em`, `font-weight: 700`
- Project title: `color: #FF3D8A`, display serif, lowercase
- Hover: `scale(1.02)`, `transition: 200ms ease`
- On click: Opens Vimeo link in new tab

### Buttons

| Variant | Background | Text Color | Border | Use |
|---------|-----------|------------|--------|-----|
| Primary (filled) | `#FF6B6B` | `#FFFFFF` | none | Contact / CTA |
| Secondary (outlined) | `transparent` | `#F0F0F0` | `1px solid #F0F0F0` | View Work |
| Ghost | `transparent` | `#FF3D8A` | none | Inline links |

- Border radius: `2px – 4px` (nearly square, not pill-shaped)
- Padding: `12px 24px`
- Font: Inter, `0.75rem`, uppercase, letter-spaced

### Testimonial Cards

```
┌─────────────────────────────────────┐
│                                     │
│  "Quote text in italic display      │
│   serif font, 2-3 lines..."         │
│                                     │
│  → CLIENT NAME, ORGANIZATION        │
│                                     │
└─────────────────────────────────────┘
```

- Background: `#12132A`
- Quote: Playfair Display italic, `1rem – 1.1rem`, `#F0F0F0`
- Attribution: Inter, `0.7rem`, uppercase, `#F0F0F0`, `opacity: 0.7`
- Arrow prefix `→` before client name

### Services Toggle

- Two tab buttons: `Photography` | `Videography`
- Active tab: underline or bottom border in `#FF3D8A`
- Content: Large service name on left, description on right
- Subcategory links below: small, uppercase, cyan

---

## 6. Imagery & Visual Style

### Photography Style
- **Mood:** Moody, dramatic, high-contrast
- **Subjects:** Fashion models, wedding couples, event crowds, film stills
- **Editing:** Deep shadows, slightly desaturated midtones, sharp highlights
- **Avoid:** Bright lifestyle shots, pastel tones, overlit studio photography

### Video / Hero Background
- Looping cinematic reel (muted, autoplay)
- Subject: Editorial model / dancer movement
- Color grade: Blue-teal shadows, warm highlights

### Image Overlay
- Hero images: `rgba(11, 12, 26, 0.5)` dark overlay
- Card images: `rgba(11, 12, 26, 0.3)` on default, `rgba(11, 12, 26, 0.1)` on hover

---

## 7. Motion & Animation

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Page sections | Fade in + slide up on scroll | `600ms` | `ease-out` |
| Project cards | `scale(1.02)` on hover | `200ms` | `ease` |
| Nav background | Fade in on scroll | `300ms` | `ease` |
| Service tab switch | Opacity fade | `200ms` | `ease` |
| CTA buttons | Brightness/opacity shift | `150ms` | `ease` |

- Use `IntersectionObserver` for scroll-triggered animations
- Respect `prefers-reduced-motion` — disable animations if set
- No bouncy or elastic easing — keep everything smooth and cinematic

---

## 8. Copy & Voice

| Principle | Example |
|-----------|---------|
| Warm & confident | *"Having a great time while doing so"* |
| Benefit-led | *"We've got you"*, *"Day for the books"* |
| Poetic brevity | *"sun wine laughter"*, *"the gift"* |
| Lowercase brand voice | Headlines always lowercase |
| Direct CTAs | *"Get in touch"*, *"Let's chat"* |

---

## 9. Accessibility

- Minimum contrast ratio: **4.5:1** for body text (WCAG AA)
- Magenta `#FF3D8A` on dark `#0B0C1A` = ✅ passes AA
- Cyan `#00E5D4` on dark `#0B0C1A` = ✅ passes AA
- All interactive elements must have `:focus` states visible
- Video backgrounds must have `aria-hidden="true"` and a static fallback image
- Form fields require visible labels (can be visually hidden but present in DOM)

---

## 10. Don'ts

- ❌ Light or white backgrounds
- ❌ Bright, neon, or rainbow gradients
- ❌ Rounded pill-shaped buttons
- ❌ Capitalised headlines (ALL CAPS for headlines)
- ❌ Generic stock photography
- ❌ Cluttered layouts — negative space is intentional
- ❌ More than 3 typefaces
- ❌ Animations longer than 600ms

---

*Styleguide v1.0 · Timotion Studio · 2025*
