import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Post } from '@/lib/types/post';

const JSON_FILE_PATH = path.join(process.cwd(), 'lib', 'data', 'posts.json');

function getPostsFromDisk(): Post[] {
  if (!fs.existsSync(JSON_FILE_PATH)) {
    return [];
  }
  const data = fs.readFileSync(JSON_FILE_PATH, 'utf8');
  return JSON.parse(data) as Post[];
}

function savePostsToDisk(posts: Post[]) {
  fs.writeFileSync(JSON_FILE_PATH, JSON.stringify(posts, null, 2), 'utf8');
}

// GET request to fetch all posts
export async function GET() {
  try {
    const posts = getPostsFromDisk();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

// POST request to create a post or save updated posts list
export async function POST(request: Request) {
  try {
    const body = await request.json();
    let posts = getPostsFromDisk();

    if (Array.isArray(body)) {
      posts = body as Post[];
      savePostsToDisk(posts);
      return NextResponse.json({ success: true, count: posts.length });
    }

    const newPost = body as Post;
    if (!newPost.slug || !newPost.title) {
      return NextResponse.json({ error: 'Missing title or slug' }, { status: 400 });
    }

    // Check if exists
    const index = posts.findIndex(p => p.slug === newPost.slug);
    if (index >= 0) {
      posts[index] = { ...posts[index], ...newPost };
    } else {
      posts.unshift(newPost);
    }

    savePostsToDisk(posts);
    return NextResponse.json({ success: true, post: newPost });
  } catch {
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}

// PUT request to update an existing post
export async function PUT(request: Request) {
  try {
    const body = await request.json() as Post;
    const posts = getPostsFromDisk();

    const targetSlug = (body as { id?: string; slug: string }).id || body.slug;
    const index = posts.findIndex(p => p.slug === targetSlug || p.slug === body.slug);

    if (index >= 0) {
      posts[index] = { ...posts[index], ...body };
      savePostsToDisk(posts);
      return NextResponse.json({ success: true, post: posts[index] });
    } else {
      posts.unshift(body);
      savePostsToDisk(posts);
      return NextResponse.json({ success: true, post: body });
    }
  } catch {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE request to delete a post by slug
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug parameter missing' }, { status: 400 });
    }

    let posts = getPostsFromDisk();
    posts = posts.filter(p => p.slug !== slug);
    savePostsToDisk(posts);

    return NextResponse.json({ success: true, deletedSlug: slug });
  } catch {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
