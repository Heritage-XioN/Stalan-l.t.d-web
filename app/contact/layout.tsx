import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Stalan L.T.D. Reach out to start a project, request a demo, or discuss a partnership.',
  openGraph: {
    title: 'Contact Stalan L.T.D',
    description: 'Start a project or discuss your technology needs with our team.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
