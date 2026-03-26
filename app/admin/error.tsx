'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Home } from 'lucide-react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-white mb-4">Something Went Wrong</h1>
        <p className="text-gray-400 text-lg mb-8">
          An error occurred in the admin dashboard. Please try again or contact support if the problem persists.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#1A4FBF] text-white rounded-lg font-medium hover:bg-[#1A4FBF]/90 transition-colors"
          >
            Try Again
          </button>
          <Link href="/">
            <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#00C2FF] text-[#00C2FF] rounded-lg font-medium hover:bg-[#00C2FF]/10 transition-colors">
              <Home className="w-4 h-4" />
              Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
