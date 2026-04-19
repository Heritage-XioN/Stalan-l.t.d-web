'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FAFAFA]">
      <Navbar />

      <section className="flex flex-1 items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl text-center"
        >
          {/* Giant 404 */}
          <div className="relative mb-6 select-none">
            <span
              className="font-['Plus_Jakarta_Sans'] text-[clamp(7rem,22vw,12rem)] font-black uppercase leading-none tracking-tight"
              style={{ WebkitTextStroke: '2px #0A0A0A', color: 'transparent' }}
            >
              404
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-block h-1 w-16 bg-[#C8F135]" />
            </span>
          </div>

          <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.3em] text-black/30 mb-4">
            PAGE NOT FOUND
          </p>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-black uppercase tracking-tight text-[#0A0A0A] mb-4">
            You&apos;ve Drifted Off Course
          </h1>
          <p className="text-base text-black/50 mb-10 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/">
              <button className="inline-flex items-center gap-2 bg-[#0A0A0A] px-7 py-3.5 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.06em] text-white hover:bg-[#C8F135] hover:text-[#0A0A0A] transition-colors">
                Back to Home <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 border border-black/15 px-7 py-3.5 font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.06em] text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
