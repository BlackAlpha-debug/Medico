---
name: Clinical Clarity
colors:
  surface: '#effcfb'
  surface-dim: '#cfdddc'
  surface-bright: '#effcfb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e9f6f6'
  surface-container: '#e3f1f0'
  surface-container-high: '#ddebea'
  surface-container-highest: '#d8e5e5'
  on-surface: '#121e1e'
  on-surface-variant: '#3f4948'
  inverse-surface: '#263333'
  inverse-on-surface: '#e6f3f3'
  outline: '#6f7979'
  outline-variant: '#bec8c8'
  surface-tint: '#1b6969'
  primary: '#005252'
  on-primary: '#ffffff'
  primary-container: '#1f6b6b'
  on-primary-container: '#a2e9e8'
  inverse-primary: '#8dd3d2'
  secondary: '#004fda'
  on-secondary: '#ffffff'
  secondary-container: '#2b69fd'
  on-secondary-container: '#fefbff'
  tertiary: '#195154'
  on-tertiary: '#ffffff'
  tertiary-container: '#35696c'
  on-tertiary-container: '#b1e6e9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a8efee'
  primary-fixed-dim: '#8dd3d2'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#004f50'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b5c4ff'
  on-secondary-fixed: '#00174d'
  on-secondary-fixed-variant: '#003cac'
  tertiary-fixed: '#b7ecef'
  tertiary-fixed-dim: '#9bd0d3'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#164e51'
  background: '#effcfb'
  on-background: '#121e1e'
  surface-variant: '#d8e5e5'
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an authoritative yet reassuring clinical aesthetic tailored for hospital administration, clinician tooling, and patient management. It reconciles high-density medical precision with humanized, approachable interfaces.

### Brand Personality & Core Values
- **Objective Reliability:** Precision-driven visual hierarchy prioritizing data legibility, fast scanning of vitals, and unambiguous callouts.
- **Calm Authority:** Grounded deep teals mitigate clinical stress, providing a serene backdrop for intensive workflows.
- **Modern Clinical Warmth:** Pairing crisp geometric headers with clean, neutral body typography humanizes technical medical utilities while avoiding excessive informality.

### Design Style & Paradigm
The aesthetic merges modern clinical minimalism with structural clarity:
- **Base Style:** Corporate / Modern clinical functionalism.
- **Surfaces & Separation:** Layered, low-contrast structural surfaces with subtle cool-tinted borders and minimal, diffused ambient shadows.
- **Information Density:** Modular grouped cards and split-pane viewports allow physicians and administrative operators to navigate complex patient histories, scheduling matrices, and lab panels without cognitive fatigue.

## Colors

The palette leverages a deep clinical teal as its primary baseline, supported by an alert-ready clinical blue for secondary actions and an ink-toned neutral for unyielding data readability.

### Core Roles
- **Primary (`#1F6B6B`):** Brand baseline, prominent interactive triggers, active navigation items, and master dashboard indicators.
- **Primary Dark (`#174F52`):** Hover states, contextual master headers, and persistent sidebar backgrounds.
- **Primary Light (`#E6F2F1`):** Active card backgrounds, selected table row fills, and primary badge container fills.
- **Secondary (`#2F6BFF`):** Digital actions, telemedicine indicators, secondary links, and live synchronization notifications.
- **Neutral Dark (`#0F1B1B`):** High-contrast typography, high-priority vitals metrics, and definitive iconography.
- **Neutral Text (`#6B7A7A`):** Secondary meta-text, timestamps, field captions, and inactive tab labels.
- **Neutral Surface Canvas (`#F7FAFA`):** Underlying viewport background to soften clinical glare.
- **Neutral Surface Clean (`#FFFFFF`):** High-priority card panels, modal overlays, and clinical data cells.

### Semantic Triage Roles
- **Success (`#22A06B`):** Stable vitals, discharged status, valid diagnostic indicators.
- **Warning (`#F5A524`):** Triaged alerts, pending lab verifications, scheduling conflicts.
- **Critical / Danger (`#E5484D`):** Stat orders, critical vitals anomalies, allergy contraindications.

## Typography

The typographic hierarchy balances structural presence with dense utilitarian legibility:
- **Display & Section Headers (`Outfit`):** Geometric sans styling delivers modern visual clarity. Renders section headers, ward/patient identifiers, and key quantitative metric banners. Always kept at a tight line-height to maintain block solidity.
- **Narrative & Records (`Inter`):** Selected for clinical notes, prescription details, diagnostic transcripts, and tabbed record lists. Inter's tall x-height preserves character differentiation across complex numerical strings, medical dosages, and nomenclature.
- **Micro-Copy & Badges (`Inter Medium/SemiBold`):** Tightly spaced labels, triage status tags, and table column titles enforce rapid horizontal scanning.

## Layout & Spacing

This design system uses a strict 12-column fluid grid system pinned to an 8px base rhythm (with 4px half-steps for compact data cells).

