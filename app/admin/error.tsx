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
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4 text-[#0A0A0A]">
      <div className="text-center max-w-2xl">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="mb-4 text-4xl font-bold text-[#0A0A0A]">Something Went Wrong</h1>
        <p className="mb-8 text-lg text-[#0A0A0A]/70">
          An error occurred in the admin dashboard. Please try again or contact support if the problem persists.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="rounded-none bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-[#C8F135] hover:text-black"
          >
            Try Again
          </button>
          <Link href="/">
            <button className="inline-flex items-center gap-2 rounded-none border border-black px-6 py-3 font-medium text-[#0A0A0A] transition-colors hover:border-[#C8F135] hover:bg-[#C8F135] hover:text-black">
              <Home className="w-4 h-4" />
              Back Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
