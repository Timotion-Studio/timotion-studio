# Timotion Studio — Design Styleguide

Living design reference for the Timotion Studio website. All decisions documented here are derived from the implemented codebase and should be treated as the source of truth for any new design or development work.

### AI image generation tooling

Placeholder and reference images for the site can be generated using **nano-variations**, installed globally at `~/tools/nano-variations.sh`:

```bash
nano-variations "prompt describing the image" -n 3 -a 16:9 -s 2K
```

Options: `-n` number of variations (default 3) · `-a` aspect ratio · `-s` size (512, 1K, 2K, 4K) · `-m` model (flash / pro). Output is saved automatically to a timestamped subfolder inside `media/`. Requires a Gemini API key with image generation enabled at `~/.nano-banana/.env`.

---

## 1. Brand Identity

**Studio name:** Timotion Studio
**Tagline:** Immortalising moments, creating magic.
**Contact email:** hello@timotion.studio
**Vimeo:** https://vimeo.com/timotionstudio
**Instagram:** https://instagram.com/timotion.mp4

The brand voice is cinematic, understated, and confident. Copy is written in full sentences with editorial weight — no bullet points in client-facing text, no exclamation marks, no hyperbole.

---

## 2. Color Palette

### Core backgrounds

| Name | Hex | Used for |
|------|-----|----------|
| Deep navy | `#000021` | Primary page background, Nav (scrolled), Footer, project pages, service page CTA |
| Midnight | `#00002e` | Alternate section background (Services, About, QualificationForm, deliverables panels, service page testimonials) |
| Hover tint | `#000035` | Service card background on hover only |

The site alternates between `#000021` and `#00002e` to create subtle section separation without hard borders or light surfaces. Both are dark navy — **never use white or light backgrounds.**

### Accent colors

| Name | Hex | CSS variable | Used for |
|------|-----|--------------|----------|
| Pink | `#ff7bac` | `--color-pink` / `--color-gold` | ALL headlines, ALL CTAs, category labels, active states, borders on selected items, progress indicators, section number markers |
| Pink hover | `#ff60a0` | — | CTA button hover state only |
| Cyan | `#00ffff` | — | VinylPlayer hover overlay **only** — nowhere else |

> Note: `--color-gold` and `--color-pink` are the same value (`#ff7bac`). The gold token name is a legacy alias from an earlier design iteration.

### Text colors

| Usage | Value |
|-------|-------|
| Body text | `#c8c8d8` |
| Section eyebrow labels | `text-white/60` → `rgba(255,255,255,0.60)` |
| Navigation links | `text-white/70` → `rgba(255,255,255,0.70)` |
| Muted / secondary text | `rgba(255,255,255,0.50)` |
| Dimmed labels | `rgba(255,255,255,0.40)` |
| Ghost text / counters | `rgba(255,255,255,0.20)` |
| Placeholder text in inputs | `rgba(255,255,255,0.20)` |
| Card body copy | `#c8c8d8` at 70–80% opacity |

### Borders & dividers

| Usage | Value |
|-------|-------|
| Standard section border | `rgba(255,255,255,0.08)` / `border-white/[0.08]` |
| Subtle item borders | `rgba(255,255,255,0.06)` / `border-white/[0.06]` |
| Very faint separators | `rgba(255,255,255,0.04)` |
| Card border (testimonials) | `border-white/5` |
| 1px grid gap technique | `bg-[#f0f0f0]/5` or `bg-white/[0.05]` on grid parent |
| Nav bottom border (scrolled) | `shadow-[0_1px_0_rgba(255,255,255,0.06)]` |
| Footer top border | `border-[#f0f0f0]/8` |

### Ghost / decorative numbers

Large background numerals on service cards: `text-[#ff7bac]/15` — pink at 15% opacity. Large process step numbers: `text-[#ff7bac]/10` — pink at 10% opacity.

---

## 3. Typography

### Fonts

| Font | CSS variable | Source | Used for |
|------|-------------|--------|----------|
| TAN Memories | `--font-playfair` | Local: `public/fonts/TAN-MEMORIES-Regular.ttf` | All display headings (H1, H2, H3), testimonial blockquotes, decorative numerals, taglines |
| Poppins | `--font-poppins` | Google Fonts (weights 300, 400, 500, 600) | Body copy, labels, navigation, buttons, form fields, all UI text |

