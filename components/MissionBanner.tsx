'use client';

import { motion } from 'framer-motion';

export function MissionBanner() {
  return (
    <section className="py-24 bg-[#0A1628]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-white mb-8 leading-tight"
          >
            Our Mission
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="h-1 w-20 bg-gradient-to-r from-[#1A4FBF] to-[#00C2FF] mx-auto mb-8 origin-left"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-2xl text-gray-300 italic leading-relaxed"
          >
            To advance modern technology by engineering purposeful, next-generation solutions that enable humanity to embrace the right tools for a sustainable future.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
