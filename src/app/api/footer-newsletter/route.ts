import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

import { getFooterNewsletterConfirmationEmail } from '@/shared/lib/emails/footerTemplates';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase() ?? '';

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!SENDGRID_API_KEY || !ADMIN_EMAIL || !FROM_EMAIL) {
      console.error('SENDGRID_API_KEY, ADMIN_EMAIL or FROM_EMAIL is not set');
      return NextResponse.json({ message: 'Email configuration is missing.' }, { status: 500 });
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const adminMsg = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: 'Footer Newsletter Subscription',
      html: `
        <h2>Footer Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Source:</strong> Footer form</p>
      `,
    };

    const userMsg = {
      to: email,
      from: FROM_EMAIL,
      subject: 'You are subscribed to Insigmark updates',
      html: getFooterNewsletterConfirmationEmail(),
    };

    await sgMail.send(adminMsg);
    await sgMail.send(userMsg);

    return NextResponse.json({ message: 'Footer subscription submitted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Footer newsletter submit error:', error);
    return NextResponse.json({ message: 'Failed to submit footer subscription.' }, { status: 500 });
  }
}
