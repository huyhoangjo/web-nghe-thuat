# Design Spec: Site-wide Typography Contrast Upgrade & Admin Change Password Feature

**Date:** 2026-07-21  
**Project:** NGO THI THUY DUYEN - Living Artistic Archive  
**Status:** Approved  

---

## 1. Executive Summary

This specification defines two critical enhancements:
1. **Site-wide Typography Contrast & Legibility Upgrade**: Overhauling color tokens in `globals.css` and font weight classes across all site pages (`/`, `/about`, `/works`, `/field-notes`, `/journal`, `/cv`, `/publications`, `/contact`, `/admin`) to eliminate faint, pale, and low-contrast text. Text will be rendered crisp, bold, and easily readable.
2. **Dynamic Admin Change Password Suite**: Adding a password modification modal and state handler in `/admin`, allowing the curator to change the admin passcode.

---

## 2. Site-wide Typography & Contrast Upgrade

### 2.1 CSS Theme Variables (`app/globals.css`)
Darken color tokens for maximum legibility against the museum paper background (`#F8F7F4`):
- `--color-text-primary`: `#111111` (Pure deep black ink, was `#1C1C1C`)
- `--color-text-secondary`: `#2A2A2A` (Rich dark charcoal, was `#505050`)
- `--color-text-muted`: `#4A4A4A` (Clear dark gray, was `#7A7A7A`)
- `--color-border-light`: `#D8D8D8` (Sharper border separation, was `#E5E5E5`)
- `--color-border-medium`: `#B8B8B8` (Definite border contrast, was `#D5D5D5`)

### 2.2 Global Font Weight & Contrast Replacement
Replace thin/faint typography classes across all components and pages:
- Replace `font-light` and `font-thin` with `font-normal` (400 weight), `font-medium` (500 weight), or `font-semibold` (600 weight).
- Increase text size for quotes and philosophy passages from small italic to prominent `text-lg md:text-xl font-medium leading-relaxed`.
- Update metadata labels (`text-[10px]`, `text-xs`) to use `text-text-secondary` / `text-text-primary` with `font-bold` or `font-semibold`.

---

## 3. Admin Change Password Feature (`app/admin/page.tsx`)

### 3.1 Password Storage & Retrieval
- **Storage Key**: `localStorage.getItem('admin_custom_password')`
- **Fallback Password**: `'admin123'`
- **Validation**: On login attempt, compare input password against `localStorage.getItem('admin_custom_password') || 'admin123'`.

### 3.2 Change Password UI/UX
- **Header Action Button**: `[ 🔑 ĐỔI MẬT KHẨU / CHANGE PASSWORD ]` button added to the Admin Dashboard header bar.
- **Interactive Modal Window**:
  - Modal backdrop blur (`bg-text-primary/60 backdrop-blur-sm`).
  - Input 1: **Mật khẩu hiện tại (Current Password)**.
  - Input 2: **Mật khẩu mới (New Password)** (minimum 4 characters).
  - Input 3: **Xác nhận mật khẩu mới (Confirm New Password)**.
- **Validation Rules**:
  - Validates current password match.
  - Ensures new password matches confirmation.
- **Feedback**: Displays success toast notification `"Đổi mật khẩu thành công! Vui lòng sử dụng mật khẩu mới cho lần đăng nhập sau."` and updates `localStorage`.

---

## 4. Verification & Testing

1. **Contrast Check**: Inspect `/about`, `/works`, `/field-notes`, `/journal`, `/publications` to verify text is crisp, bold, dark, and highly readable.
2. **Password Change Test**:
   - Access `/admin`, login with current password.
   - Click `ĐỔI MẬT KHẨU`, set a new password.
   - Click `ĐĂNG XUẤT`.
   - Test logging in with the old password (verify rejection) and new password (verify success).
3. **Build Check**: Execute `npm run build` to verify 0 compilation or type errors.
