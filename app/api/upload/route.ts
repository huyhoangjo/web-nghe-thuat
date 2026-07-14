import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Clean filename to be URL safe
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]+/g, '_');
    const timestamp = Date.now();
    const filename = `${timestamp}-${originalName}`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'works');
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);
    
    const url = `/images/works/${filename}`;
    return NextResponse.json({ success: true, url });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
