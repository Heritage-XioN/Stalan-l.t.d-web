'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, type ChangeEvent, type DragEvent } from 'react';
import { Wrench, Plus, Edit2, Trash2, X, Eye, EyeOff, Upload, ImagePlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Service {
  id: string;
  name: string;
  description: string;
  iconName: string;
  imageUrl: string | null;
  order: number;
  published: boolean;
}

const emptyForm = { name: '', description: '', iconName: 'Wrench', imageUrl: '', order: 0, published: true };

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadErr, setUploadErr] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadServices(); }, []);

  async function loadServices() {
    setLoading(true);
    try { const r = await fetch('/api/admin/services'); if (r.ok) setServices(await r.json()); }
    finally { setLoading(false); }
  }

  function openCreate() { setEditing(null); setForm(emptyForm); setUploadErr(''); setOpen(true); }
  function openEdit(s: Service) {
    setEditing(s);
    setForm({ name: s.name, description: s.description, iconName: s.iconName, imageUrl: s.imageUrl ?? '', order: s.order, published: s.published });
    setUploadErr('');
    setOpen(true);
  }

  async function uploadImage(file: File) {
    if (!file.type.startsWith('image/')) { setUploadErr('Please select a valid image file.'); return; }
    if (!supabase) { setUploadErr('Supabase not configured.'); return; }

    setUploading(true);
    setUploadErr('');
    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const base = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'service';
      const path = `services/${Date.now()}-${crypto.randomUUID()}-${base}.${ext}`;

      const { error } = await supabase.storage.from('sat-bots').upload(path, file, { cacheControl: '3600', upsert: false, contentType: file.type });
      if (error) throw error;

      const { data } = supabase.storage.from('sat-bots').getPublicUrl(path);
      setForm((f) => ({ ...f, imageUrl: data.publicUrl }));
    } catch {
      setUploadErr('Upload failed. Check your Supabase bucket and try again.');
    } finally {
      setUploading(false);
    }
  }

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadImage(file);
    e.target.value = '';
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(true);
  }

  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadImage(file);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this service?')) return;
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  async function togglePublish(s: Service) {
    const res = await fetch(`/api/admin/services/${s.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !s.published }) });
    if (res.ok) { const updated = await res.json(); setServices((prev) => prev.map((x) => x.id === updated.id ? updated : x)); }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (uploading) return;
    setSaving(true);
    try {
      const payload = { ...form, imageUrl: form.imageUrl || undefined, order: Number(form.order) };
      const res = await fetch(editing ? `/api/admin/services/${editing.id}` : '/api/admin/services', { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setServices((prev) => editing ? prev.map((x) => x.id === saved.id ? saved : x) : [...prev, saved]);
      setOpen(false);
    } catch { alert('Failed to save service.'); }
    finally { setSaving(false); }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.28em] text-black/30 mb-1">CONTENT</p>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-black uppercase tracking-tight text-[#0A0A0A] md:text-3xl">Services</h1>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0A0A0A] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      <div className="border border-black/8 bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-sm text-black/35">Loading...</div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Wrench className="mb-3 h-8 w-8 text-black/15" />
            <p className="text-sm font-semibold text-black/40">No services yet</p>
          </div>
        ) : (
          <>
            <div className="hidden grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 border-b border-black/5 bg-black/[0.02] px-5 py-2.5 sm:grid">
              <span className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-black/35">Order</span>
              <span className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-black/35">Name</span>
              <span className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-black/35">Image</span>
              <span className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-black/35">Icon</span>
              <span className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-black/35">Status</span>
              <span />
            </div>
            {services.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center gap-3 border-b border-black/5 px-5 py-4 last:border-0 hover:bg-black/[0.01]">
                <span className="font-['JetBrains_Mono'] text-xs text-black/30 w-6 shrink-0">{s.order}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0A0A0A]">{s.name}</p>
                  <p className="truncate text-xs text-black/45">{s.description}</p>
                </div>
                <span className="font-['JetBrains_Mono'] text-[0.6rem] text-black/35 hidden sm:block">{s.imageUrl ? 'Yes' : 'No'}</span>
                <span className="font-['JetBrains_Mono'] text-[0.6rem] text-black/35 hidden sm:block">{s.iconName}</span>
                <span className={`px-2 py-0.5 font-['JetBrains_Mono'] text-[0.52rem] uppercase tracking-wide ${s.published ? 'bg-[#C8F135] text-[#0A0A0A]' : 'border border-black/10 text-black/35'}`}>
                  {s.published ? 'Live' : 'Draft'}
                </span>
                <div className="flex gap-1">
                  <button onClick={() => togglePublish(s)} className="p-1.5 text-black/30 hover:bg-black/5 hover:text-black transition-colors" title={s.published ? 'Unpublish' : 'Publish'}>
                    {s.published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => openEdit(s)} className="p-1.5 text-black/30 hover:bg-black/5 hover:text-black transition-colors">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 text-black/25 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md border border-black/8 bg-white">
            <div className="flex items-center justify-between border-b border-black/8 px-6 py-4">
              <h2 className="font-['Plus_Jakarta_Sans'] text-base font-black uppercase text-[#0A0A0A]">{editing ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setOpen(false)} className="p-1 text-black/30 hover:text-black"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {[
                { label: 'Name *', key: 'name', required: true, placeholder: 'Service name' },
                { label: 'Description *', key: 'description', required: true, placeholder: 'Short description' },
                { label: 'Icon Name', key: 'iconName', required: false, placeholder: 'e.g. Wrench, Code, Shield' },
              ].map(({ label, key, required, placeholder }) => (
                <div key={key}>
                  <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">{label}</label>
                  <input required={required} value={(form as Record<string, unknown>)[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder={placeholder} />
                </div>
              ))}

              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Service Image</label>
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  className={`border border-dashed p-4 transition-colors ${dragOver ? 'border-[#C8F135] bg-[#C8F135]/10' : 'border-black/15 bg-black/[0.02]'}`}
                >
                  {form.imageUrl ? (
                    <div className="space-y-3">
                      <div className="relative aspect-video overflow-hidden border border-black/10 bg-black/5">
                        <Image src={form.imageUrl} alt="Service image preview" fill className="object-cover" sizes="600px" unoptimized />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="flex items-center gap-1.5 border border-black/10 px-3 py-1.5 text-xs font-semibold text-black/60 hover:border-[#0A0A0A] hover:text-[#0A0A0A]"
                        >
                          <Upload className="h-3.5 w-3.5" /> Replace
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, imageUrl: '' }))}
                          className="flex items-center gap-1.5 border border-black/10 px-3 py-1.5 text-xs font-semibold text-black/50 hover:border-red-300 hover:text-red-600"
                        >
                          <X className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center py-6 text-center"
                    >
                      <ImagePlus className="h-7 w-7 text-black/25" />
                      <p className="mt-2 text-sm font-semibold text-black/60">Drop image here or click to upload</p>
                      <p className="mt-1 text-xs text-black/35">PNG, JPG, WEBP</p>
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
                </div>
                {uploadErr && <p className="mt-2 text-xs text-red-600">{uploadErr}</p>}
              </div>

              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Image URL (Optional)</label>
                <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder="https://..." />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Display Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="flex cursor-pointer items-center gap-2.5 select-none">
                    <div onClick={() => setForm({ ...form, published: !form.published })} className={`relative h-5 w-9 rounded-full transition-colors ${form.published ? 'bg-[#C8F135]' : 'bg-black/15'}`}>
                      <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.18em] text-black/50">{form.published ? 'Published' : 'Draft'}</span>
                  </label>
                </div>
              </div>
              <button type="submit" disabled={saving || uploading} className="w-full bg-[#0A0A0A] py-3 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.06em] text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors disabled:opacity-40">
                {uploading ? 'Uploading Image...' : saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}