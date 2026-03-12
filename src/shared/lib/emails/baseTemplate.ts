/**
 * Shared email template base (Insigmark design).
 * Based on register email layout: dark header with bg, grey content block, footer with contact.
 */

const BASE_URL = 'https://theinsigmark.com';
const EMAIL = 'info@theinsigmark.com';
const PHONE = '+48 732 143 158';

export function escapeHtml(text: string | undefined | null): string {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface EmailTemplateOptions {
  /** Greeting: "Hello [Name]," */
  fullName: string;
  /** Main content HTML (paragraphs, lists, etc.) */
  contentHtml: string;
  /** Optional CTA button: { text, href } */
  cta?: { text: string; href: string };
  /** Page title for <title> */
  title?: string;
}

export function buildFormConfirmationEmail(options: EmailTemplateOptions): string {
  const { fullName, contentHtml, cta, title = 'Insigmark' } = options;
  const safeFirstName = escapeHtml(fullName.split(' ')[0] || fullName);

  const ctaHtml = cta
    ? `
    <p style="margin: 0 0 24px 0;">
      <a href="${escapeHtml(cta.href)}"
        style="display: inline-block; padding: 12px 18px; background-color: #0f0f19; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 2px;">
        ${escapeHtml(cta.text)}
      </a>
    </p>`
    : '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body
  style="margin: 0; padding: 0; background-color: #160b11; color: #ffffff; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0"
    style="width: 100%; border-collapse: collapse; background-color: #160b11;">
    <tr>
      <td align="center" style="padding: 24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0"
          style="width: 100%; max-width: 593px; border-collapse: collapse; background-color: #2b1018; background-image: linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.55)), url('${BASE_URL}/images/emails/register/bg.png'); background-position: center center; background-size: cover; background-repeat: no-repeat;">
          <tr>
            <td style="padding: 24px 40px 22px 40px;">
              <img src="${BASE_URL}/images/emails/logo-mark-header.png" alt="Insigmark"
                style="display: inline-block; width: 140px; height: 38px; vertical-align: middle; margin-right: 10px;">
            </td>
          </tr>
          <tr>
            <td style="padding: 0 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0"
                style="width: 100%; border-collapse: collapse; background: #e4e4e4;">
                <tr>
                  <td style="padding: 40px;">
                    <h1
                      style="margin: 0 0 24px 0; color: #0f0f19; font-size: 40px; font-weight: 600; line-height: 1.1; letter-spacing: -2.5px;">
                      Hello ${safeFirstName},
                    </h1>
                    ${contentHtml}
                    ${ctaHtml}
                    <p
                      style="margin: 0 0 26px 0; color: #0f0f19; font-size: 18px; font-weight: 600; line-height: 1.2; letter-spacing: -1px;">
                      Thank you for choosing us!
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="vertical-align: top; color: #0f0f19; font-size: 18px; font-weight: 600; line-height: 1.2; letter-spacing: -1px;">
                          Best regards,
                        </td>
                        <td align="right" style="vertical-align: top; color: #0f0f19; font-size: 18px; font-weight: 600; line-height: 1.2; letter-spacing: -1px;">
                          The Insigmark Team
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 26px 40px 28px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle;">
                    <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 16px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
                      Email: <a href="mailto:${EMAIL}" style="color: #ffffff; text-decoration: none;">${EMAIL}</a>
                    </p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
                      Phone: <a href="tel:${PHONE.replace(/\s/g, '')}" style="color: #ffffff; text-decoration: none;">${PHONE}</a>
                    </p>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <img src="${BASE_URL}/images/emails/logo-mark-footer.png" alt=""
                      style="display: block; width: 33px; height: 38px;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
