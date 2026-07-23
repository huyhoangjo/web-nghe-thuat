# Comprehensive UI Refinements and Library Data Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement curator UI/UX aesthetic refinements and synchronize all latest documents and artwork images from `Thu vien` into the website.

**Architecture:** Refine styling tokens in `app/globals.css`, update navigation in `features/navigation/Navbar.tsx`, adjust `app/works/page.tsx` header and chapter tabs, update `components/ui/ArchiveImage.tsx`, enrich `lib/data/posts.json` with extracted docx text and image assets, and update static pages (`/about`, `/cv`, `/contact`, `/field-notes`).

**Tech Stack:** Next.js App Router, TailwindCSS, TypeScript, Python scripts for asset migration.

## Global Constraints
- Hover gold color: `#C5A059`.
- Quote for 3-bar overlay menu: `"Art is what remains after time has passed."` / `"Nghệ thuật là những gì còn lại khi thời gian trôi qua."`.

---

### Task 1: Global CSS & UI Component Refinements

**Files:**
- Modify: `app/globals.css`
- Modify: `features/navigation/Navbar.tsx`
- Modify: `app/page.tsx`
- Modify: `components/ui/ArchiveImage.tsx`

**Interfaces:**
- Produces: Updated `.hover-gold` CSS class, updated Navbar overlay menu, refined Home hero ENTER button and opening divider, corner-cut ArchiveImage styling.

- [ ] **Step 1: Update `.hover-gold` class in `app/globals.css`**

Ensure `.hover-gold` uses color `#C5A059`:
```css
.hover-gold {
  transition: color 0.3s ease;
}
.hover-gold:hover {
  color: #C5A059 !important;
}
```

- [ ] **Step 2: Update `features/navigation/Navbar.tsx`**

- Add `hover-gold` class to `"NGO THI THUY DUYEN"` logo and top nav items.
- Update `secondaryLinks` array:
```typescript
const secondaryLinks = [
  { href: '/works', label: t('Body of Work (5 Chapters)', 'Body of Work (5 Chương)') },
  { href: '/about', label: t('Practice & Material Philosophy', 'Tiểu sử & Triết lý Vật liệu') },
  { href: '/field-notes', label: t('Fragments & Field Notes', 'Ghi chép & Lưu trữ') },
  { href: '/cv', label: t('Biography & Professional Timeline', 'Hành trình & CV Chi tiết') },
  { href: '/contact', label: t('Contact & Inquiries', 'Liên hệ & Trao đổi') },
];
```
- Replace quote in overlay menu:
```typescript
{t(
  "“Art is what remains after time has passed.” A museum-grade digital space for artworks, memories, materials, and transformation.",
  "“Nghệ thuật là những gì còn lại khi thời gian trôi qua.” Không gian lưu trữ kỹ thuật số cấp bảo tàng lưu giữ tác phẩm, ký ức và chất liệu."
)}
```

- [ ] **Step 3: Update `app/page.tsx`**

- Update Home hero ENTER button hover padding and wrapper:
```tsx
<Link 
  href="/works" 
  className="border-2 border-text-primary px-8 py-3.5 text-xs tracking-[0.35em] font-mono font-bold text-text-primary hover:bg-text-primary hover:text-background-primary transition-all duration-300 inline-block uppercase shadow-sm cursor-pointer"
>
  ENTER
</Link>
```
- Update Opening Statement divider:
```tsx
<div className="w-20 h-[1px] bg-border-medium/60 mx-auto pt-4" />
```

- [ ] **Step 4: Update `components/ui/ArchiveImage.tsx` with subtle corner-cut accent**

Add notched corner/accent style to image container wrapper:
```tsx
<div className={`relative overflow-hidden group ${aspectRatio}`}>
  <div className="absolute bottom-0 right-0 w-3 h-3 bg-background-primary z-20 pointer-events-none border-l border-t border-border-medium/40" />
  ...
```

- [ ] **Step 5: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

- [ ] **Step 6: Commit Task 1**

```bash
git add app/globals.css features/navigation/Navbar.tsx app/page.tsx components/ui/ArchiveImage.tsx
git commit -m "style: refine hover gold, navbar overlay menu, opening divider, and image corner cut"
```

