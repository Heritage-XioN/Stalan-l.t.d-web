'use client'

import { useState, useEffect } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  createdAt: string
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  async function fetchSubscribers() {
    try {
      const response = await fetch('/api/admin/newsletter')
      if (response.ok) {
        const data = await response.json()
        setSubscribers(data)
      }
    } catch (error) {
      console.error('[Newsletter] Error fetching:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this subscriber?')) return

    try {
      const response = await fetch(`/api/admin/newsletter/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSubscribers(subscribers.filter(s => s.id !== id))
      }
    } catch (error) {
      console.error('[Newsletter] Error deleting:', error)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-[#0A0A0A]">Newsletter Subscribers</h1>

          <Card className="border border-black/20 bg-white">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : subscribers.length === 0 ? (
                <div className="text-center py-8 text-[#0A0A0A]">
                  No subscribers yet
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#F5F5F5]">
                        <TableHead className="font-bold text-black">Email</TableHead>
                        <TableHead className="font-bold text-black">Subscribed Date</TableHead>
                        <TableHead className="font-bold text-black">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium text-[#0A0A0A]">{subscriber.email}</TableCell>
                          <TableCell className="text-sm text-[#0A0A0A]">
                            {new Date(subscriber.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(subscriber.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="border-t p-4 text-sm text-[#0A0A0A]">
                    Total subscribers: {subscribers.length}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
