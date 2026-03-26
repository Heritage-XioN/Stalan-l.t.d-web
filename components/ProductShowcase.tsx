'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Drone, Home } from 'lucide-react';

const featured = [
  {
    name: 'SC-STATIC',
    slug: 'sc-static',
    description: 'Advanced RCD with 6-channel isolation architecture',
    icon: Zap,
    color: '#1A4FBF',
  },
  {
    name: 'Drone Technology',
    slug: 'drone-technology',
    description: 'Revolutionizing logistics with autonomous delivery',
    icon: Drone,
    color: '#00C2FF',
  },
  {
    name: 'Smart Home',
    slug: 'smart-home',
    description: 'Integrated automation for modern living',
    icon: Home,
    color: '#1A4FBF',
  },
];

export function ProductShowcase() {
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
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="products" className="py-20 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-4"
          >
            What We Build
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg"
          >
            Cutting-edge technology solutions for tomorrow's challenges
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {featured.map((product, idx) => {
            const Icon = product.icon;
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Link href={`/products/${product.slug}`}>
                  <div className="group h-full rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 hover:border-[#00C2FF]/50 hover:shadow-lg hover:shadow-[#00C2FF]/20 transition-all duration-300">
                    <div
                      className="w-12 h-12 rounded-lg mb-6 flex items-center justify-center"
                      style={{ backgroundColor: `${product.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: product.color }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00C2FF] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 mb-6 text-sm">{product.description}</p>
                    <div className="flex items-center text-[#00C2FF] font-medium text-sm group-hover:gap-2 gap-1 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-12">
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#1A4FBF] text-white rounded-lg font-medium hover:bg-[#1A4FBF]/90 transition-colors"
            >
              View All Products
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
