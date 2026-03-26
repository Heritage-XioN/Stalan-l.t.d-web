import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address')
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = newsletterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: parsed.data.email }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      )
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email: parsed.data.email }
    })

    return NextResponse.json(subscriber, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(subscribers)
  } catch (error) {
    console.error('[API] GET /api/newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
