import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { rateLimit, stripHtml } from '@/lib/utils';

const getResend = () => new Resend(process.env.RESEND_API_KEY || 'placeholder');
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@webring.studio';

const contactSchema = z.object({
  name: z.string().min(2).max(100).transform(stripHtml),
  email: z.string().email().max(255),
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

    // Send email to team
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key') {
      await getResend().emails.send({
        from: 'WEBRING Contact <onboarding@resend.dev>',
        to: CONTACT_EMAIL,
        subject: `New Contact: ${data.subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C8A96E;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Subject</td><td style="padding: 8px 0;">${data.subject}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Service</td><td style="padding: 8px 0;">${data.service}</td></tr>
            </table>
            <h3 style="margin-top: 20px; color: #333;">Message</h3>
            <p style="background: #f5f5f5; padding: 16px; border-radius: 8px; line-height: 1.6;">${data.message}</p>
          </div>
        `,
      });

      // Auto-reply to user
      await getResend().emails.send({
        from: 'WEBRING <onboarding@resend.dev>',
        to: data.email,
        subject: `Thanks for reaching out, ${data.name}!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C8A96E;">Thanks for contacting WEBRING!</h2>
            <p>Hi ${data.name},</p>
            <p>We received your message about <strong>"${data.subject}"</strong> and will get back to you within 24 hours.</p>
            <p>In the meantime, feel free to check out our <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://webring.studio'}/portfolio" style="color: #C8A96E;">portfolio</a> for inspiration.</p>
            <p style="margin-top: 24px; color: #666;">— The WEBRING Team</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
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
