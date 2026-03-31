import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

async function verifyAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('ADMIN_SECRET')?.value === 'authenticated'
}

const productSchema = z.object({
  name: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  category: z.string().min(2).optional(),
  status: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  features: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
  tags: z.array(z.string()).optional(),
  order: z.number().optional(),
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
    const parsed = productSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid product data' },
        { status: 400 }
      )
    }

    const product = await prisma.product.update({
      where: { id },
      data: parsed.data
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('[API] PATCH /api/admin/products/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
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
    await prisma.product.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] DELETE /api/admin/products/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
