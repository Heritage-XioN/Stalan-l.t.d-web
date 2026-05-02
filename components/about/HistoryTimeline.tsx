'use client';

import { motion, type Transition } from 'framer-motion';

const revealEase = [0.16, 1, 0.3, 1] as const;

const events = [
  {
    tag: '01',
    title: 'Company Founded',
    body: 'Stalan L.T.D was founded on 2nd of November, 2024.',
    status: 'done',
  },
  {
    tag: '02',
    title: 'Core Products',
    body: 'First generation SC-STATIC Channel systems and S.A.T Bot platform enter development.',
    status: 'done',
  },
  {
    tag: '03',
    title: 'Next Chapter',
    body: 'Expanding across industries -- more milestones and innovations on the horizon.',
    status: 'upcoming',
  },
];

export function HistoryTimeline() {
  return (
    <section className="bg-[#0A0A0A] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: revealEase } satisfies Transition}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.28em] text-white/30 mb-3">
            02 -- OUR JOURNEY
          </p>
          <h2 className="font-['Plus_Jakarta_Sans'] text-[clamp(1.8rem,3.5vw,2.8rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-white">
            KEY MILESTONES
          </h2>
        </motion.div>
        <div className="grid gap-px border border-white/10 sm:grid-cols-3">
          {events.map((ev, i) => (
            <motion.div
              key={ev.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: revealEase, delay: i * 0.1 } satisfies Transition}
              viewport={{ once: true }}
              className={`group p-7 sm:p-9 transition-colors ${
                ev.status === 'upcoming'
                  ? 'bg-white/5 hover:bg-white/8'
                  : 'bg-[#111111] hover:bg-[#C8F135]/8'
              }`}
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-['JetBrains_Mono'] text-[0.55rem] uppercase tracking-[0.22em] text-white/25">
                  {ev.tag}
                </span>
                {ev.status === 'upcoming' ? (
                  <span className="font-['JetBrains_Mono'] text-[0.55rem] uppercase tracking-[0.18em] border border-white/15 px-2 py-0.5 text-white/30">
                    Upcoming
                  </span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-[#C8F135] mt-1" />
                )}
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-black uppercase tracking-[-0.02em] text-white group-hover:text-[#C8F135] transition-colors">
                {ev.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/45">{ev.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}