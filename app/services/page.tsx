'use client';

import { motion } from 'framer-motion';
import { Anchor, Compass, BarChart3, Clipboard, Wrench, Code2 } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';

const services = [
  {
    icon: Anchor,
    title: 'Marine Logistics',
    description: 'Local and global logistics solutions including third-party shipping, marine logistics, planning, port and terminal services, distribution and operations management.',
  },
  {
    icon: Compass,
    title: 'Design & Development',
    description: 'Blueprints, layouts, specifications, and CAD drawings for infrastructure (roads, bridges) or products.',
  },
  {
    icon: BarChart3,
    title: 'Consultation & Analysis',
    description: 'Expert advice, feasibility studies, and safety inspections from licensed professionals.',
  },
  {
    icon: Clipboard,
    title: 'Project Management & Supervision',
    description: 'Overseeing construction, ensuring code compliance, and managing Engineering, Procurement, and Construction (EPC) tasks.',
  },
  {
    icon: Wrench,
    title: 'Technical Support',
    description: 'Specialized knowledge in mechanical, electrical, civil, and software engineering.',
  },
  {
    icon: Code2,
    title: 'Software & Systems Engineering',
    description: 'Designing software for automation, control systems, and IT infrastructure.',
  },
];

const highlights = [
  { label: 'Licensed Professionals', icon: '✓' },
  { label: 'Multi-disciplinary Expertise', icon: '✓' },
  { label: 'Global Reach', icon: '✓' },
  { label: 'Cutting-Edge Technology', icon: '✓' },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <section className="flex min-h-[34vh] items-center justify-center px-4 pb-10 pt-24 sm:pb-12 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl text-center"
        >
          <h1 className="font-['Syne'] text-[clamp(2.4rem,7.2vw,5.6rem)] font-black uppercase tracking-[-0.05em] text-foreground">
            ENGINEERING SERVICES
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg text-foreground/70 sm:text-xl">
            Specialized professional, technical, and creative expertise rooted in physical, mathematical, and engineering sciences.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-[repeat(3,minmax(220px,auto))]">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isFeatured = idx === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`${isFeatured ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'} group cursor-pointer border border-black/10 bg-white p-7 text-[#0A0A0A] transition-all duration-300 dark:border-white/10 dark:bg-[#111111] dark:text-[#F5F5F5] hover:border-[#C8F135] hover:bg-[#0A0A0A] hover:text-[#F5F5F5] dark:hover:bg-[#F5F5F5] dark:hover:text-[#0A0A0A]`}
              >
                <div className={`mb-6 flex h-14 w-14 items-center justify-center border border-black/10 bg-[#FAFAFA] transition-colors dark:border-white/10 dark:bg-black/20 ${isFeatured ? 'h-16 w-16' : ''} group-hover:border-[#C8F135] group-hover:bg-[#C8F135]`}>
                  <Icon className={`${isFeatured ? 'h-8 w-8' : 'h-7 w-7'} text-[#0A0A0A] transition-colors dark:text-[#F5F5F5] group-hover:text-[#0A0A0A]`} />
                </div>
                <h3 className={`mb-3 font-['Syne'] font-black tracking-[-0.04em] text-[#0A0A0A] transition-colors dark:text-[#F5F5F5] group-hover:text-[#F5F5F5] dark:group-hover:text-[#0A0A0A] ${isFeatured ? 'text-4xl' : 'text-2xl'}`}>
                  {service.title}
                </h3>
                <p className={`${isFeatured ? 'max-w-3xl text-lg leading-8' : 'text-base leading-7'} text-[#0A0A0A]/72 transition-colors dark:text-[#F5F5F5]/78 group-hover:text-[#F5F5F5]/92 dark:group-hover:text-[#0A0A0A]/85`}>
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Stalan Section */}
      <section className="border-y border-black/10 bg-[#FAFAFA] px-4 py-16 text-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-12 text-center font-['Syne'] text-4xl font-black tracking-[-0.04em] text-[#0A0A0A]">
            Why Choose Stalan?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="border border-black/15 bg-white p-6 text-center transition-colors"
              >
                <div className="mb-3 font-['JetBrains_Mono'] text-4xl font-bold text-[#C8F135]">{item.icon}</div>
                <p className="font-semibold text-[#0A0A0A]">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl border border-black/10 bg-[#0A0A0A] p-12 text-center text-[#F5F5F5] dark:border-white/10 dark:bg-[#F5F5F5] dark:text-[#0A0A0A]"
        >
          <h2 className="mb-4 font-['Syne'] text-4xl font-black tracking-[-0.04em]">Ready to work with us?</h2>
          <p className="mb-8 text-lg text-inherit/80">
            Let&apos;s discuss how our engineering expertise can transform your next project.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-[#C8F135] bg-[#C8F135] px-8 py-4 font-bold text-[#0A0A0A] transition-opacity hover:opacity-85"
          >
            Contact Our Team
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
