'use client'

import { useState, useEffect } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash2, Plus } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  iconName: string
  order: number
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    try {
      const response = await fetch('/api/admin/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error('[Services] Error fetching:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this service?')) return

    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setServices(services.filter(s => s.id !== id))
      }
    } catch (error) {
      console.error('[Services] Error deleting:', error)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#0A0A0A]">Services</h1>
            <Button className="rounded-none bg-black text-white hover:bg-[#C8F135] hover:text-black">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          <Card className="border border-black/20 bg-white">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : services.length === 0 ? (
                <div className="text-center py-8 text-[#0A0A0A]">No services yet</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5F5F5]">
                      <TableHead className="font-bold text-black">Name</TableHead>
                      <TableHead className="font-bold text-black">Icon</TableHead>
                      <TableHead className="font-bold text-black">Order</TableHead>
                      <TableHead className="font-bold text-black">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium text-[#0A0A0A]">{service.name}</TableCell>
                        <TableCell className="text-[#0A0A0A]">{service.iconName}</TableCell>
                        <TableCell className="text-[#0A0A0A]">{service.order}</TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
