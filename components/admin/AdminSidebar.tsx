'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Bot, LayoutDashboard, Mail, Package, Wrench, Users, Mail as NewsletterIcon, LogOut } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/sat-bots', label: 'S.A.T Bots', icon: Bot },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/newsletter', label: 'Newsletter', icon: NewsletterIcon }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const response = await fetch('/api/admin/logout', { method: 'POST' })
    if (response.ok) {
      router.push('/admin/login')
    }
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-[#000000] text-[#FFFFFF]">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold">STALAN Admin</h1>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start gap-2 ${
                  isActive
                    ? 'bg-[#C8F135] text-[#0A0A0A] hover:bg-[#C8F135]'
                    : 'text-white hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto shrink-0 border-t border-white/10 p-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-2 text-[#FFFFFF] hover:bg-white/10 hover:text-[#FFFFFF]"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
