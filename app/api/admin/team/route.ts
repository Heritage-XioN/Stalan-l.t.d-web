import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

async function verifyAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('ADMIN_SECRET')?.value === 'authenticated'
}

const teamSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  title: z.string().min(2),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
  order: z.number().optional()
})

export async function GET() {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(team)
  } catch (error) {
    console.error('[API] GET /api/admin/team error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const parsed = teamSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid team data' },
        { status: 400 }
      )
    }

    const member = await prisma.teamMember.create({
      data: parsed.data
    })

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/admin/team error:', error)
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}
