'use client';

import { motion } from 'framer-motion';

const revealEase = [0.16, 1, 0.3, 1] as const;

const tickerItems = [
  'SC-STATIC',
  'DRONE TECHNOLOGY',
  'SMART HOME',
  'AI',
];

const headlineLines = [
  [
    { text: 'ADVANCING', outlined: false },
    { text: 'TECHNOLOGY', outlined: true },
  ],
  [
    { text: 'FOR', outlined: false },
    { text: 'HUMANITY.', outlined: false },
  ],
];

const heroStats = [
  { value: '2024', label: 'Founded' },
  { value: '04', label: 'Core Verticals' },
  { value: '360°', label: 'Systems View' },
  { value: 'NG', label: 'Origin' },
];

export function HeroSection() {
  const tickerTrack = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <section id="home" className="bg-[#FAFAFA] pt-24 text-[#0A0A0A] sm:pt-28">
      <div className="w-full overflow-hidden border-y border-black/10 bg-[#C8F135] py-3">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex min-w-max items-center"
        >
          {tickerTrack.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="px-5 font-['JetBrains_Mono'] text-sm font-medium uppercase tracking-[0.24em] text-[#0A0A0A]"
            >
              {item} •
            </span>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-16 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: revealEase, delay: 0.15 }}
            className="mb-8 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.32em] text-[#0A0A0A]/55"
          >
            Stalan L.T.D — engineered systems for real-world human progress
          </motion.p>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="font-['Syne'] text-[clamp(3.8rem,10vw,8.8rem)] font-black uppercase leading-[0.88] tracking-[-0.06em]"
          >
            {headlineLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.1,
                    ease: revealEase,
                    delay: 0.2 + lineIndex * 0.18,
                  }}
                  className="block"
                >
                  <span className="flex flex-wrap items-center gap-x-[0.18em] gap-y-2">
                    {line.map((word, wordIndex) => (
                      <motion.span
                        key={word.text}
                        initial={{ opacity: 0, y: 36 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: revealEase,
                          delay: 0.34 + lineIndex * 0.18 + wordIndex * 0.12,
                        }}
                        className={word.outlined ? 'text-transparent' : ''}
                        style={
                          word.outlined
                            ? { WebkitTextStroke: '1.5px #0A0A0A' }
                            : undefined
                        }
                      >
                        {word.text}
                      </motion.span>
                    ))}
                  </span>
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: revealEase, delay: 0.6 }}
            className="mt-10 max-w-xl space-y-6"
          >
            <p className="text-lg leading-8 text-[#0A0A0A]/68 sm:text-xl">
              We build precise, future-facing systems across electrical safety, autonomous mobility, smart living, and machine intelligence with a human-first point of view.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Electrical Safety', 'Autonomous Systems', 'Human-Centered AI'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white px-4 py-2 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/72"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: revealEase, delay: 0.45 }}
          className="relative mx-auto flex w-full max-w-[28rem] items-center justify-center"
        >
          <div className="relative aspect-square w-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-black/10"
            >
              <div className="absolute inset-[7%] rounded-full border border-dashed border-black/12" />
              <div className="absolute inset-[18%] rounded-full border border-black/8" />
              <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white" />
              <div className="absolute bottom-10 left-6 h-3 w-3 rounded-full bg-[#C8F135]" />
              <div className="absolute right-8 top-12 h-3 w-3 rounded-full bg-[#0A0A0A]" />
            </motion.div>

            <div className="absolute inset-[14%] rounded-full border border-black/10 bg-white/70 shadow-[0_30px_90px_rgba(10,10,10,0.08)] backdrop-blur-sm" />

            <div className="absolute inset-[20%] flex flex-col justify-between rounded-full px-8 py-10">
              <div className="text-center font-['JetBrains_Mono']">
                <p className="text-[0.65rem] uppercase tracking-[0.32em] text-[#0A0A0A]/45">
                  STALAN SIGNAL
                </p>
                <p className="mt-3 text-5xl font-semibold tracking-[-0.06em]">
                  01
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-['JetBrains_Mono'] text-[#0A0A0A]">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-black/8 bg-[#FAFAFA]/90 px-3 py-4 text-center"
                  >
                    <p className="text-lg font-semibold tracking-[-0.04em]">{stat.value}</p>
                    <p className="mt-1 text-[0.58rem] uppercase tracking-[0.24em] text-[#0A0A0A]/48">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
