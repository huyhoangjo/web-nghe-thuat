# NGO THI THUY DUYEN Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng website lưu trữ nghệ thuật đương đại bằng Next.js 15 + Tailwind CSS dựa trên dữ liệu Blogger đã được trích xuất.

**Architecture:** Sử dụng kiến trúc Next.js App Router (Server-side rendering mặc định) với lớp Repository trung gian truy cập cơ sở dữ liệu JSON tĩnh. Thiết kế giao diện phẳng tối giản như một cuốn sách triển lãm nghệ thuật.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React.

## Global Constraints
- Khung màu chủ đạo: Nền `#F8F7F4`, chữ `#1C1C1C` (nhạt dần ở `#505050` và `#7A7A7A`).
- Phông chữ Serif: `Cormorant Garamond` (cho tiêu đề/trích dẫn), Sans-serif: `Inter` (cho nội dung).
- Tránh dùng `any` trong TypeScript, sử dụng strict type-safety.
- Mọi hình ảnh phải sử dụng `next/image` với placeholder mờ.

---

### Task 1: Scaffolding and Dependencies

**Files:**
- Create: `./package.json`
- Create: `./app/layout.tsx`
- Create: `./app/page.tsx`
- Create: `./app/globals.css`
- Create: `./tailwind.config.ts`

**Interfaces:**
- Produces: Base Next.js structure and dependency configuration.

- [ ] **Step 1: Khởi tạo dự án Next.js 15 bằng CLI**

Chạy câu lệnh không tương tác trong thư mục làm việc hiện tại:
Run: `npx -y create-next-app@15.0.0-canary.2 ./ --ts --tailwind --eslint --app --import-alias "@/*" --use-npm --yes`
Expected: Next.js scaffolding được tạo thành công trong workspace.

- [ ] **Step 2: Cài đặt các thư viện bổ sung**

Run: `npm install framer-motion lucide-react`
Expected: Các thư viện được lưu vào `package.json`.

- [ ] **Step 3: Cập nhật tệp globals.css để thiết lập fonts và biến màu cơ bản**

Modify: `app/globals.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #F8F7F4;
  --bg-secondary: #F2F1ED;
  --text-primary: #1C1C1C;
  --text-secondary: #505050;
  --text-muted: #7A7A7A;
  --border-light: #E5E5E5;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

.font-serif {
  font-family: 'Cormorant Garamond', serif;
}
```

- [ ] **Step 4: Cấu hình Tailwind CSS**

Modify: `tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#F8F7F4",
          secondary: "#F2F1ED",
        },
        text: {
          primary: "#1C1C1C",
          secondary: "#505050",
          muted: "#7A7A7A",
        },
        border: {
          light: "#E5E5E5",
          medium: "#D5D5D5",
        }
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 5: Kiểm tra khởi động Server cục bộ**

Run: `npm run dev`
Expected: Dev server bắt đầu hoạt động trên cổng `http://localhost:3000` không có lỗi.

---

### Task 2: Data Migration & Data Access Layer

**Files:**
- Create: `lib/data/posts.json`
- Create: `lib/types/post.ts`
- Create: `lib/repositories/postRepository.ts`

**Interfaces:**
- Produces: `postRepository.ts` xuất các hàm `getAllPosts()`, `getPostBySlug()`, `getWorks()`, `getJournalEntries()`, `getFieldNotes()`, `getPublications()`, và `getBiography()`.

- [ ] **Step 1: Di chuyển dữ liệu đã parse sang thư mục làm việc của dự án**

Copy tệp JSON từ `C:\Users\Shines\.gemini\antigravity-ide\brain\41d374fa-ac45-44de-aeec-b0171d5d3790\scratch\parsed_posts.json` vào `D:\WEB Nghe Thuat\lib\data\posts.json`.

- [ ] **Step 2: Định nghĩa kiểu dữ liệu trong `lib/types/post.ts`**

Create: `lib/types/post.ts`
```typescript
export interface Post {
  filePath: string;
  year: string;
  month: string;
  slug: string;
  date: string;
  title: string;
  labels: string[];
  images: string[];
  bodyText: string;
  bodyHtml: string;
}
```

