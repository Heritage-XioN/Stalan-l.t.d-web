import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

async function verifyAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('ADMIN_SECRET')?.value === 'authenticated'
}

const satBotPostSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(1),
  imageUrl: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().optional()
  ),
  price: z.preprocess(
    (value) => {
      if (value === null || value === undefined || value === '') return undefined
      if (typeof value === 'string') return Number(value)
      return value
    },
    z.number().nonnegative().optional()
  ),
  specifications: z.record(z.string(), z.string()).optional(),
  published: z.boolean().optional()
})

export async function GET() {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const posts = await prisma.satBotPost.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('[API] GET /api/admin/sat-bots error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch S.A.T Bot posts' },
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
    const parsed = satBotPostSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid S.A.T Bot post data' },
        { status: 400 }
      )
    }

    const post = await prisma.satBotPost.create({
      data: parsed.data
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/admin/sat-bots error:', error)
    return NextResponse.json(
      { error: 'Failed to create S.A.T Bot post' },
      { status: 500 }
    )
  }
}
