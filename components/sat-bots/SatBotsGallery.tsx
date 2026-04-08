'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, type Transition } from 'framer-motion';
import { Bot, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

type SatBotPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  price?: string | number | null;
  specifications?: unknown;
  createdAt: string;
};

const revealEase = [0.16, 1, 0.3, 1] as const;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

function formatPrice(value: SatBotPost['price']) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const numericValue = Number(value);
  if (Number.isFinite(numericValue)) {
    return `$${numericValue.toLocaleString('en-US')}`;
  }

  return String(value);
}

function getSpecificationsList(specifications: unknown): Array<{ key: string; value: string }> {
  if (!specifications || typeof specifications !== 'object' || Array.isArray(specifications)) {
    return [];
  }

  return Object.entries(specifications as Record<string, unknown>).map(([key, value]) => ({
    key,
    value: typeof value === 'string' ? value : JSON.stringify(value),
  }));
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency?: string;
        ref: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

export function SatBotsGallery({ posts }: { posts: SatBotPost[] }) {
  const [emailByPostId, setEmailByPostId] = useState<Record<string, string>>({});
  const [showDownloadByPostId, setShowDownloadByPostId] = useState<Record<string, boolean>>({});
  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  useEffect(() => {
    if (window.PaystackPop) return;
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handleCheckout(post: SatBotPost) {
    const numericPrice = Number(post.price);
    const email = (emailByPostId[post.id] || '').trim();

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      toast.error('This product has no valid price configured yet.');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email before checkout.');
      return;
    }

    if (!paystackPublicKey) {
      toast.error('Paystack public key is missing. Set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.');
      return;
    }

    if (!window.PaystackPop) {
      toast.error('Paystack failed to load. Please try again.');
      return;
    }

    const amountInKobo = Math.round(numericPrice * 100);
    const reference = `satbot_${post.id}_${Date.now()}`;

    const popup = window.PaystackPop.setup({
      key: paystackPublicKey,
      email,
      amount: amountInKobo,
      currency: 'NGN',
      ref: reference,
      metadata: {
        productId: post.id,
        productTitle: post.title,
      },
      callback: (response) => {
        toast.success(`Success! Payment confirmed (${response.reference}).`);
        setShowDownloadByPostId((current) => ({ ...current, [post.id]: true }));
      },
      onClose: () => {
        toast.message('Checkout closed.');
      },
    });

    popup.openIframe();
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-[2rem] border border-black/8 bg-white px-8 py-16 text-center shadow-[0_18px_60px_rgba(10,10,10,0.05)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FAFAFA] text-[#C8F135]">
          <Bot className="h-10 w-10" />
        </div>
        <h2 className="mt-6 font-['Syne'] text-3xl font-black tracking-tight text-[#0A0A0A]">
          No S.A.T Bot posts yet
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-['Syne'] text-lg leading-8 text-[#0A0A0A]/62">
          Fresh visuals and updates will appear here as soon as the team publishes the first S.A.T Bot release notes.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={
            { duration: 0.9, ease: revealEase, delay: index * 0.08 } satisfies Transition
          }
          viewport={{ once: true, amount: 0.22 }}
          className="group overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_16px_56px_rgba(10,10,10,0.05)]"
        >
          <div className="relative aspect-[16/11] overflow-hidden bg-[#FAFAFA]">
            {post.imageUrl ? (
              <motion.div
                initial={{ opacity: 0.4, scale: 1.08 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: revealEase } satisfies Transition}
                viewport={{ once: true, amount: 0.35 }}
                className="h-full w-full"
              >
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: revealEase } satisfies Transition}
                viewport={{ once: true, amount: 0.35 }}
                className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(200,241,53,0.28),_transparent_38%),linear-gradient(180deg,_#FFFFFF,_#FAFAFA)]"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-black/8 bg-white text-[#C8F135]">
                  <Bot className="h-10 w-10" />
                </div>
                <p className="mt-5 font-['Syne'] text-lg font-bold tracking-tight text-[#0A0A0A]">
                  Visual coming soon
                </p>
              </motion.div>
            )}
          </div>

          <div className="space-y-5 p-7">
            <p className="font-['Syne'] text-sm font-bold uppercase tracking-[0.24em] text-[#0A0A0A]/42">
              {dateFormatter.format(new Date(post.createdAt))}
            </p>
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-['Syne'] text-3xl font-black leading-tight tracking-[-0.04em] text-[#0A0A0A]">
                {post.title}
              </h2>
              {formatPrice(post.price) ? (
                <p className="shrink-0 font-['JetBrains_Mono'] text-sm font-semibold uppercase tracking-[0.16em] text-[#0A0A0A]">
                  {formatPrice(post.price)}
                </p>
              ) : null}
            </div>
            <p className="whitespace-pre-wrap font-['Syne'] text-base leading-8 text-[#0A0A0A]/68">
              {post.content}
            </p>

            {getSpecificationsList(post.specifications).length > 0 ? (
              <div className="border-t border-black/10 pt-4">
                <p className="mb-3 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.24em] text-[#0A0A0A]/58">
                  Specifications
                </p>
                <ul className="space-y-2">
                  {getSpecificationsList(post.specifications).map((spec) => (
                    <li key={spec.key} className="font-['JetBrains_Mono'] text-sm text-[#0A0A0A]/78">
                      <span className="font-semibold">{spec.key}:</span> {spec.value}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="space-y-3 pt-2">
              <Input
                type="email"
                placeholder="Enter your email for checkout"
                value={emailByPostId[post.id] ?? ''}
                onChange={(event) =>
                  setEmailByPostId((current) => ({
                    ...current,
                    [post.id]: event.target.value,
                  }))
                }
                className="border-black/20 bg-white text-[#0A0A0A]"
              />
              <Button
                type="button"
                onClick={() => handleCheckout(post)}
                className="group/acquire flex w-full items-center justify-center gap-2 border border-black bg-[#0A0A0A] px-5 py-3 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors duration-300 hover:bg-[#C8F135] hover:text-[#0A0A0A]"
              >
                BUY NOW
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/acquire:-translate-y-0.5 group-hover/acquire:translate-x-0.5" />
              </Button>
              {showDownloadByPostId[post.id] ? (
                <a
                  href="/sat-bots#download-instructions"
                  className="inline-flex w-full items-center justify-center border border-black/20 bg-white px-5 py-3 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.2em] text-[#0A0A0A] transition-colors hover:bg-[#F5F5F5]"
                >
                  Download Instructions
                </a>
              ) : null}

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-black/20 bg-white font-['JetBrains_Mono'] text-xs uppercase tracking-[0.24em] text-[#0A0A0A] hover:bg-[#FAFAFA]"
                  >
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-black/10 bg-[#FAFAFA] text-[#0A0A0A] sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-['Syne'] text-3xl font-black tracking-tight">
                      {post.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-5">
                    {formatPrice(post.price) ? (
                      <p className="font-['JetBrains_Mono'] text-sm font-semibold uppercase tracking-[0.2em] text-[#0A0A0A]">
                        {formatPrice(post.price)}
                      </p>
                    ) : null}
                    <p className="whitespace-pre-wrap font-['Syne'] text-lg leading-8 text-[#0A0A0A]/76">
                      {post.content}
                    </p>
                    {getSpecificationsList(post.specifications).length > 0 ? (
                      <div className="border-t border-black/10 pt-4">
                        <p className="mb-3 font-['JetBrains_Mono'] text-xs uppercase tracking-[0.24em] text-[#0A0A0A]/58">
                          Full Specifications
                        </p>
                        <ul className="space-y-2">
                          {getSpecificationsList(post.specifications).map((spec) => (
                            <li key={`modal-${spec.key}`} className="font-['JetBrains_Mono'] text-sm text-[#0A0A0A]/78">
                              <span className="font-semibold">{spec.key}:</span> {spec.value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <Button
                      type="button"
                      onClick={() => handleCheckout(post)}
                      className="inline-flex w-full items-center justify-center gap-2 border border-black bg-[#0A0A0A] px-5 py-3 font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-[0.24em] text-white transition-colors duration-300 hover:bg-[#C8F135] hover:text-[#0A0A0A]"
                    >
                      Buy Now
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
