'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatItemProps {
  label: string;
  value: string | number;
  isNumber?: boolean;
  endValue?: number;
}

function StatItem({ label, value, isNumber = false, endValue = 0 }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isNumber) return;

    let animationFrame: NodeJS.Timeout;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayValue(Math.floor(endValue * progress));

      if (progress < 1) {
        animationFrame = setTimeout(animate, 16);
      }
    };

    animate();
    return () => clearTimeout(animationFrame);
  }, [isNumber, endValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">
        {isNumber ? displayValue : value}
      </div>
      <p className="text-gray-400 text-sm sm:text-base">{label}</p>
    </motion.div>
  );
}

export function StatsBar() {
  const stats = [
    { label: '3 Co-Founders', value: '3', isNumber: true, endValue: 3 },
    { label: 'Founded', value: '2024', isNumber: false },
    { label: 'SC-STATIC Channels', value: '6', isNumber: true, endValue: 6 },
    { label: 'Industries', value: '5+', isNumber: false },
  ];

  return (
    <section className="bg-[#0A1628] border-y border-white/10 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              label={stat.label}
              value={stat.value}
              isNumber={stat.isNumber}
              endValue={stat.endValue}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
