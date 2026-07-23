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
