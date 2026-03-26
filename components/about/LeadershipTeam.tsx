'use client';

import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  title: string;
  role: string;
  initials: string;
  badge: string;
  badgeColor: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Ogu Chidiebube Victory',
    title: 'Founder & CEO',
    role: 'Chief Executive Officer',
    initials: 'OCV',
    badge: 'Founder',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-400/50',
  },
  {
    name: 'Obianayo Victor Chiemerie',
    title: 'Co-Founder & DOM',
    role: 'Director of Marketing',
    initials: 'OVC',
    badge: 'Marketing',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-400/50',
  },
  {
    name: 'Israel-Ogiribo Gideon Oghene-Kevwe',
    title: 'Co-Founder & COO',
    role: 'Chief Operating Officer',
    initials: 'IGO',
    badge: 'Operations',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-400/50',
  },
];

export function LeadershipTeam() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
          <h2 className="text-4xl font-bold text-white mb-4">Leadership Team</h2>
          <p className="text-gray-400 text-lg">The visionaries driving Stalan forward</p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group h-full"
            >
              <div className="relative bg-gradient-to-br from-[#1a2f4f] to-[#0A1628] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 h-full flex flex-col">
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative p-8 flex flex-col h-full">
                  {/* Avatar Circle with Initials */}
                  <div className="flex justify-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300"
                    >
                      <span className="text-white font-bold text-2xl">
                        {member.initials}
                      </span>
                    </motion.div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-white text-center mb-1">
                    {member.name}
                  </h3>

                  {/* Title */}
                  <p className="text-cyan-400 font-semibold text-center mb-4">
                    {member.title}
                  </p>

                  {/* Role */}
                  <p className="text-gray-400 text-sm text-center mb-6 flex-grow">
                    {member.role}
                  </p>

                  {/* Badge */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex justify-center"
                  >
                    <span
                      className={`px-4 py-1.5 border rounded-full text-sm font-semibold ${member.badgeColor}`}
                    >
                      {member.badge}
                    </span>
                  </motion.div>
                </div>

                {/* Bottom accent line */}
                <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
