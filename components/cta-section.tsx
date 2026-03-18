'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-20" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="glass-dark rounded-2xl p-8 sm:p-12 md:p-16 border-white/20 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Content */}
          <div className="text-center">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="gradient-text">Ready for the Future?</span>
            </motion.h2>

            <motion.p
              className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover how our S.A.T Trading Bots can revolutionize your trading strategy with AI-powered insights and automation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-foreground font-semibold glow-accent px-8"
              >
                Explore S.A.T Bots <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5 font-semibold px-8"
              >
                Schedule a Demo
              </Button>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-2xl opacity-20 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-2xl opacity-20 translate-x-1/2 translate-y-1/2"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
