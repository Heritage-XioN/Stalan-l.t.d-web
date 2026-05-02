import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

async function verifyAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('ADMIN_SECRET')?.value === 'authenticated'
}

const teamSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.string().min(2).optional(),
  title: z.string().min(2).optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedin: z.string().optional(),
  order: z.number().optional()
})

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = teamSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid team data' },
        { status: 400 }
      )
    }

    const member = await prisma.teamMember.update({
      where: { id },
      data: parsed.data
    })

    return NextResponse.json(member)
  } catch (error) {
    console.error('[API] PATCH /api/admin/team/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.teamMember.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] DELETE /api/admin/team/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}
