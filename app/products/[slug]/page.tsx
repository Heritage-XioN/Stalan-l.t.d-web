import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowRight, ArrowLeft, Zap, Activity, Layers, Network, Radar, Wrench, MapPin, DollarSign, Package, Settings, Battery, Lock, Brain, ShieldCheck, Leaf, TrendingUp, RefreshCw, Link2 } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

const iconMap: { [key: string]: React.ReactNode } = {
  zap: <Zap className="w-6 h-6" />,
  activity: <Activity className="w-6 h-6" />,
  layers: <Layers className="w-6 h-6" />,
  network: <Network className="w-6 h-6" />,
  radar: <Radar className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
  'map-pin': <MapPin className="w-6 h-6" />,
  'dollar-sign': <DollarSign className="w-6 h-6" />,
  package: <Package className="w-6 h-6" />,
  settings: <Settings className="w-6 h-6" />,
  battery: <Battery className="w-6 h-6" />,
  lock: <Lock className="w-6 h-6" />,
  brain: <Brain className="w-6 h-6" />,
  'shield-check': <ShieldCheck className="w-6 h-6" />,
  leaf: <Leaf className="w-6 h-6" />,
  'trending-up': <TrendingUp className="w-6 h-6" />,
  'refresh-cw': <RefreshCw className="w-6 h-6" />,
  'link-2': <Link2 className="w-6 h-6" />,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} | Stalan L.T.D`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.fullContent?.relatedProducts
    ? product.fullContent.relatedProducts.map((relatedSlug) => getProductBySlug(relatedSlug)).filter(Boolean)
    : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A1628]">
        {/* Hero Section */}
        <section className="py-12 px-4 md:px-8 border-b border-[#1a3a5f]">
          <div className="max-w-5xl mx-auto">
            {/* Back Link */}
            <Link href="/products" className="flex items-center gap-2 text-[#00C2FF] hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>

            {/* Title & Badges */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">{product.name}</h1>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold text-[#00C2FF] bg-[#00C2FF]/10 px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#1A4FBF] bg-[#1A4FBF]/10 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              <p className="text-lg text-[#b0bcc8]">{product.description}</p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Operational Logic */}
            {product.fullContent?.operationalLogic && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">{product.fullContent.operationalLogic.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {product.fullContent.operationalLogic.features.map((feature, index) => (
                    <div key={index} className="bg-[#1a2f4f] border border-[#1a3a5f] rounded-lg p-6 hover:border-[#00C2FF] transition-all">
                      <div className="w-12 h-12 rounded-lg bg-[#1A4FBF]/20 flex items-center justify-center mb-4 text-[#00C2FF]">
                        {iconMap[feature.icon] || <Zap className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-[#b0bcc8] text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Image Placeholder */}
            <div className="bg-gradient-to-br from-[#1a2f4f] to-[#0A1628] border-2 border-dashed border-[#1a3a5f] rounded-lg p-12 md:p-16 flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#1A4FBF]/20 rounded-lg flex items-center justify-center mx-auto mb-4 text-[#00C2FF]">
                  <Zap className="w-8 h-8" />
                </div>
                <p className="text-[#b0bcc8] font-medium">{product.imageLabel}</p>
              </div>
            </div>

            {/* Key Differentiators */}
            {product.fullContent?.keyDifferentiators && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Key Differentiators</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {product.fullContent.keyDifferentiators.map((diff, index) => (
                    <div key={index} className="bg-[#1a2f4f] border border-[#1a3a5f] rounded-lg p-6 hover:border-[#1A4FBF] transition-all">
                      <div className="w-12 h-12 rounded-lg bg-[#00C2FF]/10 flex items-center justify-center mb-4 text-[#00C2FF]">
                        {iconMap[diff.icon] || <Zap className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{diff.title}</h3>
                      <p className="text-[#b0bcc8] text-sm leading-relaxed">{diff.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Related Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <Link key={relatedProduct.slug} href={`/products/${relatedProduct.slug}`}>
                      <div className="bg-[#1a2f4f] border border-[#1a3a5f] rounded-lg p-6 hover:border-[#00C2FF] transition-all cursor-pointer group">
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#00C2FF] transition-colors mb-2">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-[#b0bcc8] text-sm mb-4">{relatedProduct.shortDescription}</p>
                        <div className="flex items-center gap-2 text-[#00C2FF] font-semibold text-sm group-hover:gap-3 transition-all">
                          View Product
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
