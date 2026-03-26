import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { StatsBar } from '@/components/StatsBar';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1628]">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <Footer />
    </main>
  );
}
