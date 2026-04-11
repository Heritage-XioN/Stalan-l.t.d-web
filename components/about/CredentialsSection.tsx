'use client';

import { motion, type Transition } from 'framer-motion';
import { Award, FileText } from 'lucide-react';

const revealEase = [0.16, 1, 0.3, 1] as const;

export function CredentialsSection() {
  return (
    <section className="bg-[#FAFAFA] py-16 border-t border-black/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: revealEase } satisfies Transition}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.28em] text-black/30 mb-3">
            04 -- CREDENTIALS
          </p>
          <h2 className="font-['Plus_Jakarta_Sans'] text-[clamp(1.8rem,3.5vw,2.8rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#0A0A0A]">
            CERTIFICATIONS
          </h2>
        </motion.div>

        <div className="grid gap-px border border-black/8 sm:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: revealEase } satisfies Transition}
            viewport={{ once: true }}
            className="group bg-white p-7 sm:p-9 border border-black/8 hover:border-[#C8F135] transition-colors"
          >
            <div className="mb-5 h-11 w-11 bg-[#C8F135] flex items-center justify-center">
              <Award className="h-5 w-5 text-[#0A0A0A]" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-base font-black uppercase tracking-[-0.02em] text-[#0A0A0A] mb-2">
              CAC Registered
            </h3>
            <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.22em] text-black/30 mb-4">
              Corporate Affairs Commission -- Nigeria
            </p>
            <p className="text-sm leading-7 text-black/55">
              Stalan L.T.D is fully incorporated and registered with the Corporate Affairs Commission (CAC) of Nigeria, operating as a legally recognized entity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: revealEase, delay: 0.1 } satisfies Transition}
            viewport={{ once: true }}
            className="group bg-white p-7 sm:p-9 border border-black/8 hover:border-black/20 transition-colors"
          >
            <div className="mb-5 h-11 w-11 bg-[#0A0A0A]/6 flex items-center justify-center">
              <FileText className="h-5 w-5 text-[#0A0A0A]/40" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-base font-black uppercase tracking-[-0.02em] text-[#0A0A0A]/40 mb-2">
              More Coming
            </h3>
            <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.22em] text-black/20 mb-4">
              Additional Certifications -- In Progress
            </p>
            <p className="text-sm leading-7 text-black/30">
              Additional industry certifications and partnerships are currently in progress as Stalan expands its operational capabilities.
            </p>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 } satisfies Transition}
          viewport={{ once: true }}
          className="mt-px bg-[#0A0A0A] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <span className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.28em] text-white/40">
            COMPLIANCE NOTE
          </span>
          <span className="hidden sm:block text-white/20 text-xs">--</span>
          <p className="text-xs text-white/40 leading-6">
            Stalan L.T.D operates in full compliance with Nigerian corporate law and applicable technology regulations.
          </p>
        </motion.div>

      </div>
    </section>
  );
}