# Admin Authentication Gate & Navigation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove public ADMIN tab from Navbar, implement a secure Glassmorphic Password Gate on `/admin`, and add 5 curatorial archive features (Drafts, Auto-slug, Featured toggle, Image reordering, Optimization).

**Architecture:** Update `features/navigation/Navbar.tsx` to remove public admin links. Upgrade `app/admin/page.tsx` with a `sessionStorage`-backed password challenge screen and enhanced editor state. Update `lib/types/post.ts` and public page filters to support `isDraft` and `isFeatured`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion v12, Lucide React icons.

## Global Constraints

- Preserve all existing 4 primary navbar links (`WORKS`, `ABOUT`, `FIELD NOTES`, `CV`).
- Do NOT expose `ADMIN` in public navigation bar or drawer.
- Password gate must use Framer Motion shake animation for invalid inputs.
- All code edits must pass `npm run build` without static generation or type errors.

---

### Task 1: Clean & Refine Public Navbar Header (`features/navigation/Navbar.tsx`)

**Files:**
- Modify: `features/navigation/Navbar.tsx`

**Interfaces:**
- Consumes: `LanguageContext`
- Produces: Clean public `Navbar` header component without any `ADMIN` link

- [ ] **Step 1: Inspect and verify `navItems` and `secondaryLinks` in `Navbar.tsx`**
Ensure `ADMIN` tab is completely omitted from both `navItems` array and `secondaryLinks` array.

- [ ] **Step 2: Update `features/navigation/Navbar.tsx`**
Modify `Navbar.tsx` to ensure clean typography, glassmorphism header styling (`bg-background-primary/95 backdrop-blur-md`), and proper spring animation for active tabs (`layoutId="activeTabNavbarBulletproof"`).

- [ ] **Step 3: Test Navbar compilation**
Run `npm run build` or dev check to ensure `Navbar.tsx` compiles cleanly.

- [ ] **Step 4: Commit Navbar changes**
```bash
git add features/navigation/Navbar.tsx
git commit -m "refactor(nav): remove public admin tab and polish glassmorphism header"
```

---

### Task 2: Implement Admin Authentication Gate (`app/admin/page.tsx`)

**Files:**
- Modify: `app/admin/page.tsx`

**Interfaces:**
- Consumes: `sessionStorage` key `admin_authenticated`
- Produces: Protected admin page with Password Challenge Gate

- [ ] **Step 1: Define authentication state in `AdminPage` component**
Add `isAuthenticated` state (initialized by reading `sessionStorage.getItem('admin_authenticated') === 'true'`).

- [ ] **Step 2: Build Password Gate Screen**
If `!isAuthenticated`, render a centered Glassmorphism card:
- Lock icon (`Lock` from `lucide-react`)
- Title: `"CURATORIAL ADMIN ACCESS"`
- Password input field (masked input with show/hide toggle)
- Submit button `"XÁC NHẬN / ENTER ARCHIVE"`
- Error shake animation via Framer Motion when password is incorrect (`x: [-12, 12, -8, 8, -4, 4, 0]`).

- [ ] **Step 3: Implement Login & Logout handlers**
- `handleLogin`: Validates password (e.g. `admin123` or configurable password), sets `sessionStorage.setItem('admin_authenticated', 'true')`, and transitions to dashboard.
- `handleLogout`: Clears `sessionStorage.removeItem('admin_authenticated')` and sets `isAuthenticated(false)`.

- [ ] **Step 4: Commit Authentication Gate**
```bash
git add app/admin/page.tsx
git commit -m "feat(admin): add glassmorphic password authentication gate"
```

---

### Task 3: Upgrade Data Types & Slug Utility (`lib/types/post.ts`, `lib/utils/slug.ts`)

**Files:**
- Modify: `lib/types/post.ts`
- Create: `lib/utils/slug.ts`

**Interfaces:**
- Consumes: Post data strings
- Produces: `slugify(title: string)` helper and updated `Post` type definition

- [ ] **Step 1: Update `lib/types/post.ts`**
Add optional fields:
```typescript
export interface Post {
  id: string;
  slug: string;
  title: string;
  year: string;
  date: string;
  labels: string[];
  bodyText: string;
  images: string[];
  isDraft?: boolean;
  isFeatured?: boolean;
  order?: number;
}
```

- [ ] **Step 2: Create `lib/utils/slug.ts`**
```typescript
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

- [ ] **Step 3: Commit types and utility**
```bash
git add lib/types/post.ts lib/utils/slug.ts
git commit -m "feat(utils): add slugify utility and update Post type for drafts & featured flags"
```

---

### Task 4: Add 5 Curatorial Features to Admin Dashboard (`app/admin/page.tsx`)

**Files:**
- Modify: `app/admin/page.tsx`

**Interfaces:**
- Consumes: `slugify`, updated `Post` fields
- Produces: Enhanced Admin Editor with Auto-slug, Drafts, Featured flag, and Image Reordering

- [ ] **Step 1: Auto-slug on Title Change**
In `handleTitleChange`, update `title` and automatically calculate `slugify(newTitle)` if slug was not manually customized.

- [ ] **Step 2: Draft & Featured Controls in Post Form**
Add state variables:
- `isDraft` (`boolean`, default `false`)
- `isFeatured` (`boolean`, default `false`)
Add UI switches in the admin form:
- Checkbox/Toggle: `LƯU BẢN NHÁP / DRAFT MODE`
- Checkbox/Toggle: `ĐÁNH DẤU NỔI BẬT ⭐ / FEATURED`

- [ ] **Step 3: Interactive Image Reordering**
In image preview list, add Up (`MoveUp`) and Down (`MoveDown`) action buttons to reorder images in `images` state array.

- [ ] **Step 4: Draft Tab Filtering**
Add `BẢN NHÁP (DRAFTS)` tab to `TabType` list in `app/admin/page.tsx` to filter posts where `p.isDraft === true`.

- [ ] **Step 5: Commit Admin Editor upgrades**
```bash
git add app/admin/page.tsx
git commit -m "feat(admin): integrate auto-slug, draft/published status, featured toggle, and image reordering"
```

---

### Task 5: Filter Drafts on Public Routes (`lib/posts.ts` or Page Loaders)

**Files:**
- Modify: `lib/posts.ts` (or public page post fetchers)

**Interfaces:**
- Consumes: Post dataset
- Produces: Filtered post lists omitting draft items on public routes

- [ ] **Step 1: Ensure public fetchers exclude drafts**
Filter out posts where `isDraft === true` when returning public works, notes, and journal entries.

- [ ] **Step 2: Commit public route draft filtering**
```bash
git add lib/posts.ts
git commit -m "feat(archive): exclude draft posts from public gallery and field note routes"
```

---

### Task 6: End-to-End Build Verification

**Files:**
- Test all components across workspace

- [ ] **Step 1: Run Next.js production build check**
Run: `npm run build`
Expected: Successful build with zero TypeScript or static generation errors.

- [ ] **Step 2: Final commit**
```bash
git add .
git commit -m "chore: complete admin authentication gate and navbar redesign"
```