- [ ] **Step 3: Xây dựng lớp xử lý nghiệp vụ truy vấn dữ liệu `lib/repositories/postRepository.ts`**

Create: `lib/repositories/postRepository.ts`
```typescript
import postsData from '../data/posts.json';
import { Post } from '../types/post';

const posts: Post[] = postsData as Post[];

export const getAllPosts = (): Post[] => posts;

export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(p => p.slug === slug);
};

export const getPostsByLabel = (label: string): Post[] => {
  return posts.filter(p => p.labels.includes(label));
};

export const getWorks = (): Post[] => {
  const labels = ['PAINTING', 'DRAWING', 'INSTALLATION', 'PERFORMANCE'];
  return posts.filter(p => p.labels.some(l => labels.includes(l)));
};

export const getJournalEntries = (): Post[] => {
  return posts.filter(p => p.labels.includes('WRITING') || p.labels.includes('JOURNAL') || (!p.labels.includes('ARTICLES') && !p.labels.includes('BIOGRAPHY') && p.bodyText.length > 500 && p.images.length === 0));
};

export const getFieldNotes = (): Post[] => {
  return posts.filter(p => p.bodyText.toLowerCase().includes('travel') || p.bodyText.toLowerCase().includes('residency') || p.labels.includes('FIELD_NOTES'));
};

export const getPublications = (): Post[] => {
  return posts.filter(p => p.labels.includes('ARTICLES'));
};

export const getBiography = (): Post | undefined => {
  return posts.find(p => p.labels.includes('BIOGRAPHY') || p.slug === 'artist-bio');
};
```

---

### Task 3: Navigation, Layout, and Core Style

**Files:**
- Create: `components/ui/Container.tsx`
- Create: `features/navigation/Navbar.tsx`
- Create: `features/navigation/Footer.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: Tailwind setup.
- Produces: Cấu trúc Layout bao quanh Navbar + Main + Footer.

- [ ] **Step 1: Xây dựng Component Container tĩnh**

Create: `components/ui/Container.tsx`
```typescript
import React from 'react';

export const Container = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-16 ${className}`}>
      {children}
    </div>
  );
};
```

- [ ] **Step 2: Thiết kế Thanh điều hướng Navbar tối giản phong cách bảo tàng**

Create: `features/navigation/Navbar.tsx`
```typescript
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/works', label: 'WORKS' },
    { href: '/journal', label: 'JOURNAL' },
    { href: '/field-notes', label: 'FIELD NOTES' },
    { href: '/publications', label: 'PUBLICATIONS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/cv', label: 'CV' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <header className="border-b border-border-light py-6 sticky top-0 bg-background-primary/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="font-serif text-lg tracking-wider font-light text-text-primary hover:opacity-75 transition-opacity">
          NGO THI THUY DUYEN
        </Link>
        <nav className="hidden md:flex space-x-8 text-xs tracking-widest">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-text-secondary hover:text-text-primary transition-colors ${isActive ? 'underline underline-offset-4 text-text-primary font-medium' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Thiết kế Footer tối giản**

Create: `features/navigation/Footer.tsx`
```typescript
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border-light py-12 mt-24 text-text-muted text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          © {new Date().getFullYear()} NGO THI THUY DUYEN. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link href="/contact" className="hover:text-text-primary transition-colors">Instagram</Link>
          <Link href="/contact" className="hover:text-text-primary transition-colors">Email</Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Lồng Navbar và Footer vào Layout chính**

Modify: `app/layout.tsx`
```typescript
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/features/navigation/Navbar";
import Footer from "@/features/navigation/Footer";

export const metadata: Metadata = {
  title: "NGO THI THUY DUYEN - Living Artistic Archive",
  description: "An evolving digital archive tracking memory, fragility and transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col justify-between">
        <div>
          <Navbar />
          <main>{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
```

---

### Task 4: Home and About Pages

**Files:**
- Modify: `app/page.tsx`
- Create: `app/about/page.tsx`

