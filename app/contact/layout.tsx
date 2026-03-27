import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Stalan L.T.D. We\'d love to hear from you about projects, partnerships, and inquiries.',
  openGraph: {
    title: 'Contact Stalan L.T.D',
    description: 'Reach out to discuss your technology needs and partnerships.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
