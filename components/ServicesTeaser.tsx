'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Anchor, Compass, BarChart3 } from 'lucide-react';

const services = [
  {
    name: 'Marine Logistics',
    description: 'Global shipping and port operations',
    icon: Anchor,
  },
  {
    name: 'Design & Development',
    description: 'CAD and infrastructure blueprints',
    icon: Compass,
  },
  {
    name: 'Consultation & Analysis',
    description: 'Expert feasibility and safety studies',
    icon: BarChart3,
  },
];

export function ServicesTeaser() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="py-20 bg-[#F0F4FF]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[#0A1628] mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg"
          >
            Specialized expertise across multiple disciplines
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <div className="rounded-lg bg-white p-8 shadow-md hover:shadow-lg hover:shadow-[#1A4FBF]/10 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1A4FBF] to-[#00C2FF] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A1628] mb-3">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center">
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#1A4FBF] text-white rounded-lg font-medium hover:bg-[#1A4FBF]/90 transition-colors"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
