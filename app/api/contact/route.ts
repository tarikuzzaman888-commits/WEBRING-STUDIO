import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { writeClient } from '@/sanity/lib/client';
import { rateLimit, stripHtml } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2).max(100).transform(stripHtml),
  email: z.string().email().max(255),
  phone: z.string().max(25).optional().transform((v) => v ? stripHtml(v) : undefined),
  subject: z.string().min(3).max(200).transform(stripHtml),
  service: z.string().min(1).max(100).transform(stripHtml),
  message: z.string().min(10).max(5000).transform(stripHtml),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = rateLimit(ip, 5, 3600000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = contactSchema.parse(body);

    // 1. Save to Sanity
    let contactId = 'local-' + Date.now();
    try {
      if (process.env.SANITY_API_TOKEN && process.env.SANITY_API_TOKEN !== 'your_write_token_here') {
        const result = await writeClient.create({
          _type: 'contact',
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          service: data.service,
          message: data.message,
          status: 'new',
          createdAt: new Date().toISOString(),
        });
        contactId = result._id;
      }
    } catch (sanityError) {
      console.error('Failed to save to Sanity:', sanityError);
    }

    // 2. Send to Google Sheets (Webhook)
    const CONTACT_SHEET_URL = process.env.CONTACT_GOOGLE_SHEET_URL || process.env.GOOGLE_SHEET_URL;
    if (CONTACT_SHEET_URL) {
      try {
        await fetch(CONTACT_SHEET_URL, {
          method: 'POST',
          body: JSON.stringify({
            ...data,
            submittedAt: new Date().toISOString()
          }),
        });
      } catch (sheetError) {
        console.error('Failed to save to Google Sheets:', sheetError);
      }
    }

    return NextResponse.json({ success: true, contactId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
