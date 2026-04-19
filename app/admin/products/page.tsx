'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Package, Plus, Edit2, Trash2, X, Eye, EyeOff } from 'lucide-react';

interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: string;
  description: string;
  price: number | null;
  purchaseUrl: string | null;
  imageUrl: string | null;
  tags: string[];
  published: boolean;
  order: number;
}

const CATEGORIES = ['Software', 'Hardware', 'Service', 'Subscription', 'Other'];
const STATUSES = ['Available', 'Coming Soon', 'Discontinued', 'Beta'];

const emptyForm = { name: '', slug: '', category: 'Software', status: 'Available', description: '', price: '', purchaseUrl: '', imageUrl: '', tags: '', published: true, order: 0 };

function toSlug(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => { loadProducts(); }, []);

  async function loadProducts() {
    setLoading(true);
    try { const r = await fetch('/api/admin/products'); if (r.ok) setProducts(await r.json()); }
    finally { setLoading(false); }
  }

  function openCreate() {
    setEditing(null); setForm(emptyForm); setSlugManual(false); setOpen(true);
  }
  function openEdit(p: Product) {
    setEditing(p);
    setForm({ name: p.name, slug: p.slug, category: p.category, status: p.status, description: p.description, price: p.price?.toString() ?? '', purchaseUrl: p.purchaseUrl ?? '', imageUrl: p.imageUrl ?? '', tags: p.tags.join(', '), published: p.published, order: p.order });
    setSlugManual(true);
    setOpen(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  async function togglePublish(p: Product) {
    const res = await fetch(`/api/admin/products/${p.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !p.published }) });
    if (res.ok) { const u = await res.json(); setProducts((prev) => prev.map((x) => x.id === u.id ? u : x)); }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setForm((f) => ({ ...f, name, slug: slugManual ? f.slug : toSlug(name) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const price = form.price.trim() === '' ? null : parseFloat(form.price.trim());
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
    const payload = { name: form.name, slug: form.slug, category: form.category, status: form.status, description: form.description, price: Number.isNaN(price) ? null : price, purchaseUrl: form.purchaseUrl || undefined, imageUrl: form.imageUrl || undefined, tags, published: form.published, order: Number(form.order) };
    try {
      const res = await fetch(editing ? `/api/admin/products/${editing.id}` : '/api/admin/products', { method: editing ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setProducts((prev) => editing ? prev.map((x) => x.id === saved.id ? saved : x) : [saved, ...prev]);
      setOpen(false);
    } catch { alert('Failed to save product.'); }
    finally { setSaving(false); }
  }

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.28em] text-black/30 mb-1">CATALOGUE</p>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-black uppercase tracking-tight text-[#0A0A0A] md:text-3xl">Products</h1>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#0A0A0A] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-black/35">Loading...</div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-black/10 py-16 text-center">
          <Package className="mb-3 h-8 w-8 text-black/15" />
          <p className="text-sm font-semibold text-black/40">No products yet</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="group border border-black/8 bg-white">
              {p.imageUrl ? (
                <div className="relative aspect-video overflow-hidden bg-black/5">
                  <Image src={p.imageUrl} alt={p.name} fill className="object-cover transition-transform group-hover:scale-105" sizes="400px" />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center bg-[#C8F135]/5">
                  <Package className="h-8 w-8 text-[#C8F135]" />
                </div>
              )}
              <div className="p-4">
                <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-black text-[#0A0A0A]">{p.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="border border-black/10 px-1.5 py-0.5 font-['JetBrains_Mono'] text-[0.48rem] uppercase tracking-wide text-black/35">{p.status}</span>
                    <span className={`px-2 py-0.5 font-['JetBrains_Mono'] text-[0.52rem] uppercase tracking-wide ${p.published ? 'bg-[#C8F135] text-[#0A0A0A]' : 'border border-black/10 text-black/35'}`}>{p.published ? 'Live' : 'Draft'}</span>
                  </div>
                </div>
                <p className="mb-1.5 font-['JetBrains_Mono'] text-[0.6rem] text-black/35">{p.category}</p>
                <p className="line-clamp-2 text-xs text-black/45 mb-3">{p.description}</p>
                {p.price !== null && <p className="font-['JetBrains_Mono'] text-xs font-bold text-[#0A0A0A] mb-1">${p.price}</p>}
                {p.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="border border-black/8 px-1.5 py-0.5 font-['JetBrains_Mono'] text-[0.48rem] uppercase tracking-wide text-black/35">{t}</span>
                    ))}
                    {p.tags.length > 3 && <span className="font-['JetBrains_Mono'] text-[0.48rem] text-black/25">+{p.tags.length - 3}</span>}
                  </div>
                )}
                <div className="flex items-center gap-1.5 border-t border-black/5 pt-3">
                  <button onClick={() => openEdit(p)} className="flex items-center gap-1.5 border border-black/8 px-3 py-1.5 text-xs font-semibold text-black/60 hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors">
                    <Edit2 className="h-3 w-3" /> Edit
                  </button>
                  <button onClick={() => togglePublish(p)} className="flex items-center gap-1.5 border border-black/8 px-3 py-1.5 text-xs font-semibold text-black/60 hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors">
                    {p.published ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    {p.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="ml-auto p-1.5 text-black/25 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-xl border border-black/8 bg-white">
            <div className="flex items-center justify-between border-b border-black/8 px-6 py-4">
              <h2 className="font-['Plus_Jakarta_Sans'] text-base font-black uppercase text-[#0A0A0A]">{editing ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setOpen(false)} className="p-1 text-black/30 hover:text-black"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Name *</label>
                <input required value={form.name} onChange={handleNameChange} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder="Product name" />
              </div>
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Slug *</label>
                <input required value={form.slug} onChange={(e) => { setSlugManual(true); setForm({ ...form, slug: e.target.value }); }} className="w-full border border-black/10 px-3 py-2.5 font-['JetBrains_Mono'] text-xs text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder="url-friendly-slug" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none">
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Description *</label>
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none resize-none" placeholder="Product description..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Price (USD)</label>
                  <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder="e.g. 99.99" />
                </div>
                <div>
                  <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Display Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Purchase URL</label>
                <input value={form.purchaseUrl} onChange={(e) => setForm({ ...form, purchaseUrl: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder="https://..." />
              </div>
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Image URL</label>
                <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder="https://..." />
              </div>
              <div>
                <label className="mb-1.5 block font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-black/40">Tags (comma separated)</label>
                <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full border border-black/10 px-3 py-2.5 text-sm text-[#0A0A0A] focus:border-[#0A0A0A] focus:outline-none" placeholder="satellite, tracking, software" />
              </div>
              <div className="flex items-center gap-2.5">
                <div onClick={() => setForm({ ...form, published: !form.published })} className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${form.published ? 'bg-[#C8F135]' : 'bg-black/15'}`}>
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </div>
                <span className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.18em] text-black/50">{form.published ? 'Published' : 'Draft'}</span>
              </div>
              <button type="submit" disabled={saving} className="w-full bg-[#0A0A0A] py-3 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.06em] text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors disabled:opacity-40">
                {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}