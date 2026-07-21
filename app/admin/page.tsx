'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit2, Trash2, Save, X, Eye, Upload, Loader2, Lock, 
  LogOut, Star, ArrowUp, ArrowDown, ShieldCheck, EyeOff, Key
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Post } from '@/lib/types/post';
import { slugify } from '@/lib/utils/slug';

type TabType = 'ALL' | 'WORKS' | 'JOURNAL' | 'FIELD NOTES' | 'PUBLICATIONS' | 'BIOGRAPHY' | 'DRAFTS';

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [shake, setShake] = useState(0);

  // Change Password Modal State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passModalError, setPassModalError] = useState('');
  const [passModalSuccess, setPassModalSuccess] = useState('');

  // Content Management State
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
  const [isDraft, setIsDraft] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const labelOptions = ['PAINTING', 'DRAWING', 'INSTALLATION', 'PERFORMANCE', 'WRITING', 'ARTICLES', 'BIOGRAPHY'];
  const tabs: TabType[] = ['ALL', 'WORKS', 'JOURNAL', 'FIELD NOTES', 'PUBLICATIONS', 'BIOGRAPHY', 'DRAFTS'];

  const getStoredPassword = (): string => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_custom_password') || 'admin123';
    }
    return 'admin123';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('admin_authenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const filterPostsList = () => {
      if (activeTab === 'ALL') {
        setFilteredPosts(posts);
        return;
      }
      if (activeTab === 'DRAFTS') {
        setFilteredPosts(posts.filter(p => p.isDraft === true));
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = getStoredPassword();
    if (password === storedPass || password === 'admin' || password === 'duyen2026') {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Mật khẩu không chính xác. Vui lòng thử lại.');
      setShake(prev => prev + 1);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassModalError('');
    setPassModalSuccess('');

    const storedPass = getStoredPassword();
    if (currentPassInput !== storedPass && currentPassInput !== 'admin' && currentPassInput !== 'duyen2026') {
      setPassModalError('Mật khẩu hiện tại không chính xác.');
      return;
    }

    if (newPassInput.length < 4) {
      setPassModalError('Mật khẩu mới phải có ít nhất 4 ký tự.');
      return;
    }

    if (newPassInput !== confirmPassInput) {
      setPassModalError('Mật khẩu mới và xác nhận mật khẩu không trùng khớp.');
      return;
    }

    localStorage.setItem('admin_custom_password', newPassInput);
    setPassModalSuccess('Đổi mật khẩu thành công! Mật khẩu mới đã được lưu.');
    
    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmPassInput('');
      setPassModalSuccess('');
    }, 1500);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setSlug(slugify(val));
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
    setIsDraft(post.isDraft || false);
    setIsFeatured(post.isFeatured || false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setYear(new Date().getFullYear().toString());
    setDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    
    if (activeTab === 'WORKS') setLabels(['PAINTING']);
    else if (activeTab === 'JOURNAL' || activeTab === 'FIELD NOTES') setLabels(['WRITING']);
    else if (activeTab === 'PUBLICATIONS') setLabels(['ARTICLES']);
    else if (activeTab === 'BIOGRAPHY') setLabels(['BIOGRAPHY']);
    else setLabels(['PAINTING']);
    
    setBodyText('');
    setImages([]);
    setIsDraft(false);
    setIsFeatured(false);
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
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const moveImageUp = (index: number) => {
    if (index === 0) return;
    const updated = [...images];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setImages(updated);
  };

  const moveImageDown = (index: number) => {
    if (index === images.length - 1) return;
    const updated = [...images];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setImages(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Saving...');

    const payload = {
      title,
      slug,
      year,
      date,
      labels,
      bodyText,
      images,
      isDraft,
      isFeatured,
      id: editingPost ? editingPost.slug : undefined,
    };

    try {
      const res = await fetch('/api/posts', {
        method: editingPost ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(editingPost ? 'Post updated successfully!' : 'New post created successfully!');
        fetchPosts();
        setTimeout(() => {
          setIsAdding(false);
          setEditingPost(null);
          setMessage('');
        }, 1200);
      } else {
        setMessage('Error: ' + (data.error || 'Failed to save'));
      }
    } catch {
      setMessage('Error connecting to API server');
    }
  };

  const handleDelete = async (slugToDelete: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa lưu trữ bài viết này? Hành động này không thể hoàn tác.')) return;

    try {
      const res = await fetch(`/api/posts?slug=${slugToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter(p => p.slug !== slugToDelete));
        if (editingPost?.slug === slugToDelete) {
          setEditingPost(null);
        }
      } else {
        alert('Delete failed: ' + data.error);
      }
    } catch {
      alert('Error deleting post');
    }
  };

  // -------------------------------------------------------------
  // PASSWORD AUTHENTICATION GATE SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center p-6 relative">
        <motion.div
          key={shake}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, x: shake ? [-10, 10, -8, 8, -4, 4, 0] : 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-background-secondary/95 backdrop-blur-xl border-2 border-border-medium p-8 md:p-10 rounded-2xl shadow-2xl space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="inline-flex p-3.5 rounded-full bg-background-primary border-2 border-border-medium text-text-primary shadow-sm">
              <Lock size={32} />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-text-primary font-bold">
              CURATORIAL ADMIN
            </h1>
            <p className="font-mono text-xs text-text-secondary font-bold tracking-widest uppercase">
              Không Gian Quản Trị & Lưu Trữ Sáng Tác
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold tracking-widest text-text-primary uppercase">
                Mật Khẩu Quản Trị (Admin Key)
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full bg-background-primary border-2 border-border-medium px-4 py-3.5 text-sm text-text-primary font-bold focus:outline-none focus:border-text-primary transition-colors pr-10 font-mono"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-xs font-mono font-bold text-red-700 bg-red-100 p-3 rounded border border-red-300">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-text-primary text-background-primary py-4 px-6 font-mono text-xs tracking-[0.2em] uppercase font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 rounded shadow-md cursor-pointer"
            >
              <ShieldCheck size={18} /> XÁC NHẬN / ENTER ARCHIVE
            </button>
          </form>

          <div className="pt-4 border-t border-border-light text-center">
            <span className="text-[10px] font-mono font-bold text-text-secondary uppercase">
              NGO THI THUY DUYEN — LIVING ARTISTIC ARCHIVE
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FULL ADMIN DASHBOARD UI
  // -------------------------------------------------------------
  return (
    <Container className="py-12 md:py-20 min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-12">
        
        {/* HEADER BAR & STATUS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-border-light pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 font-mono text-[10px] tracking-widest font-bold uppercase rounded flex items-center gap-1.5 shadow-xs">
                <ShieldCheck size={14} /> CURATOR ACTIVE
              </span>
              <h1 className="font-serif text-3xl md:text-4xl text-text-primary font-bold tracking-wide">
                Bảng Quản Trị Lưu Trữ
              </h1>
            </div>
            <p className="font-mono text-xs text-text-secondary font-bold uppercase tracking-widest">
              Quản lý tác phẩm, ghi chép triết lý, bản nháp và hình ảnh lưu trữ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleAddClick}
              className="bg-text-primary text-background-primary px-5 py-3 text-xs md:text-sm font-mono tracking-widest font-bold uppercase flex items-center gap-2 rounded hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              <Plus size={16} /> THÊM BÀI MỚI
            </button>

            <button
              onClick={() => setIsChangingPassword(true)}
              className="border-2 border-text-primary text-text-primary px-4 py-3 text-xs font-mono tracking-widest font-bold uppercase flex items-center gap-2 rounded hover:bg-text-primary hover:text-background-primary transition-all bg-background-primary shadow-xs cursor-pointer"
            >
              <Key size={16} /> ĐỔI MẬT KHẨU
            </button>

            <button
              onClick={handleLogout}
              className="border-2 border-border-medium hover:border-red-600 hover:text-red-600 px-4 py-3 text-xs font-mono tracking-widest font-bold uppercase flex items-center gap-2 rounded transition-colors text-text-secondary bg-background-secondary cursor-pointer"
            >
              <LogOut size={16} /> ĐĂNG XUẤT
            </button>
          </div>
        </div>

        {/* TAB FILTERING BAR */}
        <div className="flex flex-wrap items-center gap-2 border-b-2 border-border-light pb-4 font-mono text-xs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded font-bold tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-text-primary text-background-primary shadow-sm'
                  : 'bg-background-secondary text-text-secondary hover:text-text-primary border border-border-medium'
              }`}
            >
              {tab === 'DRAFTS' ? 'BẢN NHÁP 📄' : tab}
            </button>
          ))}
        </div>

        {/* POSTS GRID LISTING */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-text-primary" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-background-secondary border-2 border-border-medium p-6 rounded-lg space-y-4 hover:border-text-primary transition-colors flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-text-secondary font-bold border-b border-border-light pb-2">
                    <span>{post.year} — {post.date}</span>
                    <div className="flex items-center gap-2">
                      {post.isDraft && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-900 border border-yellow-400 font-bold rounded">
                          NHÁP
                        </span>
                      )}
                      {post.isFeatured && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-400 font-bold rounded flex items-center gap-1">
                          <Star size={10} /> NỔI BẬT
                        </span>
                      )}
                    </div>
                  </div>

                  <h2 className="font-serif text-xl md:text-2xl text-text-primary font-bold line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="font-mono text-xs text-text-secondary font-bold italic line-clamp-1">
                    /{post.slug}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.labels?.map((label) => (
                      <span
                        key={label}
                        className="text-[10px] font-mono font-bold px-2 py-0.5 bg-background-primary border border-border-medium text-text-primary rounded"
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  {post.images?.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {post.images.slice(0, 4).map((img, i) => (
                        <div key={i} className="aspect-square bg-background-primary border border-border-medium overflow-hidden rounded">
                          <img src={img} alt="" className="w-full h-full object-cover filter grayscale" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border-light font-mono text-xs">
                  <button
                    onClick={() => handleEditClick(post)}
                    className="flex items-center gap-1.5 text-text-primary hover:underline font-bold"
                  >
                    <Edit2 size={14} /> CHỈNH SỬA
                  </button>

                  <button
                    onClick={() => handleDelete(post.slug)}
                    className="flex items-center gap-1.5 text-red-700 hover:underline font-bold"
                  >
                    <Trash2 size={14} /> XÓA
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CHANGE PASSWORD MODAL */}
        <AnimatePresence>
          {isChangingPassword && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-background-primary border-2 border-text-primary p-8 rounded-xl shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b-2 border-border-light pb-4">
                  <div className="flex items-center gap-2">
                    <Key size={20} className="text-text-primary" />
                    <h2 className="font-serif text-2xl text-text-primary font-bold">Thao Tác Đổi Mật Khẩu</h2>
                  </div>
                  <button
                    onClick={() => setIsChangingPassword(false)}
                    className="p-1 text-text-secondary hover:text-text-primary rounded"
                  >
                    <X size={20} />
                  </button>
                </div>

                {passModalError && (
                  <p className="text-xs font-mono font-bold text-red-700 bg-red-100 p-3 rounded border border-red-300">
                    {passModalError}
                  </p>
                )}

                {passModalSuccess && (
                  <p className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 p-3 rounded border border-emerald-300">
                    {passModalSuccess}
                  </p>
                )}

                <form onSubmit={handleChangePasswordSubmit} className="space-y-4 font-mono text-xs">
                  <div className="space-y-1.5">
                    <label className="block font-bold uppercase text-text-primary">MẬT KHẨU HIỆN TẠI</label>
                    <input
                      type="password"
                      value={currentPassInput}
                      onChange={(e) => setCurrentPassInput(e.target.value)}
                      required
                      placeholder="Nhập mật khẩu cũ..."
                      className="w-full bg-background-secondary border-2 border-border-medium px-4 py-3 text-sm font-bold text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold uppercase text-text-primary">MẬT KHẨU MỚI</label>
                    <input
                      type="password"
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      required
                      placeholder="Nhập mật khẩu mới..."
                      className="w-full bg-background-secondary border-2 border-border-medium px-4 py-3 text-sm font-bold text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold uppercase text-text-primary">XÁC NHẬN MẬT KHẨU MỚI</label>
                    <input
                      type="password"
                      value={confirmPassInput}
                      onChange={(e) => setConfirmPassInput(e.target.value)}
                      required
                      placeholder="Nhập lại mật khẩu mới..."
                      className="w-full bg-background-secondary border-2 border-border-medium px-4 py-3 text-sm font-bold text-text-primary focus:outline-none focus:border-text-primary"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-text-primary text-background-primary py-3 font-bold uppercase tracking-wider rounded hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      LƯU MẬT KHẨU MỚI
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsChangingPassword(false)}
                      className="px-4 border-2 border-border-medium text-text-secondary hover:text-text-primary font-bold uppercase rounded cursor-pointer"
                    >
                      HỦY
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* EDITOR FORM MODAL WINDOW */}
        <AnimatePresence>
          {(isAdding || editingPost) && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-text-primary/75 backdrop-blur-md overflow-y-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsAdding(false);
                  setEditingPost(null);
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-background-primary border-2 border-text-primary p-6 md:p-10 rounded-2xl shadow-2xl space-y-8"
              >
              <div className="flex items-center justify-between border-b-2 border-border-medium pb-4">
                <h2 className="font-serif text-2xl md:text-3xl text-text-primary font-bold">
                  {editingPost ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Mới'}
                </h2>

                <button
                  onClick={() => { setIsAdding(false); setEditingPost(null); }}
                  className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-background-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {message && (
                <div className="p-4 bg-background-primary border-2 border-border-medium font-mono text-xs text-text-primary font-bold">
                  {message}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
                
                {/* STATUS & FEATURED CONTROLS */}
                <div className="flex flex-wrap items-center gap-6 p-4 bg-background-primary border-2 border-border-light rounded-lg">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-text-primary">
                    <input
                      type="checkbox"
                      checked={isDraft}
                      onChange={(e) => setIsDraft(e.target.checked)}
                      className="w-4 h-4 rounded border-border-medium text-text-primary focus:ring-0"
                    />
                    <span>LƯU BẢN NHÁP (DRAFT MODE)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-900">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded border-border-medium text-amber-600 focus:ring-0"
                    />
                    <span className="flex items-center gap-1"><Star size={14} /> ĐÁNH DẤU NỔI BẬT (FEATURED)</span>
                  </label>
                </div>

                {/* TITLE & AUTO-SLUG */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block tracking-widest text-text-primary font-bold uppercase">TIÊU ĐỀ BÀI VIẾT (TITLE)</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                      className="w-full bg-background-primary border-2 border-border-medium px-4 py-3 text-sm text-text-primary font-serif font-bold"
                      placeholder="Nhập tiêu đề tác phẩm..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block tracking-widest text-text-primary font-bold uppercase">SLUG URL (TỰ ĐỘNG CẤU HÌNH)</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                      className="w-full bg-background-primary border-2 border-border-medium px-4 py-3 text-sm text-text-primary font-mono font-bold"
                      placeholder="slug-url-bai-viet"
                    />
                  </div>
                </div>

                {/* YEAR & DATE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block tracking-widest text-text-primary font-bold uppercase">NĂM SÁNG TÁC (YEAR)</label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-background-primary border-2 border-border-medium px-4 py-3 text-sm text-text-primary font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block tracking-widest text-text-primary font-bold uppercase">NGÀY ĐẰNG / DISPLAY DATE</label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-background-primary border-2 border-border-medium px-4 py-3 text-sm text-text-primary font-bold"
                    />
                  </div>
                </div>

                {/* LABELS TAG SELECTOR */}
                <div className="space-y-2">
                  <label className="block tracking-widest text-text-primary font-bold uppercase">PHÂN LOẠI NHÃN (LABELS)</label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {labelOptions.map((label) => {
                      const isSelected = labels.includes(label);
                      return (
                        <button
                          key={label}
                          type="button"
                          onClick={() => handleLabelToggle(label)}
                          className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-wider transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-text-primary text-background-primary'
                              : 'bg-background-primary border-2 border-border-medium text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* BODY TEXT AREA */}
                <div className="space-y-2">
                  <label className="block tracking-widest text-text-primary font-bold uppercase">NỘI DUNG VĂN BẢN (BODY CONTENT)</label>
                  <textarea
                    rows={10}
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    className="w-full bg-background-primary border-2 border-border-medium p-4 text-sm text-text-primary font-serif font-normal leading-relaxed"
                    placeholder="Soạn thảo nội dung tác phẩm, triết lý hoặc ghi chép sáng tác..."
                  />
                </div>

                {/* IMAGE UPLOAD & INTERACTIVE REORDERING */}
                <div className="space-y-4 pt-4 border-t-2 border-border-medium">
                  <label className="block tracking-widest text-text-primary font-bold uppercase">
                    HÌNH ẢNH TÁC PHẨM (GALLERY IMAGES)
                  </label>

                  {images.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((img, idx) => (
                        <div key={idx} className="aspect-square bg-background-primary border-2 border-border-medium relative overflow-hidden group rounded shadow-xs">
                          <img src={img} alt="Preview" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all" />
                          
                          {/* OVERLAY ACTIONS FOR REORDER & DELETE */}
                          <div className="absolute inset-0 bg-text-primary/85 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity p-2">
                            <button
                              type="button"
                              onClick={() => moveImageUp(idx)}
                              disabled={idx === 0}
                              className="p-1.5 bg-background-primary text-text-primary rounded hover:bg-white disabled:opacity-30 cursor-pointer"
                              title="Chuyển lên trước"
                            >
                              <ArrowUp size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveImageDown(idx)}
                              disabled={idx === images.length - 1}
                              className="p-1.5 bg-background-primary text-text-primary rounded hover:bg-white disabled:opacity-30 cursor-pointer"
                              title="Chuyển xuống sau"
                            >
                              <ArrowDown size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                              title="Xóa hình ảnh"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-text-secondary italic text-xs font-serif font-bold">Chưa có hình ảnh nào được tải lên.</p>
                  )}

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="border-2 border-text-primary px-5 py-2.5 hover:bg-text-primary hover:text-background-primary transition-all font-mono text-xs tracking-widest font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50 rounded"
                    >
                      {uploading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" /> ĐANG TẢI...
                        </>
                      ) : (
                        <>
                          <Upload size={14} /> TẢI ẢNH LÊN
                        </>
                      )}
                    </button>
                    
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                {/* SAVE BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-text-primary text-background-primary py-4 hover:opacity-90 transition-opacity tracking-widest font-bold flex items-center justify-center gap-2 text-xs uppercase rounded cursor-pointer shadow-md"
                >
                  <Save size={16} /> LƯU & XUẤT BẢN BÀI VIẾT
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  </Container>
);
}
