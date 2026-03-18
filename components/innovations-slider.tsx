'use client';

import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Zap, Wifi } from 'lucide-react';

export function InnovationsSlider() {
  const innovations = [
    {
      id: 1,
      name: 'SC-STATIC',
      description: 'Revolutionary computing architecture designed for high-performance distributed systems.',
      icon: Cpu,
      details: ['Quantum-Ready', 'Edge Computing', 'Real-time Processing'],
    },
    {
      id: 2,
      name: 'Drone Technology',
      description: 'Autonomous flight systems with advanced AI navigation and precision control.',
      icon: Zap,
      details: ['AI Navigation', 'Swarm Capability', 'Autonomous Missions'],
    },
    {
      id: 3,
      name: 'Smart Home Systems',
      description: 'Integrated IoT ecosystem for seamless home automation and energy optimization.',
      icon: Wifi,
      details: ['Voice Control', 'Energy Optimization', 'Security Suite'],
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-background">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30" />
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
            <span className="gradient-text">Our Innovations</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Cutting-edge technologies pushing the boundaries of what's possible
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {innovations.map((innovation) => {
                const IconComponent = innovation.icon;
                return (
                  <CarouselItem key={innovation.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="glass-dark border-white/20 overflow-hidden h-full hover:border-accent/50 transition-colors">
                        <CardContent className="p-6 flex flex-col h-full">
                          {/* Icon */}
                          <div className="mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center glow-accent">
                              <IconComponent className="h-6 w-6 text-foreground" />
                            </div>
                          </div>

                          {/* Title & Description */}
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {innovation.name}
                          </h3>
                          <p className="text-foreground/60 text-sm mb-6 flex-grow">
                            {innovation.description}
                          </p>

                          {/* Details */}
                          <div className="flex flex-wrap gap-2">
                            {innovation.details.map((detail) => (
                              <span
                                key={detail}
                                className="text-xs px-3 py-1 rounded-full bg-primary/20 text-accent border border-primary/30"
                              >
                                {detail}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <CarouselPrevious className="border-white/20 hover:bg-white/5 hover:border-accent/50" />
              <CarouselNext className="border-white/20 hover:bg-white/5 hover:border-accent/50" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
