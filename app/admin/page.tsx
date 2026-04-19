import { prisma } from '@/lib/prisma';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { Mail, Bot, Package, Rss, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

async function getDashboardData() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [
    totalMessages, unreadMessages,
    totalSatBots, publishedSatBots,
    totalProducts, publishedProducts,
    subscriberCount,
    weekMessages,
    recentMessages,
  ] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.satBotPost.count(),
    prisma.satBotPost.count({ where: { published: true } }),
    prisma.product.count(),
    prisma.product.count({ where: { published: true } }),
    prisma.newsletterSubscriber.count(),
    prisma.contactMessage.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6,
      select: { id: true, name: true, subject: true, read: true, createdAt: true },
    }),
  ]);

  const days: { day: string; date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push({ day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.toISOString().split('T')[0], count: 0 });
  }
  for (const msg of weekMessages) {
    const key = new Date(msg.createdAt).toISOString().split('T')[0];
    const match = days.find((d) => d.date === key);
    if (match) match.count++;
  }

  return {
    stats: { totalMessages, unreadMessages, totalSatBots, publishedSatBots, totalProducts, publishedProducts, subscriberCount },
    activityData: days.map(({ day, count }) => ({ day, count })),
    recentMessages: recentMessages.map((m) => ({ ...m, createdAt: m.createdAt.toISOString() })),
  };
}

export default async function AdminDashboard() {
  const { stats, activityData, recentMessages } = await getDashboardData();

  const statCards = [
    {
      icon: Mail,
      value: stats.totalMessages,
      label: 'Messages',
      sub: stats.unreadMessages > 0 ? `${stats.unreadMessages} unread` : 'All read',
      accent: stats.unreadMessages > 0,
      href: '/admin/messages',
    },
    {
      icon: Bot,
      value: stats.totalSatBots,
      label: 'SAT Bot Posts',
      sub: `${stats.publishedSatBots} published`,
      accent: false,
      href: '/admin/sat-bots',
    },
    {
      icon: Package,
      value: stats.totalProducts,
      label: 'Products',
      sub: `${stats.publishedProducts} live`,
      accent: false,
      href: '/admin/products',
    },
    {
      icon: Rss,
      value: stats.subscriberCount,
      label: 'Subscribers',
      sub: 'Newsletter',
      accent: true,
      lime: true,
      href: '/admin/newsletter',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.28em] text-black/30 mb-1">
            STALAN ADMIN
          </p>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl font-black uppercase tracking-tight text-[#0A0A0A] md:text-3xl">
            OVERVIEW
          </h1>
        </div>
        <div className="flex items-center gap-1.5 border border-black/8 bg-white px-3 py-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-[#C8F135]" />
          <span className="font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.18em] text-black/50">
            Live Data
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`group border p-5 transition-all hover:scale-[1.01] ${
                card.lime
                  ? 'border-[#C8F135] bg-[#C8F135]'
                  : 'border-black/8 bg-white hover:border-[#C8F135]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className={`h-4 w-4 ${card.lime ? 'text-[#0A0A0A]/50' : 'text-black/25'}`} />
                {card.accent && !card.lime && (
                  <span className="bg-[#C8F135] px-1.5 py-0.5 font-['JetBrains_Mono'] text-[0.52rem] font-bold uppercase tracking-wide text-[#0A0A0A]">
                    {stats.unreadMessages} NEW
                  </span>
                )}
              </div>
              <p className={`font-['Plus_Jakarta_Sans'] text-3xl font-black ${card.lime ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]'}`}>
                {card.value}
              </p>
              <p className={`mt-1 font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.2em] ${card.lime ? 'text-[#0A0A0A]/55' : 'text-black/35'}`}>
                {card.label}
              </p>
              <p className={`mt-0.5 text-xs ${card.lime ? 'text-[#0A0A0A]/50' : 'text-black/40'}`}>
                {card.sub}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Chart + Recent messages */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Bar chart */}
        <div className="border border-black/8 bg-white p-6 lg:col-span-3">
          <p className="font-['JetBrains_Mono'] text-[0.55rem] uppercase tracking-[0.28em] text-black/30">
            ACTIVITY
          </p>
          <p className="font-['Plus_Jakarta_Sans'] mt-0.5 text-base font-black uppercase text-[#0A0A0A] mb-6">
            Messages This Week
          </p>
          <DashboardCharts activityData={activityData} />
          <p className="mt-3 font-['JetBrains_Mono'] text-[0.55rem] uppercase tracking-[0.2em] text-black/25">
            {activityData.reduce((sum, d) => sum + d.count, 0)} messages in the last 7 days
          </p>
        </div>

        {/* Recent messages */}
        <div className="border border-black/8 bg-white p-6 lg:col-span-2">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="font-['JetBrains_Mono'] text-[0.55rem] uppercase tracking-[0.28em] text-black/30">
                INBOX
              </p>
              <p className="font-['Plus_Jakarta_Sans'] mt-0.5 text-base font-black uppercase text-[#0A0A0A]">
                Recent
              </p>
            </div>
            <Link
              href="/admin/messages"
              className="flex items-center gap-1 font-['JetBrains_Mono'] text-[0.58rem] uppercase tracking-[0.18em] text-black/35 hover:text-black transition-colors"
            >
              All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-0">
            {recentMessages.length === 0 ? (
              <p className="text-sm text-black/35">No messages yet.</p>
            ) : (
              recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex items-start gap-3 border-b border-black/5 py-3 first:pt-0 last:border-0 last:pb-0"
                >
                  <div className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${msg.read ? 'bg-black/12' : 'bg-[#C8F135]'}`} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#0A0A0A]">{msg.name}</p>
                    <p className="truncate text-xs text-black/45">{msg.subject}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <p className="font-['JetBrains_Mono'] text-[0.55rem] uppercase tracking-[0.28em] text-black/30 mb-3">
          QUICK ACTIONS
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { href: '/admin/sat-bots', label: 'New SAT Post', icon: Bot },
            { href: '/admin/products', label: 'Add Product', icon: Package },
            { href: '/admin/messages', label: 'Read Messages', icon: Mail },
            { href: '/admin/newsletter', label: 'Subscribers', icon: Rss },
          ].map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center gap-3 border border-black/8 bg-white p-4 text-sm font-semibold text-[#0A0A0A] transition-colors hover:border-[#C8F135] hover:bg-[#C8F135] group"
              >
                <Icon className="h-4 w-4 text-black/35 group-hover:text-[#0A0A0A]" />
                {a.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}