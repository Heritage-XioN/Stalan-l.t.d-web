import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

async function verifyAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('ADMIN_SECRET')?.value === 'authenticated'
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
    await prisma.newsletterSubscriber.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] DELETE /api/admin/newsletter/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete subscriber' },
      { status: 500 }
    )
  }
}
