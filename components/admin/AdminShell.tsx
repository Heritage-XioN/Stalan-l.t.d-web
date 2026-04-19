'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, LayoutDashboard, Mail, Package, Wrench, Users, LogOut, Menu, X, Rss } from 'lucide-react';

const NAV = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/sat-bots', label: 'S.A.T Bots', icon: Bot },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Rss },
];

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  pathname: string;
  onClick?: () => void;
}

function NavLink({ href, label, icon: Icon, exact, pathname, onClick }: NavLinkProps) {
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-colors ${
        active
          ? 'bg-[#C8F135] text-[#0A0A0A]'
          : 'text-white/55 hover:bg-white/6 hover:text-white'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}

function SidebarInner({ pathname, onNav, onLogout }: { pathname: string; onNav?: () => void; onLogout: () => void }) {
  return (
    <div className="flex h-full flex-col bg-[#0A0A0A]">
      <div className="flex h-16 shrink-0 items-center gap-2 border-b border-white/8 px-6">
        <span className="font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.14em] text-white">
          STALAN
        </span>
        <span className="font-['JetBrains_Mono'] text-[0.55rem] uppercase tracking-[0.28em] text-white/30">
          ADMIN
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV.map((item) => (
          <NavLink key={item.href} {...item} pathname={pathname} onClick={onNav} />
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/8 p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-semibold text-white/35 transition-colors hover:bg-white/6 hover:text-white"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // ALL hooks must be called unconditionally before any early return
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Login page renders standalone (no sidebar)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-[#F2F2F2]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col md:flex">
        <SidebarInner pathname={pathname} onLogout={logout} />
      </aside>

      {/* Mobile overlay + sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              key="sidebar"
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 w-60 md:hidden"
            >
              <SidebarInner pathname={pathname} onNav={() => setOpen(false)} onLogout={logout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:ml-60">
        {/* Mobile topbar */}
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-black/8 bg-white px-4 md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="-ml-1 rounded p-1.5 text-[#0A0A0A] hover:bg-black/5"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-['Plus_Jakarta_Sans'] text-sm font-black uppercase tracking-[0.12em] text-[#0A0A0A]">
            STALAN ADMIN
          </span>
        </div>

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}