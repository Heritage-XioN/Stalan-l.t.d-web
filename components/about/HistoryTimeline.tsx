'use client';

import { motion } from 'framer-motion';
import { Calendar, Star } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isFuture?: boolean;
}

const events: TimelineEvent[] = [
  {
    date: 'Nov 2, 2024',
    title: 'Stalan L.T.D Founded',
    description: 'Founded by Ogu Chidiebube Victory with a vision to advance technology for humanity.',
    icon: <Star className="w-5 h-5" />,
  },
  {
    date: 'Apr 20, 2025',
    title: 'Leadership Expansion',
    description: 'Obianayo Victor Chiemerie joins as Director of Marketing (DOM).',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    date: 'Apr 20, 2025',
    title: 'Operations Lead',
    description: 'Israel-Ogiribo Gideon Oghene-Kevwe joins as Chief Operating Officer (COO).',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    date: 'Coming Soon',
    title: 'Next Chapter',
    description: 'More milestones and innovations on the horizon.',
    icon: <Star className="w-5 h-5" />,
    isFuture: true,
  },
];

export function HistoryTimeline() {
  return (
    <section className="py-20 bg-[#0A1628] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
          <p className="text-gray-400 text-lg">Key milestones in Stalan&apos;s evolution</p>
        </motion.div>

        {/* Timeline Container - Horizontal Scroll on Mobile, Grid on Desktop */}
        <div className="overflow-x-auto pb-4 lg:overflow-visible">
          <div className="flex lg:grid lg:grid-cols-4 gap-6 min-w-max lg:min-w-full">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-72 lg:w-full"
              >
                <div
                  className={`relative h-full border rounded-xl p-6 transition-all duration-300 ${
                    event.isFuture
                      ? 'bg-[#1a2f4f]/50 border-gray-600 hover:border-gray-500'
                      : 'bg-[#1a2f4f] border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10'
                  }`}
                >
                  {/* Icon & Date */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`flex-shrink-0 p-2 rounded-lg ${
                        event.isFuture
                          ? 'bg-gray-700/50 text-gray-400'
                          : 'bg-cyan-500/20 text-cyan-400'
                      }`}
                    >
                      {event.icon}
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        event.isFuture ? 'text-gray-400' : 'text-cyan-400'
                      }`}
                    >
                      {event.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {event.description}
                  </p>

                  {/* Future Badge */}
                  {event.isFuture && (
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <span className="inline-block px-3 py-1 bg-gray-700/50 text-gray-300 text-xs font-semibold rounded-full">
                        Upcoming
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint for mobile */}
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex lg:hidden justify-center mt-8 text-gray-400 text-sm"
        >
          ← Scroll for more →
        </motion.div>
      </div>
    </section>
  );
}
