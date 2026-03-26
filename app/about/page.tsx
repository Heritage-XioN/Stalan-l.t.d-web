'use client';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AboutHero } from '@/components/about/AboutHero';
import { CompanyOverview } from '@/components/about/CompanyOverview';
import { HistoryTimeline } from '@/components/about/HistoryTimeline';
import { LeadershipTeam } from '@/components/about/LeadershipTeam';
import { CredentialsSection } from '@/components/about/CredentialsSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A1628]">
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
