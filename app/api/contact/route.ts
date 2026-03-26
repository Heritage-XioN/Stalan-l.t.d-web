import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().nullable(),
  subject: z.string().min(2),
  message: z.string().min(20),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { name, email, company, subject, message } = parsed.data;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        company: company || null,
        subject,
        message,
      },
    });

    return NextResponse.json(
      { success: true, id: contactMessage.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
