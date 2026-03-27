'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { StalanLogo } from '@/components/StalanLogo';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDark(!isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <a href="#main-content" className="skip-to-main">Skip to main content</a>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-[#E8E8E8] dark:border-[#222222]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <StalanLogo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#0A0A0A] dark:text-[#F5F5F5] text-sm font-medium relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8F135] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-[#E8E8E8] dark:hover:bg-[#222222] rounded transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun size={20} className="text-[#F5F5F5]" />
                ) : (
                  <Moon size={20} className="text-[#0A0A0A]" />
                )}
              </button>

              {/* CTA Button */}
              <motion.button
                whileHover={{ backgroundColor: '#C8F135' }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block px-6 py-2 bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] font-semibold transition-colors duration-200"
              >
                Get in Touch
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-[#0A0A0A] dark:text-[#F5F5F5]"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#E8E8E8] dark:border-[#222222] pb-4"
            >
              <div className="flex flex-col gap-4 px-4 py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className="text-[#0A0A0A] dark:text-[#F5F5F5] text-lg font-medium block"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.08 }}
                  className="w-full mt-4 px-6 py-2 bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] font-semibold"
                >
                  Get in Touch
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
    </>
  );
}
