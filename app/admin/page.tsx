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
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#0A1628] mb-8">Dashboard Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#0A1628]">{stats.totalMessages}</div>
                <p className="text-xs text-gray-500 mt-1">{stats.unreadMessages} unread</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#0A1628]">{stats.totalProducts}</div>
                <p className="text-xs text-gray-500 mt-1">{stats.publishedProducts} published</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#0A1628]">{stats.totalServices}</div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Newsletter Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#00C2FF]">{stats.subscriberCount}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Welcome to Stalan Admin</CardTitle>
              <CardDescription>Manage your products, services, team, and customer inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Use the navigation menu on the left to access different sections of the admin panel. You can manage products, services, team members, view customer messages, and manage newsletter subscriptions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
