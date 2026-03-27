'use client';

import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    about: {
      title: 'About Stalan',
      links: [
        { label: 'Our Story', href: '#' },
        { label: 'Mission & Vision', href: '#' },
        { label: 'Leadership', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
    products: {
      title: 'Products',
      links: [
        { label: 'SC-STATIC RCD', href: '#' },
        { label: 'Drone Technology', href: '#' },
        { label: 'Smart Home Systems', href: '#' },
        { label: 'Documentation', href: '#' },
      ],
    },
    services: {
      title: 'Services',
      links: [
        { label: 'Design & Development', href: '#' },
        { label: 'Consultation', href: '#' },
        { label: 'Technical Support', href: '#' },
        { label: 'Marine Logistics', href: '#' },
      ],
    },
    connect: {
      title: 'Connect',
      links: [
        { label: 'Contact Us', href: '#' },
        { label: 'Support', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
  };

  return (
    <footer className="bg-[#0A1628] border-t-2 border-cyan-500 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo Section */}
        <div className="mb-12 pb-8 border-b border-white/10">
          <Logo size="md" href="/" animated={false} />
          <p className="text-gray-400 text-sm mt-4 max-w-md">
            Advancing technology for humanity. Multi-disciplinary engineering firm building next-generation safe infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © {currentYear} Stalan L.T.D · Advancing Technology for Humanity
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/company/stalan-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
