import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SatBotsGallery } from '@/components/sat-bots/SatBotsGallery';
import { prisma } from '@/lib/prisma';

async function getSatBotPosts() {
  return prisma.satBotPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function SatBotsPage() {
  const posts = await getSatBotPosts();
  const galleryPosts = posts.map((post) => {
    // Keep compatibility while local Prisma types refresh.
    const postWithCommerce = post as typeof post & {
      price?: number | null;
      specifications?: unknown;
    };

    return {
      ...post,
      price:
        typeof postWithCommerce.price === 'number'
          ? postWithCommerce.price.toString()
          : null,
      specifications: postWithCommerce.specifications ?? null,
      createdAt: post.createdAt.toISOString(),
    };
  });

  return (
    <main id="main-content" className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      <Navbar />
      <section className="border-b border-black/6 bg-[radial-gradient(circle_at_top,_rgba(200,241,53,0.24),_transparent_35%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(250,250,250,1))] pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl font-['Plus_Jakarta_Sans']">
            <p className="mb-5 inline-flex rounded-full border border-black/8 bg-white px-4 py-1.5 text-sm font-bold uppercase tracking-[0.24em] text-[#0A0A0A]/60">
              S.A.T Bots
            </p>
            <h1 className="text-5xl font-black tracking-[-0.05em] text-[#0A0A0A] sm:text-6xl lg:text-7xl">
              Visual notes and live intelligence from the S.A.T Bot lab.
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-[#0A0A0A]/66">
              Explore published updates, imagery, and field observations from Stalan&apos;s trading bot initiative, presented in a premium editorial gallery.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SatBotsGallery posts={galleryPosts} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
