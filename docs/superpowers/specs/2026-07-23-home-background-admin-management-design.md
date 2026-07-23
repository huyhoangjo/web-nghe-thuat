# Home Background Image Admin Management Design

## 1. Overview
Currently, the Home page hero background image (`/images/home-hero.jpg`) and its opacity (`35%`) are hardcoded in `app/page.tsx`. Administrators need the ability to upload a custom background image for the Home hero section, adjust its background opacity, and reset it to default via the Admin Management page (`app/admin/page.tsx`).

## 2. Architecture & Data Flow

### Data Structure & Storage
- **File Path**: `lib/data/settings.json`
- **TypeScript Type**: `SiteSettings` defined in `lib/types/settings.ts`
```ts
export interface SiteSettings {
  homeHeroImage: string;
  homeHeroOpacity: number; // Percentage integer between 0 and 100
}
```
- **Default Fallback Settings**:
  - `homeHeroImage`: `"/images/home-hero.jpg"`
  - `homeHeroOpacity`: `35`

### API Endpoint (`app/api/settings/route.ts`)
- **`GET /api/settings`**:
  - Reads `lib/data/settings.json`.
  - Returns current settings or default fallback if the file does not exist or fails to read.
- **`POST /api/settings`**:
  - Accepts JSON payload `{ homeHeroImage?: string, homeHeroOpacity?: number }`.
  - Validates and saves updated settings to `lib/data/settings.json`.

---

## 3. UI & Frontend Implementation

### Admin Management Page (`app/admin/page.tsx`)
- Add a new tab `'TRANG CHỦ'` to the tab bar in Admin panel.
- Tab Content layout:
  1. **Live Preview Hero Card**:
     - Interactive preview showing the actual Home Hero styling (Title "NGO THI THUY DUYEN", subtitle quote, "ENTER" button).
     - Renders background image and opacity according to current editing state.
  2. **Image Upload & Selection**:
     - Displays current image URL or preview.
     - Upload button using existing `/api/upload` endpoint.
  3. **Opacity Slider Control**:
     - Slider from `0%` to `100%` with numeric display.
     - Instantly updates live preview card.
  4. **Action Controls**:
     - "Lưu thay đổi" (Save Changes) button: Calls `POST /api/settings` and displays success notification.
     - "Khôi phục mặc định" (Reset Default) button: Resets background image to `"/images/home-hero.jpg"` and opacity to `35%`.

### Home Page (`app/page.tsx`)
- Fetches site settings on client mount (`/api/settings`).
- Applies settings to Hero background section:
  ```tsx
  style={{
    backgroundImage: `url('${settings.homeHeroImage}')`,
    opacity: settings.homeHeroOpacity / 100
  }}
  ```

---

## 4. Verification & Testing Strategy
1. **API Testing**:
   - Call `GET /api/settings` to verify default settings.
   - Send `POST /api/settings` to save new background image URL and opacity.
2. **Admin Panel Verification**:
   - Login to `/admin`, navigate to tab `'TRANG CHỦ'`.
   - Upload new image, check Live Preview response.
   - Move opacity slider, confirm live preview updates.
   - Click "Lưu thay đổi" and verify persistence.
3. **Home Page Verification**:
   - Visit `/` (Home page) and verify that the updated background image and opacity are applied correctly.
