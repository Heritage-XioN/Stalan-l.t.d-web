'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { Bot, Edit2, ImagePlus, Plus, Trash2, Upload, X, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Prisma } from '@prisma/client';

interface SatBotPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  price: number | null;
  specifications: Prisma.JsonValue | null;
  published: boolean;
  createdAt: string;
}

const emptyForm = { title: '', content: '', imageUrl: '', price: '', published: true, specifications: [{ key: '', value: '' }] };

function specsFromJson(spec: Prisma.JsonValue | null | undefined): { key: string; value: string }[] {
  if (!spec || typeof spec !== 'object' || Array.isArray(spec)) return [{ key: '', value: '' }];
  const entries = Object.entries(spec as Record<string, unknown>)
    .map(([k, v]) => ({ key: k, value: typeof v === 'string' ? v : String(v ?? '') }))
    .filter((r) => r.key.trim());
  return entries.length ? entries : [{ key: '', value: '' }];
}

export default function AdminSatBotsPage() {
  const [posts, setPosts] = useState<SatBotPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadErr, setUploadErr] = useState('');
  const [editing, setEditing] = useState<SatBotPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadPosts(); }, []);

  async function loadPosts() {
    setLoading(true);
    try { const r = await fetch('/api/admin/sat-bots'); if (r.ok) setPosts(await r.json()); }
    finally { setLoading(false); }
  }

  function openCreate() { setEditing(null); setForm(emptyForm); setUploadErr(''); setOpen(true); }

  function openEdit(post: SatBotPost) {
    setEditing(post);
    setForm({ title: post.title, content: post.content, imageUrl: post.imageUrl ?? '', price: post.price?.toString() ?? '', published: post.published, specifications: specsFromJson(post.specifications) });
    setUploadErr('');
    setOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this S.A.T Bot post? This cannot be undone.')) return;
    await fetch(`/api/admin/sat-bots/${id}`, { method: 'DELETE' });
    setPosts((p) => p.filter((x) => x.id !== id));
  }

  async function togglePublish(post: SatBotPost) {
    const res = await fetch(`/api/admin/sat-bots/${post.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !post.published }) });
    if (res.ok) { const updated = await res.json(); setPosts((p) => p.map((x) => x.id === updated.id ? updated : x)); }
  }

  async function uploadImage(file: File) {
    if (!file.type.startsWith('image/')) { setUploadErr('Please select a valid image file.'); return; }
    if (!supabase) { setUploadErr('Supabase not configured.'); return; }
    setUploading(true); setUploadErr('');
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const base = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'sat-bot';
      const path = `posts/${Date.now()}-${crypto.randomUUID()}-${base}.${ext}`;
      const { error } = await supabase.storage.from('sat-bots').upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (error) throw error;
      const { data } = supabase.storage.from('sat-bots').getPublicUrl(path);
      setForm((f) => ({ ...f, imageUrl: data.publicUrl }));
    } catch { setUploadErr('Upload failed. Check the sat-bots bucket and try again.'); }
    finally { setUploading(false); }
  }

  function onFile(e: ChangeEvent<HTMLInputElement>) { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ''; }
  function onDragOver(e: DragEvent<HTMLDivElement>) { e.preventDefault(); setDragOver(true); }
  function onDragLeave(e: DragEvent<HTMLDivElement>) { e.preventDefault(); setDragOver(false); }
  function onDrop(e: DragEvent<HTMLDivElement>) { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) uploadImage(f); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (uploading) return;
    setSaving(true);
    const price = form.price.trim() === '' ? null : parseFloat(form.price.trim());
    const specs = form.specifications.reduce<Record<string, string>>((acc, s) => { if (s.key.trim() && s.value.trim()) acc[s.key.trim()] = s.value.trim(); return acc; }, {});
    const payload = { title: form.title, content: form.content, imageUrl: form.imageUrl || undefined, price: Number.isNaN(price) ? null : price, specifications: specs, published: form.published };
    try {
      const res = await fetch(editing ? `/api/admin/sat-bots/${editing.id}` : '/api/admin/sat-bots', { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setPosts((p) => editing ? p.map((x) => x.id === saved.id ? saved : x) : [saved, ...p]);
      setOpen(false);
    } catch { alert('Failed to save. Please try again.'); }
    finally { setSaving(false); }
  }

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.28em] text-black/30 mb-1">CONTENT</p>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-black uppercase tracking-tight text-[#0A0A0A] md:text-3xl">S.A.T Bots</h1>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0A0A0A] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      {/* Posts grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-sm text-black/35">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-black/10 py-20 text-center">
          <Bot className="mb-3 h-10 w-10 text-black/15" />
          <p className="font-semibold text-black/40">No posts yet</p>
          <p className="mt-1 text-sm text-black/25">Create your first S.A.T Bot post</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="group border border-black/8 bg-white">
              {post.imageUrl ? (
                <div className="relative aspect-video overflow-hidden bg-black/5">
                  <Image src={post.imageUrl} alt={post.title} fill className="object-cover transition-transform group-hover:scale-105" sizes="400px" />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center bg-black/[0.03]">
                  <Bot className="h-8 w-8 text-black/10" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-black leading-tight text-[#0A0A0A]">{post.title}</h3>
                  <span className={`shrink-0 px-2 py-0.5 font-['JetBrains_Mono'] text-[0.52rem] uppercase tracking-wide ${post.published ? 'bg-[#C8F135] text-[#0A0A0A]' : 'border border-black/10 text-black/35'}`}>
                    {post.published ? 'Live' : 'Draft'}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs text-black/45 mb-3">{post.content}</p>
                {post.price !== null && <p className="font-['JetBrains_Mono'] text-xs font-bold text-[#0A0A0A] mb-3">${post.price}</p>}
                <div className="flex items-center gap-1.5 border-t border-black/5 pt-3">
                  <button onClick={() => openEdit(post)} className="flex items-center gap-1.5 border border-black/8 px-3 py-1.5 text-xs font-semibold text-black/60 hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors">
                    <Edit2 className="h-3 w-3" /> Edit
                  </button>
                  <button onClick={() => togglePublish(post)} className="flex items-center gap-1.5 border border-black/8 px-3 py-1.5 text-xs font-semibold text-black/60 hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors">
                    {post.published ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {post.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="ml-auto p-1.5 text-black/25 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl border border-black/8 bg-white">
            <div className="flex items-center justify-between border-b border-black/8 px-6 py-4">
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-black uppercase text-[#0A0A0A]">
                {editing ? 'Edit Post' : 'New S.A.T Bot Post'}
              </h2>
              <button onClick={() => setOpen(false)} className="p-1.5 text-black/30 hover:text-black"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder="Post title" />
              </div>
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Content *</label>
                <textarea required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none resize-none" placeholder="Post content..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Price (USD)</label>
                  <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder="e.g. 299" />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="flex cursor-pointer items-center gap-2.5 select-none">
                    <div onClick={() => setForm({ ...form, published: !form.published })} className={`relative h-5 w-9 rounded-full transition-colors ${form.published ? 'bg-[#C8F135]' : 'bg-black/15'}`}>
                      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.18em] text-black/50">
                      {form.published ? 'Published' : 'Draft'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Specs */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Specifications</label>
                  <button type="button" onClick={() => setForm((f) => ({ ...f, specifications: [...f.specifications, { key: '', value: '' }] }))} className="border border-black/10 px-2 py-1 text-xs font-semibold text-black/50 hover:text-black">+ Add</button>
                </div>
                <div className="space-y-2">
                  {form.specifications.map((spec, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={spec.key} onChange={(e) => setForm((f) => ({ ...f, specifications: f.specifications.map((s, j) => j === i ? { ...s, key: e.target.value } : s) }))} placeholder="Key" className="flex-1 border border-black/10 px-2.5 py-2 text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" />
                      <input value={spec.value} onChange={(e) => setForm((f) => ({ ...f, specifications: f.specifications.map((s, j) => j === i ? { ...s, value: e.target.value } : s) }))} placeholder="Value" className="flex-1 border border-black/10 px-2.5 py-2 text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" />
                      <button type="button" onClick={() => setForm((f) => ({ ...f, specifications: f.specifications.length === 1 ? [{ key: '', value: '' }] : f.specifications.filter((_, j) => j !== i) }))} className="border border-black/10 px-2 py-2 text-xs text-black/30 hover:text-red-500"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Image</label>
                <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
                <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onClick={() => !uploading && fileRef.current?.click()} className={`cursor-pointer border-2 border-dashed p-4 transition-all ${dragOver ? 'border-[#C8F135] bg-[#C8F135]/5' : 'border-black/10 hover:border-black/25'} ${uploading ? 'cursor-wait' : ''}`}>
                  {form.imageUrl ? (
                    <div className="space-y-3">
                      <div className="relative aspect-video overflow-hidden bg-black/5">
                        <Image src={form.imageUrl} alt="Preview" fill className="object-cover" sizes="600px" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center bg-[#C8F135]"><ImagePlus className="h-3.5 w-3.5 text-[#0A0A0A]" /></div>
                          <p className="text-xs font-semibold text-[#0A0A0A]">Image ready -- click to replace</p>
                        </div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, imageUrl: '' })); }} className="border border-black/10 px-2 py-1 text-xs text-black/40 hover:text-red-500">Remove</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-6 text-center">
                      <Upload className="mb-2 h-6 w-6 text-black/20" />
                      <p className="text-sm font-semibold text-black/40">{uploading ? 'Uploading...' : 'Drop image or click to browse'}</p>
                      <p className="mt-1 font-['JetBrains_Mono'] text-[0.55rem] uppercase tracking-widest text-black/20">JPG -- PNG -- WEBP</p>
                    </div>
                  )}
                </div>
                {uploadErr && <p className="mt-1.5 text-xs text-red-500">{uploadErr}</p>}
              </div>

              <button type="submit" disabled={saving || uploading} className="w-full bg-[#0A0A0A] py-3 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.06em] text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors disabled:opacity-40">
                {saving ? 'Saving...' : uploading ? 'Uploading image...' : editing ? 'Save Changes' : 'Create Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}