'use client';

import Link from 'next/link';
import { motion, type Transition } from 'framer-motion';

const revealEase = [0.16, 1, 0.3, 1] as const;

export function AboutHero() {
  return (
    <section className="bg-[#FAFAFA] pt-24 text-[#0A0A0A] sm:pt-28">
      {/* Ticker */}
      <div className="w-full overflow-hidden border-y border-black/10 bg-[#C8F135] py-2.5">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="flex min-w-max items-center"
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="px-5 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.26em] text-[#0A0A0A]">
              WHO WE ARE • OUR MISSION • OUR VISION • STALAN L.T.D •
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero grid */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid overflow-hidden border border-black/10 bg-white shadow-[0_20px_70px_rgba(10,10,10,0.06)] lg:grid-cols-[1.4fr_0.6fr]">
          {/* Left */}
          <div className="border-b border-black/10 p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: revealEase } satisfies Transition}
            >
              <nav className="mb-6 flex items-center gap-2 font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.24em] text-[#0A0A0A]/40">
                <Link href="/" className="hover:text-[#0A0A0A] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#0A0A0A]">About</span>
              </nav>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: revealEase } satisfies Transition}
              className="font-['Plus_Jakarta_Sans'] text-[clamp(2.6rem,7vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.04em]"
            >
              {['ABOUT', 'STALAN', 'L.T.D'].map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ y: 44, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.75, ease: revealEase, delay: 0.1 + i * 0.12 } satisfies Transition}
                  className={`block ${line === 'STALAN' ? 'text-transparent' : ''}`}
                  style={line === 'STALAN' ? { WebkitTextStroke: '1.4px #0A0A0A' } : undefined}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: revealEase, delay: 0.45 } satisfies Transition}
              className="mt-7 max-w-xl text-base leading-8 text-[#0A0A0A]/65"
            >
              Discover our vision, our mission, and the people building next-generation technology for a better world.
            </motion.p>
          </div>

          {/* Right — quick info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: revealEase, delay: 0.3 } satisfies Transition}
            className="flex flex-col justify-between gap-4 bg-[#F5F5F5] p-6 sm:p-8"
          >
            {[
              { tag: 'DOMAIN', val: 'Technology' },
              { tag: 'LOCATION', val: 'Nigeria' },
              { tag: 'STATUS', val: 'CAC Certified' },
            ].map((item) => (
              <div key={item.tag} className="border border-black/10 bg-white px-4 py-5">
                <p className="font-['JetBrains_Mono'] text-[0.55rem] uppercase tracking-[0.24em] text-[#0A0A0A]/40">{item.tag}</p>
                <p className="mt-1 font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0A0A0A]">{item.val}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
