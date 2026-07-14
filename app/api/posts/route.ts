import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Post } from '@/lib/types/post';

const JSON_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'posts.json');

// GET request to fetch all posts
export async function GET() {
  try {
    if (!fs.existsSync(JSON_FILE_PATH)) {
      return NextResponse.json({ error: 'Data file not found' }, { status: 404 });
    }
    const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
    const posts = JSON.parse(data) as Post[];
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

// POST request to save the updated posts list
export async function POST(request: Request) {
  try {
    const updatedPosts = await request.json() as Post[];
    
    if (!Array.isArray(updatedPosts)) {
      return NextResponse.json({ error: 'Invalid data format. Expected an array.' }, { status: 400 });
    }

    // Write back to disk
    fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(updatedPosts, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, count: updatedPosts.length });
  } catch {
    return NextResponse.json({ error: 'Failed to write data to disk' }, { status: 500 });
  }
}
