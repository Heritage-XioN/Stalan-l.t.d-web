'use client';

import { useState, useEffect } from 'react';
import { Mail, Trash2, Eye, Check, Search, RefreshCw } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => { fetchMessages(); }, []);

  async function fetchMessages() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) setMessages(await res.json());
    } finally { setLoading(false); }
  }

  async function markRead(id: string) {
    await fetch(`/api/admin/messages/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ read: true }) });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    if (selected?.id === id) setSelected((s) => s ? { ...s, read: true } : s);
  }

  async function deleteMessage(id: string) {
    if (!confirm('Delete this message?')) return;
    await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  const filtered = messages.filter((m) => {
    if (filter === 'unread' && m.read) return false;
    if (filter === 'read' && !m.read) return false;
    if (search) {
      const q = search.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q);
    }
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.28em] text-black/30 mb-1">INBOX</p>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-black uppercase tracking-tight text-[#0A0A0A] md:text-3xl">
            Messages
            {unreadCount > 0 && (
              <span className="ml-3 bg-[#C8F135] px-2 py-0.5 font-['JetBrains_Mono'] text-sm font-bold text-[#0A0A0A]">
                {unreadCount}
              </span>
            )}
          </h1>
        </div>
        <button onClick={fetchMessages} className="flex items-center gap-2 border border-black/8 bg-white px-3 py-2 text-xs font-semibold text-black/50 hover:text-black transition-colors">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full border border-black/8 bg-white pl-9 pr-4 py-2 text-sm text-[#0A0A0A] placeholder:text-black/30 focus:border-[#0A0A0A] focus:outline-none"
          />
        </div>
        <div className="flex gap-1">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.18em] transition-colors ${filter === f ? 'bg-[#0A0A0A] text-white' : 'border border-black/8 bg-white text-black/50 hover:text-black'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-4 ${selected ? 'lg:grid-cols-2' : ''}`}>
        {/* Message list */}
        <div className="border border-black/8 bg-white">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-sm text-black/35">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Mail className="mb-3 h-8 w-8 text-black/15" />
              <p className="text-sm font-semibold text-black/40">No messages found</p>
            </div>
          ) : (
            filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => { setSelected(msg); if (!msg.read) markRead(msg.id); }}
                className={`flex cursor-pointer items-start gap-3 border-b border-black/5 px-4 py-4 last:border-0 hover:bg-black/[0.02] transition-colors ${selected?.id === msg.id ? 'bg-[#C8F135]/10 border-l-2 border-l-[#C8F135]' : ''}`}
              >
                <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${msg.read ? 'bg-black/10' : 'bg-[#C8F135]'}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`truncate text-sm ${msg.read ? 'font-medium text-black/60' : 'font-bold text-[#0A0A0A]'}`}>{msg.name}</p>
                    <p className="shrink-0 font-['JetBrains_Mono'] text-[0.55rem] text-black/30">{new Date(msg.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="truncate text-xs text-black/50">{msg.subject}</p>
                  {msg.company && <p className="truncate text-xs text-black/30">{msg.company}</p>}
                </div>
                <div className="flex shrink-0 gap-1" onClick={(e) => e.stopPropagation()}>
                  {!msg.read && (
                    <button onClick={() => markRead(msg.id)} className="p-1.5 text-black/30 hover:bg-black/5 hover:text-black transition-colors" title="Mark read">
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button onClick={() => deleteMessage(msg.id)} className="p-1.5 text-black/30 hover:bg-red-50 hover:text-red-500 transition-colors" title="Delete">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message detail */}
        {selected && (
          <div className="border border-black/8 bg-white p-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-black text-[#0A0A0A]">{selected.subject}</h2>
                <p className="text-sm text-black/50">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="shrink-0 p-1.5 text-black/30 hover:text-black transition-colors">
                <Eye className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.22em] text-black/30">From</p>
                <p className="text-sm font-semibold text-[#0A0A0A]">{selected.name}</p>
              </div>
              {selected.company && (
                <div>
                  <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.22em] text-black/30">Company</p>
                  <p className="text-sm text-[#0A0A0A]">{selected.company}</p>
                </div>
              )}
              <div>
                <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.22em] text-black/30 mb-2">Message</p>
                <p className="whitespace-pre-wrap rounded bg-black/[0.03] p-4 text-sm leading-6 text-[#0A0A0A]">{selected.message}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <a href={`mailto:${selected.email}`} className="flex-1 bg-[#0A0A0A] py-2.5 text-center text-sm font-bold text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors">
                Reply via Email
              </a>
              <button onClick={() => deleteMessage(selected.id)} className="border border-red-200 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}