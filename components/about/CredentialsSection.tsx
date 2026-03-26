'use client';

import { motion } from 'framer-motion';
import { Award, FileText } from 'lucide-react';

export function CredentialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Credentials & Certifications</h2>
          <p className="text-gray-400 text-lg">
            Officially recognized and certified by regulatory bodies
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* CAC Certification Card */}
          <motion.div
            variants={itemVariants}
            className="group h-full"
          >
            <div className="relative bg-gradient-to-br from-[#1a2f4f] to-[#0A1628] border border-cyan-500/30 rounded-xl overflow-hidden p-8 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 h-full flex flex-col">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex flex-col items-center text-center h-full">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">CAC Certified</h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 flex-grow">
                  <span className="block font-semibold text-cyan-400">
                    Corporate Affairs Commission
                  </span>
                  <span className="block text-sm mt-2">
                    Officially registered and certified by the Corporate Affairs Commission of Nigeria
                  </span>
                </p>

                {/* Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-400 rounded-full text-sm font-semibold"
                >
                  ✓ Verified & Registered
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Certificate Image Placeholder */}
          <motion.div
            variants={itemVariants}
            className="group h-full"
          >
            <div className="relative bg-gradient-to-br from-[#1a2f4f] to-[#0A1628] border border-white/10 rounded-xl overflow-hidden p-8 transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10 h-full flex flex-col">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex flex-col items-center justify-center h-full">
                {/* Placeholder Box */}
                <div className="w-full aspect-[4/5] bg-[#0A1628] border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center mb-6 group-hover:border-blue-400/50 transition-colors duration-300">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400 font-medium">CAC Certificate</p>
                    <p className="text-gray-500 text-sm">Fig 1.4</p>
                  </div>
                </div>

                {/* Label */}
                <p className="text-gray-300 text-sm font-semibold">
                  Official CAC Registration Certificate
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Document verification available upon request
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-xl"
        >
          <p className="text-gray-300 text-center">
            <span className="font-semibold text-cyan-400">Compliance & Standards:</span> Stalan L.T.D operates in full compliance with Nigerian corporate regulations and international standards for technology and software development.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
