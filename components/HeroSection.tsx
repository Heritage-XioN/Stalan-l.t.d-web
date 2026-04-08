'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const revealEase = [0.16, 1, 0.3, 1] as const;

const tickerItems = ['ENGINEERING', 'AUTONOMY', 'SMART SYSTEMS', 'AI', 'SAFETY'];

const headlineLines = [
  'ADVANCING',
  'TECHNOLOGY',
  'FOR HUMANITY',
];

const heroStats = [{ value: '2024', label: 'Founded' }, { value: '03', label: 'Co-founders' }];
const heroTags = ['Electrical Safety', 'Autonomous Mobility', 'Human-Centered AI'];

export function HeroSection() {
  const tickerTrack = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <section id="home" className="bg-[#FAFAFA] pt-24 text-[#0A0A0A] sm:pt-28">
      <div className="w-full overflow-hidden border-y border-black/10 bg-[#C8F135] py-2.5">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="flex min-w-max items-center"
        >
          {tickerTrack.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="px-5 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.26em] text-[#0A0A0A]"
            >
              {item} •
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid overflow-hidden border border-black/10 bg-white shadow-[0_20px_70px_rgba(10,10,10,0.06)] lg:grid-cols-[1.45fr_0.55fr]">
          <div className="border-b border-black/10 p-6 sm:p-10 lg:border-b-0 lg:border-r lg:border-black/10 lg:p-12">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: revealEase, delay: 0.1 }}
              className="mb-5 font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-[0.28em] text-[#0A0A0A]/58"
            >
              STALAN L.T.D — ENGINEERED SYSTEMS FOR REAL-WORLD HUMAN PROGRESS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: revealEase }}
              className="font-['Syne'] text-[clamp(2.7rem,7.6vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]"
            >
              {headlineLines.map((line, index) => (
                <motion.span
                  key={line}
                  initial={{ y: 44, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.75, ease: revealEase, delay: 0.18 + index * 0.12 }}
                  className={`block ${line === 'TECHNOLOGY' ? 'text-transparent' : ''}`}
                  style={line === 'TECHNOLOGY' ? { WebkitTextStroke: '1.4px #0A0A0A' } : undefined}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: revealEase, delay: 0.45 }}
              className="mt-7 max-w-2xl text-base leading-8 text-[#0A0A0A]/72 sm:text-lg"
            >
              We design future-ready systems that connect safety, autonomy, and intelligence into practical infrastructure for everyday human life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: revealEase, delay: 0.55 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              {heroTags.map((item) => (
                <span
                  key={item}
                  className="border border-black/10 bg-[#FAFAFA] px-3.5 py-2 font-['JetBrains_Mono'] text-[0.66rem] uppercase tracking-[0.2em] text-[#0A0A0A]/78"
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-rows-[auto_auto_1fr_auto] gap-0 bg-[#F5F5F5] p-6 sm:p-8">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: revealEase, delay: 0.24 }}
              className="font-['JetBrains_Mono'] text-[0.64rem] uppercase tracking-[0.24em] text-[#0A0A0A]/58"
            >
              COMPANY STATS
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: revealEase, delay: 0.32 }}
              className="mt-4 space-y-3"
            >
              {heroStats.map((stat) => (
                <div key={stat.label} className="border border-black/10 bg-white px-4 py-4">
                  <p className="font-['JetBrains_Mono'] text-4xl font-semibold tracking-[-0.05em] text-[#0A0A0A]">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: revealEase, delay: 0.4 }}
              className="my-6 border-t border-black/10"
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: revealEase, delay: 0.48 }}
              className="space-y-3"
            >
              <Link
                href="/sat-bots"
                className="inline-flex w-full items-center justify-center border border-black bg-[#0A0A0A] px-4 py-3 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-[#C8F135] hover:text-[#0A0A0A]"
              >
                Explore S.A.T Bot Lab
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center border border-black/20 bg-white px-4 py-3 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.22em] text-[#0A0A0A] transition-colors hover:border-[#C8F135] hover:bg-[#C8F135]"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
