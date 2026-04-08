'use client'

import { useState, useEffect } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Trash2, Plus } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  title: string
  linkedin?: string
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTeam()
  }, [])

  async function fetchTeam() {
    try {
      const response = await fetch('/api/admin/team')
      if (response.ok) {
        const data = await response.json()
        setTeam(data)
      }
    } catch (error) {
      console.error('[Team] Error fetching:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this team member?')) return

    try {
      const response = await fetch(`/api/admin/team/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setTeam(team.filter(m => m.id !== id))
      }
    } catch (error) {
      console.error('[Team] Error deleting:', error)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#0A0A0A]">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#0A0A0A]">Team Members</h1>
            <Button className="rounded-none bg-black text-white hover:bg-[#C8F135] hover:text-black">
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>

          <Card className="border border-black/20 bg-white">
            <CardContent className="p-0">
              {isLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : team.length === 0 ? (
                <div className="text-center py-8 text-[#0A0A0A]">No team members yet</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="bg-[#F5F5F5]">
                      <TableHead className="font-bold text-black">Name</TableHead>
                      <TableHead className="font-bold text-black">Role</TableHead>
                      <TableHead className="font-bold text-black">Title</TableHead>
                      <TableHead className="font-bold text-black">LinkedIn</TableHead>
                      <TableHead className="font-bold text-black">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {team.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium text-[#0A0A0A]">{member.name}</TableCell>
                        <TableCell className="text-[#0A0A0A]">{member.role}</TableCell>
                        <TableCell className="text-[#0A0A0A]">{member.title}</TableCell>
                        <TableCell className="text-[#0A0A0A]">
                          {member.linkedin ? (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0A0A0A] hover:text-[#0A0A0A] hover:underline">
                              Profile
                            </a>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(member.id)}
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
