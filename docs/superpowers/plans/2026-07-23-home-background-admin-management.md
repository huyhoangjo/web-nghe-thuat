# Home Background Image Admin Management Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable administrators to manage and update the Home Hero background image and opacity from the Admin panel.

**Architecture:** Create a `SiteSettings` type and `settings.json` storage file backed by an API route (`/api/settings`). Extend `app/admin/page.tsx` with a new `'TRANG CHỦ'` tab containing a live preview, image upload, opacity slider, save button, and reset button. Update `app/page.tsx` to fetch settings dynamically and apply the background image and opacity.

**Tech Stack:** Next.js App Router (TypeScript, React, API Routes), TailwindCSS, Lucide Icons, Framer Motion.

## Global Constraints
- Naming & paths: `lib/types/settings.ts`, `lib/data/settings.json`, `app/api/settings/route.ts`.
- Default Home hero image: `"/images/home-hero.jpg"`.
- Default Home hero opacity: `35`.

---

### Task 1: Create Settings Type, Storage Data, and API Route

**Files:**
- Create: `lib/types/settings.ts`
- Create: `lib/data/settings.json`
- Create: `app/api/settings/route.ts`

**Interfaces:**
- Produces: `SiteSettings` interface `{ homeHeroImage: string; homeHeroOpacity: number; }` and GET/POST `/api/settings` endpoints.

- [ ] **Step 1: Create `lib/types/settings.ts`**

```typescript
export interface SiteSettings {
  homeHeroImage: string;
  homeHeroOpacity: number;
}
```

- [ ] **Step 2: Create initial `lib/data/settings.json`**

```json
{
  "homeHeroImage": "/images/home-hero.jpg",
  "homeHeroOpacity": 35
}
```

- [ ] **Step 3: Create `app/api/settings/route.ts`**

```typescript
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SiteSettings } from '@/lib/types/settings';

const JSON_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'settings.json');
const DEFAULT_SETTINGS: SiteSettings = {
  homeHeroImage: '/images/home-hero.jpg',
  homeHeroOpacity: 35,
};

function getSettingsFromDisk(): SiteSettings {
  if (!fs.existsSync(JSON_FILE_PATH)) {
    return DEFAULT_SETTINGS;
  }
  try {
    const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettingsToDisk(settings: SiteSettings) {
  const dir = path.dirname(JSON_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(settings, null, 2), 'utf8');
}

export async function GET() {
  try {
    const settings = getSettingsFromDisk();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json(DEFAULT_SETTINGS, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const current = getSettingsFromDisk();
    const updated: SiteSettings = {
      homeHeroImage: typeof body.homeHeroImage === 'string' ? body.homeHeroImage : current.homeHeroImage,
      homeHeroOpacity: typeof body.homeHeroOpacity === 'number' ? Math.max(0, Math.min(100, body.homeHeroOpacity)) : current.homeHeroOpacity,
    };
    saveSettingsToDisk(updated);
    return NextResponse.json({ success: true, settings: updated });
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
```

- [ ] **Step 4: Verify API route build/types**

Run: `npx tsc --noEmit`
Expected: No type errors.

- [ ] **Step 5: Commit Task 1**

```bash
git add lib/types/settings.ts lib/data/settings.json app/api/settings/route.ts
git commit -m "feat: add settings type, data storage, and api route"
```

---

### Task 2: Add 'TRANG CHỦ' Tab to Admin Panel

**Files:**
- Modify: `app/admin/page.tsx`

**Interfaces:**
- Consumes: `/api/settings` GET and POST, `/api/upload` POST.

- [ ] **Step 1: Update `app/admin/page.tsx` type definitions and tab options**

Add `'TRANG CHỦ'` to `TabType` union type and `tabs` array:
```typescript
type TabType = 'ALL' | 'TRANG CHỦ' | 'WORKS' | 'JOURNAL' | 'FIELD NOTES' | 'PUBLICATIONS' | 'BIOGRAPHY' | 'DRAFTS';
```
and:
```typescript
const tabs: TabType[] = ['ALL', 'TRANG CHỦ', 'WORKS', 'JOURNAL', 'FIELD NOTES', 'PUBLICATIONS', 'BIOGRAPHY', 'DRAFTS'];
```

- [ ] **Step 2: Add state variables for Home Background Settings in Admin Page**

