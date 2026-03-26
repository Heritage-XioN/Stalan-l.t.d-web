import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { published: true },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('[API] GET /api/products error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
