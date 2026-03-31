import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

async function verifyAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('ADMIN_SECRET')?.value === 'authenticated'
}

const satBotPostSchema = z.object({
  title: z.string().min(2).optional(),
  content: z.string().min(1).optional(),
  imageUrl: z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().optional()
  ),
  published: z.boolean().optional()
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
    const parsed = satBotPostSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid S.A.T Bot post data' },
        { status: 400 }
      )
    }

    const post = await prisma.satBotPost.update({
      where: { id },
      data: parsed.data
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('[API] PATCH /api/admin/sat-bots/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to update S.A.T Bot post' },
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
    await prisma.satBotPost.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] DELETE /api/admin/sat-bots/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete S.A.T Bot post' },
      { status: 500 }
    )
  }
}
