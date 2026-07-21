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
          className="text-xs tracking-widest text-text-secondary hover:text-text-primary transition-colors flex items-center space-x-2 font-mono font-bold uppercase"
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
            <div className="space-y-2 border-b-2 border-border-light pb-6">
              <span className="text-xs tracking-widest text-text-secondary uppercase font-mono font-bold block">
                {work.labels.join(' / ')}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-text-primary tracking-wide">
                {title}
              </h1>
              <p className="text-xs text-text-secondary font-mono font-bold tracking-wider">{work.date}</p>
            </div>
            
            <div className="text-base md:text-lg text-text-primary leading-[1.9] font-serif italic border-b-2 border-border-light pb-8 font-normal">
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
              <h4 className="text-xs tracking-[0.25em] text-text-primary font-bold uppercase font-mono">
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
                      <li key={post.slug} className="group border-l-2 border-border-medium pl-4 py-1">
                        <Link href={`/works/${post.slug}`} className="block space-y-1">
                          <span className="text-xs tracking-widest text-text-secondary font-mono font-bold uppercase block">
                            {postType}
                          </span>
                          <span className="text-sm text-text-primary group-hover:underline transition-colors font-serif leading-relaxed block font-medium">
                            {postTitle}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-xs text-text-secondary italic font-serif font-bold">
                  Memory layers intertwined in quiet presence.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
