/**
 * Email content templates for form confirmations.
 * Text from Figma design (Call request form) and adapted for other forms.
 */

import { buildFormConfirmationEmail, escapeHtml } from './baseTemplate';

const p = (text: string) =>
  `<p style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">${escapeHtml(text)}</p>`;

/** Call Request – text from Figma design (node 311-8957) */
export function getCallRequestConfirmationEmail(fullName: string): string {
  const content = `
    ${p('Thank you for reaching out! We have received your call request and will get back to you shortly to confirm the date and time. We will call you within 2 business days.')}
    ${p('Our team will contact you soon to finalize the schedule. In the meantime, if you need to update your request, please reply to this email.')}
  `;
  return buildFormConfirmationEmail({
    fullName,
    contentHtml: content,
    title: 'Call Request Received - Insigmark',
  });
}

/** Service / Request form (e.g. package or service order) */
export function getServiceRequestConfirmationEmail(
  fullName: string,
  serviceName: string
): string {
  const content = `
    ${p(`Thank you for reaching out! We have received your request for ${escapeHtml(serviceName)} and will get back to you shortly.`)}
    ${p('Our team is currently reviewing your requirements to ensure our resources align with your needs. We will contact you within 2 business days.')}
    ${p('In the meantime, if you need to update your request, please reply to this email.')}
  `;
  return buildFormConfirmationEmail({
    fullName,
    contentHtml: content,
    title: 'Request Received - Insigmark',
  });
}

/** Assistance Request */
export function getAssistanceRequestConfirmationEmail(fullName: string): string {
  const content = `
    ${p('Thank you for reaching out! We have received your assistance request and will get back to you shortly.')}
    ${p('Our team will contact you within 2 business days to discuss how we can help. In the meantime, if you need to update your request, please reply to this email.')}
  `;
  return buildFormConfirmationEmail({
    fullName,
    contentHtml: content,
    title: 'Assistance Request Received - Insigmark',
  });
}

/** Contact / Project form (contact-new: ContactProjectForm, FaqRequestForm, etc.) */
export function getContactProjectConfirmationEmail(fullName: string): string {
  const content = `
    ${p('Thank you for reaching out! We have received your message and will get back to you shortly.')}
    ${p('Our team will review your request and contact you within 2 business days. In the meantime, if you need to update your request, please reply to this email.')}
  `;
  return buildFormConfirmationEmail({
    fullName,
    contentHtml: content,
    title: 'Message Received - Insigmark',
  });
}

/** Home Request (contact-request: detailed project inquiry) */
export function getHomeRequestConfirmationEmail(fullName: string): string {
  const content = `
    ${p('Thank you for reaching out! We have received your project inquiry and will get back to you shortly.')}
    ${p('Our team will review your requirements and contact you within 2 business days to discuss how we can support your project. In the meantime, if you need to update your request, please reply to this email.')}
  `;
  return buildFormConfirmationEmail({
    fullName,
    contentHtml: content,
    title: 'Request Received - Insigmark',
  });
}
