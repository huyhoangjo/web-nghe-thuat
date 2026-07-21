# Design Spec: Admin Authentication Gate & Navigation Redesign

**Date:** 2026-07-21  
**Project:** NGO THI THUY DUYEN - Living Artistic Archive  
**Status:** Approved with Enhanced Features  

---

## 1. Executive Summary

This design specification details the architecture and visual user experience updates for:
1. **Public Navigation Bar (`Navbar.tsx`)**: Completely removing public visibility of the ADMIN link/button to preserve museum aesthetic purity. Refining active tab spring indicators, responsive glassmorphism header, and full curatorial index drawer.
2. **Admin Authentication Gate (`/admin/page.tsx`)**: Enforcing a secure password protection gate on the direct URL route `https://web-nghe-thuat.vercel.app/admin`. Unauthenticated users will be greeted with an elegant glassmorphism password challenge screen before gaining access to content management tools.
3. **Enhanced Admin Content Management Suite (`/admin/page.tsx`)**:
   - **Auto-Slug Generation**: Real-time Vietnamese title-to-slug converter with manual override.
   - **Draft & Publish State**: `isDraft` toggle to save drafts before public publishing.
   - **Featured Artwork Flag**: `isFeatured` badge to highlight key masterworks on the homepage.
   - **Drag-and-Drop / Reordering**: Interactive reordering for image galleries and post sequences.
   - **Image Optimization & Thumbnail Pipeline**: Multi-size optimization and responsive preview generation upon upload (`/api/upload`).

---

## 2. Public Navigation Bar (`Navbar.tsx`)

### 2.1 Navigation Items & Routing
The top-level header bar displays 4 primary curatorial categories:
- **TÁC PHẨM / WORKS** (`/works`)
- **TRIẾT LÝ & TIỂU SỬ / ABOUT** (`/about`)
- **GHI CHÉP & LƯU TRỮ / FIELD NOTES** (`/field-notes`)
- **HÀNH TRÌNH & LIÊN HỆ / CV** (`/cv`)

*Note: The `ADMIN` tab is explicitly removed from all public header elements and drawer link lists.*

### 2.2 Micro-Interactions & Styling
- **Brand Logo**: `NGO THI THUY DUYEN` styled in `Cormorant Garamond` serif font with wide tracking (`0.25em`).
- **Active Indicator**: Animated pill background element driven by Framer Motion (`layoutId="activeTabNavbarBulletproof"`).
- **Glassmorphism Header**: Sticky header with `bg-background-primary/95` background, `backdrop-blur-md`, subtle bottom border (`#E5E5E5`).
- **Curatorial Index Drawer**: Full-screen expandable overlay showing secondary sub-links and artistic statement, toggled by the `MỤC LỤC / INDEX` button.
- **Language Switcher**: Fast bilingual toggle (`VI / EN`) powered by `LanguageContext`.

---

## 3. Admin Authentication Gate (`/admin`)

### 3.1 Security & Access Flow
- **Access URL**: Direct access via `/admin` URL.
- **Authentication State**: Managed via `sessionStorage` (e.g. `sessionStorage.getItem('admin_authenticated')`).
- **State Logic**:
  - `isAuthenticated === false`: Renders the **Password Gate Screen**.
  - `isAuthenticated === true`: Renders the **Full Admin Dashboard**.

### 3.2 Password Gate UI/UX
- **Background & Card**: Centered glassmorphic card (`bg-background-secondary/80 backdrop-blur-xl border border-border-medium rounded-2xl shadow-2xl`) on warm ivory background (`#F8F7F4`).
- **Header**: Lock icon (`lucide-react`), title `"CURATORIAL ADMIN ACCESS"`, subtitle `"Khép kín Quản trị & Lưu trữ Sáng tác"`.
- **Form Controls**:
  - Password Input field (with show/hide password toggle).
  - Submit Button `"XÁC NHẬN / ENTER ARCHIVE"`.
- **Feedback & Animations**:
  - Invalid password attempt triggers Framer Motion horizontal shake sequence (`x: [-12, 12, -8, 8, -4, 4, 0]`) and displays inline error message `"Mật khẩu không chính xác. Vui lòng thử lại."`.
  - Successful entry animates smoothly into the admin control panel.

---

## 4. Enhanced Admin Content Management Dashboard (`/admin`)

