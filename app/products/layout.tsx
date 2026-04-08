import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Products | Stalan L.T.D',
  description:
    'Discover Stalan L.T.D products: SC-STATIC, Drone Technology, Smart Home, Autonomous Vehicles, and AI solutions.',
};

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
