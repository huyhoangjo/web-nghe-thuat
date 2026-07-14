'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Eye, Upload, Loader2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Post } from '@/lib/types/post';

type TabType = 'ALL' | 'WORKS' | 'JOURNAL' | 'FIELD NOTES' | 'PUBLICATIONS' | 'BIOGRAPHY';

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('ALL');
  
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [bodyText, setBodyText] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelOptions = ['PAINTING', 'DRAWING', 'INSTALLATION', 'PERFORMANCE', 'WRITING', 'ARTICLES', 'BIOGRAPHY'];
  const tabs: TabType[] = ['ALL', 'WORKS', 'JOURNAL', 'FIELD NOTES', 'PUBLICATIONS', 'BIOGRAPHY'];

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const filterPostsList = () => {
      if (activeTab === 'ALL') {
        setFilteredPosts(posts);
        return;
      }
      
      const filtered = posts.filter(p => {
        const text = p.bodyText.toLowerCase();
        const slugVal = p.slug.toLowerCase();
        
        if (activeTab === 'WORKS') {
          const artLabels = ['PAINTING', 'DRAWING', 'INSTALLATION', 'PERFORMANCE'];
          return p.labels.some(l => artLabels.includes(l));
        }
        if (activeTab === 'JOURNAL') {
          return p.labels.includes('WRITING') || 
                 (p.bodyText.length > 300 && !p.labels.includes('PAINTING') && !p.labels.includes('BIOGRAPHY'));
        }
        if (activeTab === 'FIELD NOTES') {
          const keywords = ['travel', 'residency', 'howl space', 'taiwan', 'korea', 'seoul', 'chuyến đi', 'lưu trú'];
          return p.labels.includes('WRITING') && keywords.some(kw => text.includes(kw));
        }
        if (activeTab === 'PUBLICATIONS') {
          return p.labels.includes('ARTICLES');
        }
        if (activeTab === 'BIOGRAPHY') {
          return p.labels.includes('BIOGRAPHY') || slugVal === 'artist-bio';
        }
        return false;
      });
      
      setFilteredPosts(filtered);
    };

    filterPostsList();
  }, [posts, activeTab]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data);
      }
    } catch {
      console.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (post: Post) => {
    setEditingPost(post);
    setIsAdding(false);
    setTitle(post.title);
    setSlug(post.slug);
    setYear(post.year);
    setDate(post.date);
    setLabels(post.labels);
    setBodyText(post.bodyText);
    setImages(post.images);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setYear(new Date().getFullYear().toString());
    setDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    // Gán nhãn mặc định tùy theo tab đang chọn
    if (activeTab === 'WORKS') setLabels(['PAINTING']);
    else if (activeTab === 'JOURNAL' || activeTab === 'FIELD NOTES') setLabels(['WRITING']);
    else if (activeTab === 'PUBLICATIONS') setLabels(['ARTICLES']);
    else if (activeTab === 'BIOGRAPHY') setLabels(['BIOGRAPHY']);
    else setLabels(['PAINTING']);
    
    setBodyText('');
    setImages([]);
  };

  const handleLabelToggle = (label: string) => {
    if (labels.includes(label)) {
      setLabels(labels.filter(l => l !== label));
    } else {
      setLabels([...labels, label]);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setImages([...images, data.url]);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch {
      alert('Error connecting to upload API');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  const savePostsToDisk = async (newPostsList: Post[]) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPostsList),
      });
      const data = await res.json();
      if (data.success) {
        setPosts(newPostsList);
        setMessage('Changes saved successfully to local database!');
        setTimeout(() => setMessage(''), 4000);
        setEditingPost(null);
        setIsAdding(false);
      } else {
        alert('Failed to save data: ' + data.error);
      }
    } catch {
      alert('Network error saving changes');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !bodyText.trim()) {
      alert('Title or Body Text is required.');
      return;
    }

    const finalSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `post-${Date.now()}`;

    const newPost: Post = {
      filePath: `${year}/${new Date().getMonth() + 1}/${finalSlug}.html`,
      year,
      month: (new Date().getMonth() + 1).toString().padStart(2, '0'),
      slug: finalSlug,
      date,
      title,
      labels,
      images,
      bodyText,
      bodyHtml: `<div>${bodyText.replace(/\n/g, '<br/>')}</div>`,
    };

    let updatedList: Post[];
    if (isAdding) {
      updatedList = [newPost, ...posts];
    } else if (editingPost) {
      updatedList = posts.map(p => p.slug === editingPost.slug ? newPost : p);
    } else {
      return;
    }

    savePostsToDisk(updatedList);
  };

  const handleDelete = (slugToDelete: string) => {
    if (confirm('Are you sure you want to delete this archive item?')) {
      const updatedList = posts.filter(p => p.slug !== slugToDelete);
      savePostsToDisk(updatedList);
    }
  };

  return (
    <Container className="py-24 max-w-7xl bg-background-primary text-text-primary">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border-light pb-6 mb-8 gap-4">
        <div>
          <span className="text-[10px] tracking-[0.3em] text-text-muted font-medium uppercase font-mono block">Offline CMS</span>
          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-wide">ADMIN DASHBOARD</h1>
        </div>
        <button 
          onClick={handleAddClick}
          className="border border-text-primary px-4 py-2 text-xs tracking-widest hover:bg-text-primary hover:text-background-primary transition-all flex items-center gap-2"
        >
          <Plus size={14} /> ADD NEW POST
        </button>
      </div>

      {message && (
        <div className="bg-text-primary text-background-primary p-4 text-xs tracking-widest text-center mb-8 uppercase">
          {message}
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-border-light pb-4 text-xs font-mono">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => {
              setActiveTab(t);
              setEditingPost(null);
              setIsAdding(false);
            }}
            className={`px-3 py-2 border tracking-widest transition-all ${
              activeTab === t 
                ? 'bg-text-primary text-background-primary border-text-primary font-medium' 
                : 'bg-background-primary text-text-secondary border-transparent hover:border-border-light'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Post List (Col span 7 or 12 if not editing) */}
        <div className={`${editingPost || isAdding ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-6`}>
          <h2 className="font-serif text-xl font-light text-text-primary uppercase tracking-wide">
            {activeTab} ({filteredPosts.length} entries)
          </h2>
          
          {loading ? (
            <div className="text-sm text-text-muted italic font-serif">Loading catalog...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-sm text-text-muted italic border border-dashed border-border-light p-8 text-center">
              No entries found in this category. Click &ldquo;ADD NEW POST&rdquo; to create one.
            </div>
          ) : (
            <div className="overflow-x-auto border border-border-light">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-background-secondary border-b border-border-light text-[10px] tracking-wider text-text-muted font-mono uppercase">
                    <th className="p-4 w-16">Year</th>
                    <th className="p-4">Title / Snippet</th>
                    <th className="p-4 w-28">Labels</th>
                    <th className="p-4 text-right w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {filteredPosts.map(p => {
                    const snippet = p.bodyText.replace(/\n/g, ' ').substring(0, 50) + '...';
                    const displayTitle = p.title || snippet;
                    return (
                      <tr key={p.slug} className="hover:bg-background-secondary/50 transition-colors">
                        <td className="p-4 font-mono text-[10px] text-text-muted">{p.year}</td>
                        <td className="p-4 font-serif text-sm font-light">{displayTitle}</td>
                        <td className="p-4">
                          <span className="text-[9px] tracking-wider font-mono text-text-muted uppercase">
                            {p.labels.join(', ')}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => handleEditClick(p)} 
                            className="p-1.5 hover:text-text-primary text-text-muted transition-colors inline-block"
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <a 
                            href={`/works/${p.slug}`} 
                            target="_blank" 
                            className="p-1.5 hover:text-text-primary text-text-muted transition-colors inline-block"
                            title="View Page"
                          >
                            <Eye size={13} />
                          </a>
                          <button 
                            onClick={() => handleDelete(p.slug)} 
                            className="p-1.5 hover:text-red-600 text-text-muted transition-colors inline-block"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Side: Edit Form Drawer (Col span 6) */}
        <AnimatePresence>
          {(editingPost || isAdding) && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:col-span-6 border border-border-light p-6 bg-background-secondary space-y-6"
            >
              <div className="flex justify-between items-center border-b border-border-light pb-4">
                <h3 className="font-serif text-xl font-light uppercase tracking-wide">
                  {isAdding ? 'ADD NEW RECORD' : 'EDIT RECORD'}
                </h3>
                <button 
                  onClick={() => { setEditingPost(null); setIsAdding(false); }}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-text-muted font-mono uppercase block">Title</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    className="w-full bg-background-primary border border-border-light p-2.5 outline-none font-serif text-sm"
                    placeholder="e.g. Cocoon / kén, 2013"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-text-muted font-mono uppercase block">Slug URL</label>
                  <input 
                    type="text" 
                    value={slug} 
                    onChange={e => setSlug(e.target.value)}
                    className="w-full bg-background-primary border border-border-light p-2.5 outline-none font-mono text-[10px]"
                    placeholder="e.g. cocoon-ken-2013"
                  />
                </div>

                {/* Year & Date row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest text-text-muted font-mono uppercase block">Year</label>
                    <input 
                      type="text" 
                      value={year} 
                      onChange={e => setYear(e.target.value)}
                      className="w-full bg-background-primary border border-border-light p-2.5 outline-none font-mono"
                      placeholder="e.g. 2013"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-widest text-text-muted font-mono uppercase block">Exact Date</label>
                    <input 
                      type="text" 
                      value={date} 
                      onChange={e => setDate(e.target.value)}
                      className="w-full bg-background-primary border border-border-light p-2.5 outline-none"
                      placeholder="e.g. Friday, January 3, 2013"
                    />
                  </div>
                </div>

                {/* Labels checkboxes */}
                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest text-text-muted font-mono uppercase block">Labels / Taxonomy</label>
                  <div className="flex flex-wrap gap-2">
                    {labelOptions.map(opt => {
                      const isSelected = labels.includes(opt);
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => handleLabelToggle(opt)}
                          className={`px-3 py-1.5 border text-[9px] tracking-wider font-mono transition-all ${
                            isSelected 
                              ? 'bg-text-primary text-background-primary border-text-primary' 
                              : 'bg-background-primary text-text-secondary border-border-light hover:border-text-muted'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Body Text */}
                <div className="space-y-1">
                  <label className="text-[10px] tracking-widest text-text-muted font-mono uppercase block">Description / Body Text</label>
                  <textarea 
                    value={bodyText} 
                    onChange={e => setBodyText(e.target.value)}
                    rows={8}
                    className="w-full bg-background-primary border border-border-light p-2.5 outline-none font-serif text-sm leading-relaxed"
                    placeholder="Mixed media on paper&#10;50 x 65 (cm)"
                  />
                </div>

                {/* Direct Image Upload and Preview */}
                <div className="space-y-3 border-t border-border-light pt-4">
                  <label className="text-[10px] tracking-widest text-text-muted font-mono uppercase block">Artwork Images</label>
                  
                  {/* Image Thumbnails Grid */}
                  {images.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {images.map((img, idx) => (
                        <div key={idx} className="aspect-square bg-background-primary border border-border-light relative overflow-hidden group">
                          <img src={img} alt="Preview" className="w-full h-full object-cover filter grayscale" />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute inset-0 bg-red-600/90 text-background-primary opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            title="Remove image"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text-muted italic text-[11px] mb-2 font-serif">No images added yet.</p>
                  )}

                  {/* Upload Button */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="border border-text-primary px-4 py-2 hover:bg-text-primary hover:text-background-primary transition-all font-mono text-[9px] tracking-widest flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {uploading ? (
                        <>
                          <Loader2 size={12} className="animate-spin" /> UPLOADING...
                        </>
                      ) : (
                        <>
                          <Upload size={12} /> UPLOAD FILE
                        </>
                      )}
                    </button>
                    
                    <span className="text-[9px] text-text-muted font-mono uppercase">
                      Select local image to upload
                    </span>
                    
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  className="w-full bg-text-primary text-background-primary p-3.5 hover:opacity-90 transition-opacity tracking-widest flex items-center justify-center gap-2 font-medium text-xs mt-6"
                >
                  <Save size={14} /> SAVE RECORD
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
}
