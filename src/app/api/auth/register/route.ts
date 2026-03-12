import { NextResponse } from 'next/server';

import sgMail from '@sendgrid/mail';

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json({ message: 'Server URL is not configured.' }, { status: 500 });
    }

    const body = (await request.json()) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      username?: string;
      phone?: string;
    };
    const { firstName, lastName, email, password, username, phone } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 400 });
    }

    const userPayload: Record<string, unknown> = {
      firstName,
      lastName,
      email,
      password,
    };
    if (username != null && username !== '') userPayload.username = username;
    if (phone != null && phone !== '') userPayload.phone = phone;

    const res = await fetch(`${SERVER_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userPayload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to register user: ${res.status} - ${errorText}`);
      try {
        const errJson = JSON.parse(errorText) as { errors?: Array<{ message?: string }> };
        if (errJson.errors?.length) {
          const message = errJson.errors[0]?.message ?? 'Registration failed.';
          return NextResponse.json({ message }, { status: res.status });
        }
      } catch {
        // ignore JSON parse error
      }
      return NextResponse.json({ message: 'Registration failed.' }, { status: res.status });
    }

    const user = (await res.json()) as {
      id: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
    };

    // Send welcome email to the user
    if (SENDGRID_API_KEY && FROM_EMAIL && email) {
      try {
        // Escape HTML to prevent XSS
        const escapeHtml = (text: string) => {
          return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        };

        const safeFirstName = escapeHtml(firstName);
        const appOrigin = new URL(request.url).origin;

        const welcomeEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Insigmark</title>
</head>
<body
  style="margin: 0; padding: 0; background-color: #160b11; color: #ffffff; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0"
    style="width: 100%; border-collapse: collapse; background-color: #160b11;">
    <tr>
      <td align="center" style="padding: 24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0"
          style="width: 100%; max-width: 593px; border-collapse: collapse; background-color: #2b1018; background-image: linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.55)), url('${appOrigin}/images/emails/register/bg.png'); background-position: center center; background-size: cover; background-repeat: no-repeat;">
          <tr>
            <td style="padding: 24px 40px 22px 40px;">
              <img src="${appOrigin}/images/emails/register/logo-mark-header.svg" alt="Insigmark"
                style="display: inline-block; width: 33px; height: 38px; vertical-align: middle; margin-right: 10px;">
              <img src="${appOrigin}/images/emails/register/logo-wordmark.svg" alt="Insigmark"
                style="display: inline-block; width: 99px; height: 25px; vertical-align: middle;">
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
                    <p
                      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
                      Thank you for joining Insigmark! Your account has been successfully created, and you are now
                      ready to manage your orders, track service status, and access invoices effortlessly.
                    </p>
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
                    <p style="margin: 0 0 24px 0;">
                      <a href="${appOrigin}/sign-in"
                        style="display: inline-block; padding: 12px 18px; background-color: #0f0f19; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 2px;">
                        Sign In
                      </a>
                    </p>
                    <p
                      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
                      If you did not create this account, please contact our support immediately at
                      <a href="mailto:info@theinsigmark.com" style="color: #0f0f19; text-decoration: none;">info@theinsigmark.com</a>.
                    </p>
                    <p
                      style="margin: 0 0 26px 0; color: #0f0f19; font-size: 18px; font-weight: 600; line-height: 1.2; letter-spacing: -1px;">
                      We are excited to have you with us!
                    </p>
                    <p
                      style="margin: 0; color: #0f0f19; font-size: 18px; font-weight: 600; line-height: 1.2; letter-spacing: -1px; text-align: right;">
                      The Insigmark Team
                    </p>
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
                      Email: <a href="mailto:info@theinsigmark.com" style="color: #ffffff; text-decoration: none;">info@theinsigmark.com</a>
                    </p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
                      Phone: <a href="tel:+48732143158" style="color: #ffffff; text-decoration: none;">+48 732 143 158</a>
                    </p>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <img src="${appOrigin}/images/emails/register/logo-mark-footer.svg" alt=""
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

        const welcomeMsg = {
          to: email,
          from: FROM_EMAIL,
          subject: 'Welcome to Insigmark! Your account is ready',
          html: welcomeEmailHtml,
        };

        await sgMail.send(welcomeMsg);
        console.log(`Registration email sent to ${email}`);
      } catch (emailError) {
        console.error('Error sending registration email:', emailError);
        // Не зупиняємо процес, якщо email не відправився
      }
    }

    // Automatically log in the user after registration to get a token
    const loginRes = await fetch(`${SERVER_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      // Registration succeeded but login failed - return user anyway
      console.error(`Failed to auto-login after registration: ${loginRes.status}`);
      return NextResponse.json({ user });
    }

    const loginData = (await loginRes.json()) as {
      user?: {
        id: string;
        email?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
      };
      token?: string;
      exp?: number;
      errors?: Array<{ message?: string }>;
    };

    const token = loginData.token;
    const response = NextResponse.json({ user: loginData.user ?? user });

    if (token && COOKIE_NAME) {
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Registration error:', message);
    return NextResponse.json({ message: 'Registration failed.', error: message }, { status: 500 });
  }
}
