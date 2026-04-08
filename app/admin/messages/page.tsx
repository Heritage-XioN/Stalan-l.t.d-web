'use client'

import { useState, useEffect } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Trash2, Eye, Check } from 'lucide-react'

interface ContactMessage {
  id: string
  name: string
  email: string
  company?: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      const response = await fetch('/api/admin/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('[Messages] Error fetching:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleMarkAsRead(id: string) {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true })
      })

      if (response.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m))
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, read: true })
        }
      }
    } catch (error) {
      console.error('[Messages] Error marking as read:', error)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessages(messages.filter(m => m.id !== id))
        if (selectedMessage?.id === id) {
          setIsDialogOpen(false)
          setSelectedMessage(null)
        }
      }
    } catch (error) {
      console.error('[Messages] Error deleting:', error)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-[#0A0A0A]">Contact Messages</h1>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : messages.length === 0 ? (
            <Card className="border border-black/20 bg-white">
              <CardContent className="py-8 text-center text-[#0A0A0A]">
                No messages yet
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-black/20 bg-white">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5F5F5]">
                      <TableHead className="font-bold text-black">Name</TableHead>
                      <TableHead className="font-bold text-black">Email</TableHead>
                      <TableHead className="font-bold text-black">Subject</TableHead>
                      <TableHead className="font-bold text-black">Date</TableHead>
                      <TableHead className="font-bold text-black">Status</TableHead>
                      <TableHead className="font-bold text-black">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow key={message.id} className="hover:bg-black/[0.03]">
                        <TableCell className="font-medium text-[#0A0A0A]">{message.name}</TableCell>
                        <TableCell className="text-[#0A0A0A]">{message.email}</TableCell>
                        <TableCell className="text-[#0A0A0A]">{message.subject}</TableCell>
                        <TableCell className="text-sm text-[#0A0A0A]">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={message.read ? 'secondary' : 'default'}>
                            {message.read ? 'Read' : 'Unread'}
                          </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedMessage(message)
                              setIsDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!message.read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsRead(message.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(message.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="border border-black/20 bg-white text-[#0A0A0A]">
              <DialogHeader>
                <DialogTitle>{selectedMessage?.subject}</DialogTitle>
                <DialogDescription>{selectedMessage?.email}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-[#0A0A0A]/70">From</p>
                  <p className="text-lg font-semibold text-[#0A0A0A]">{selectedMessage?.name}</p>
                </div>
                {selectedMessage?.company && (
                  <div>
                    <p className="text-sm font-medium text-[#0A0A0A]/70">Company</p>
                    <p className="text-[#0A0A0A]">{selectedMessage.company}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-[#0A0A0A]/70">Message</p>
                  <p className="whitespace-pre-wrap text-[#0A0A0A]">{selectedMessage?.message}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
