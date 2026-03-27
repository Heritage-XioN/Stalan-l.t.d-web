import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore Stalan L.T.D engineering services including marine logistics, design, consultation, project management, technical support, and software engineering.',
  openGraph: {
    title: 'Our Services',
    description: 'Specialized professional and technical expertise across multiple engineering disciplines.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
