# Design Spec: Admin Floating Editor Modal & CV Page Typography Overhaul

**Date:** 2026-07-21  
**Project:** NGO THI THUY DUYEN - Living Artistic Archive  
**Status:** Approved  

---

## 1. Executive Summary

This specification defines two critical UX/UI overhauls:
1. **Admin Floating Post Editor Modal Window (`app/admin/page.tsx`)**: Replaces the bottom inline editor form with a high-end center-aligned floating modal dialog window (`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-text-primary/75 backdrop-blur-md`). Clicking "CHỈNH SỬA" or "THÊM BÀI MỚI" instantly opens the editor in front of the screen with a smooth Framer Motion scale-up animation (`initial={{ opacity: 0, scale: 0.95 }}` -> `animate={{ opacity: 1, scale: 1 }}`).
2. **Biography / CV Layout & Typography Overhaul (`app/cv/page.tsx`)**: Replaces the cramped 20% column layout with a spacious, museum-grade grid (`max-w-6xl mx-auto`). Year labels use `col-span-2 font-mono text-sm md:text-base font-bold text-text-primary`, and timeline entries expand across `col-span-10 font-serif text-lg md:text-xl font-normal text-text-primary leading-relaxed`.

---

## 2. Admin Floating Editor Modal Specification (`app/admin/page.tsx`)

### 2.1 Modal Structure & Positioning
- **Container**: `fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-text-primary/75 backdrop-blur-md overflow-y-auto`
- **Modal Card**: `relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-background-primary border-2 border-text-primary p-6 md:p-10 rounded-2xl shadow-2xl space-y-8`
- **Backdrop Interaction**: Clicking the darkened backdrop closes the editor modal (`setIsAdding(false); setEditingPost(null);`).

### 2.2 Animations & Micro-Interactions
- Motion variants: `initial={{ opacity: 0, scale: 0.95, y: 20 }}`, `animate={{ opacity: 1, scale: 1, y: 0 }}`, `exit={{ opacity: 0, scale: 0.95, y: 20 }}`.
- Close button: Prominent `X` icon in the top right header.

---

## 3. CV / Biography Page Overhaul (`app/cv/page.tsx`)

### 3.1 Layout & Grid System
- **Container**: Expand width from `max-w-4xl` to `max-w-6xl mx-auto`.
- **Grid Ratio**: Change from cramped `grid-cols-12 (3:9)` to `grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 (2:10)`.
- **Year Column**: `md:col-span-2 font-mono text-sm md:text-base font-bold text-text-primary tracking-wider`.
- **Content Column**: `md:col-span-10 font-serif text-lg md:text-xl font-normal text-text-primary leading-relaxed`.

### 3.2 Typography & Separation
- **Section Headers**: `font-serif text-2xl md:text-4xl text-text-primary font-medium tracking-wide border-b-2 border-border-light pb-4`.
- **Item Dividers**: Subtle border divider between items with hover glow (`border-b border-border-light/60 pb-4 last:border-0`).

---

## 4. Verification & Testing

1. **CV Page Test**: Inspect `/cv` to verify timeline entries span across the screen with large, beautiful serif font (`text-lg md:text-xl`) without awkward single-word column wrapping.
2. **Admin Editor Test**: Access `/admin`, click "CHỈNH SỬA" on any card or "THÊM BÀI MỚI". Confirm editor opens as a centered floating modal window over the page with a blurred backdrop.
3. **Production Build Test**: Run `npm run build` to verify 0 errors.
