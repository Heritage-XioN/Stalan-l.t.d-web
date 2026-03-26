import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

async function verifyAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('ADMIN_SECRET')?.value === 'authenticated'
}

const serviceSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  iconName: z.string().optional(),
  order: z.number().optional(),
  published: z.boolean().optional()
})

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const parsed = serviceSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid service data' },
        { status: 400 }
      )
    }

    const service = await prisma.service.update({
      where: { id: params.id },
      data: parsed.data
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('[API] PATCH /api/admin/services/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.service.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] DELETE /api/admin/services/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    )
  }
}
