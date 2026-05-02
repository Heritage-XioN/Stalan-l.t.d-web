'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, type Transition } from 'framer-motion';

const revealEase = [0.16, 1, 0.3, 1] as const;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string | null;
  imageUrl: string | null;
}

export function LeadershipTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch('/api/team')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setMembers(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-[#FAFAFA] py-16 border-t border-black/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: revealEase } satisfies Transition}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.28em] text-black/30 mb-3">
            03 -- LEADERSHIP
          </p>
          <h2 className="font-['Plus_Jakarta_Sans'] text-[clamp(1.8rem,3.5vw,2.8rem)] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#0A0A0A]">
            THE TEAM
          </h2>
        </motion.div>

        {members.length === 0 ? (
          <p className="text-sm text-black/30">No team members yet.</p>
        ) : (
          <div className="grid gap-px border border-black/8 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: revealEase, delay: i * 0.1 } satisfies Transition}
                viewport={{ once: true }}
                className="group bg-white p-7 sm:p-9 border border-black/8 hover:border-[#C8F135] transition-colors"
              >
                {member.imageUrl ? (
                  <div className="mb-5 h-16 w-16 overflow-hidden border border-black/8">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mb-5 h-14 w-14 bg-[#0A0A0A] flex items-center justify-center">
                    <span className="font-['JetBrains_Mono'] text-xs text-white tracking-widest">
                      {member.name.split(' ').map((n) => n[0]).join('').slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                )}
                <h3 className="font-['Plus_Jakarta_Sans'] text-base font-black uppercase tracking-[-0.02em] text-[#0A0A0A] group-hover:text-[#C8F135] transition-colors">
                  {member.name}
                </h3>
                <p className="font-['JetBrains_Mono'] text-[0.6rem] uppercase tracking-[0.22em] text-black/30 mt-1 mb-3">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-sm leading-7 text-black/55">{member.bio}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}