### Grid Structure & Adaptation
- **Desktop (1280px+):** 12 columns, `margin: 2rem`, `gutter: 1.5rem`. Designed to accommodate persistent split-screen views (e.g., patient list on the left 4 columns, active electronic medical record on the right 8 columns).
- **Tablet (768px - 1279px):** 8 columns, `margin: 1.5rem`, `gutter: 1rem`. Sidebars collapse into docked icon rails; clinical overview cards transition into full-width stacking.
- **Mobile (< 768px):** 4 columns, `margin-mobile: 1rem`, `gutter-mobile: 0.75rem`. Full-width modular card lists with sticky bottom-anchored contextual triage actions.

### Spacing Application
- `space-xs (4px)`: Tight icon-to-label gaps, badge internal vertical padding.
- `space-sm (8px)`: Form control internal vertical padding, table row inline gaps.
- `space-md (16px)`: Standard card internal padding, layout control clusters.
- `space-lg (24px)`: Grid component spacing, panel grouping separations.
- `space-xl (40px)`: Canvas section dividers and high-level dashboard widget separators.

## Elevation & Depth

To preserve clinical sterility and optical calm, the system rejects dramatic drop shadows in favor of tonal layering and soft, cool-ambient surface separation.

### Surface Tiers
- **Tier 0 (Viewport Floor):** `#F7FAFA`. Ambient canvas holding clinical modules.
- **Tier 1 (Base Cards & Tables):** `#FFFFFF` paired with an ultra-subtle border: `1px solid rgba(15, 27, 27, 0.08)`.
- **Tier 2 (Elevated Flyouts & Floating Filters):** `#FFFFFF` with an ambient shadow: `box-shadow: 0 4px 16px -2px rgba(31, 107, 107, 0.08), 0 1px 2px rgba(15, 27, 27, 0.04)`.
- **Tier 3 (Modals & Emergency Alerts):** `#FFFFFF` backed by a tinted backdrop `rgba(15, 27, 27, 0.35)`, lifted via `box-shadow: 0 12px 32px -4px rgba(31, 107, 107, 0.16)`.

## Shapes

The design uses balanced, rounded geometry (`level 2`) to ensure medical software feels approachable while remaining structural:
- **Base Components:** Standard inputs, buttons, and alert strips utilize `0.5rem (8px)` radii.
- **Containers & Panels (`rounded-lg`):** Clinical report cards, diagnostic containers, and patient summary panels use `1rem (16px)`.
- **Modals & Master Dividers (`rounded-xl`):** Major sheet dialogs and master floating sections use `1.5rem (24px)`.
- **Pills / Tags:** Full rounded geometry (`9999px`) is reserved exclusively for numerical vitals chips, status badges, and quick-filter pills.

## Components

### Buttons
- **Primary:** Background `#1F6B6B`, text `#FFFFFF`, border-radius `0.5rem`. Hover triggers `#174F52`. Active states drop by 1px translateY.
- **Secondary / Action:** Background `#2F6BFF`, text `#FFFFFF`. Reserved for immediate workflows (e.g., "Start Consultation", "Dispatch Order").
- **Subtle / Ghost:** Background `transparent`, border `1px solid rgba(15, 27, 27, 0.12)`, text `#1F6B6B`. Hover state applies `#E6F2F1`.
- **Padding:** 10px 18px for standard triggers; 6px 12px for compact table action triggers.

### Chips & Badges
- **Status Badges:** Full-pill structure (`9999px`), padding `4px 10px`, typography `label-sm`.
  - Normal / Routine: Background `#E6F2F1`, text `#1F6B6B`.
  - Critical / Urgent: Background `rgba(229, 72, 77, 0.12)`, text `#E5484D`.
  - Pending: Background `rgba(245, 165, 36, 0.12)`, text `#9A6200`.

### Cards & Modular Containers
- Constructed on `#FFFFFF` surfaces with `1rem` corner rounding and `1px solid rgba(15, 27, 27, 0.06)` perimeter boundary.
- **Header Structure:** Includes an integrated title in `Outfit` (`headline-sm`), separated from the body by a clear hairline divider or direct 16px space-md padding.

### Input Fields & Controls
- **Text Inputs:** Height 42px, radius `0.5rem`, border `1px solid rgba(15, 27, 27, 0.16)`, background `#FFFFFF`, text `#0F1B1B`. Focus state transitions border to `#1F6B6B` with a `0 0 0 3px rgba(31, 107, 107, 0.15)` focus ring.
- **Checkboxes & Radios:** 18px dimensions, radius 4px (checkbox) or circle (radio). Checked state fills `#1F6B6B` with an inset white glyph.

### Clinical Data Lists & Tables
- **Table Rows:** Hover state invokes `#F7FAFA`. Selected rows utilize `#E6F2F1`. Cell vertical padding maintained at `12px` for high readability without excess vertical scrolling.
- **Vital Metric Tiles:** Compact card featuring a small `label-md` descriptive title, a large bold `Outfit` readout, and an inline status chip indicating deviation from baseline values.