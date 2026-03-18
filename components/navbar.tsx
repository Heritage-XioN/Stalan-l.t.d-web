'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'S.A.T Bot', href: '#satbot' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-dark mx-auto rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 font-bold text-xl sm:text-2xl gradient-text"
            >
              Stalan
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors rounded-md hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Button */}
            <div className="hidden md:block">
              <Button
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-foreground font-semibold glow-accent"
              >
                Login / Register
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-dark border-white/10">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground/80 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-white/10">
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-foreground font-semibold">
                      Login / Register
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
