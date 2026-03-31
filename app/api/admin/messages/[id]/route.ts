import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

async function verifyAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('ADMIN_SECRET')?.value === 'authenticated'
}

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
    const message = await prisma.contactMessage.update({
      where: { id },
      data: body
    })
    return NextResponse.json(message)
  } catch (error) {
    console.error('[API] PATCH /api/admin/messages/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to update message' },
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
    await prisma.contactMessage.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] DELETE /api/admin/messages/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}
