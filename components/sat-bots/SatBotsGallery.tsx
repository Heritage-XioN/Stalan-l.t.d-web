'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

type SatBotPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
};

const revealEase = [0.16, 1, 0.3, 1] as const;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function SatBotsGallery({ posts }: { posts: SatBotPost[] }) {
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
          transition={{
            duration: 0.9,
            ease: revealEase,
            delay: index * 0.08,
          }}
          viewport={{ once: true, amount: 0.22 }}
          className="group overflow-hidden rounded-[2rem] border border-black/6 bg-white shadow-[0_16px_56px_rgba(10,10,10,0.05)]"
        >
          <div className="relative aspect-[16/11] overflow-hidden bg-[#FAFAFA]">
            {post.imageUrl ? (
              <motion.div
                initial={{ opacity: 0.4, scale: 1.08 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: revealEase }}
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
                transition={{ duration: 0.9, ease: revealEase }}
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
            <h2 className="font-['Syne'] text-3xl font-black leading-tight tracking-[-0.04em] text-[#0A0A0A]">
              {post.title}
            </h2>
            <p className="whitespace-pre-wrap font-['Syne'] text-base leading-8 text-[#0A0A0A]/68">
              {post.content}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
