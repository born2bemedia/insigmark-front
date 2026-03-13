import { buildFormConfirmationEmail } from './baseTemplate';

const BLOG_URL = 'https://theinsigmark.com/blog';

export function getFooterNewsletterConfirmationEmail(): string {
  const contentHtml = `
    <p
      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      Thank you for staying connected with Insigmark. Your email has been successfully added to our updates list.
    </p>
    <p
      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      We will share selected updates about new services, useful technical insights, and special offers relevant to your website and infrastructure needs.
    </p>
    <p
      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      If you did not subscribe, you can simply ignore this email.
    </p>
  `;

  return buildFormConfirmationEmail({
    fullName: 'there',
    contentHtml,
    cta: {
      text: 'Read Our Blog',
      href: BLOG_URL,
    },
    title: 'Subscription Confirmed - Insigmark',
  });
}
