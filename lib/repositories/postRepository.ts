import postsData from '../data/posts.json';
import { Post } from '../types/post';

const posts: Post[] = postsData as Post[];

/**
 * Lấy toàn bộ bài viết
 */
export const getAllPosts = (): Post[] => posts.filter(p => !p.isDraft);

/**
 * Lấy một bài viết cụ thể theo slug
 */
export const getPostBySlug = (slug: string): Post | undefined => {
  const post = posts.find(p => p.slug === slug);
  if (post && post.isDraft) return undefined;
  return post;
};

/**
 * Lấy các bài viết theo nhãn cụ thể
 */
export const getPostsByLabel = (label: string): Post[] => {
  return posts.filter(p => !p.isDraft && p.labels.includes(label));
};

/**
 * Lấy tất cả tác phẩm (Works) dựa trên nhãn nghệ thuật
 */
export const getWorks = (): Post[] => {
  const labels = ['PAINTING', 'DRAWING', 'INSTALLATION', 'PERFORMANCE'];
  return posts.filter(p => !p.isDraft && p.labels.some(l => labels.includes(l)));
};

/**
 * Lấy các bài viết nhật ký (Journal)
 */
export const getJournalEntries = (): Post[] => {
  return posts.filter(p => 
    !p.isDraft && (
      p.labels.includes('WRITING') || 
      (p.bodyText.length > 300 && !p.labels.includes('PAINTING') && !p.labels.includes('BIOGRAPHY'))
    )
  );
};

/**
 * Lấy các ghi chép thực địa (Field Notes) dựa trên từ khóa du lịch/lưu trú
 */
export const getFieldNotes = (): Post[] => {
  const keywords = ['travel', 'residency', 'howl space', 'taiwan', 'korea', 'seoul', 'chuyến đi', 'lưu trú'];
  return posts.filter(p => 
    !p.isDraft && 
    p.labels.includes('WRITING') && 
    keywords.some(kw => p.bodyText.toLowerCase().includes(kw))
  );
};

/**
 * Lấy các ấn phẩm (Publications) phê bình nghệ thuật
 */
export const getPublications = (): Post[] => {
  return posts.filter(p => !p.isDraft && p.labels.includes('ARTICLES'));
};

/**
 * Lấy tiểu sử nghệ sĩ (Biography)
 */
export const getBiography = (): Post | undefined => {
  return posts.find(p => !p.isDraft && (p.labels.includes('BIOGRAPHY') || p.slug === 'artist-bio'));
};
