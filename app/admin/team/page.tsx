'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, type ChangeEvent, type DragEvent } from 'react';
import { Users, Plus, Edit2, Trash2, X, Upload, ImagePlus } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string | null;
  imageUrl: string | null;
  linkedin: string | null;
  order: number;
}

const emptyForm = { name: '', role: '', title: '', bio: '', imageUrl: '', linkedin: '', order: 0 };

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadMembers(); }, []);

  async function loadMembers() {
    setLoading(true);
    try { const r = await fetch('/api/admin/team'); if (r.ok) setMembers(await r.json()); }
    finally { setLoading(false); }
  }

  function openCreate() { setEditing(null); setForm(emptyForm); setUploadErr(''); setOpen(true); }
  function openEdit(m: TeamMember) {
    setEditing(m);
    setForm({ name: m.name, role: m.role, title: m.title, bio: m.bio ?? '', imageUrl: m.imageUrl ?? '', linkedin: m.linkedin ?? '', order: m.order });
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
      const base = file.name.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'team';
      const path = `team/${Date.now()}-${crypto.randomUUID()}-${base}.${ext}`;
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

  function onDragOver(e: DragEvent<HTMLDivElement>) { e.preventDefault(); setDragOver(true); }
  function onDragLeave() { setDragOver(false); }
  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadImage(file);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this team member?')) return;
    await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order), bio: form.bio || undefined, imageUrl: form.imageUrl || undefined, linkedin: form.linkedin || undefined };
      const res = await fetch(editing ? `/api/admin/team/${editing.id}` : '/api/admin/team', { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setMembers((prev) => editing ? prev.map((x) => x.id === saved.id ? saved : x) : [...prev, saved]);
      setOpen(false);
    } catch { alert('Failed to save team member.'); }
    finally { setSaving(false); }
  }

  function F(key: string, label: string, placeholder: string, required = false, type = 'text') {
    return (
      <div key={key}>
        <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">{label}{required ? ' *' : ''}</label>
        <input required={required} type={type} value={(form as Record<string, unknown>)[key] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder={placeholder} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.28em] text-black/30 mb-1">PEOPLE</p>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-black uppercase tracking-tight text-[#0A0A0A] md:text-3xl">Team</h1>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0A0A0A] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors">
          <Plus className="h-4 w-4" /> Add Member
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-black/35">Loading...</div>
      ) : members.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-black/10 py-16 text-center">
          <Users className="mb-3 h-8 w-8 text-black/15" />
          <p className="text-sm font-semibold text-black/40">No team members yet</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <div key={m.id} className="border border-black/8 bg-white p-4">
              <div className="mb-3 flex items-center gap-3">
                {m.imageUrl ? (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-black/8">
                    <Image src={m.imageUrl} alt={m.name} fill className="object-cover" sizes="48px" />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-black/8 bg-[#C8F135]">
                    <span className="font-['Plus_Jakarta_Sans'] text-base font-black text-[#0A0A0A]">{m.name.charAt(0).toUpperCase()}</span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[#0A0A0A]">{m.name}</p>
                  <p className="truncate text-xs font-medium text-black/50">{m.title}</p>
                </div>
              </div>
              <div className="mb-3 flex items-center gap-1.5">
                <span className="border border-black/10 px-2 py-0.5 font-['JetBrains_Mono'] text-[0.5rem] uppercase tracking-wide text-black/40">{m.role}</span>
                <span className="font-['JetBrains_Mono'] text-[0.55rem] text-black/25">#{m.order}</span>
              </div>
              {m.bio && <p className="line-clamp-2 text-xs text-black/40 mb-3">{m.bio}</p>}
              <div className="flex items-center gap-1.5 border-t border-black/5 pt-3">
                <button onClick={() => openEdit(m)} className="flex items-center gap-1.5 border border-black/8 px-3 py-1.5 text-xs font-semibold text-black/60 hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors">
                  <Edit2 className="h-3 w-3" /> Edit
                </button>
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 border border-black/8 px-3 py-1.5 text-xs font-semibold text-black/40 hover:text-[#0A0A0A] transition-colors">
                    LinkedIn
                  </a>
                )}
                <button onClick={() => handleDelete(m.id)} className="ml-auto p-1.5 text-black/25 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-md border border-black/8 bg-white">
            <div className="flex items-center justify-between border-b border-black/8 px-6 py-4">
              <h2 className="font-['Plus_Jakarta_Sans'] text-base font-black uppercase text-[#0A0A0A]">{editing ? 'Edit Member' : 'New Team Member'}</h2>
              <button onClick={() => setOpen(false)} className="p-1 text-black/30 hover:text-black"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {F('name', 'Name', 'Full name', true)}
              <div className="grid grid-cols-2 gap-3">
                {F('role', 'Role', 'e.g. Director, Engineer', true)}
                {F('title', 'Title', 'Job title', true)}
              </div>
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none resize-none" placeholder="Short biography..." />
              </div>
              {/* Photo upload */}
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Profile Photo</label>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
                {form.imageUrl ? (
                  <div className="relative mb-2 flex items-center gap-3 border border-black/10 p-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-black/8">
                      <Image src={form.imageUrl} alt="Preview" fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs text-black/50">{form.imageUrl}</p>
                    </div>
                    <button type="button" onClick={() => setForm((f) => ({ ...f, imageUrl: '' }))} className="shrink-0 p-1 text-black/30 hover:text-red-500"><X className="h-4 w-4" /></button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed py-6 transition-colors ${dragOver ? 'border-[#C8F135] bg-[#C8F135]/5' : 'border-black/10 hover:border-black/25'}`}
                  >
                    {uploading ? (
                      <Upload className="h-5 w-5 animate-bounce text-black/30" />
                    ) : (
                      <ImagePlus className="h-5 w-5 text-black/25" />
                    )}
                    <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.18em] text-black/35">
                      {uploading ? 'Uploading...' : 'Click or drag to upload photo'}
                    </p>
                  </div>
                )}
                {uploadErr && <p className="mt-1.5 text-xs text-red-500">{uploadErr}</p>}
              </div>
              {F('linkedin', 'LinkedIn URL', 'https://linkedin.com/in/...')}
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Display Order</label>
                <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" />
              </div>
              <button type="submit" disabled={saving} className="w-full bg-[#0A0A0A] py-3 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.06em] text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors disabled:opacity-40">
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Member'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}