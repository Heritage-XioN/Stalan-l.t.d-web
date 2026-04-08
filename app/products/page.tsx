'use client';

import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Shield, Drone, Home, Car, Brain, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: { [key: string]: React.ReactNode } = {
  shield: <Shield className="w-8 h-8" />,
  drone: <Drone className="w-8 h-8" />,
  home: <Home className="w-8 h-8" />,
  car: <Car className="w-8 h-8" />,
  zap: <Brain className="w-8 h-8" />,
};

function ProductCard({ product }: { product: ReturnType<typeof getAllProducts>[0] }) {
  const isUpcoming = product.badge.toLowerCase() === 'upcoming';

  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A4FBF] to-[#00C2FF] rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
      <div className="relative h-full bg-[#1a2f4f] border border-[#1a3a5f] rounded-lg p-6 transition-all duration-300 hover:border-[#00C2FF] hover:shadow-lg hover:shadow-[#00C2FF]/20 flex flex-col">
        {/* Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-[#00C2FF] bg-[#00C2FF]/10 px-3 py-1 rounded-full">
            {product.badge}
          </span>
          <span className="text-xs text-[#b0bcc8]">{product.category}</span>
        </div>

        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-[#1A4FBF]/20 flex items-center justify-center mb-4 text-[#00C2FF] transition-transform group-hover:scale-110 duration-300">
          {iconMap[product.icon] || <Shield className="w-6 h-6" />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00C2FF] transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[#b0bcc8] text-sm mb-4 flex-grow leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-[#334455] bg-[#0A1628]/50 px-2 py-1 rounded border border-[#1a3a5f]">
              {tag}
            </span>
          ))}
          {product.tags.length > 2 && (
            <span className="text-xs text-[#334455] bg-[#0A1628]/50 px-2 py-1 rounded border border-[#1a3a5f]">
              +{product.tags.length - 2}
            </span>
          )}
        </div>

        {/* CTA */}
        {isUpcoming ? (
          <Link
            href="/#newsletter"
            className="mt-auto inline-flex items-center justify-center border border-[#C8F135] bg-[#C8F135] px-4 py-2 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-85"
          >
            JOIN WAITLIST
          </Link>
        ) : (
          <Link
            href={`/products/${product.slug}`}
            className="mt-auto inline-flex items-center gap-2 text-[#00C2FF] font-semibold text-sm group-hover:gap-3 transition-all"
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A1628]">
        {/* Header Section */}
        <section className="py-20 px-4 md:px-8 border-b border-[#1a3a5f]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Products
              </h1>
              <div className="mx-auto mb-6 max-w-4xl border border-black/20 bg-[#C8F135] px-5 py-4 text-left text-sm font-medium leading-relaxed text-black md:text-base">
                Notice: Our hardware ecosystem is currently in the Research &amp; Development phase. For our active live intelligence feed, please{' '}
                <Link href="/sat-bots" className="underline decoration-black/80 underline-offset-2 hover:opacity-80">
                  visit the S.A.T Bots lab
                </Link>
                .
              </div>
              <p className="text-lg text-[#b0bcc8] max-w-2xl mx-auto">
                Next-generation technology built for humanity
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
