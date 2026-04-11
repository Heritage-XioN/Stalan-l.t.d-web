import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AboutHero } from '@/components/about/AboutHero';
import { CompanyOverview } from '@/components/about/CompanyOverview';
import { HistoryTimeline } from '@/components/about/HistoryTimeline';
import { LeadershipTeam } from '@/components/about/LeadershipTeam';
import { CredentialsSection } from '@/components/about/CredentialsSection';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Stalan L.T.D, our mission, vision, leadership team, and commitment to revolutionizing modern day technology.',
  openGraph: {
    title: 'About Stalan L.T.D',
    description: 'Multi-disciplinary technology firm founded to advance safe, purposeful innovation.',
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#0A1628]">
      <Navbar />
      <AboutHero />
      <CompanyOverview />
      <HistoryTimeline />
      <LeadershipTeam />
      <CredentialsSection />
      <Footer />
    </main>
  );
}
