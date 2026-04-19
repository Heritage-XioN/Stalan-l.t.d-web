'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSuccess(true);
        setEmail('');
        setTimeout(() => setSuccess(false), 4000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to subscribe');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#0A0A0A] border-y border-white/8 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Left copy */}
          <div className="max-w-sm">
            <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.28em] text-white/30 mb-2">
              NEWSLETTER
            </p>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-black uppercase tracking-tight text-white">
              Stay in the Loop
            </h2>
            <p className="mt-2 text-sm text-white/40">
              Stalan&apos;s latest innovations, products and updates — direct to your inbox.
            </p>
          </div>

          {/* Right form */}
          <div className="w-full max-w-md">
            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5 text-[#C8F135]"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="font-['JetBrains_Mono'] text-sm">You&apos;re subscribed!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-0">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="flex-1 border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-[#C8F135] focus:outline-none transition-colors disabled:opacity-50"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 bg-[#C8F135] px-6 py-3 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.06em] text-[#0A0A0A] hover:bg-white transition-colors disabled:opacity-50"
                  aria-label="Subscribe to newsletter"
                >
                  {loading ? '...' : 'Subscribe'}
                </button>
              </form>
            )}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 font-['JetBrains_Mono'] text-[0.62rem] text-red-400"
              >
                {error}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
