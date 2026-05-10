---
name: Oceanic VLSI Design
stitch_project_id: "12703332292908561566"
stitch_project_title: "Oceanic Interface Redesign"

# ─── Color Palette ──────────────────────────────────────────────────────────
colors:
  # Surfaces
  surface:                    '#111415'
  surface-dim:                '#111415'
  surface-bright:             '#373a3b'
  surface-container-lowest:  '#0c0f10'
  surface-container-low:     '#191c1d'
  surface-container:         '#1d2021'
  surface-container-high:    '#282a2b'
  surface-container-highest: '#323536'
  surface-variant:           '#323536'

  # On-surface
  on-surface:         '#e1e3e4'
  on-surface-variant: '#c6c5d2'
  inverse-surface:    '#e1e3e4'
  inverse-on-surface: '#2e3132'

  # Outlines
  outline:         '#8f909b'
  outline-variant: '#454650'
  surface-tint:    '#b9c3ff'

  # Primary — Deep Navy
  primary:               '#b9c3ff'
  on-primary:            '#1a2a6c'
  primary-container:     '#1a2a6c'
  on-primary-container:  '#8594dc'
  inverse-primary:       '#4b5a9e'
  primary-fixed:         '#dde1ff'
  primary-fixed-dim:     '#b9c3ff'
  on-primary-fixed:      '#001356'
  on-primary-fixed-variant: '#334284'

  # Secondary — Seafoam / Teal
  secondary:               '#59dad1'
  on-secondary:            '#003734'
  secondary-container:     '#00a8a0'
  on-secondary-container:  '#003532'
  secondary-fixed:         '#79f6ed'
  secondary-fixed-dim:     '#59dad1'
  on-secondary-fixed:      '#00201e'
  on-secondary-fixed-variant: '#00504c'

  # Tertiary — Coral
  tertiary:               '#ffb59c'
  on-tertiary:            '#5c1a00'
  tertiary-container:     '#5b1900'
  on-tertiary-container:  '#ef7345'
  tertiary-fixed:         '#ffdbcf'
  tertiary-fixed-dim:     '#ffb59c'
  on-tertiary-fixed:      '#380c00'
  on-tertiary-fixed-variant: '#822800'

  # Semantic — Error
  error:            '#ffb4ab'
  on-error:         '#690005'
  error-container:  '#93000a'
  on-error-container: '#ffdad6'

  # Background
  background:    '#111415'
  on-background: '#e1e3e4'

# Convenience aliases for direct use in CSS variables
override-primary-color:   '#1a2a6c'
override-secondary-color: '#20b2aa'
override-tertiary-color:  '#ff7f50'
override-neutral-color:   '#f8f9fa'

# ─── Typography ─────────────────────────────────────────────────────────────
typography:
  headline-xl:
    fontFamily:    Montserrat
    fontSize:      48px
    fontWeight:    '700'
    lineHeight:    '1.2'
    letterSpacing: -0.02em

  headline-lg:
    fontFamily: Montserrat
    fontSize:   32px
    fontWeight: '600'
    lineHeight: '1.3'

  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize:   24px
    fontWeight: '600'
    lineHeight: '1.3'

  body-md:
    fontFamily: Montserrat
    fontSize:   16px
    fontWeight: '400'
    lineHeight: '1.6'

  label-sm:
    fontFamily:    Space Grotesk
    fontSize:      12px
    fontWeight:    '500'
    lineHeight:    '1'
    letterSpacing: 0.05em

font-families:
  headline: Montserrat
  body:     Montserrat
  label:    Space Grotesk

# ─── Roundness / Shape ───────────────────────────────────────────────────────
rounded:
  sm:      0.25rem   #  4px
  DEFAULT: 0.5rem    #  8px
  md:      0.75rem   # 12px
  lg:      1rem      # 16px
  xl:      1.5rem    # 24px
  full:    9999px

# Stitch design-system roundness token
roundness: ROUND_EIGHT   # 8px base corner radius

# ─── Spacing ────────────────────────────────────────────────────────────────
spacing:
  unit:           8px
  container-max:  1280px
  gutter:         24px
  margin-mobile:  16px
  margin-desktop: 64px

spacing-scale: 2   # multiplicative scale factor used by Stitch

# ─── Appearance ─────────────────────────────────────────────────────────────
color-mode: DARK
---

## Brand & Style

