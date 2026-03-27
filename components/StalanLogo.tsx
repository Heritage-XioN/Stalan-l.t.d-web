'use client';

import Link from 'next/link';

export function StalanLogo() {
  return (
    <Link href="/" className="flex items-baseline gap-1 hover:opacity-70 transition-opacity">
      <span className="font-['Syne'] font-bold text-lg tracking-widest dark:text-white text-black">
        STALAN
      </span>
    </Link>
  );
}
