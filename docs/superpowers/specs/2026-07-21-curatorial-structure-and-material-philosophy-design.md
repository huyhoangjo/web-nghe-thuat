# Design Spec: Curatorial Narrative Architecture & Material Philosophy

**Date**: 2026-07-21  
**Project**: Ngo Thi Thuy Duyen - Living Artistic Archive  
**Status**: Approved for Implementation  

---

## 1. Curatorial Architecture & Narrative Flow

This design establishes a 5-layer curatorial progression walking visitors through the artist's living archive:

```
[Layer 1: Artist Bio] ➔ [Layer 2: Artist Biography] ➔ [Layer 3: Artist Statement] ➔ [Layer 4: Material Philosophy] ➔ [Layer 5: Body of Works]
```

### Layer 1: Artist Bio (Overview Snapshot)
- **Location**: Profile card on `/about` (adjacent to artist portrait `artist-portrait.png`).
- **Content**: Concise 2-sentence summary of identity, location (HCMC), practice scope, and key materials.

### Layer 2: Artist Biography (Background & Practice Timeline)
- **Location**: Primary section on `/about`.
- **Content**: Detailed background covering education (HCMC University of Fine Arts, Hue University of Arts), 20+ years of practice, and international exhibition/residency footprint across Vietnam, Taiwan, South Korea, France, Germany, and Thailand.

### Layer 3: Artist Statement (Core Philosophy & Memory)
- **Location**: Section on `/about`.
- **Content**: Philosophical statement on the non-separation of art and life: memory, fragility, transformation, and tracing what remains after time passes.

### Layer 4: Material Philosophy (Full Bilingual Essay)
- **Location**: Featured section on `/about` + standalone deep read at `/field-notes/material-philosophy`.
- **Content**: 13-paragraph essay exploring:
  1. Matter, Suspension, and Perception.
  2. Dó Paper as reconstructed tree bark & the "in-between" state in water.
  3. Metaphor for human resilience & femininity (torn, stitched, transformed).
  4. Resin as a spatial suspension medium rather than a coating.
  5. Light as active participant revealing depth & observer movement.
  6. Foundation for the series *The Origin of No-Self* and the work *Suspension*.

### Layer 5: Body of Works (The 6 Developmental Chapters)
- **Location**: Dedicated `/works` page.
- **Content**: 6 chronological chapters (2003–2014+) featuring viewed image color memory.

---

## 2. Technical Component & Page Changes

1. **`app/about/page.tsx`**: Re-structured into the 4 sequential narrative layers (Bio ➔ Biography ➔ Statement ➔ Material Philosophy), complete with interactive bilingual toggle, material study cards, and direct transition link to `/works`.
2. **`app/field-notes/material-philosophy/page.tsx`**: Created as a museum publication deep-read page for the full essay with pull-quotes, side annotations, and artwork links.
3. **`app/works/page.tsx`**: Represents the **Body of Works** with the 6 chapters.
4. **`features/navigation/Navbar.tsx`**: Updated navigation label hierarchy to reflect:
   - `BIO & PHILOSOPHY` (`/about`)
   - `BODY OF WORKS` (`/works`)
   - `TIMELINE / CV` (`/cv`)
   - `FIELD NOTES` (`/field-notes`)

---

## 3. Verification Plan

1. Build check via `npm run build` to confirm static generation of `/field-notes/material-philosophy` and all updated pages.
2. Bilingual verification: Ensure every section translates between VI and EN smoothly.
3. Color memory verification: Ensure all image cards maintain color persistence.
