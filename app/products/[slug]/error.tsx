'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Product detail error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
        <p className="text-gray-400 text-lg mb-8">
          We couldn&apos;t find the product you&apos;re looking for. It may have been removed or the URL might be incorrect.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#1A4FBF] text-white rounded-lg font-medium hover:bg-[#1A4FBF]/90 transition-colors"
          >
            Try Again
          </button>
          <Link href="/products">
            <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#00C2FF] text-[#00C2FF] rounded-lg font-medium hover:bg-[#00C2FF]/10 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
