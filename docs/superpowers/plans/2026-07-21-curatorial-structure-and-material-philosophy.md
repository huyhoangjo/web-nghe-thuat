# Curatorial Narrative Structure & Material Philosophy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the 5-layer curatorial progression (Artist Bio ➔ Artist Biography ➔ Artist Statement ➔ Material Philosophy ➔ Body of Works) across the website with full bilingual support.

**Architecture:** Update `/about` into the 4 narrative layers, create `/field-notes/material-philosophy` as a museum publication essay, update `/works` as Body of Works, and adjust Navbar labels.

**Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion.

## Global Constraints
- Full bilingual translation for all 5 layers (`LanguageContext`).
- Grayscale to color memory retention via `ArchiveImage`.
- Responsive museum typography.

---

### Task 1: Update Navbar Labels (`features/navigation/Navbar.tsx`)

**Files:**
- Modify: `features/navigation/Navbar.tsx`

- [ ] **Step 1: Update navigation links to reflect `BIO & PHILOSOPHY`, `BODY OF WORKS`, `TIMELINE / CV`, `FIELD NOTES`**
- [ ] **Step 2: Test navigation render**

---

### Task 2: Build Curatorial 4-Layer Page on `/about` (`app/about/page.tsx`)

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Integrate Layer 1 (Artist Bio card) with `artist-portrait.png`**
- [ ] **Step 2: Integrate Layer 2 (Artist Biography & practice history)**
- [ ] **Step 3: Integrate Layer 3 (Artist Statement on memory & fragility)**
- [ ] **Step 4: Integrate Layer 4 (Material Philosophy preview section with pull-quotes & full essay link)**
- [ ] **Step 5: Add transition banner to Layer 5 (Body of Works `/works`)**

---

### Task 3: Create Full Bilingual Publication Page (`app/field-notes/material-philosophy/page.tsx`)

**Files:**
- Create: `app/field-notes/material-philosophy/page.tsx`

- [ ] **Step 1: Create publication page layout with 13 bilingual essay paragraphs**
- [ ] **Step 2: Embed material study images (`material-1.jpg`, `material-2.jpg`) with `ArchiveImage`**
- [ ] **Step 3: Add cross-links to Chapter 6 works (*The Origin of No-Self* & *Suspension*)**

---

### Task 4: Verification & Build Check

- [ ] **Step 1: Run `npm run build` to verify zero static generation or type errors**
- [ ] **Step 2: Confirm all 38+ routes compile cleanly**

