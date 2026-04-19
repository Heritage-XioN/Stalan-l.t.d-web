'use client';

import { useState, useEffect } from 'react';
import { Rss, Trash2, Download, Search } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetch('/api/admin/newsletter').then((r) => r.json()).then(setSubscribers).finally(() => setLoading(false)); }, []);

  async function handleDelete(id: string) {
    if (!confirm('Remove this subscriber?')) return;
    await fetch(`/api/admin/newsletter/${id}`, { method: 'DELETE' });
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  }

  function exportCSV() {
    const rows = ['Email,Date', ...subscribers.map((s) => `${s.email},${new Date(s.createdAt).toLocaleDateString()}`)];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'subscribers.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = subscribers.filter((s) => s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.28em] text-black/30 mb-1">MAILING LIST</p>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-black uppercase tracking-tight text-[#0A0A0A] md:text-3xl">
            Newsletter
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#C8F135] px-3 py-1.5">
            <span className="font-['Plus_Jakarta_Sans'] text-lg font-black text-[#0A0A0A]">{subscribers.length}</span>
            <span className="ml-1.5 font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-[#0A0A0A]/60">subscribers</span>
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 border border-black/8 bg-white px-3 py-2 text-xs font-semibold text-black/50 hover:text-black transition-colors">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="w-full border border-black/8 bg-white pl-9 pr-4 py-2 text-sm text-[#0A0A0A] placeholder:text-black/30 focus:border-[#0A0A0A] focus:outline-none"
        />
      </div>

      <div className="border border-black/8 bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-sm text-black/35">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Rss className="mb-3 h-8 w-8 text-black/15" />
            <p className="text-sm font-semibold text-black/40">{search ? 'No matches' : 'No subscribers yet'}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-[1fr_auto_auto] items-center border-b border-black/5 bg-black/[0.02] px-5 py-2.5">
              <span className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-black/35">Email</span>
              <span className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-black/35 pr-10">Joined</span>
              <span />
            </div>
            {filtered.map((s) => (
              <div key={s.id} className="grid grid-cols-[1fr_auto_auto] items-center border-b border-black/5 px-5 py-3 last:border-0 hover:bg-black/[0.01]">
                <p className="text-sm font-medium text-[#0A0A0A]">{s.email}</p>
                <p className="pr-4 font-['JetBrains_Mono'] text-[0.6rem] text-black/35">{new Date(s.createdAt).toLocaleDateString()}</p>
                <button onClick={() => handleDelete(s.id)} className="p-1.5 text-black/25 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <div className="border-t border-black/5 px-5 py-3">
              <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] text-black/30">
                {filtered.length} of {subscribers.length} shown
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}