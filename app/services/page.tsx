'use client';

import { motion } from 'framer-motion';
import { Anchor, Compass, BarChart3, Clipboard, Wrench, Code2 } from 'lucide-react';
import Link from 'next/link';

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
    <main className="min-h-screen bg-[#0A1628]">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-32 pb-16 px-4">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0,194,255,.05) 25%, rgba(0,194,255,.05) 26%, transparent 27%, transparent 74%, rgba(0,194,255,.05) 75%, rgba(0,194,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,194,255,.05) 25%, rgba(0,194,255,.05) 26%, transparent 27%, transparent 74%, rgba(0,194,255,.05) 75%, rgba(0,194,255,.05) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Engineering Services</h1>
          <p className="text-xl text-gray-300">
            Specialized professional, technical, and creative expertise rooted in physical, mathematical, and engineering sciences.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl hover:shadow-[#00C2FF]/20 transition-all duration-300 group cursor-pointer border-t-4 border-[#00C2FF] hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#1A4FBF] mb-6 group-hover:bg-[#00C2FF] transition-colors">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Stalan Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#0A1628] via-[#1A2F4F] to-[#0A1628]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why Choose Stalan?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-lg bg-white/5 backdrop-blur border border-white/10 hover:border-[#00C2FF]/50 transition-colors"
              >
                <div className="text-4xl font-bold text-[#00C2FF] mb-3">{item.icon}</div>
                <p className="text-white font-semibold">{item.label}</p>
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
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#1A4FBF]/10 to-[#00C2FF]/10 rounded-2xl p-12 border border-[#00C2FF]/20"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Ready to work with us?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Let&apos;s discuss how our engineering expertise can transform your next project.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-[#00C2FF] text-[#0A1628] font-bold rounded-lg hover:bg-white transition-colors shadow-lg hover:shadow-[#00C2FF]/30"
          >
            Contact Our Team
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