```typescript
// Home Settings State
const [homeHeroImage, setHomeHeroImage] = useState('/images/home-hero.jpg');
const [homeHeroOpacity, setHomeHeroOpacity] = useState(35);
const [isSavingSettings, setIsSavingSettings] = useState(false);
const [settingsMessage, setSettingsMessage] = useState('');
```

Fetch settings when authenticated:
```typescript
const fetchSettings = async () => {
  try {
    const res = await fetch('/api/settings');
    const data = await res.json();
    if (data.homeHeroImage) setHomeHeroImage(data.homeHeroImage);
    if (typeof data.homeHeroOpacity === 'number') setHomeHeroOpacity(data.homeHeroOpacity);
  } catch {
    console.error('Failed to fetch settings');
  }
};
```
Call `fetchSettings()` inside `useEffect` when `isAuthenticated` is true.

- [ ] **Step 3: Implement settings save & upload handlers**

```typescript
const handleSaveHomeSettings = async () => {
  setIsSavingSettings(true);
  setSettingsMessage('');
  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        homeHeroImage,
        homeHeroOpacity,
      }),
    });
    const data = await res.json();
    if (data.success) {
      setSettingsMessage('Đã lưu cấu hình trang chủ thành công!');
    } else {
      setSettingsMessage('Lỗi khi lưu cấu hình.');
    }
  } catch {
    setSettingsMessage('Lỗi kết nối khi lưu cấu hình.');
  } finally {
    setIsSavingSettings(false);
  }
};

const handleResetHomeSettings = () => {
  setHomeHeroImage('/images/home-hero.jpg');
  setHomeHeroOpacity(35);
  setSettingsMessage('Đã khôi phục về mặc định (chưa lưu). Nhấn "Lưu thay đổi" để áp dụng.');
};

const handleUploadHomeHeroImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setUploading(true);
  setSettingsMessage('');
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.url) {
      setHomeHeroImage(data.url);
      setSettingsMessage('Đã tải ảnh mới lên thành công! Nhấn "Lưu thay đổi" để áp dụng.');
    }
  } catch {
    setSettingsMessage('Lỗi tải ảnh lên.');
  } finally {
    setUploading(false);
  }
};
```

- [ ] **Step 4: Render the 'TRANG CHỦ' Tab UI inside `app/admin/page.tsx`**

When `activeTab === 'TRANG CHỦ'`, render:
- Header titled "Cấu hình Ảnh nền & Giao diện Trang Chủ".
- **Live Preview Card**:
  - Mini Hero box with `backgroundImage: url('${homeHeroImage}')` and `opacity: homeHeroOpacity / 100`.
  - Overlaid Title "NGO THI THUY DUYEN" and "ENTER" button mockup.
- **Form Controls**:
  - Image Upload section with preview URL and file input.
  - Opacity slider (Range input `0` to `100`, step `1`) with live display value.
  - Save Changes button and Reset Default button.
  - Success / error status message.

- [ ] **Step 5: Verify build & type checking**

Run: `npx tsc --noEmit`
Expected: PASS with 0 errors.

- [ ] **Step 6: Commit Task 2**

```bash
git add app/admin/page.tsx
git commit -m "feat: implement TRANG CHU background management tab in Admin page"
```

---

### Task 3: Integrate Dynamic Settings into Home Page

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `/api/settings` GET endpoint.

- [ ] **Step 1: Add dynamic settings state and fetch logic to `app/page.tsx`**

Import `SiteSettings`:
```typescript
import { SiteSettings } from '@/lib/types/settings';
```

Add state inside `Home`:
```typescript
const [settings, setSettings] = useState<SiteSettings>({
  homeHeroImage: '/images/home-hero.jpg',
  homeHeroOpacity: 35,
});
```

Fetch settings on mount:
```typescript
useEffect(() => {
  const fetchSiteSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch {
      // Fallback to initial state defaults
    }
  };
  fetchSiteSettings();
}, []);
```

- [ ] **Step 2: Update Hero background element in `app/page.tsx`**

Replace lines 26-29 in `app/page.tsx`:
```tsx
<div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
  style={{ 
    backgroundImage: `url('${settings.homeHeroImage}')`,
    opacity: settings.homeHeroOpacity / 100 
  }}
/>
```

- [ ] **Step 3: Run type check and build verification**

Run: `npm run build`
Expected: Build succeeds with 0 errors.

- [ ] **Step 4: Commit Task 3**

```bash
git add app/page.tsx
git commit -m "feat: connect home page hero background image and opacity to site settings"
```
