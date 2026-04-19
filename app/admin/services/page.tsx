'use client';

import { useState, useEffect } from 'react';
import { Wrench, Plus, Edit2, Trash2, X, Eye, EyeOff } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  iconName: string;
  order: number;
  published: boolean;
}

const emptyForm = { name: '', description: '', iconName: 'Wrench', order: 0, published: true };

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => { loadServices(); }, []);

  async function loadServices() {
    setLoading(true);
    try { const r = await fetch('/api/admin/services'); if (r.ok) setServices(await r.json()); }
    finally { setLoading(false); }
  }

  function openCreate() { setEditing(null); setForm(emptyForm); setOpen(true); }
  function openEdit(s: Service) { setEditing(s); setForm({ name: s.name, description: s.description, iconName: s.iconName, order: s.order, published: s.published }); setOpen(true); }

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
    setSaving(true);
    try {
      const payload = { ...form, order: Number(form.order) };
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
            <div className="hidden grid-cols-[auto_1fr_auto_auto_auto] items-center gap-4 border-b border-black/5 bg-black/[0.02] px-5 py-2.5 sm:grid">
              <span className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-black/35">Order</span>
              <span className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-black/35">Name</span>
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
              <button type="submit" disabled={saving} className="w-full bg-[#0A0A0A] py-3 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.06em] text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors disabled:opacity-40">
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}