**Interfaces:**
- Consumes: `postRepository.ts`

- [ ] **Step 1: Thiết kế trang chủ Home**

Modify: `app/page.tsx`
```typescript
import Link from 'next/link';
import { getWorks } from '@/lib/repositories/postRepository';

export default function Home() {
  const works = getWorks();
  const heroWork = works.find(w => w.images.length > 0) || works[0];

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-background-secondary overflow-hidden">
        {heroWork && heroWork.images.length > 0 && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 filter grayscale"
            style={{ backgroundImage: `url('/images/duyen.jpg')` }} // Thay bằng ảnh chân dung hoặc ảnh biểu tượng nội bộ
          />
        )}
        <div className="relative text-center z-10 px-6 max-w-3xl">
          <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-text-primary mb-6">
            NGO THI THUY DUYEN
          </h1>
          <p className="font-serif italic text-lg md:text-xl text-text-secondary tracking-widest mb-8">
            "Tracing what remains after time has passed through us."
          </p>
          <div className="flex justify-center space-x-6">
            <Link 
              href="/works" 
              className="border border-text-primary px-6 py-2 text-xs tracking-widest hover:bg-text-primary hover:text-background-primary transition-all duration-300"
            >
              EXPLORE WORKS
            </Link>
          </div>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-text-secondary leading-relaxed font-light">
          A living archive of memory, fragility and transformation.
        </h2>
        <div className="w-12 h-[1px] bg-text-muted mx-auto mt-8" />
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Thiết kế trang About**

Create: `app/about/page.tsx`
```typescript
import { getBiography } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';

