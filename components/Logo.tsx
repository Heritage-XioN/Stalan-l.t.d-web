'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  animated?: boolean;
  className?: string;
}

export function Logo({
  size = 'md',
  href = '/',
  animated = false,
  className = '',
}: LogoProps) {
  const sizeMap = {
    sm: { image: 32, container: 'h-8' },
    md: { image: 40, container: 'h-10' },
    lg: { image: 56, container: 'h-14' },
  };

  const content = (
    <motion.div
      className={`flex items-center gap-3 ${sizeMap[size].container} ${className}`}
      initial={animated ? { opacity: 0, x: -20 } : false}
      animate={animated ? { opacity: 1, x: 0 } : false}
      transition={animated ? { duration: 0.6, ease: 'easeOut' } : {}}
      whileHover={animated ? { scale: 1.05 } : {}}
    >
      <div className="relative flex-shrink-0">
        <Image
          src="/logo.png"
          alt="Stalan L.T.D Logo"
          width={sizeMap[size].image}
          height={sizeMap[size].image}
          priority
          className="w-auto h-auto"
        />
      </div>
      {size !== 'sm' && (
        <span className="font-bold text-white whitespace-nowrap hidden sm:inline">
          STALAN
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