**Important:** Reference TAN Memories in JSX as `font-[family-name:var(--font-playfair)]`. The shorthand `font-playfair` is not a valid Tailwind token in this project. The font variable is named `--font-playfair` for historical reasons but the actual typeface is TAN Memories, not Playfair Display.

### Display headings (TAN Memories)

| Context | Size | Weight | Color | Letter-spacing | Line-height |
|---------|------|--------|-------|----------------|-------------|
| Hero H1 | `text-5xl` → `text-8xl` | `font-bold` | `#ff7bac` | `tracking-[0.06em]` | `leading-[1.35]` |
| Section H2 | `text-5xl` → `text-6xl` | `font-bold` | `#ff7bac` | `tracking-wide` | `leading-[1.2]` |
| Project page H1 | `text-5xl` → `text-7xl` | `font-bold` | `#ff7bac` | `tracking-wide` | `leading-[1.15]` |
| Service page H1 | `text-6xl` → `text-8xl` | `font-bold` | `#ff7bac` | `tracking-wide` | `leading-[1.1]` |
| Card / form H3 | `text-2xl` | `font-bold` | `white` | `tracking-wide` | `leading-[1.2]` |
| Deliverable / process H3 | `text-xl` → `text-2xl` | `font-semibold` | `white` | — | `leading-snug` |
| Testimonial blockquote | `text-xl` → `text-3xl` | italic | `white` | — | `leading-relaxed` |
| Taglines / subtitles | `text-xl` → `text-2xl` | italic | `text-white/60` | — | `leading-relaxed` |

### Body / UI text (Poppins)

| Context | Size | Weight | Color |
|---------|------|--------|-------|
| Body paragraph | `text-lg` or `text-base` | `font-light` (300) | `#c8c8d8` |
| Card tagline / description | `text-sm` | default | `#c8c8d8` at 70–80% |
| Section eyebrow | `text-sm` | default | `text-white/60` |
| Nav / button labels | `text-[10px]` | `font-semibold` (CTAs) | varies |
| Category labels | `text-[10px]` or `text-[11px]` | default | `#ff7bac` or `text-white/50` |
| Micro labels / attribution | `text-[10px]` | `font-semibold` for names | `#ff7bac` or `text-white/60` |
| Section number markers | `text-[9px]` | default | `#ff7bac` |
| Section label text | `text-[9px]` | default | `text-white/60` |
| Footer copyright | `text-xs` | default | `#c8c8d8` at 70% |

### Letter-spacing conventions

| Class | Where |
|-------|-------|
| `tracking-widest` | Nav links, button text, micro labels, social links |
| `tracking-[0.3em]` | Section eyebrow labels, CTA button text, scroll indicator |
| `tracking-[0.4em]` | Section number markers (01, 02…) on inner pages |
| `tracking-[0.06em]` | Hero H1 only |
| `tracking-wide` | Section H2 headings, card H3 headings |

### Line-height conventions

| Class | Where |
|-------|-------|
| `leading-[1.35]` | Hero H1 |
| `leading-[1.2]` | Section H2, card H3 |
| `leading-[1.15]` | Project page H1 |
| `leading-[1.1]` | Service page H1 |
| `leading-relaxed` | Testimonials, taglines |
| `leading-[1.9]` | Long-form body copy on inner pages (case studies, service descriptions) |
| `1.8` (global) | Default body line-height in `globals.css` |
| `1.9` (global `<p>`) | Paragraph line-height override in `globals.css` |

---

## 4. Layout & Spacing

### Section padding

All sections use `py-24 px-6` as the default. Exceptions:

| Section | Padding |
|---------|---------|
| Hero | `min-h-screen` with centred flex layout — no `py` |
| Projects (home) | `pt-40 pb-24 px-6` — extra top to clear hero bleed |
| Service page hero | `pt-36 pb-24 px-6` — clears the fixed nav |
| Project page hero | `pt-20` (outer), then `pt-12` on inner content wrapper |
| Inner page body sections | `py-20 px-6` |
| QualificationForm | `py-24 px-6` |

### Max content widths

