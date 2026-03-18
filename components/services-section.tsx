'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Code2,
  Cpu,
  Zap,
} from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      id: 1,
      icon: Code2,
      title: 'Software Engineering',
      description: 'Custom solutions built with cutting-edge technologies and best practices.',
    },
    {
      id: 2,
      icon: Cpu,
      title: 'Hardware Architecture',
      description: 'Designing robust systems optimized for performance and reliability.',
    },
    {
      id: 3,
      icon: Zap,
      title: 'AI & Automation',
      description: 'Intelligent systems that learn, adapt, and solve complex problems.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Services</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="glass-dark border-white/20 overflow-hidden h-full group hover:border-accent/50 transition-colors">
                  <CardHeader className="pb-0">
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center glow-accent group-hover:shadow-xl transition-shadow">
                      <IconComponent className="h-7 w-7 text-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
