'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { StalanLogo } from '@/components/StalanLogo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'S.A.T Bot', href: '/sat-bots' },
    { label: 'Services', href: '/services' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-full border border-black/5 bg-white/70 px-4 py-3 shadow-[0_20px_60px_rgba(10,10,10,0.08)] backdrop-blur-xl sm:px-6">
          <div className="flex min-w-0 items-center">
            <StalanLogo />
          </div>

          <div className="hidden items-center gap-1 rounded-full border border-black/5 bg-white/60 px-2 py-1 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#C8F135] text-[#0A0A0A]'
                      : 'text-[#0A0A0A]/70 hover:text-[#0A0A0A]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Button
              asChild
              className="h-11 rounded-none border border-[#0A0A0A] bg-[#0A0A0A] px-5 text-sm font-semibold text-white shadow-[4px_4px_0px_0px_#0A0A0A] transition-all hover:border-[#C8F135] hover:bg-[#C8F135] hover:text-[#0A0A0A] hover:shadow-[4px_4px_0px_0px_#C8F135]"
            >
              <Link href="/contact">Contact</Link>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-[#0A0A0A] hover:bg-black/5 hover:text-[#0A0A0A]"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-black/10 bg-[#FAFAFA]/95 backdrop-blur-xl">
              <div className="mt-10 flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`rounded-md px-2 py-1 text-lg font-medium transition-colors ${
                        isActive
                          ? 'bg-[#C8F135] text-[#0A0A0A]'
                          : 'text-[#0A0A0A] hover:text-black/60'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <Button
                  asChild
                  className="mt-4 h-11 rounded-none border border-[#0A0A0A] bg-[#0A0A0A] text-sm font-semibold text-white shadow-[4px_4px_0px_0px_#0A0A0A] transition-all hover:border-[#C8F135] hover:bg-[#C8F135] hover:text-[#0A0A0A] hover:shadow-[4px_4px_0px_0px_#C8F135]"
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Contact
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
