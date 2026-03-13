import { buildFormConfirmationEmail, escapeHtml } from './baseTemplate';

const SIGN_IN_URL = 'https://theinsigmark.com/sign-in';

type OrderConfirmationItem = {
  title: string;
  quantity: number;
  price: number;
};

type OrderConfirmationEmailOptions = {
  fullName: string;
  orderNumber: string;
  orderDate: string;
  total: number;
  items: OrderConfirmationItem[];
};

export function getOrderConfirmationEmail({
  fullName,
  orderNumber,
  orderDate,
  total,
  items,
}: OrderConfirmationEmailOptions): string {
  const summaryHtml = items
    .map(
      (item) => `
        <div style="margin: 0 0 14px 0; padding-bottom: 14px; border-bottom: 1px solid rgba(15, 15, 25, 0.12);">
          <p style="margin: 0 0 6px 0; color: #0f0f19; font-size: 14px; font-weight: 600; line-height: 1.35; letter-spacing: -0.4px;">
            ${escapeHtml(item.title)}
          </p>
          <p style="margin: 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.4px;">
            Quantity: ${item.quantity} · Amount: EUR ${escapeHtml((item.price * item.quantity).toFixed(2))}
          </p>
        </div>
      `
    )
    .join('');

  const contentHtml = `
    <p
      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      Thank you for choosing Insigmark as your strategic partner. We have successfully received your request and are pleased to confirm your engagement.
    </p>
    <p
      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      Our team is currently reviewing your requirements to ensure our resources align with your business objectives.
    </p>
    <div
      style="margin: 0 0 24px 0; padding: 18px 20px; background: rgba(15, 15, 25, 0.06); border-left: 3px solid #0f0f19;">
      <p style="margin: 0 0 8px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
        Order ID: <strong>${escapeHtml(orderNumber)}</strong>
      </p>
      <p style="margin: 0 0 8px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
        Date: <strong>${escapeHtml(orderDate)}</strong>
      </p>
      <p style="margin: 0 0 16px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
        Total Amount: <strong>EUR ${escapeHtml(total.toFixed(2))}</strong>
      </p>
      ${summaryHtml}
    </div>
    <p
      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      What happens next: you will receive an email shortly containing payment instructions. Once those details are finalized, we will move forward with the next phase of your project.
    </p>
    <p
      style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
      We look forward to a successful collaboration.
    </p>
  `;

  return buildFormConfirmationEmail({
    fullName,
    contentHtml,
    cta: {
      text: 'Sign In',
      href: SIGN_IN_URL,
    },
    title: 'Order Received - Insigmark',
  });
}
