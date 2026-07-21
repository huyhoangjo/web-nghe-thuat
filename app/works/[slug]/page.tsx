import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getWorks, getAllPosts } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';
import Lightbox from '@/features/gallery/Lightbox';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const works = getWorks();
  return works.map((w) => ({
    slug: w.slug,
  }));
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = getPostBySlug(slug);

  if (!work) {
    notFound();
  }

  const lines = work.bodyText.split('\n').filter(l => l.trim() !== '');
  const title = lines[0] || "Untitled";

  // Tìm kiếm liên kết hai chiều thực tế với nhật ký và bài phê bình
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter(p => 
    p.slug !== slug && 
    (
      p.bodyText.toLowerCase().includes(slug) || 
      p.bodyText.toLowerCase().includes(title.toLowerCase()) || 
      p.title.toLowerCase().includes(title.toLowerCase())
    )
  ).slice(0, 3);

  return (
    <Container className="py-24 max-w-5xl bg-background-primary">
      <div className="space-y-12">
        <Link 
          href="/works" 
          className="text-xs tracking-widest text-text-muted hover:text-text-primary transition-colors flex items-center space-x-2"
        >
          <span>← BACK TO WORKS</span>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Lightbox Gallery (Col span 7) */}
          <div className="md:col-span-7">
            <Lightbox images={work.images} workSlug={slug} />
          </div>
          
          {/* Right Column: Metadata & Details (Col span 5) */}
          <div className="md:col-span-5 space-y-8 md:sticky md:top-28">
            <div className="space-y-2 border-b border-border-light pb-6">
              <span className="text-[9px] tracking-widest text-text-muted uppercase font-mono block">
                {work.labels.join(' / ')}
              </span>
              <h1 className="font-serif text-3xl font-light text-text-primary tracking-wide">
                {title}
              </h1>
              <p className="text-xs text-text-muted font-mono tracking-wider">{work.date}</p>
            </div>
            
            <div className="text-sm text-text-secondary leading-[1.8] font-serif italic border-b border-border-light pb-8">
              {work.bodyHtml ? (
                <div dangerouslySetInnerHTML={{ __html: work.bodyHtml }} className="prose-custom space-y-4" />
              ) : (
                <div className="space-y-4">
                  {lines.slice(1).map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Related Connections (Bidirectional relationships) */}
            <div className="space-y-6 pt-2">
              <h4 className="text-[10px] tracking-[0.25em] text-text-primary font-medium uppercase font-mono">
                Invisible Layers & Memories
              </h4>
              {relatedPosts.length > 0 ? (
                <ul className="space-y-4">
                  {relatedPosts.map((post) => {
                    const postType = post.labels.includes('ARTICLES') 
                      ? 'Critical Review' 
                      : (post.bodyText.toLowerCase().includes('travel') ? 'Field Note' : 'Journal Entry');
                    const postTitle = post.title || post.bodyText.substring(0, 45) + '...';
                    
                    return (
                      <li key={post.slug} className="group border-l border-border-medium pl-4 py-1">
                        <Link href={`/works/${post.slug}`} className="block space-y-1">
                          <span className="text-[8px] tracking-widest text-text-muted font-mono uppercase block">
                            {postType}
                          </span>
                          <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors font-serif leading-relaxed block underline underline-offset-2">
                            {postTitle}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-xs text-text-muted italic">
                  This work stands alone. No related memories found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