| Class | Used in |
|-------|---------|
| `max-w-7xl` | Nav bar; project page header with prev/next layout |
| `max-w-6xl` | ProjectsHover list, About section, Testimonials grid, project title bar |
| `max-w-5xl` | Services grid, Hero content, service page sections (deliverables, process, related projects) |
| `max-w-3xl` | Project case study body text, service description text |
| `max-w-2xl` | QualificationForm, service page CTA |

### Grid patterns

| Component | Grid |
|-----------|------|
| Services cards | `grid-cols-1 md:grid-cols-3` with 1px gap technique |
| Testimonials | `grid-cols-1 md:grid-cols-2 gap-8` |
| About section | `grid-cols-1 md:grid-cols-2 gap-16 items-center` |
| Deliverables (service page) | `grid-cols-1 md:grid-cols-2` with 1px gap technique |
| Related projects (service page) | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with 1px gap technique |
| QualificationForm OptionCard grids | `grid-cols-2 gap-3` or `grid-cols-3 gap-3` |
| Photo placeholder (project page) | `grid-cols-3 gap-1.5`, first cell `col-span-2 row-span-2` |

**The 1px grid gap technique:** Apply `bg-[#f0f0f0]/5` (or `bg-white/[0.05]`) to the grid wrapper and match the card background to the underlying section background (`bg-[#00002e]` or `bg-[#000021]`). The 1px gaps become visible as the faint wrapper colour bleeds through between cards. Do not use `gap-px` alone — the wrapper background colour is what creates the visible line.

---

## 5. Components

### Nav

Fixed to the top (`z-50`). Transparent at page top; transitions to solid `#000021` with a hairline bottom shadow after 60px scroll (`duration-500`). Hides (`translateY(-100%)`) when scrolling down past 80px, reveals on any scroll up — tracked via a `lastY` ref. Desktop links are hash anchors; Contact is a Next.js `<Link>` to `/contact`. Mobile uses a hamburger toggle that renders a full-width dropdown panel in `#000021`.

### Hero

Full-viewport section (`min-h-screen`) with a background `<video>` (looping MP4 at `/hero-loop.mp4`, poster `/hero-poster.jpg`). Three stacked overlay layers:
1. Dark tint at `rgba(0,0,33,0.55)` — z:1
2. Top-and-bottom gradient vignette, lighter in the middle — z:2
3. SVG noise grain at 4% opacity — z:3

Content at z:4. A separate bottom gradient fade (z:5, `height: 30%`) dissolves the video into the Projects section below. Two CTAs: outlined "View Work" and solid pink "Get In Touch". Scroll indicator at the absolute bottom centre with `.animate-scroll-text` on the "Scroll Down" text span and an SMIL wipe reveal on the SVG arrow.

### ProjectsHover

Numbered list of all 6 projects. On desktop hover, a `280×160px` floating popup (`position: fixed`, `z-index: 9999`) follows the cursor and shows either a muted autoplay Vimeo iframe or a project-colour gradient placeholder. Popup position is calculated on every `mousemove` to avoid viewport overflow. The hovered project row highlights with a pink border tint; the project heading slides `translateX(10px)` and fills left-to-right with pink via the `.project-title` CSS class (see Section 7).

### Services

Tabbed section. "Photography" and "Videography" toggle buttons filter services via `getServicesByCategory()`. The active tab renders `bg-[#ff7bac] text-[#000021] font-semibold`; inactive is `text-white/60 border-white/20`. Service cards are `<Link>` elements to `/services/[slug]`. Each card has a ghost decimal number top-right (`#ff7bac` at 15% opacity). The card H3 and "Learn more →" label transition from white/muted pink to full `#ff7bac` on group hover.

### Testimonials

Two-column grid on `#000021`. Cards use `#00002e` background with `border-white/5`. Quote icon is pink at 40% opacity. Blockquote in TAN Memories italic. Author in pink 10px uppercase; role in white/60 10px uppercase, separated from the quote by a `border-white/10` hairline.

### About

Two-column layout (`gap-16`, `items-center`) on `#00002e`. Left: `ParallaxImage`. Right: TAN Memories H2 in pink, body paragraph in `#c8c8d8`, Vimeo + Instagram icon links (white/50 default → pink hover). Social links show the platform SVG icon and uppercase text label side-by-side.

### ParallaxImage

