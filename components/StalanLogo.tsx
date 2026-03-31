'use client';

import Link from 'next/link';

export function StalanLogo() {
  return (
    <Link href="/" className="flex items-baseline gap-1 transition-opacity hover:opacity-70">
      <span className="font-['Syne'] text-lg font-black tracking-tighter text-[#0A0A0A]">
        STALAN
      </span>
    </Link>
  );
}
