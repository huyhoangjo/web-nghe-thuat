import postsData from '../data/posts.json';
import { Post } from '../types/post';

const posts: Post[] = postsData as Post[];

/**
 * Lấy toàn bộ bài viết
 */
export const getAllPosts = (): Post[] => posts;

/**
 * Lấy một bài viết cụ thể theo slug
 */
export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(p => p.slug === slug);
};

/**
 * Lấy các bài viết theo nhãn cụ thể
 */
export const getPostsByLabel = (label: string): Post[] => {
  return posts.filter(p => p.labels.includes(label));
};

/**
 * Lấy tất cả tác phẩm (Works) dựa trên nhãn nghệ thuật
 */
export const getWorks = (): Post[] => {
  const labels = ['PAINTING', 'DRAWING', 'INSTALLATION', 'PERFORMANCE'];
  return posts.filter(p => p.labels.some(l => labels.includes(l)));
};

/**
 * Lấy các bài viết nhật ký (Journal)
 */
export const getJournalEntries = (): Post[] => {
  // Nhật ký bao gồm nhãn 'WRITING' hoặc không thuộc các phần khác nhưng có độ dài ký tự lớn
  return posts.filter(p => 
    p.labels.includes('WRITING') || 
    (p.bodyText.length > 300 && !p.labels.includes('PAINTING') && !p.labels.includes('BIOGRAPHY'))
  );
};

/**
 * Lấy các ghi chép thực địa (Field Notes) dựa trên từ khóa du lịch/lưu trú
 */
export const getFieldNotes = (): Post[] => {
  const keywords = ['travel', 'residency', 'howl space', 'taiwan', 'korea', 'seoul', 'chuyến đi', 'lưu trú'];
  return posts.filter(p => 
    p.labels.includes('WRITING') && 
    keywords.some(kw => p.bodyText.toLowerCase().includes(kw))
  );
};

/**
 * Lấy các ấn phẩm (Publications) phê bình nghệ thuật
 */
export const getPublications = (): Post[] => {
  return posts.filter(p => p.labels.includes('ARTICLES'));
};

/**
 * Lấy tiểu sử nghệ sĩ (Biography)
 */
export const getBiography = (): Post | undefined => {
  return posts.find(p => p.labels.includes('BIOGRAPHY') || p.slug === 'artist-bio');
};
