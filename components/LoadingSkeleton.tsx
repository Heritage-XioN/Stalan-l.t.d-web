'use client';

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
      <div className="space-y-8 w-full max-w-4xl px-4">
        {/* Logo Animation */}
        <div className="flex justify-center mb-12">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1A4FBF] to-[#00C2FF] animate-pulse" />
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <div className="h-10 bg-white/10 rounded-lg animate-pulse max-w-2xl mx-auto" />
          <div className="h-6 bg-white/10 rounded-lg animate-pulse max-w-xl mx-auto" />
        </div>

        {/* Pulsing Bar */}
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-[#1A4FBF] to-[#00C2FF] rounded-full animate-pulse" />

        {/* Content Blocks */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-40 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-4 bg-white/10 rounded animate-pulse" />
              <div className="h-4 bg-white/10 rounded animate-pulse max-w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
