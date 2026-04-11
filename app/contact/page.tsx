'use client';

import { motion, type Transition } from 'framer-motion';
import { Mail, Linkedin, Youtube, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const revealEase = [0.16, 1, 0.3, 1] as const;

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'stalanltd@gmail.com',
    href: 'mailto:stalanltd@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/company/stalan-ltd',
    href: 'https://www.linkedin.com/company/stalan-ltd/',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    value: '@StalanLTD',
    href: 'https://www.youtube.com/@StalanLTD',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Nigeria',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      {/* Ticker */}
      <div className="w-full overflow-hidden border-b border-black/10 bg-[#C8F135] py-2.5 pt-24">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="flex min-w-max items-center"
        >
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="px-5 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.26em] text-[#0A0A0A]"
            >
              GET IN TOUCH • CONTACT US • START A PROJECT •
            </span>
          ))}
        </motion.div>
      </div>

      {/* Main grid */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden border border-black/10 bg-white shadow-[0_20px_70px_rgba(10,10,10,0.06)] lg:grid-cols-[1fr_1.2fr]">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: revealEase } satisfies Transition}
            className="border-b border-black/10 p-8 sm:p-12 lg:border-b-0 lg:border-r"
          >
            <p className="mb-4 font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.28em] text-[#0A0A0A]/55">
              STALAN L.T.D — CONTACT
            </p>
            <h1 className="font-['Plus_Jakarta_Sans'] text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#0A0A0A]">
              LET&apos;S<br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '1.4px #0A0A0A' }}
              >
                BUILD
              </span>
              <br />
              TOGETHER
            </h1>

            <p className="mt-7 max-w-sm text-base leading-7 text-[#0A0A0A]/65">
              Have a project or idea? Reach out and our team will get back to you promptly.
            </p>

            <div className="mt-10 space-y-4">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 border border-black/10 bg-[#FAFAFA] px-5 py-4 transition-colors hover:border-[#C8F135] hover:bg-[#C8F135]/10"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0A0A0A]/70" />
                  <div>
                    <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.22em] text-[#0A0A0A]/50">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="mt-0.5 text-sm font-medium text-[#0A0A0A] underline-offset-2 hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium text-[#0A0A0A]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: revealEase, delay: 0.15 } satisfies Transition}
            className="bg-[#F5F5F5] p-8 sm:p-12"
          >
            <p className="mb-6 font-['JetBrains_Mono'] text-[0.65rem] uppercase tracking-[0.28em] text-[#0A0A0A]/55">
              SEND A MESSAGE
            </p>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
