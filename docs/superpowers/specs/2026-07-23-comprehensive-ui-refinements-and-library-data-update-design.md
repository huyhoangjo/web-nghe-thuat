# Comprehensive UI Refinements and Library Content Update Design

## 1. Overview
This design document specifies UI/UX aesthetic refinements according to curator feedback and details the comprehensive update of artistic content, documents, and high-resolution artwork images from `D:\WEB Nghe Thuat\Thu vien` into the website.

---

## 2. UI/UX Refinements

### A. Title & Header Typography
- **"BODY OF WORK" Title Size**:
  - Reduce font size across `/works` and related sections from oversized `text-5xl md:text-7xl` to a modest, refined `text-2xl md:text-4xl font-serif font-medium tracking-wide`.
- **Hover Color Accent**:
  - When hovering over `"NGO THI THUY DUYEN"`, `"BODY OF WORK"`, and top section headers/navigation tags, transition text color to curated museum gold `#C5A059` (`hover:text-[#C5A059]`).

### B. Chapter Navigation on `/works`
- Remove the `"ALL CHAPTERS (5)"` / `"TẤT CẢ 5 CHƯƠNG"` tab button.
- Keep only sequential chapter tabs: `CHAPTER 01`, `CHAPTER 02`, `CHAPTER 03`, `CHAPTER 04`, `CHAPTER 05`.
- By default (when no single chapter tab is selected), display all 5 chapters in ascending order. Clicking a specific chapter tab filters down to that chapter.

### C. 3-Bar Overlay Menu Navigation & Quote
- Update navigation links sequentially:
  1. `Body of Work (5 Chapters)` (`/works`)
  2. `Practice & Material Philosophy` (`/about`)
  3. `Fragments & Field Notes` (`/field-notes`)
  4. `Biography & Full CV` (`/cv`)
  5. `Contact & Inquiries` (`/contact`)
- **Quote Update**:
  - Remove `"Art as a process of becoming."` from the 3-bar overlay menu (keep it exclusively on the Home hero section).
  - Replace with:
    - *En*: `"Art is what remains after time has passed."`
    - *Vi*: `"Nghệ thuật là những gì còn lại khi thời gian trôi qua."`

### D. Divider Lines & ENTER Button Styling
- **Home Opening Statement Divider**:
  - Replace thick black horizontal divider under the opening statement on Home page with a delicate line (`h-[1px] bg-border-medium/60` or `opacity-30`).
- **ENTER Button Hover Fill**:
  - Adjust padding (`px-8 py-3`) and hover styling so the dark fill wraps around the "ENTER" text evenly.

### E. Archive Document Image Corner Cut
- Add a subtle corner-cut accent (`clip-path` or notched corner design) to `ArchiveImage.tsx` or image containers in detail/grid views to give documentary photos an archival museum aesthetic.

---

## 3. Library Content & Document Updates (`Thu vien`)

### Data Population (`lib/data/posts.json`)
- Enrich existing posts with full titles, exact creation years, detailed descriptions extracted from `.docx` files in `Thu vien`, and link to corresponding high-resolution image assets in `public/images/works/`:
  - **Departure Series (2007)**: 21 solo exhibition artwork paintings with exact titles & dimensions (`Nocturnal Sea`, `Forbidden Fruit`, `Street's Eyes`, `Seeds Of Life`, `Communion`, etc.).
  - **Allergy Performance Series (2009 & 2011)**: Performance images, props, and full critic essay by Ali Riza Arican (*Tính phổ quát của đớn đau và sự vỡ mộng*).
  - **Taiwan & Howl Space Project (2012)**: *Crossing the Line* sewing series, residency document photos, text by Nobuo Takamori.
  - **Củ Chi Residency Project (2012)**: *Before the Rain* series, *Pink - Không thuộc về nhau* series, 36 portrait sketches.

### Static Page Updates
- **`/about`**: Populate with latest *Artist Statement*, *Material Philosophy* (Giấy Dó, Resin, Thread, Light), and full *Biography* from `04. ARTIST BIOGRAPHY- full_.docx`.
- **`/cv`**: Update CV timeline (2003–2026) from `05. View Full CV.docx`.
- **`/contact`**: Synchronize official email (`duyenchula@gmail.com`) and contact guidelines from `contact.docx`.
- **`/field-notes`**: Synchronize essay texts (*Universality of Pain*, *Language of Matter*, *Crossing the Line*).

---

## 4. Verification Plan
1. **Visual & UI Verification**:
   - Verify hover states turn gold (`#C5A059`) for brand titles and navigation tags.
   - Verify `BODY OF WORK` title font size is modest and elegant.
   - Verify `/works` tabs show Chapter 1 to 5 without "All Chapters" button.
   - Verify 3-bar menu displays updated links and time quote.
   - Check thin divider line under Home opening statement and ENTER hover alignment.
2. **Build & Type Check**:
   - Run `npx tsc --noEmit`.
   - Run `npm run build` to confirm zero static page compilation errors.
