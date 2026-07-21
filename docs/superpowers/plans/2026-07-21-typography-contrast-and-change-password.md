# Site-wide Typography Contrast & Admin Change Password Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Darken text color contrast and increase font weights across the entire website for crisp readability, and implement a Change Password modal in `/admin`.

**Architecture:** Update `--color-text-*` CSS variables in `app/globals.css`. Replace `font-light` / pale text classes across all page views. Implement password state management with `localStorage` in `app/admin/page.tsx`.

**Tech Stack:** Next.js 15, Tailwind CSS v4, React 19, Framer Motion v12, Lucide icons.

## Global Constraints

- Text must be high contrast and easily legible on all screen sizes.
- `font-light` / pale gray text must be replaced with `font-normal`, `font-medium`, or `font-semibold`.
- Changing password in `/admin` must persist to `localStorage` key `admin_custom_password`.
- All changes must pass `npm run build` with zero static compilation or type errors.

---

### Task 1: Darken Theme Color Tokens (`app/globals.css`)

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: Tailwind CSS theme variables
- Produces: High-contrast text and border color variables

- [ ] **Step 1: Update `app/globals.css` color definitions**
Set `--color-text-primary: #111111`, `--color-text-secondary: #2A2A2A`, `--color-text-muted: #4A4A4A`, `--color-border-light: #D8D8D8`, `--color-border-medium: #B8B8B8`.

- [ ] **Step 2: Commit CSS theme update**
```bash
git add app/globals.css
git commit -m "style(theme): darken text and border color tokens for high contrast legibility"
```

---

### Task 2: Upgrade Site-wide Typography Contrast Across All Pages

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/page.tsx`
- Modify: `features/navigation/Navbar.tsx`
- Modify: `features/navigation/Footer.tsx`
- Modify: `app/field-notes/material-philosophy/page.tsx`
- Modify: `app/publications/page.tsx`

**Interfaces:**
- Consumes: Tailwind font weight & color utility classes
- Produces: Bold, crisp text across all page layouts

- [ ] **Step 1: Update `app/about/page.tsx`**
Replace `font-light` and `text-text-muted` on blockquotes, material philosophy preview, and bio paragraphs with `font-normal` / `font-medium` and `text-text-primary` / `text-text-secondary`.

- [ ] **Step 2: Update `app/field-notes/material-philosophy/page.tsx`**
Ensure essay text, material study labels, and pull quotes have high-contrast weights (`font-normal` / `font-medium`).

- [ ] **Step 3: Update `features/navigation/Navbar.tsx` and `Footer.tsx`**
Ensure brand title, menu labels, index drawer links, and footer texts have bold/medium crisp styling.

- [ ] **Step 4: Commit site-wide contrast improvements**
```bash
git add app/about/page.tsx app/field-notes/material-philosophy/page.tsx features/navigation/ app/page.tsx app/publications/page.tsx
git commit -m "style(typography): upgrade text contrast and font weights across entire site"
```

---

### Task 3: Implement Change Password Feature (`app/admin/page.tsx`)

**Files:**
- Modify: `app/admin/page.tsx`

**Interfaces:**
- Consumes: `localStorage.getItem('admin_custom_password')`
- Produces: Change Password modal & updated authentication check

- [ ] **Step 1: Update Login Authentication check**
In `handleLoginSubmit`, check against `localStorage.getItem('admin_custom_password') || 'admin123'`.

- [ ] **Step 2: Add Change Password Modal State & UI**
Add `isChangingPassword` boolean state.
Add form inputs for:
- `currentPassword`
- `newPassword`
- `confirmNewPassword`

- [ ] **Step 3: Implement `handleChangePasswordSubmit`**
Validate `currentPassword` matches stored password. Validate `newPassword === confirmNewPassword`. Save to `localStorage.setItem('admin_custom_password', newPassword)`.

- [ ] **Step 4: Commit Change Password feature**
```bash
git add app/admin/page.tsx
git commit -m "feat(admin): add dynamic password change feature with modal and local storage persistence"
```

---

### Task 4: End-to-End Build Verification

**Files:**
- Test all modified files

- [ ] **Step 1: Run production build check**
Run: `npm run build`
Expected: `Compiled successfully` with zero errors.

- [ ] **Step 2: Final commit**
```bash
git add .
git commit -m "chore: complete site-wide contrast upgrade and admin password change feature"
```
