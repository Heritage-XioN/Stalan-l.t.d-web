'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const founders = [
  { name: 'Ogu Chidiebube Victory', title: 'Founder & CEO', initials: 'OCV' },
  { name: 'Obianayo Victor Chiemerie', title: 'Co-Founder & DOM', initials: 'OVC' },
  { name: 'Israel-Ogiribo Gideon', title: 'Co-Founder & COO', initials: 'IGO' },
];

export function AboutTeaser() {
  return (
    <section className="py-20 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Founded by Visionaries</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Stalan L.T.D was established in November 2024 by a team of passionate engineers and innovators dedicated to advancing technology that serves humanity. Our founders bring decades of combined experience in electrical engineering, logistics, and business development.
            </p>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#00C2FF] text-[#00C2FF] rounded-lg font-medium hover:bg-[#00C2FF]/10 transition-all"
              >
                Read Our Story <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Column - Founders Stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-80 flex items-end justify-center"
          >
            {founders.map((founder, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                viewport={{ once: true }}
                style={{
                  transform: `translateX(${idx * 60 - 60}px) translateY(${idx * 20}px)`,
                  zIndex: founders.length - idx,
                }}
                className="absolute"
              >
                <div className="w-32 rounded-lg bg-gradient-to-br from-[#1A4FBF] to-[#00C2FF] p-1">
                  <div className="bg-[#0A1628] rounded-lg p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1A4FBF] to-[#00C2FF] flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-lg">{founder.initials}</span>
                    </div>
                    <h3 className="text-white font-bold text-sm">{founder.name}</h3>
                    <p className="text-[#00C2FF] text-xs mt-1">{founder.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
