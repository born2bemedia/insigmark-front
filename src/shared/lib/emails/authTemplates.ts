import { buildFormConfirmationEmail, escapeHtml } from './baseTemplate';

const SIGN_IN_URL = 'https://theinsigmark.com/sign-in';

type RegistrationWelcomeEmailOptions = {
  firstName: string;
  email?: string;
  password?: string;
};

export function getRegistrationWelcomeEmail({
  firstName,
  email,
  password,
}: RegistrationWelcomeEmailOptions): string {
  const safeEmail = escapeHtml(email);
  const safePassword = escapeHtml(password);
  const hasCredentials = Boolean(email && password);

  const credentialsHtml = hasCredentials
    ? `
      <p
        style="margin: 0 0 12px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
        Your login details:
      </p>
      <div
        style="margin: 0 0 20px 0; padding: 16px; background: rgba(15, 15, 25, 0.06); border-left: 3px solid #0f0f19;">
        <p
          style="margin: 0 0 8px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
          Login: <strong>${safeEmail}</strong>
        </p>
        <p
          style="margin: 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
          Password: <strong>${safePassword}</strong>
        </p>
      </div>
    `
    : '';

  const contentHtml = `
    <p
      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      Thank you for joining Insigmark! Your account has been successfully created, and you are now
      ready to manage your orders, track service status, and access invoices effortlessly.
    </p>
    ${credentialsHtml}
    <p
      style="margin: 0 0 6px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      Next Steps:
    </p>
    <ul
      style="margin: 0 0 18px 20px; padding: 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      <li style="margin: 0 0 4px 0;">Sign in to your account</li>
      <li style="margin: 0 0 4px 0;">Update your profile and personal information</li>
      <li style="margin: 0;">Explore your dashboard and start managing your services</li>
    </ul>
    <p
      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      If you did not create this account, please contact our support immediately at
      <a href="mailto:info@theinsigmark.com" style="color: #0f0f19; text-decoration: none;">info@theinsigmark.com</a>.
    </p>
  `;

  return buildFormConfirmationEmail({
    fullName: firstName,
    contentHtml,
    cta: {
      text: 'Sign In',
      href: SIGN_IN_URL,
    },
    title: 'Welcome to Insigmark',
  });
}
