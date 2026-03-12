import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

import {
  getAssistanceRequestConfirmationEmail,
  getCallRequestConfirmationEmail,
  getServiceRequestConfirmationEmail,
} from '@/shared/lib/emails/formTemplates';
import { verifyRecaptcha } from '@/shared/lib/recaptcha';

const ENABLE_RECAPTCHA = true;

type RequestPayload = {
  service: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  website: string;
  message: string;
};

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as {
      formType: 'request' | 'assistance' | 'call';
      data: (RequestPayload & { recaptcha?: string }) | Record<string, unknown>;
    };

    const { formType } = body;
    const rawData = body.data as Record<string, unknown> & { recaptcha?: string };

    const recaptcha = rawData.recaptcha;

    if (ENABLE_RECAPTCHA) {
      if (!recaptcha || recaptcha === 'disabled') {
        return NextResponse.json(
          { message: 'reCAPTCHA verification is required.' },
          { status: 400 }
        );
      }
      const isValid = await verifyRecaptcha(recaptcha);
      if (!isValid) {
        return NextResponse.json(
          { message: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    const { recaptcha: _recaptcha, ...data } = rawData as Record<string, unknown> & {
      recaptcha?: string;
    };
    void _recaptcha;

    const apiKey = process.env.SENDGRID_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!apiKey || !adminEmail || !fromEmail) {
      console.error('SENDGRID_API_KEY, ADMIN_EMAIL or FROM_EMAIL is not set');
      return NextResponse.json({ message: 'Email configuration is missing.' }, { status: 500 });
    }

    sgMail.setApiKey(apiKey);

    // Escape HTML to prevent XSS
    const escapeHtml = (text: string | undefined | null) => {
      if (text == null) return '';
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    let subject: string;
    let html: string;
    let userEmail: string | undefined;

    if (formType === 'request') {
      const d = data as RequestPayload;
      console.log(d);
      userEmail = d.email;
      subject = 'Request';
      html = `
        <h2>Request</h2>
        <p><strong>Service:</strong> ${escapeHtml(d.service)}</p>
        <p><strong>Company name:</strong> ${escapeHtml(d.companyName)}</p>
        <p><strong>Website:</strong> ${escapeHtml(d.website)}</p>
        <p><strong>Message:</strong> ${escapeHtml(d.message)}</p>
        <p><strong>Full name:</strong> ${escapeHtml(d.fullName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
      `;

      const msg = {
        to: adminEmail,
        from: fromEmail,
        subject,
        html,
      };

      const userMsg = {
        to: d.email,
        from: fromEmail,
        subject: "We've Received Your Request",
        html: getServiceRequestConfirmationEmail(d.fullName, d.service),
      };

      await sgMail.send(msg);
      await sgMail.send(userMsg);

      console.log(`Request confirmation email sent to ${userEmail}`);
    } else if (formType === 'assistance') {
      const d = data as { fullName: string; email: string; phone: string; message?: string };
      subject = 'Assistance Request';
      userEmail = d.email;
      html = `
        <h2>Assistance Request</h2>
        <p><strong>Full name:</strong> ${escapeHtml(d.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
        <p><strong>Message:</strong> ${escapeHtml(d.message ?? '')}</p>
      `;

      const msg = { to: adminEmail, from: fromEmail, subject, html };
      const userMsg = {
        to: d.email,
        from: fromEmail,
        subject: "We've Received Your Assistance Request",
        html: getAssistanceRequestConfirmationEmail(d.fullName),
      };
      await sgMail.send(msg);
      await sgMail.send(userMsg);
      console.log(`Assistance request sent to ${userEmail}`);
    } else if (formType === 'call') {
      const d = data as { fullName: string; phone: string; message?: string; email?: string };
      subject = 'Call Request';
      html = `
        <h2>Call Request</h2>
        <p><strong>Full name:</strong> ${escapeHtml(d.fullName)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(d.phone)}</p>
        <p><strong>Message:</strong> ${escapeHtml(d.message ?? '')}</p>
        ${d.email ? `<p><strong>Email:</strong> ${escapeHtml(d.email)}</p>` : ''}
      `;

      const msg = { to: adminEmail, from: fromEmail, subject, html };
      await sgMail.send(msg);

      if (d.email) {
        const userMsg = {
          to: d.email,
          from: fromEmail,
          subject: "We've Received Your Call Request",
          html: getCallRequestConfirmationEmail(d.fullName),
        };
        await sgMail.send(userMsg);
        console.log(`Call request confirmation sent to ${d.email}`);
      } else {
        console.log('Call request sent');
      }
    }
  } catch (error) {
    console.error('Error submitting request:', error);
    return NextResponse.json({ message: 'Failed to submit request' }, { status: 500 });
  }
  return NextResponse.json({ message: 'Request submitted successfully' }, { status: 200 });
}
