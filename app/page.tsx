import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { InnovationsSlider } from '@/components/innovations-slider';
import { ServicesSection } from '@/components/services-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <InnovationsSlider />
      <ServicesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