export default function AboutPage() {
  const bio = getBiography();

  return (
    <Container className="py-16 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="md:col-span-1">
          {/* Avatar / Portrait placeholder */}
          <div className="aspect-[3/4] bg-background-secondary border border-border-light flex items-center justify-center overflow-hidden">
            <span className="text-xs text-text-muted">PORTRAIT</span>
          </div>
          <h2 className="font-serif text-xl mt-6 text-text-primary font-medium">Ngô Thị Thùy Duyên</h2>
          <p className="text-xs text-text-muted mt-2 tracking-wider">Hoi An / Saigon, Vietnam</p>
        </div>
        
        <div className="md:col-span-2 space-y-6 text-text-secondary leading-relaxed text-sm">
          <h1 className="font-serif text-3xl text-text-primary font-light mb-6">Artistic Practice</h1>
          {bio ? (
            <div dangerouslySetInnerHTML={{ __html: bio.bodyHtml }} className="prose-custom" />
          ) : (
            <div>
              <p>
                Vietnamese contemporary artist Ngo Thi Thuy Duyen explores collective memory, 
                femininity, consciousness and transformation through mixed media, paper making, 
                installation and performance art.
              </p>
              <p className="mt-4">
                Her work has been featured in projects including Saigon Open City, Hue Festival, 
                and residencies in Korea and Taiwan.
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
```

---

### Task 5: Chapter-Based Works Listing and Details

**Files:**
- Create: `app/works/page.tsx`
- Create: `app/works/[slug]/page.tsx`

**Interfaces:**
- Consumes: `postRepository.ts`

- [ ] **Step 1: Trang danh sách tác phẩm phân loại theo 6 Chương**

Create: `app/works/page.tsx`
```typescript
import Link from 'next/link';
import { getWorks } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';

interface Chapter {
  number: number;
  title: string;
  years: string;
  description: string;
}

const chapters: Chapter[] = [
  { number: 1, title: 'Emerging Presence', years: '2003 - 2009', description: 'Experimental Art, Installation, Performance, Body, Collective Memory.' },
  { number: 2, title: 'Departure', years: '2008 - 2009', description: 'Motherhood, Emotional Survival, Becoming, Uncertainty.' },
  { number: 3, title: 'Fragile Bodies', years: '2011 - 2012', description: 'Migration, Feminine Identity, Survival, Reconstruction.' },
  { number: 4, title: 'Temporary Presence', years: '2012 - 2013', description: 'Impermanence, Memory, Light.' },
  { number: 5, title: 'Inner Gravity', years: '2013', description: 'Black Holes, Void, Emotional Gravity, Consciousness.' },
  { number: 6, title: 'The Origin of No-Self', years: '2013 - 2014', description: 'Dó Paper, Stitching, Healing, Softness, Transformation, Emergence.' },
];

export default function WorksPage() {
  const works = getWorks();

  // Hàm nhóm tác phẩm vào chương (giả định theo năm và nhãn)
  const getWorksForChapter = (chNum: number) => {
    return works.filter(w => {
      const year = parseInt(w.year);
      if (chNum === 1) return year >= 2003 && year <= 2007;
      if (chNum === 2) return year === 2008 || (year === 2009 && w.bodyText.toLowerCase().includes('child'));
      if (chNum === 3) return year === 2011 || (year === 2012 && !w.slug.includes('rain'));
      if (chNum === 4) return w.slug.includes('rain');
      if (chNum === 5) return year === 2013 && (w.slug.includes('sky') || w.slug.includes('buon'));
      if (chNum === 6) return year === 2014 || (year === 2013 && w.slug.includes('blog-post'));
      return false;
    });
  };

  return (
    <Container className="py-16">
      <h1 className="font-serif text-4xl font-light text-text-primary tracking-wide mb-16 text-center">WORKS</h1>
      
      <div className="space-y-24">
        {chapters.map((ch) => {
          const chWorks = getWorksForChapter(ch.number);
          if (chWorks.length === 0) return null;

          return (
            <section key={ch.number} className="border-t border-border-light pt-12">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <span className="text-xs text-text-muted tracking-widest font-mono">CHAPTER 0{ch.number}</span>
                  <h2 className="font-serif text-2xl font-light text-text-primary mt-2">{ch.title}</h2>
                  <p className="text-xs text-text-muted mt-1">{ch.years}</p>
                  <p className="text-xs text-text-secondary mt-4 leading-relaxed italic">{ch.description}</p>
                </div>
                
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {chWorks.map((work) => {
                    const snippet = work.bodyText.split('\n')[0];
                    return (
                      <Link key={work.slug} href={`/works/${work.slug}`} className="group block">
                        <div className="aspect-[4/3] bg-background-secondary border border-border-light flex items-center justify-center overflow-hidden mb-4">
                          {work.images.length > 0 ? (
                            <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500 filter grayscale contrast-110" style={{ backgroundImage: `url('${work.images[0]}')` }} />
                          ) : (
                            <span className="text-xs text-text-muted">IMAGE</span>
                          )}
                        </div>
                        <h3 className="font-serif text-lg text-text-primary group-hover:opacity-75 transition-opacity">
                          {snippet || "Untitled"}
                        </h3>
                        <p className="text-xs text-text-muted mt-1">{work.year}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
```

- [ ] **Step 2: Thiết kế trang chi tiết tác phẩm**

Create: `app/works/[slug]/page.tsx`
```typescript
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getWorks } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';

export async function generateStaticParams() {
  const works = getWorks();
  return works.map((w) => ({
    slug: w.slug,
  }));
}

export default function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = getPostBySlug(params.slug);

  if (!work) {
    notFound();
  }

  const lines = work.bodyText.split('\n').filter(l => l.trim() !== '');

  return (
    <Container className="py-16 max-w-4xl">
      <div className="space-y-12">
        <Link href="/works" className="text-xs tracking-widest text-text-muted hover:text-text-primary transition-colors">
          ← BACK TO WORKS
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Work Gallery */}
          <div className="space-y-6">
            {work.images.length > 0 ? (
              work.images.map((img, idx) => (
                <div key={idx} className="border border-border-light overflow-hidden bg-background-secondary">
                  <img src={img} alt={work.title || "Artwork image"} className="w-full h-auto filter grayscale contrast-105" />
                </div>
              ))
            ) : (
              <div className="aspect-[4/3] bg-background-secondary border border-border-light flex items-center justify-center">
                <span className="text-xs text-text-muted">NO IMAGES AVAILABLE</span>
              </div>
            )}
          </div>
          
          {/* Work Meta & description */}
          <div className="space-y-6">
            <div>
              <span className="text-xs text-text-muted tracking-widest uppercase">{work.labels.join(', ')}</span>
              <h1 className="font-serif text-3xl font-light text-text-primary mt-2">
                {lines[0] || "Untitled"}
              </h1>
              <p className="text-xs text-text-muted mt-1">{work.date}</p>
            </div>
            
            <div className="border-t border-b border-border-light py-6 space-y-4 text-sm text-text-secondary leading-relaxed font-serif italic">
              {lines.slice(1).map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            {/* Trưng bày các liên kết hai chiều giả lập */}
            <div className="pt-6 space-y-4">
              <h4 className="text-xs tracking-widest text-text-primary font-medium">RELATED MEMORIES</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/journal" className="text-text-muted hover:text-text-primary transition-colors underline underline-offset-2">
                    Studio thoughts during the process of {work.year}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
```

---

### Task 6: Journal & Field Notes Pages

**Files:**
- Create: `app/journal/page.tsx`
- Create: `app/field-notes/page.tsx`

**Interfaces:**
- Consumes: `postRepository.ts`

- [ ] **Step 1: Tạo trang danh sách Journal**

Create: `app/journal/page.tsx`
```typescript
import Link from 'next/link';
import { getJournalEntries } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';

export default function JournalPage() {
  const entries = getJournalEntries();

  return (
    <Container className="py-16 max-w-3xl">
      <h1 className="font-serif text-4xl font-light text-text-primary tracking-wide mb-16 text-center">JOURNAL</h1>
      
      <div className="space-y-16">
        {entries.map((entry) => (
          <article key={entry.slug} className="border-b border-border-light pb-12 space-y-4">
            <div className="text-xs text-text-muted tracking-wider">{entry.date}</div>
            <h2 className="font-serif text-2xl font-light text-text-primary hover:opacity-75 transition-opacity">
              <Link href={`/works/${entry.slug}`}>{entry.title || entry.bodyText.substring(0, 50) + "..."}</Link>
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed font-serif italic">
              {entry.bodyText.substring(0, 250)}...
            </p>
            <div>
              <Link href={`/works/${entry.slug}`} className="text-xs text-text-primary font-mono tracking-widest hover:underline">
                READ MORE →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
```

- [ ] **Step 2: Tạo trang danh sách Field Notes**

Create: `app/field-notes/page.tsx`
```typescript
import Link from 'next/link';
import { getFieldNotes } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';

export default function FieldNotesPage() {
  const notes = getFieldNotes();

  return (
    <Container className="py-16 max-w-3xl">
      <h1 className="font-serif text-4xl font-light text-text-primary tracking-wide mb-16 text-center">FIELD NOTES</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {notes.map((note) => (
          <article key={note.slug} className="space-y-4">
            <div className="aspect-[4/3] bg-background-secondary border border-border-light flex items-center justify-center overflow-hidden">
              {note.images.length > 0 ? (
                <img src={note.images[0]} alt="Field note visual" className="w-full h-full object-cover filter grayscale" />
              ) : (
                <span className="text-xs text-text-muted">TRAVEL RECORD</span>
              )}
            </div>
            <div className="text-[10px] text-text-muted tracking-widest uppercase">{note.year} - FIELD NOTE</div>
            <h2 className="font-serif text-xl font-light text-text-primary hover:opacity-75 transition-opacity">
              <Link href={`/works/${note.slug}`}>{note.title || "Observations"}</Link>
            </h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              {note.bodyText.substring(0, 120)}...
            </p>
          </article>
        ))}
      </div>
    </Container>
  );
}
```

---

### Task 7: Build and Verify

**Files:**
- Modify: `app/cv/page.tsx` (New)
- Create: `app/contact/page.tsx` (New)
- Create: `app/publications/page.tsx` (New)

- [ ] **Step 1: Tạo trang triển lãm nghệ thuật CV**

Create: `app/cv/page.tsx`
```typescript
import { Container } from '@/components/ui/Container';

export default function CVPage() {
  return (
    <Container className="py-16 max-w-3xl">
      <h1 className="font-serif text-4xl font-light text-text-primary tracking-wide mb-16 text-center">BIOGRAPHY / CV</h1>
      
      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-light text-text-primary border-b border-border-light pb-2">Solo Exhibitions</h2>
          <div className="space-y-4 text-sm text-text-secondary">
            <div><strong>2012</strong> - *Crossing the line*, Howlspace, Taipei, Taiwan.</div>
            <div><strong>2011</strong> - *Allergy*, Zero Station, Saigon, Vietnam.</div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-serif text-2xl font-light text-text-primary border-b border-border-light pb-2">Group Exhibitions & Residencies</h2>
          <div className="space-y-4 text-sm text-text-secondary">
            <div><strong>2009</strong> - Pan Asia Performance residency, Seoul, Korea.</div>
            <div><strong>2007</strong> - *No respond*, Choengju Art Space, Korea.</div>
            <div><strong>2006</strong> - *Nàng thơ*, Hue Festival, Vietnam.</div>
            <div><strong>2004</strong> - *Khát vọng*, Hue Festival, Vietnam.</div>
            <div><strong>2003</strong> - *Núi Ngự Bình*, Mapping project, Hue, Vietnam.</div>
          </div>
        </section>
      </div>
    </Container>
  );
}
```

- [ ] **Step 2: Tạo trang liên hệ Contact**

Create: `app/contact/page.tsx`
```typescript
import { Container } from '@/components/ui/Container';

export default function ContactPage() {
  return (
    <Container className="py-16 max-w-xl text-center space-y-8">
      <h1 className="font-serif text-4xl font-light text-text-primary tracking-wide mb-8">CONTACT</h1>
      <p className="text-sm text-text-secondary leading-relaxed font-serif italic">
        "For inquiries regarding research, archiving, and exhibitions, please write to us."
      </p>
      
      <div className="border-t border-border-light pt-8 space-y-4 text-sm">
        <div>
          <span className="text-xs text-text-muted tracking-widest block uppercase">Email</span>
          <a href="mailto:ngothithuyduyen@gmail.com" className="text-text-primary hover:opacity-75 transition-opacity underline underline-offset-4">
            ngothithuyduyen@gmail.com
          </a>
        </div>
        
        <div className="pt-4">
          <span className="text-xs text-text-muted tracking-widest block uppercase">Instagram</span>
          <a href="https://instagram.com/ngothithuyduyen" target="_blank" className="text-text-primary hover:opacity-75 transition-opacity underline underline-offset-4">
            @ngothithuyduyen
          </a>
        </div>
      </div>
    </Container>
  );
}
```

- [ ] **Step 3: Tạo trang Publications**

Create: `app/publications/page.tsx`
```typescript
import { getPublications } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';

export default function PublicationsPage() {
  const pubs = getPublications();

  return (
    <Container className="py-16 max-w-3xl">
      <h1 className="font-serif text-4xl font-light text-text-primary tracking-wide mb-16 text-center">PUBLICATIONS</h1>
      
      <div className="space-y-12">
        {pubs.length > 0 ? (
          pubs.map((pub) => (
            <article key={pub.slug} className="border-b border-border-light pb-8 space-y-4">
              <span className="text-xs text-text-muted tracking-widest font-mono uppercase">{pub.year} - ARTICLE</span>
              <h2 className="font-serif text-2xl font-light text-text-primary">
                {pub.title || "Critical Text"}
              </h2>
              <div dangerouslySetInnerHTML={{ __html: pub.bodyHtml }} className="text-sm text-text-secondary leading-relaxed prose-custom" />
            </article>
          ))
        ) : (
          <div className="text-center text-text-muted text-sm italic">
            No publications found in the database.
          </div>
        )}
      </div>
    </Container>
  );
}
```

- [ ] **Step 4: Kiểm tra build ứng dụng sản xuất**

Run: `npm run build`
Expected: Quá trình build hoàn thành thành công mà không có lỗi TypeScript hay lỗi biên dịch.
