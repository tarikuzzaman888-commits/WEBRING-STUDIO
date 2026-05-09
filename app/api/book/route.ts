import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { writeClient } from '@/sanity/lib/client';
import { rateLimit, stripHtml, formatDate } from '@/lib/utils';

const bookingSchema = z.object({
  clientName: z.string().min(2).max(100).transform(stripHtml),
  email: z.string().email().max(255),
  whatsapp: z.string().max(20).optional().transform((v) => v ? stripHtml(v) : undefined),
  company: z.string().max(200).optional().transform((v) => v ? stripHtml(v) : undefined),
  services: z.array(z.string().max(100)).min(1),
  productCategory: z.string().min(1).max(100).transform(stripHtml),
  budget: z.string().min(1).max(100).transform(stripHtml),
  notes: z.string().max(5000).optional().transform((v) => v ? stripHtml(v) : undefined),
  selectedDate: z.string().min(1),
  selectedTime: z.string().min(1).max(20),
  referral: z.string().max(100).optional().transform((v) => v ? stripHtml(v) : undefined),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = rateLimit(ip, 3, 3600000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = bookingSchema.parse(body);

    // Save to Sanity
    let bookingId = 'local-' + Date.now();
    try {
      if (process.env.SANITY_API_TOKEN && process.env.SANITY_API_TOKEN !== 'your_write_token_here') {
        const result = await writeClient.create({
          _type: 'booking',
          clientName: data.clientName,
          email: data.email,
          whatsapp: data.whatsapp,
          company: data.company,
          services: data.services,
          productCategory: data.productCategory,
          budget: data.budget,
          notes: data.notes,
          selectedDate: data.selectedDate,
          selectedTime: data.selectedTime,
          referral: data.referral,
          status: 'pending',
          createdAt: new Date().toISOString(),
        });
        bookingId = result._id;
      }
    } catch (sanityError) {
      console.error('Failed to save booking to Sanity:', sanityError);
    }

    // Send to Google Sheets (Optional Webhook)
    const GOOGLE_SHEET_URL = process.env.GOOGLE_SHEET_URL;
    if (GOOGLE_SHEET_URL) {
      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          body: JSON.stringify({
            ...data,
            services: data.services.join(', '),
            submittedAt: new Date().toISOString()
          }),
        });
      } catch (sheetError) {
        console.error('Failed to save to Google Sheets:', sheetError);
      }
    }

    return NextResponse.json({ success: true, bookingId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid booking data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
