'use client';

import { motion, type Transition } from 'framer-motion';

const revealEase = [0.16, 1, 0.3, 1] as const;

export function CompanyOverview() {
  return (
    <section className="bg-[#FAFAFA] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden border border-black/10 bg-white shadow-[0_8px_40px_rgba(10,10,10,0.05)] lg:grid-cols-2">

          {/* Left — Who We Are */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: revealEase } satisfies Transition}
            viewport={{ once: true }}
            className="border-b border-black/10 p-8 sm:p-12 lg:border-b-0 lg:border-r"
          >
            <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.28em] text-[#0A0A0A]/40 mb-4">
              01 — WHO WE ARE
            </p>
            <h2 className="font-['Plus_Jakarta_Sans'] text-[clamp(1.8rem,3.5vw,2.8rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#0A0A0A]">
              BUILT FOR<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1.4px #0A0A0A' }}>
                IMPACT
              </span>
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#0A0A0A]/60">
              <p>
                Stalan L.T.D is a multi-disciplinary technology firm dedicated to engineering purposeful, next-generation solutions. We bring together diverse expertise across software, hardware, and systems engineering to solve real-world challenges.
              </p>
              <p>
                We operate at the intersection of innovation and responsibility — building technology that is not just advanced, but genuinely beneficial to society.
              </p>
            </div>
          </motion.div>

          {/* Right — Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: revealEase, delay: 0.15 } satisfies Transition}
            viewport={{ once: true }}
            className="divide-y divide-black/10 bg-[#F5F5F5]"
          >
            <div className="p-8 sm:p-12">
              <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.28em] text-[#0A0A0A]/40 mb-3">
                MISSION
              </p>
              <p className="text-sm leading-7 text-[#0A0A0A]/70">
                To revolutionize modern day technology by engineering purposeful, next-generation solutions that enable humanity to embrace the right tools for a sustainable future.
              </p>
            </div>
            <div className="p-8 sm:p-12">
              <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.28em] text-[#0A0A0A]/40 mb-3">
                VISION
              </p>
              <p className="text-sm leading-7 text-[#0A0A0A]/70">
                To architect a world where advanced technology is seamlessly aligned with human potential, creating an era of enlightened innovation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
