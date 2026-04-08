'use client';

import { motion, type Transition } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllProducts } from '@/lib/products';

const revealEase = [0.16, 1, 0.3, 1] as const;

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
              transition={{ duration: 0.7, ease: revealEase } satisfies Transition}
              viewport={{ once: true, amount: 0.4 }}
              className="mb-5 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.32em] text-[#0A0A0A]/52"
            >
              Product Ecosystem
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: revealEase, delay: 0.05 } satisfies Transition}
              viewport={{ once: true, amount: 0.35 }}
              className="font-['Syne'] text-4xl font-black tracking-[-0.05em] text-[#0A0A0A] sm:text-5xl lg:text-6xl"
            >
              A bolder system of products, designed to work together.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: revealEase, delay: 0.12 } satisfies Transition}
            viewport={{ once: true, amount: 0.35 }}
            className="max-w-md text-base leading-7 text-[#0A0A0A]/64"
          >
            Stalan builds across electrical safety, autonomous logistics, intelligent homes, mobility, and AI with a premium systems mindset.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: revealEase } satisfies Transition}
          viewport={{ once: true, amount: 0.25 }}
          className="mb-8"
        >
          <Link href="/sat-bots" className="block">
            <article className="group w-full border border-[#C8F135] bg-[#080808] px-6 py-8 text-white transition-colors duration-300 hover:bg-[#0f0f0f] sm:px-8 sm:py-10">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="inline-flex items-center bg-[#C8F135] px-3 py-1 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.2em] text-black">
                  Live Now
                </span>
                <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-[0.22em] text-[#C8F135]">
                  S.A.T BOTS
                </span>
              </div>
              <h3 className="font-['Syne'] text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Live Intelligence: Visual notes and live intelligence from the S.A.T Bot lab.
              </h3>
              <p className="mt-6 inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.24em] text-[#C8F135]">
                Enter S.A.T Bots Lab
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </p>
            </article>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => {
            const rowNumber = String(index + 1).padStart(2, '0');
            const isUpcoming = product.badge.toLowerCase() === 'upcoming';

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 54 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={
                  { duration: 0.9, ease: revealEase, delay: index * 0.08 } satisfies Transition
                }
                viewport={{ once: true, amount: 0.2 }}
              >
                <article className="group flex h-full flex-col border border-black/15 bg-white p-6 transition-colors duration-300 hover:border-[#C8F135] hover:bg-[#FCFFE9] sm:p-7">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <p className="font-['JetBrains_Mono'] text-4xl font-semibold leading-none tracking-[-0.04em] text-[#0A0A0A]/85 sm:text-5xl">
                        {rowNumber}
                      </p>
                      <span className="inline-flex items-center border border-black/20 bg-[#C8F135] px-3 py-1 font-['JetBrains_Mono'] text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-black">
                        Upcoming
                      </span>
                    </div>
                    <p className="mb-2 font-['JetBrains_Mono'] text-[0.68rem] uppercase tracking-[0.28em] text-[#0A0A0A]/55">
                      {product.category}
                    </p>
                    <h3 className="font-['Syne'] text-3xl font-black tracking-[-0.05em] text-[#0A0A0A] sm:text-4xl">
                      {product.name}
                    </h3>
                    <p className="mt-4 flex-grow text-sm leading-7 text-[#0A0A0A]/72">
                      {product.shortDescription}
                    </p>
                    {isUpcoming ? (
                      <Link
                        href="/#newsletter"
                        className="mt-6 inline-flex items-center justify-center border border-black/20 bg-[#C8F135] px-4 py-2 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.22em] text-black transition-opacity hover:opacity-85"
                      >
                        JOIN WAITLIST
                      </Link>
                    ) : (
                      <Link
                        href={`/products/${product.slug}`}
                        className="mt-6 inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.24em] text-[#0A0A0A]"
                      >
                        View System
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    )}
                  </article>
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
