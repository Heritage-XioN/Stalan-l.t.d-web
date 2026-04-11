'use client';

import Link from 'next/link';
import { Linkedin, Youtube, Mail, MapPin } from 'lucide-react';

const footerLinks = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'S.A.T Bot', href: '/sat-bots' },
      { label: 'Products', href: '/products' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'Get in Touch', href: '/contact' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/stalan-ltd/',
    icon: Linkedin,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@StalanLTD',
    icon: Youtube,
  },
  {
    label: 'Email',
    href: 'mailto:stalanltd@gmail.com',
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#FAFAFA]">
      {/* Top band */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.8fr_1fr_1fr]">

          {/* Brand col */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/stalan-logo02.png"
                alt="Stalan L.T.D"
                style={{ height: '44px', width: 'auto', filter: 'invert(1) brightness(2)' }}
              />
              <div className="flex flex-col leading-none">
                <span className="font-['Plus_Jakarta_Sans'] text-[1.05rem] font-black uppercase tracking-[0.06em] text-white">
                  Stalan
                </span>
                <span className="font-['JetBrains_Mono'] text-[0.52rem] uppercase tracking-[0.28em] text-white/40">
                  L.T.D
                </span>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-7 text-white/50">
              A multi-disciplinary technology firm revolutionizing modern day technology — built for safety, autonomy, and intelligence.
            </p>
            <div className="mt-6 flex items-center gap-1 text-xs text-white/35 font-['JetBrains_Mono'] tracking-widest uppercase">
              <MapPin className="h-3 w-3 shrink-0" />
              Nigeria
            </div>
            {/* Socials */}
            <div className="mt-8 flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/50 transition-colors hover:border-[#C8F135] hover:bg-[#C8F135] hover:text-[#0A0A0A]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.28em] text-white/35 mb-5">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/55 transition-colors hover:text-[#C8F135]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.22em] text-white/25">
            &copy; {new Date().getFullYear()} Stalan L.T.D — All rights reserved.
          </p>
          <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.22em] text-white/25">
            Revolutionizing Modern Day Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