Displays `/timotion-picture.jpg` at `3/4` aspect ratio with `overflow: hidden`. Scroll-driven shutter reveal: `clip-path: inset()` opens from the vertical centre outward (top and bottom clips simultaneously animate from 50% → 0%) when the element enters 10% of the viewport from the bottom. The inner `<img>` runs a separate ±20px vertical parallax (`translateY` driven by viewport position, `scale(1.08)` to prevent edge gaps). Both elements use `willChange` for GPU promotion.

### QualificationForm

Four-step sequential form in `max-w-2xl`. Each step change re-renders the content div with a fresh `key` to trigger `animate-fade-in-up`. Progress shown as:
- A row of four circular step indicators (filled pink for completed, ring + tinted for active, ghost for future)
- A `h-px` progress track with a pink fill bar animated via inline `width` percentage

Form submission builds a `mailto:` URL from collected data and navigates to it — no server-side submission. Sub-components:
- **OptionCard** — single-select bordered card with a circular radio dot (fills pink when selected)
- **PillOption** — multi-select pill, fills pink when selected
- **Field** — label + input wrapper
- **`inputCls`** — shared Tailwind string for all text inputs: `bg-[#00002e] border-white/10 focus:border-[#ff7bac]`

### VinylPlayer

Fixed-position easter egg at `bottom: 78px, right: 78px, z-index: 50`. Toggles playback of `/hnny-i-let-go.mp3` on click (looped, volume 0.8, created via `new Audio()`). Three-layer 100×100px structure:

1. **SVG disc** — `/timotion-picture.jpg` as a circular disc face with a dark radial gradient overlay, four subtle groove rings, "PLAY ME ·" curved text at radius 19, and a centre spindle hole. Gets class `vinyl-disc-spinning` while playing.
2. **Cyan overlay div** (`vinyl-cyan-overlay`) — absolute full-circle layer, transparent at rest, reveals `rgba(0,255,255,0.45)` on CSS `:hover` of the parent `.vinyl-btn`.
3. **Play/pause icon div** (`vinyl-icon`) — absolutely centred, contains a 10×10px SVG play triangle or pause bars in white.

Opacity logic: `isPlaying ? scrollOpacity : scrollOpacity * 0.35`. `scrollOpacity` is `1` above 60% of hero height, `0.5` below. Result: 35% opacity when paused past the hero fold, 50% when playing past it. No tooltip, label, or instructional text is ever shown.

### Footer

`#000021` background with a `border-[#f0f0f0]/8` top border. Logo image at 40px height. Copyright line `© 2026 Timotion Studio. All Rights Reserved.` in `#c8c8d8` at 70%. Vimeo and Instagram SVG icon links at white/60 → pink on hover. Layout: flex row on desktop, stacked on mobile.

### Project page (`/projects/[slug]`)

**Hero area:** Nav bar clearance (`pt-20`). On desktop: three-column layout — prev project link (w-52) | video/photo | next project link (w-52). On mobile: full-width video only, prev/next hidden. Vimeo player at 16:9 aspect ratio. Photo-only projects show a 3-column gradient placeholder grid (first cell `col-span-2`). Below the media: a title bar with project category in pink, H1 in pink TAN Memories, italic tagline in white/50, and client/year metadata.

**Case study body:** Sections separated by numbered dividers (`01 / Project Scope`, `02 / The Process`, `03 / The Result`) in `max-w-3xl`. Body text at `text-lg leading-[1.9] font-light`. Testimonial block in `#00002e` with large italic blockquote.

### Service page (`/services/[slug]`)

**Hero:** Category label in pink, H1 in pink TAN Memories (6xl→8xl), italic tagline in white/60, and a "Start a Project" CTA button flush to the right on desktop.

**Sections with numbered dividers (same pattern as project page):**
- `01 / About This Service` — long-form description
- `02 / What's Included` — deliverables in a 2-column 1px-gap grid
- `03 / Our Process` — vertical list with oversized ghost numbers (pink/10) flanking step titles
- `04 / What Clients Say` — conditional, only if testimonials exist
- `05 (or 04) / Related Work` — project cards linking to `/projects/[slug]`

Background alternates: description sections on `#000021`, deliverables/testimonials on `#00002e`, related projects switches based on whether testimonials are present.

---

## 6. Animations

All keyframes are defined in `app/globals.css` and applied via **CSS classes only**.