This design system is built on a foundation of **Glassmorphism**, specifically
tailored for a high-tech educational environment. It balances the technical
complexity of VLSI Physical Design with an immersive, fluid aesthetic that
reduces cognitive load.

The brand personality is authoritative yet tranquil—evoking the depth and
precision of the ocean. By utilising translucent layers and "frosted glass"
containers, the UI maintains a sense of depth and hierarchy without feeling
heavy. Sub-surface wave-pattern gradients provide a dynamic background that
feels alive, symbolising the flow of data and electrons within integrated
circuits.

---

## Colors

The palette is anchored by **Deep Navy (`#1a2a6c`)**, serving as the primary
canvas to ensure high readability and a professional "dark mode" feel suitable
for long study sessions.

| Role | Token | Hex |
|------|-------|-----|
| Background canvas | `--surface` | `#111415` |
| Primary (perceptual) | `--primary` | `#b9c3ff` |
| Primary container | `--primary-container` | `#1a2a6c` |
| Secondary / Seafoam | `--secondary` | `#59dad1` |
| Tertiary / Coral CTA | `--tertiary` | `#ffb59c` |
| On-surface text | `--on-surface` | `#e1e3e4` |
| Outline | `--outline` | `#8f909b` |
| Error | `--error` | `#ffb4ab` |

### Usage Rules

- **Primary Background:** Gradient from `#1a2a6c` → `#0d1535` for infinite depth.
- **Accents (Seafoam `#59dad1`):** Progress bars, success states, key technical
  term highlights — represents the "glow" of hardware.
- **CTAs (Coral `#ff7f50`):** Reserved **strictly** for high-priority actions
  (`Enroll Now`, `Submit Design`). Warm contrast against the cool canvas.
- **Text & UI Elements:** White and light grays at varying opacities ensure
  legibility against translucent glass surfaces.

---

## Typography

### Font Families

| Usage | Family |
|-------|--------|
| Headlines & Body | **Montserrat** |
| Technical labels, micro-copy | **Space Grotesk** |

Montserrat's wide apertures and consistent stroke weights keep VLSI
documentation approachable. Space Grotesk adds a subtle "tech-forward" contrast
for data labels and code snippets.

### Scale

| Token | Family | Size | Weight | Line Height | Letter Spacing |
|-------|--------|------|--------|-------------|----------------|
| `headline-xl` | Montserrat | 48px | 700 | 1.2 | −0.02em |
| `headline-lg` | Montserrat | 32px | 600 | 1.3 | — |
| `headline-lg-mobile` | Montserrat | 24px | 600 | 1.3 | — |
| `body-md` | Montserrat | 16px | 400 | 1.6 | — |
| `label-sm` | Space Grotesk | 12px | 500 | 1.0 | +0.05em |

> Headlines use tight letter spacing (−0.02em) for visual punch against the
> fluid background.

---

## Layout & Spacing

The layout follows a **Fluid Grid** model, allowing complex circuit diagrams and
course modules to expand across the viewport.

| Context | Columns | Gutter | Side Margin |
|---------|---------|--------|-------------|
| Desktop | 12 | 24px | 64px |
| Mobile | 1 | — | 16px |

- **Spacing unit:** 8px — all internal padding uses multiples of this.
- **Section Safe Zones:** 40px–80px between major sections to preserve the
  immersive oceanic feel.
- **Container max-width:** 1280px.

---

## Elevation & Depth

Depth is achieved through **Glassmorphism**, not traditional box shadows.

| Level | Description | Background Opacity | Blur |
|-------|-------------|-------------------|------|
| 0 | Animated wave-pattern background | — | — |
| 1 — Cards | Glass containers | 8% white | 12px |
| 2 — Modals / Popovers | Elevated surfaces | 16% white | 24px + drop shadow tinted `#0d1535` |

### Rules

1. **Backdrop Blur:** All containers → `backdrop-filter: blur(12px)`.
2. **Inner Glow:** 1px white border at 15% opacity on top & left edges
   (specular highlight simulating light on glass).
3. **Z-axis hierarchy:** Background → Cards → Modals.

---

## Shapes

High border-radius values reinforce the fluid, organic oceanic theme.

| Element | Token | Value |
|---------|-------|-------|
| Containers | `rounded-xl` | 1.5rem / 24px |
| Buttons & Inputs | `rounded-lg` | 1rem / 16px |
| Progress Indicators | `rounded-full` | pill-shaped |

---

## Component Specifications

### Buttons

