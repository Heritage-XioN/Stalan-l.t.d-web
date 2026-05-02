'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function StalanLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/*
        Wrap in a fixed-size box so the scale animation never
        pushes siblings or changes navbar height/width.
      */}
      <div style={{ width: '44px', height: '44px', flexShrink: 0, overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          src="/stalan-main-logo.png"
          alt="Stalan L.T.D"
          style={{ height: '44px', width: 'auto', display: 'block', transformOrigin: 'center' }}
          /* Autonomous animation: slow breathing pulse */
          animate={{
            scale: [1, 1.07, 1, 1.04, 1],
            rotate: [0, 0, 2, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          /* Extra pop on hover */
          whileHover={{
            scale: 1.15,
            rotate: [0, -6, 6, -3, 0],
            transition: { duration: 0.45, ease: 'easeInOut' },
          }}
        />
      </div>

      <div className="flex flex-col items-start leading-none">
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-['Plus_Jakarta_Sans'] text-[1.1rem] font-black uppercase tracking-[0.06em] text-[#0A0A0A]"
        >
          Stalan
        </motion.span>
        {/* Subtle shimmer on the sub-label */}
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: [0.4, 0.7, 0.4], x: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="font-['JetBrains_Mono'] text-[0.52rem] uppercase tracking-[0.28em] text-[#0A0A0A]"
        >
          L.T.D
        </motion.span>
      </div>
    </Link>
  );
}
