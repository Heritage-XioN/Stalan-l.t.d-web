'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Brain, Car, Drone, Home, Shield, type LucideIcon } from 'lucide-react';
import { getAllProducts } from '@/lib/products';

const revealEase = [0.16, 1, 0.3, 1] as const;

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  drone: Drone,
  home: Home,
  car: Car,
  zap: Brain,
};

const cardStyles: Record<
  string,
  {
    span: string;
    iconClassName: string;
    accent: string;
    eyebrow: string;
  }
> = {
  'sc-static': {
    span: 'md:col-span-2 md:row-span-2',
    iconClassName: 'h-20 w-20 sm:h-24 sm:w-24',
    accent: '#C8F135',
    eyebrow: 'Flagship Platform',
  },
  'drone-technology': {
    span: 'md:col-span-1 md:row-span-1',
    iconClassName: 'h-14 w-14',
    accent: '#8AD7FF',
    eyebrow: 'Aerial Logistics',
  },
  'smart-home': {
    span: 'md:col-span-1 md:row-span-1',
    iconClassName: 'h-14 w-14',
    accent: '#1A4FBF',
    eyebrow: 'Connected Living',
  },
  'autonomous-vehicles': {
    span: 'md:col-span-1 md:row-span-1',
    iconClassName: 'h-14 w-14',
    accent: '#0A0A0A',
    eyebrow: 'Mobility Research',
  },
  'artificial-intelligence': {
    span: 'md:col-span-2 md:row-span-1',
    iconClassName: 'h-16 w-16',
    accent: '#C8F135',
    eyebrow: 'Intelligence Layer',
  },
};

export function ProductShowcase() {
  const products = getAllProducts();

  return (
    <section id="products" className="bg-[#FAFAFA] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: revealEase }}
              viewport={{ once: true, amount: 0.4 }}
              className="mb-5 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.32em] text-[#0A0A0A]/52"
            >
              Product Ecosystem
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: revealEase, delay: 0.05 }}
              viewport={{ once: true, amount: 0.35 }}
              className="font-['Syne'] text-4xl font-black tracking-[-0.05em] text-[#0A0A0A] sm:text-5xl lg:text-6xl"
            >
              A bolder system of products, designed to work together.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: revealEase, delay: 0.12 }}
            viewport={{ once: true, amount: 0.35 }}
            className="max-w-md text-base leading-7 text-[#0A0A0A]/64"
          >
            Stalan builds across electrical safety, autonomous logistics, intelligent homes, mobility, and AI with a premium systems mindset.
          </motion.p>
        </div>

        <div className="grid auto-rows-[minmax(260px,auto)] gap-6 md:grid-cols-3 md:grid-rows-[repeat(3,minmax(210px,auto))]">
          {products.map((product, index) => {
            const Icon = iconMap[product.icon] ?? Shield;
            const style = cardStyles[product.slug] ?? {
              span: 'md:col-span-1 md:row-span-1',
              iconClassName: 'h-14 w-14',
              accent: '#C8F135',
              eyebrow: product.category,
            };
            const isHeroCard = product.slug === 'sc-static';

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 54 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: revealEase,
                  delay: index * 0.08,
                }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className={style.span}
              >
                <Link href={`/products/${product.slug}`}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_12px_40px_rgba(10,10,10,0.04)] transition-all duration-500 hover:border-[#C8F135] hover:bg-[#FCFFE9] hover:shadow-[0_28px_90px_rgba(10,10,10,0.12)] sm:p-8">
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      style={{ backgroundColor: `${style.accent}55` }}
                    />

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="mb-6 flex items-start justify-between gap-4">
                        <div className="space-y-3">
                          <p className="font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-[0.28em] text-[#0A0A0A]/46">
                            {style.eyebrow}
                          </p>
                          <span className="inline-flex rounded-full border border-black/8 px-3 py-1 font-['JetBrains_Mono'] text-[0.62rem] uppercase tracking-[0.22em] text-[#0A0A0A]/58">
                            {product.badge}
                          </span>
                        </div>

                        <div
                          className={`flex shrink-0 items-center justify-center rounded-[1.75rem] border border-black/6 bg-[#FAFAFA] p-4 text-[#0A0A0A] transition-transform duration-500 group-hover:rotate-3 ${isHeroCard ? 'sm:p-5' : ''}`}
                        >
                          <Icon className={style.iconClassName} strokeWidth={isHeroCard ? 1.5 : 1.75} />
                        </div>
                      </div>

                      <div className={isHeroCard ? 'max-w-2xl flex-1' : 'max-w-md flex-1'}>
                        <h3
                          className={`font-['Syne'] text-[#0A0A0A] tracking-[-0.05em] ${isHeroCard ? 'text-4xl font-black sm:text-5xl' : 'text-2xl font-bold sm:text-3xl'}`}
                        >
                          {product.name}
                        </h3>
                        <p className="mt-3 font-sans text-sm uppercase tracking-[0.22em] text-[#0A0A0A]/42">
                          {product.category}
                        </p>
                        <p
                          className={`mt-6 max-w-2xl text-[#0A0A0A]/66 ${isHeroCard ? 'text-base leading-8 sm:text-lg' : 'text-sm leading-7 sm:text-base'}`}
                        >
                          {isHeroCard ? product.description : product.shortDescription}
                        </p>
                      </div>

                      <div className="mt-8 flex items-end justify-between gap-6">
                        <div className="flex flex-wrap gap-2">
                          {product.tags.slice(0, isHeroCard ? 4 : 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[#FAFAFA] px-3 py-1.5 font-['JetBrains_Mono'] text-[0.62rem] uppercase tracking-[0.18em] text-[#0A0A0A]/55"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.24em] text-[#0A0A0A]">
                          View Product
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="border border-black/10 bg-white px-8 py-3 font-medium text-[#0A0A0A] shadow-[0_10px_30px_rgba(10,10,10,0.05)] transition-colors hover:border-[#C8F135] hover:bg-[#C8F135]"
            >
              View All Products
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