> **Never use inline `style={{ animation: "..." }}` props.** Turbopack does not reliably process keyframes that aren't already compiled into the CSS bundle. After any change to `globals.css` that adds new `@keyframes`, kill the dev server and restart: `pkill -9 -f "next" && rm -f .next/dev/lock && npm run dev`. Hot-reload will not pick up new keyframes.

All animation and transition rules in `globals.css` use `!important` to ensure they override Tailwind utility classes.

### Keyframes

#### `fadeInUp`
```css
from { opacity: 0; transform: translateY(20px); }
to   { opacity: 1; transform: translateY(0); }
```
Class: `.animate-fade-in-up` — `0.45s cubic-bezier(0.22,1,0.36,1) forwards`
Used on: QualificationForm step panels (re-triggered on each step by changing `key`), form submission confirmation state.

#### `fadeInRight`
```css
from { opacity: 0; transform: translateX(-12px); }
to   { opacity: 1; transform: translateX(0); }
```
Class: `.animate-fade-in-right` — `0.35s cubic-bezier(0.22,1,0.36,1) forwards`
Available for entrance animations from the left.

#### `textPulse`
```css
0%   { opacity: 0.5; text-shadow: none; }
50%  { opacity: 1;   text-shadow: 0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2); }
100% { opacity: 0.5; text-shadow: none; }
```
Class: `.animate-scroll-text` — `2.5s ease-in-out infinite`
Used on: "Scroll Down" text span in Hero only.

#### `vinylSpin`
```css
from { transform: rotate(0deg); }
to   { transform: rotate(360deg); }
```
Class: `.vinyl-disc-spinning` — `2s linear infinite !important`
Applied to the SVG disc element only. The parent wrapper div handles `scale` on hover. These must never share the same element — combining transforms would break the spin.

### SMIL animation (SVG-native)

The Hero scroll arrow uses an SVG-native SMIL `<animate>` on a `<clipPath>` rect's `height` attribute to produce a top-to-bottom wipe reveal. This approach is immune to Turbopack's CSS hot-reload issues and is necessary because `clip-path: inset()` CSS is not supported on SVG elements in Chrome or Safari. Timing: `values="0;0;16;16;0"`, `dur="2.4s"`, `repeatCount="indefinite"`, spline easing.

### Transition conventions

| Behaviour | Value |
|-----------|-------|
| Color (links, icons) | `transition-colors duration-300` |
| Color + transform | `transition-all duration-300` |
| Nav visibility | `transition-all duration-500` |
| Popup fade (ProjectsHover) | `transition: opacity 0.15s ease` |
| Form option cards | `transition-all duration-200` |
| Vinyl scale + opacity | `transition: opacity 0.4s ease, transform 0.2s ease` |
| Vinyl cyan overlay | `transition: background 0.3s ease` |
| Project title fill | `transition: background-position 0.45s ease, transform 0.3s ease` |
| Progress bar fill | `transition-all duration-500` |

---

## 7. Interactive States

### Navigation links

Default: `text-white/70`. Hover: `text-[#ff7bac]`. Transition: `duration-300`.

### Primary CTA button (filled)

Default: `bg-[#ff7bac] text-[#000021] font-semibold`. Hover: `bg-[#ff60a0]`. Text: `text-[10px] tracking-[0.3em] uppercase`. Padding: `px-10 py-4` (or `px-12 py-4` for standalone CTAs). No border-radius.

### Primary CTA button (outlined)

Default: `border border-[#ff7bac]/70 text-[#ff7bac]`. Hover: `bg-[#ff7bac] text-[#000021] border-[#ff7bac]`. Same text specs as filled. Used in the Hero "View Work" button only.

### Tab buttons (Services)

Active: `bg-[#ff7bac] text-[#000021] border-[#ff7bac] font-semibold`. Inactive default: `text-white/60 border-white/20`. Inactive hover: `text-white border-white/40`. Sharp corners, no radius.

### Form inputs

Border: `border-white/10`. Focus: `border-[#ff7bac]` with `focus:outline-none`. Background stays `#00002e` at all states.

### OptionCard

Unselected: `background: rgba(255,255,255,0.02)`, `borderColor: rgba(255,255,255,0.1)`. Selected: `background: rgba(255,123,172,0.08)`, `borderColor: #ff7bac`. The circular radio dot is transparent with a white/25 border when unselected; fills solid `#ff7bac` with a dark checkmark when selected.

