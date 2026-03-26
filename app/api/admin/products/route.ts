import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

async function verifyAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('ADMIN_SECRET')?.value === 'authenticated'
}

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(2),
  status: z.string().min(2),
  description: z.string().min(10),
  features: z.array(z.object({ title: z.string(), description: z.string() })),
  tags: z.array(z.string()),
  order: z.number().optional(),
  published: z.boolean().optional()
})

export async function GET() {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const products = await prisma.product.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('[API] GET /api/admin/products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
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
    const parsed = productSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid product data' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: parsed.data
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/admin/products error:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
