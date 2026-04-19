'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatItemProps {
  label: string;
  suffix?: string;
  isNumber: boolean;
  endValue: number;
}

function StatItem({ label, suffix = '', isNumber, endValue }: StatItemProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isNumber) return;
    let frame: NodeJS.Timeout;
    const duration = 1800;
    const start = Date.now();
    const run = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setDisplay(Math.floor(endValue * p));
      if (p < 1) frame = setTimeout(run, 16);
    };
    run();
    return () => clearTimeout(frame);
  }, [isNumber, endValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-['Plus_Jakarta_Sans'] text-4xl sm:text-5xl font-black text-[#C8F135] mb-2">
        {isNumber ? display : endValue}{suffix}
      </div>
      <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.22em] text-white/35">
        {label}
      </p>
    </motion.div>
  );
}

export function StatsBar() {
  const stats = [
    { label: 'Co-Founders', suffix: '', isNumber: true, endValue: 3 },
    { label: 'Service Areas', suffix: '', isNumber: true, endValue: 6 },
    { label: 'Industries Served', suffix: '+', isNumber: true, endValue: 5 },
  ];

  return (
    <section className="bg-[#0A0A0A] border-y border-white/8 py-14 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