### PillOption

Unselected: `background: transparent`, `borderColor: rgba(255,255,255,0.15)`, `color: rgba(255,255,255,0.55)`. Selected: `background: rgba(255,123,172,0.12)`, `borderColor: #ff7bac`, `color: #ff7bac`.

### Project title fill (ProjectsHover)

`.project-title` uses a gradient background trick: `linear-gradient(to right, #ff7bac 50%, rgba(255,255,255,0.55) 50%)` at `background-size: 200%`. At rest: `background-position: 100% 0` — the white half is visible. On `.active`: `background-position: 0% 0` — the pink half slides in from the left. This creates a smooth left-to-right colour fill with zero JavaScript.

### Service cards

Background: `#00002e` → `#000035` on group hover. Card H3: white → `#ff7bac` on hover. "Learn more →" label: `#ff7bac` at 60% → full `#ff7bac` on hover.

### VinylPlayer hover

The `.vinyl-btn:hover` rule triggers two simultaneous effects via CSS only:
- **Scale** on the wrapper: `transform: scale(1.08) !important`
- **Cyan reveal** on the inner overlay: `.vinyl-btn:hover .vinyl-cyan-overlay { background: rgba(0,255,255,0.45) !important }`

Opacity override on hover: `.vinyl-btn:hover { opacity: 1 !important }` — always shows at full opacity on hover regardless of scroll state.

### Disabled buttons

`disabled:opacity-30 disabled:cursor-not-allowed`. Applied to form navigation buttons when required fields are empty.

### Muted / back links

Default: `text-white/40` or `text-white/60`. Hover: `text-[#ff7bac]`. Used for "← All Projects", "← All Services", "View all projects →".

---

## 8. Design Rules

These constraints define the visual identity and must be followed on all new pages and components.

**Dark backgrounds only.** Every section uses `#000021` or `#00002e`. There are no white sections, light panels, or card-lift shadows with white fill. The only permitted surface colours are `#000021`, `#00002e`, and `#000035` (service card hover only).

**All display headlines are pink.** Every H1 and section H2 uses `#ff7bac`. Project titles, service names, section CTAs — all pink. The only exception is card-level H3 elements (service cards, deliverable items, process steps, form step titles) which use white, because they are subordinate to a section heading rather than acting as page-level display headings themselves.

**Cyan (`#00ffff`) is reserved for the vinyl easter egg only.** It does not appear on links, borders, highlights, active states, focus rings, or any interactive element elsewhere on the site.

**No tooltips or labels on the VinylPlayer.** It is a hidden easter egg. Cursor change, scale, and cyan hover tint are the sole affordances. Never add a tooltip, popover, aria-label visible to sighted users, or any instructional text.

**Wave dividers only where there is genuine colour contrast.** The two section backgrounds (`#000021` and `#00002e`) are too visually close for wave SVGs to serve a purpose. Use the 1px gap technique (grid parent background bleed) to separate card grids. Use `border-t border-white/[0.05–0.08]` for section-level dividers where needed.

**All UI labels are uppercase; body copy is never forced uppercase.** Nav items, section eyebrows, button text, category badges, section number markers, and attribution names are uppercase. Headlines, body paragraphs, blockquotes, and taglines use sentence case or title case.

**No border-radius on interactive elements.** Buttons, cards, form inputs, and option cards are sharp-cornered. The only rounded elements are: radio dots inside OptionCard, step indicator circles in the QualificationForm progress bar, and the VinylPlayer disc (circular by SVG nature).

**Section numbering pattern for inner pages.** Project case study sections and service pages use a consistent section marker row: a `text-[9px] tracking-[0.4em] uppercase` two-digit counter in `#ff7bac`, a text label in `text-white/60`, and a `flex-1 h-px bg-white/[0.07]` rule. Use `gap-4` between the three elements and `mb-8` or `mb-10` below the row before the section content.

**The 1px gap grid is a visual separator, not a structural one.** When multiple cards sit side by side and the design calls for a 1px dividing line between them, apply `bg-[#f0f0f0]/5` to the grid wrapper with no gap, and match each card's background to the section. This produces a faint hairline without borders or box-shadows.
