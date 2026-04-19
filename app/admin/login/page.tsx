'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] p-4">
      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-white/10 bg-white/5">
            <Lock className="h-6 w-6 text-[#C8F135]" />
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-xl font-black uppercase tracking-[0.08em] text-white">
            STALAN ADMIN
          </p>
          <p className="mt-1 font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.28em] text-white/30">
            Restricted Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              className="w-full border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-white/25 focus:border-[#C8F135] focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
              tabIndex={-1}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && (
            <p className="font-['JetBrains_Mono'] text-[0.62rem] uppercase tracking-[0.18em] text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#C8F135] py-3 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.08em] text-[#0A0A0A] transition-all hover:bg-white disabled:opacity-40"
          >
            {loading ? 'Authenticating...' : 'Enter Dashboard'}
          </button>
        </form>

        <p className="mt-8 text-center font-['JetBrains_Mono'] text-[0.55rem] uppercase tracking-[0.22em] text-white/15">
          Stalan L.T.D -- Internal Use Only
        </p>
      </div>
    </div>
  );
}