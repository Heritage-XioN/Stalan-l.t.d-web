'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-[#F0F4FF] to-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#0A1628] mb-4">Ready to Collaborate?</h2>
          <p className="text-gray-600 text-lg mb-12">
            Let&apos;s build the future together. Get in touch with our team today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#1A4FBF] text-white font-bold rounded-lg hover:bg-[#1A4FBF]/90 transition-colors inline-flex items-center gap-2"
              >
                Contact Us <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[#1A4FBF] text-[#1A4FBF] font-bold rounded-lg hover:bg-[#1A4FBF]/10 transition-colors inline-flex items-center gap-2"
              >
                View Our Products <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