### 4.1 Dashboard Header & Global Status
- Status Badges: `[ 🔒 CHẾ ĐỘ QUẢN TRỊ / CURATOR ACTIVE ]` & `[ DRAFT COUNT ]`.
- Action Button: `[ 🚪 ĐĂNG XUẤT / LOGOUT ]` to clear `sessionStorage` and lock the page.

### 4.2 Tab Filtering
Filter post items by category tabs:
- `TẤT CẢ (ALL)`
- `TÁC PHẨM (WORKS)`
- `NHẬT KÝ (JOURNAL)`
- `GHI CHÉP (FIELD NOTES)`
- `ẤN PHẨM (PUBLICATIONS)`
- `TIỂU SỬ (BIOGRAPHY)`
- `BẢN NHÁP (DRAFTS)`

### 4.3 Essential Curatorial Features

#### A. Real-Time Auto-Slug Converter
- Dynamically converts Vietnamese titles to clean SEO slugs as the user types (e.g., `"Vật liệu & Ký ức"` -> `"vat-lieu-va-ky-uc"`).
- Allows full manual edit override.

#### B. Save Draft vs. Publish Workflow
- Posts can be saved with `isDraft: true` (`BẢN NHÁP`) or `isDraft: false` (`ĐÃ XUẤT BẢN`).
- Public pages (`/works`, `/field-notes`, `/journal`) filter out draft items so unfinished entries remain private.

#### C. Featured Artwork Toggle
- Checkbox/toggle `ĐÁNH DẤU NỔI BẬT ⭐ / FEATURED`.
- Featured works are pinned to top sliders and homepage hero galleries.

#### D. Interactive Drag-and-Drop Image & Post Reordering
- Uploaded gallery images can be reordered via drag-and-drop or step arrows (`Lucide ArrowUp/ArrowDown`) before saving.
- Controls sequence of artwork chapters and series.

#### E. Automatic Image Optimization & Thumbnail Generation
- Upload endpoint (`/api/upload`) processes images, compresses high-res artist scans to web-optimized formats, and generates fast preview thumbnails for smooth grid rendering.

### 4.4 Form Action Buttons
- `LƯU BẢN NHÁP / SAVE DRAFT`: Saves current state as private draft.
- `XUẤT BẢN / PUBLISH`: Sets `isDraft: false` and publishes to public archive.
- `HỦY / CANCEL`: Resets editor.
- `XÓA BÀI / DELETE`: Displays confirmation dialog before removing entry.

---

## 5. Visual & Motion Design Tokens

- **Colors**:
  - Background Primary: `#F8F7F4` (Ivory Paper)
  - Background Secondary: `#F2F1ED` (Alabaster Slate)
  - Text Primary: `#1C1C1C` (Deep Charcoal)
  - Text Secondary: `#505050`
  - Border Light: `#E5E5E5`
  - Admin Accent / Lock Badge: `#8C2525` (Seal Crimson) & `#C5A059` (Muted Gold)
- **Typography**:
  - Primary Display: `Cormorant Garamond` (Serif)
  - Body & UI Controls: `Inter` (Sans-serif)
  - Admin Meta: `Monospace`
- **Framer Motion Variants**:
  - `activeTabNavbar`: Spring physics (`stiffness: 350`, `damping: 30`).
  - `passwordGateShake`: Shake array animation on failed auth attempt.
  - `drawerOverlay`: Expand/collapse with height and opacity transition (`duration: 0.35`).

---

## 6. Verification & Test Plan

1. **Navbar Test**: Verify public layout at `/`, `/works`, `/about`, `/field-notes`, `/cv` shows NO `ADMIN` link in header or drawer menu.
2. **Admin Password Gate Test**:
   - Access `/admin`. Verify Password Gate renders.
   - Enter wrong password: Confirm shake animation and error toast.
   - Enter correct password: Confirm transition into Admin Dashboard and session persistence.
   - Click Logout: Confirm session clear and lock screen re-appearance.
3. **Curatorial Features Test**:
   - Test auto-slug generation while typing title.
   - Test Save Draft vs Publish (verify draft post is NOT visible on `/works` but visible in Admin `DRAFTS` tab).
   - Test Featured toggle.
   - Test Drag/Reorder images and post order.
   - Test image upload optimization and thumbnail preview.
