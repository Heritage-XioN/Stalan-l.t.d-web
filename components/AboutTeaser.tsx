'use client';

import { motion, type Transition } from 'framer-motion';
import Link from 'next/link';

const revealEase = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    tag: '01',
    title: 'Safety First',
    body: 'Every system we build is engineered with electrical safety and human protection at its core.',
  },
  {
    tag: '02',
    title: 'Autonomous Innovation',
    body: 'We develop intelligent, self-operating platforms that solve real-world logistics and mobility challenges.',
  },
  {
    tag: '03',
    title: 'Human-Centered Design',
    body: 'Our technology is built to serve people — accessible, practical, and designed for everyday life.',
  },
];

export function AboutTeaser() {
  return (
    <section className="bg-[#FAFAFA] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden border border-black/10 bg-white shadow-[0_8px_40px_rgba(10,10,10,0.05)] lg:grid-cols-[1fr_2fr]">

          {/* Left — label + headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: revealEase } satisfies Transition}
            viewport={{ once: true }}
            className="border-b border-black/10 p-8 sm:p-10 lg:border-b-0 lg:border-r"
          >
            <p className="font-['JetBrains_Mono'] text-[0.62rem] uppercase tracking-[0.28em] text-[#0A0A0A]/50">
              WHO WE ARE
            </p>
            <h2 className="mt-4 font-['Plus_Jakarta_Sans'] text-[clamp(2rem,4.5vw,3.4rem)] font-black uppercase leading-[0.92] tracking-[-0.04em] text-[#0A0A0A]">
              BUILT FOR<br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '1.4px #0A0A0A' }}
              >
                IMPACT
              </span>
            </h2>
            <p className="mt-6 text-sm leading-7 text-[#0A0A0A]/60">
              Stalan L.T.D is a multi-disciplinary technology firm building next-generation systems at the intersection of safety, autonomy, and intelligence.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 border border-black bg-[#0A0A0A] px-5 py-3 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#C8F135] hover:text-[#0A0A0A] hover:border-[#C8F135]"
            >
              Our Story →
            </Link>
          </motion.div>

          {/* Right — pillars */}
          <div className="divide-y divide-black/10">
            {pillars.map((p, i) => (
              <motion.div
                key={p.tag}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: revealEase, delay: i * 0.1 } satisfies Transition}
                viewport={{ once: true }}
                className="group flex gap-6 p-7 transition-colors hover:bg-[#C8F135]/10 sm:p-9"
              >
                <span className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.2em] text-[#0A0A0A]/30 pt-1 shrink-0">
                  {p.tag}
                </span>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-black uppercase tracking-[-0.02em] text-[#0A0A0A]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#0A0A0A]/60">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