---

### Task 2: Chapter Navigation & Title Adjustments on `/works`

**Files:**
- Modify: `app/works/page.tsx`

**Interfaces:**
- Produces: Reduced title font size and updated chapter tab filter.

- [ ] **Step 1: Update `app/works/page.tsx` header title font size**

Change line 93:
```tsx
<h1 className="font-serif text-2xl md:text-4xl font-medium text-text-primary tracking-wide uppercase hover-gold cursor-default transition-colors">
  BODY OF WORK
</h1>
```

- [ ] **Step 2: Remove "ALL CHAPTERS (5)" button and update tab filter**

Remove the `ALL CHAPTERS (5)` button block in `app/works/page.tsx`:
```tsx
<div className="flex flex-wrap items-center gap-3 mb-16 pb-6 border-b-2 border-border-light font-mono text-xs font-bold">
  {chapters.map((ch) => (
    <button
      key={ch.number}
      onClick={() => setSelectedChapter(selectedChapter === ch.number ? null : ch.number)}
      className={`px-4 py-2.5 rounded-md border-2 transition-all cursor-pointer ${
        selectedChapter === ch.number 
          ? 'bg-text-primary text-background-primary border-text-primary shadow-sm' 
          : 'bg-background-secondary text-text-secondary border-border-medium hover-gold'
      }`}
    >
      CHAPTER 0{ch.number}
    </button>
  ))}
</div>
```

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit Task 2**

```bash
git add app/works/page.tsx
git commit -m "feat: reduce Body of Work title size and update chapter tab navigation"
```

---

### Task 3: Populate Posts Data & Image Assets from `Thu vien`

**Files:**
- Modify: `lib/data/posts.json`
- Script: `scratch/sync_thuvien_data.py`

**Interfaces:**
- Produces: Complete `posts.json` dataset with extracted text and image paths from `Thu vien`.

- [ ] **Step 1: Create python script `scratch/sync_thuvien_data.py`**

Script copies high-res artwork images from `Thu vien` to `public/images/works/` with clean filenames and updates `lib/data/posts.json` with:
- Exact post titles for all 30 posts (e.g. *Nocturnal Sea*, *Forbidden Fruit*, *Street's Eyes*, *Seeds Of Life*, *Communion*, *Allergy Performance*, *Crossing the Line*, *Before the Rain*, etc.).
- Detailed body text extracted from corresponding `.docx` files in `Thu vien`.
- Fully linked images array for each post.

- [ ] **Step 2: Run `python scratch/sync_thuvien_data.py`**

Run: `python scratch/sync_thuvien_data.py`
Expected: Successfully synced images and updated `posts.json`.

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

- [ ] **Step 4: Commit Task 3**

```bash
git add lib/data/posts.json public/images/works/ scratch/sync_thuvien_data.py
git commit -m "feat: populate posts database and artwork images from Thu vien"
```

---

### Task 4: Synchronize Static Pages (`/about`, `/cv`, `/contact`, `/field-notes`)

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/cv/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/field-notes/page.tsx`

**Interfaces:**
- Produces: Synchronized static pages with latest docx contents.

- [ ] **Step 1: Synchronize `app/about/page.tsx`**

Integrate full Artist Statement, Material Philosophy (Giấy Dó, Resin, Thread, Light), and Biography from `04. ARTIST BIOGRAPHY- full_.docx`.

- [ ] **Step 2: Synchronize `app/cv/page.tsx`**

Integrate complete 2003–2026 CV timeline from `05. View Full CV.docx`.

- [ ] **Step 3: Synchronize `app/contact/page.tsx`**

Integrate email (`duyenchula@gmail.com`), location (HCMC), representation & inquiry guidelines from `contact.docx`.

- [ ] **Step 4: Synchronize `app/field-notes/page.tsx`**

Integrate essays (*The Universality of Pain and Broken Dreams*, *The Language of Matter*, *Crossing the Line*).

- [ ] **Step 5: Run full production build verification**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 6: Commit Task 4**

```bash
git add app/about/page.tsx app/cv/page.tsx app/contact/page.tsx app/field-notes/page.tsx
git commit -m "feat: synchronize static pages with latest documents from Thu vien"
```