| Variant | Background | Text | Border | Notes |
|---------|-----------|------|--------|-------|
| Primary CTA | Coral `#FF7F50` | White, bold | — | Subtle glow on hover |
| Secondary | Transparent | Seafoam `#59dad1` | Seafoam | — |
| Glass Action | Translucent white + blur | — | — | Low-prominence tools |

### Cards (Course Modules)

Modular glass tiles. On hover:
- Seafoam accent border opacity: 15% → 60%.
- Background blur subtly intensifies.

This provides immediate, tactile feedback in dense technical environments.

### Progress Bars

- Track: deep navy.
- Fill: Seafoam Green with a subtle "flow" animation (moving gradient) to
  symbolise active learning.
- Shape: fully pill-shaped (`rounded-full`).

### Data Tables & Specs

Glass style with higher-contrast row separators:
- 0.5px Seafoam border at 10% opacity.
- Ensures alignment of technical parameters (timing, area, power) is easy to scan.

### Input Fields

- Background: dark, semi-transparent.
- Border: 1px Seafoam, "pulses" on focus.
- Label font: **Space Grotesk** — precise, technical feel.

---

## CSS Custom Properties Reference

```css
/* Paste into :root inside index.css */
:root {
  /* Surfaces */
  --surface:                    #111415;
  --surface-dim:                #111415;
  --surface-bright:             #373a3b;
  --surface-container-lowest:   #0c0f10;
  --surface-container-low:      #191c1d;
  --surface-container:          #1d2021;
  --surface-container-high:     #282a2b;
  --surface-container-highest:  #323536;
  --surface-variant:            #323536;

  /* On-surface */
  --on-surface:         #e1e3e4;
  --on-surface-variant: #c6c5d2;
  --inverse-surface:    #e1e3e4;
  --inverse-on-surface: #2e3132;

  /* Outlines */
  --outline:         #8f909b;
  --outline-variant: #454650;
  --surface-tint:    #b9c3ff;

  /* Primary — Deep Navy */
  --primary:                    #b9c3ff;
  --on-primary:                 #1a2a6c;
  --primary-container:          #1a2a6c;
  --on-primary-container:       #8594dc;
  --inverse-primary:            #4b5a9e;
  --primary-fixed:              #dde1ff;
  --primary-fixed-dim:          #b9c3ff;
  --on-primary-fixed:           #001356;
  --on-primary-fixed-variant:   #334284;

  /* Secondary — Seafoam */
  --secondary:                    #59dad1;
  --on-secondary:                 #003734;
  --secondary-container:          #00a8a0;
  --on-secondary-container:       #003532;
  --secondary-fixed:              #79f6ed;
  --secondary-fixed-dim:          #59dad1;
  --on-secondary-fixed:           #00201e;
  --on-secondary-fixed-variant:   #00504c;

  /* Tertiary — Coral */
  --tertiary:                     #ffb59c;
  --on-tertiary:                  #5c1a00;
  --tertiary-container:           #5b1900;
  --on-tertiary-container:        #ef7345;
  --tertiary-fixed:               #ffdbcf;
  --tertiary-fixed-dim:           #ffb59c;
  --on-tertiary-fixed:            #380c00;
  --on-tertiary-fixed-variant:    #822800;

  /* Error */
  --error:            #ffb4ab;
  --on-error:         #690005;
  --error-container:  #93000a;
  --on-error-container: #ffdad6;

  /* Background */
  --background:    #111415;
  --on-background: #e1e3e4;

  /* Typography */
  --font-headline: 'Montserrat', sans-serif;
  --font-body:     'Montserrat', sans-serif;
  --font-label:    'Space Grotesk', sans-serif;

  /* Spacing */
  --spacing-unit:          8px;
  --container-max:         1280px;
  --gutter:                24px;
  --margin-mobile:         16px;
  --margin-desktop:        64px;

  /* Border Radius */
  --radius-sm:      0.25rem;   /*  4px */
  --radius-default: 0.5rem;    /*  8px */
  --radius-md:      0.75rem;   /* 12px */
  --radius-lg:      1rem;      /* 16px */
  --radius-xl:      1.5rem;    /* 24px */
  --radius-full:    9999px;
}
```

---

## Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Space+Grotesk:wght@500&display=swap" rel="stylesheet">
```

---

*Generated from Stitch project **Oceanic Interface Redesign** (`12703332292908561566`) on 2026-05-10.*
