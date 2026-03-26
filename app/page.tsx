import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { StatsBar } from '@/components/StatsBar';
import { ProductShowcase } from '@/components/ProductShowcase';
import { MissionBanner } from '@/components/MissionBanner';
import { ServicesTeaser } from '@/components/ServicesTeaser';
import { AboutTeaser } from '@/components/AboutTeaser';
import { NewsletterStrip } from '@/components/NewsletterStrip';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main id="main-content" className="bg-[#0A1628]">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ProductShowcase />
      <MissionBanner />
      <ServicesTeaser />
      <AboutTeaser />
      <NewsletterStrip />
      <CTASection />
      <Footer />
    </main>
  );
}
