import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// TODO: When Resend is set up, install the package and uncomment the block below:
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_EMAIL = 'stalanltd@gmail.com';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  subject: z.string().min(2),
  message: z.string().min(10),
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

    const { name, email, phone, company, subject, message } = parsed.data;

    const fullMessage = phone
      ? `Phone/WhatsApp: ${phone}\n\n${message}`
      : message;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        company: company || null,
        subject,
        message: fullMessage,
      },
    });

    // TODO: Uncomment when Resend is configured
    // await resend.emails.send({
    //   from: 'Stalan Contact <noreply@stalan.ltd>',
    //   to: NOTIFICATION_EMAIL,
    //   replyTo: email,
    //   subject: `[Contact Form] ${subject} — from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nSubject: ${subject}\n\n${message}`,
    // });

    void NOTIFICATION_EMAIL; // referenced above — suppress unused warning until Resend is active

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
