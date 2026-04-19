'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border border-white/8 p-10 sm:p-16"
        >
          <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.3em] text-white/30 mb-4">
            COLLABORATE
          </p>
          <h2 className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-5">
            Ready to Build
            <br />
            <span className="text-[#C8F135]">Something Great?</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl">
            Let&apos;s shape the future together. Reach out to our team and start a project today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 bg-[#C8F135] px-7 py-3.5 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.06em] text-[#0A0A0A] hover:bg-white transition-colors">
                Contact Us <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/products">
              <button className="inline-flex items-center gap-2 border border-white/20 px-7 py-3.5 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.06em] text-white hover:border-white hover:bg-white/5 transition-colors">
                View Products <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
