'use client';

import { motion } from 'framer-motion';

export function CompanyOverview() {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold text-white mb-6"
            >
              Who We Are
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Stalan L.T.D is a multi-disciplinary technology firm dedicated to engineering purposeful, next-generation solutions. We bring together diverse expertise across software, hardware, and systems engineering to solve humanity&apos;s most pressing challenges.
              </p>
              <p className="leading-relaxed">
                Founded in 2024, we operate at the intersection of innovation and responsibility, building technology that is not just advanced, but genuinely beneficial to society. Our mission drives every decision, ensuring that technology serves humanity rather than the reverse.
              </p>
              <p className="leading-relaxed">
                With a focus on safe, intelligent infrastructure and sustainable innovation, we are advancing the frontier of what&apos;s possible while maintaining unwavering commitment to ethical engineering practices.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Mission & Vision Card */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="group"
          >
            <div className="relative bg-gradient-to-br from-[#1a2f4f] to-[#0A1628] border border-cyan-500/30 rounded-xl p-8 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative space-y-8">
                {/* Mission */}
                <div>
                  <h3 className="text-cyan-400 font-semibold mb-3 text-sm uppercase tracking-wider">
                    Our Mission
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    To advance modern technology by engineering purposeful, next-generation solutions that enable humanity to embrace the right tools for a sustainable future.
                  </p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-cyan-500/0 via-cyan-400/30 to-cyan-500/0" />

                {/* Vision */}
                <div>
                  <h3 className="text-cyan-400 font-semibold mb-3 text-sm uppercase tracking-wider">
                    Our Vision
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    To architect a world where advanced technology is seamlessly aligned with human potential, creating an era of enlightened innovation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
