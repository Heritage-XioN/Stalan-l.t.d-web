import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'

async function getDashboardStats() {
  const [totalMessages, unreadMessages, totalProducts, publishedProducts, totalServices, subscriberCount] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.product.count(),
    prisma.product.count({ where: { published: true } }),
    prisma.service.count(),
    prisma.newsletterSubscriber.count()
  ])

  return {
    totalMessages,
    unreadMessages,
    totalProducts,
    publishedProducts,
    totalServices,
    subscriberCount
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-[#0A0A0A]">Dashboard Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border border-black/20 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-[#0A0A0A]/70">Total Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#0A0A0A]">{stats.totalMessages}</div>
                <p className="mt-1 text-xs text-[#0A0A0A]/70">{stats.unreadMessages} unread</p>
              </CardContent>
            </Card>

            <Card className="border border-black/20 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-[#0A0A0A]/70">Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#0A0A0A]">{stats.totalProducts}</div>
                <p className="mt-1 text-xs text-[#0A0A0A]/70">{stats.publishedProducts} published</p>
              </CardContent>
            </Card>

            <Card className="border border-black/20 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-[#0A0A0A]/70">Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#0A0A0A]">{stats.totalServices}</div>
              </CardContent>
            </Card>

            <Card className="border border-black/20 bg-white lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-[#0A0A0A]/70">Newsletter Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#C8F135]">{stats.subscriberCount}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 border border-black/20 bg-white">
            <CardHeader>
              <CardTitle className="text-[#0A0A0A]">Welcome to Stalan Admin</CardTitle>
              <CardDescription className="text-[#0A0A0A]/70">Manage your products, services, team, and customer inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#0A0A0A]/70">
                Use the navigation menu on the left to access different sections of the admin panel. You can manage products, services, team members, view customer messages, and manage newsletter subscriptions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
