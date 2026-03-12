import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

import { getHomeRequestConfirmationEmail } from '@/shared/lib/emails/formTemplates';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL;

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!SENDGRID_API_KEY || !ADMIN_EMAIL || !FROM_EMAIL) {
      return NextResponse.json({ message: 'Email service is not configured.' }, { status: 500 });
    }

    const formData = await request.formData();
    const fullName = (formData.get('fullName') as string) ?? '';
    const email = (formData.get('email') as string) ?? '';
    const phone = (formData.get('phone') as string) ?? '';
    const companyName = (formData.get('companyName') as string) || null;
    const website = (formData.get('website') as string) || null;
    const projectType = (formData.get('projectType') as string) ?? '';
    const projectTypeOther = (formData.get('projectTypeOther') as string) || null;
    const investmentRange = (formData.get('investmentRange') as string) ?? '';
    const goals = (formData.get('goals') as string) || null;
    const frictionPoints = (formData.get('frictionPoints') as string) || null;
    const clientContext = (formData.get('clientContext') as string) || null;
    const timing = (formData.get('timing') as string) ?? '';
    const followUp = (formData.get('followUp') as string) ?? '';
    const attachmentFiles = formData.getAll('attachments') as File[];

    if (!fullName || !email || !phone || !projectType || !investmentRange || !timing || !followUp) {
      return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 400 });
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const attachments = await Promise.all(
      attachmentFiles
        .filter((f): f is File => f instanceof File && f.size > 0)
        .map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          return {
            content: Buffer.from(arrayBuffer).toString('base64'),
            filename: file.name,
            type: file.type || 'application/octet-stream',
            disposition: 'attachment' as const,
          };
        })
    );

    const adminHtml = `
      <h2>New Home Request</h2>
      <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      ${companyName ? `<p><strong>Company:</strong> ${escapeHtml(companyName)}</p>` : ''}
      ${website ? `<p><strong>Website:</strong> ${escapeHtml(website)}</p>` : ''}
      <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
      ${
        projectTypeOther
          ? `<p><strong>Project Type (Other):</strong> ${escapeHtml(projectTypeOther)}</p>`
          : ''
      }
      <p><strong>Investment Range:</strong> ${escapeHtml(investmentRange)}</p>
      ${goals ? `<p><strong>Goals:</strong> ${escapeHtml(goals)}</p>` : ''}
      ${
        frictionPoints
          ? `<p><strong>Friction Points:</strong> ${escapeHtml(frictionPoints)}</p>`
          : ''
      }
      ${clientContext ? `<p><strong>Client Context:</strong> ${escapeHtml(clientContext)}</p>` : ''}
      <p><strong>Timing:</strong> ${escapeHtml(timing)}</p>
      <p><strong>Follow Up:</strong> ${escapeHtml(followUp)}</p>
      ${
        attachments.length > 0
          ? `<p><strong>Attachments:</strong> ${attachments.length} file(s)</p>`
          : ''
      }
    `;

    const adminMsg = {
      to: ADMIN_EMAIL,
      from: FROM_EMAIL,
      subject: 'New Home Request',
      html: adminHtml,
      attachments,
    };

    const userMsg = {
      to: email,
      from: FROM_EMAIL,
      subject: "We've Received Your Request",
      html: getHomeRequestConfirmationEmail(fullName),
    };

    await sgMail.send(adminMsg);
    await sgMail.send(userMsg);

    return NextResponse.json({ message: 'Request sent successfully.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Contact request error:', errorMessage);
    return NextResponse.json(
      { message: 'Failed to send request.', error: errorMessage },
      { status: 500 }
    );
  }
}
