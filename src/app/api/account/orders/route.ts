import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SERVER_URL = process.env.SERVER_URL;
const COOKIE_NAME = process.env.COOKIE_NAME;

type FilePayload = {
  file?: { url?: string; filename?: string } | number;
  filename?: string;
};

export type OrderItemPayload = {
  product: string;
  quantity: number;
  price: number;
  files?: FilePayload[];
};

type InvoicePayload = { url?: string; filename?: string } | number | null;

export type OrderPayload = {
  id: string;
  createdAt: string;
  orderNumber?: string;
  user: string | { id?: string; email?: string };
  items: OrderItemPayload[];
  total: number;
  status: string;
  invoice?: InvoicePayload;
};

export type OrderFileWithUrl = { name: string; url: string };

function normalizeEmail(email: string | undefined): string {
  return (email ?? "").trim().toLowerCase();
}

export async function GET(): Promise<NextResponse> {
  try {
    if (!SERVER_URL) {
      return NextResponse.json(
        { message: "Server URL is not configured." },
        { status: 500 },
      );
    }

    const token = (await cookies()).get(COOKIE_NAME as string)?.value;
    if (!token) {
      return NextResponse.json({ orders: [] }, { status: 200 });
    }

    const meRes = await fetch(`${SERVER_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${token}`,
      },
    });

    if (!meRes.ok || meRes.status === 401 || meRes.status === 403) {
      return NextResponse.json({ orders: [] }, { status: 200 });
    }

    const meData = (await meRes.json()) as { user?: { email?: string } };
    const userEmail = normalizeEmail(meData.user?.email);
    if (!userEmail) {
      return NextResponse.json({ orders: [] }, { status: 200 });
    }

    const ordersByEmailRes = await fetch(
      `${SERVER_URL}/api/orders?where[user.email][equals]=${encodeURIComponent(userEmail)}&sort=-createdAt&limit=100&depth=2`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `JWT ${token}`,
        },
      },
    );

    let rawOrders: OrderPayload[] = [];

    if (ordersByEmailRes.ok) {
      const ordersData = (await ordersByEmailRes.json()) as { docs?: OrderPayload[] };
      rawOrders = ordersData.docs ?? [];
    } else {
      console.error("Orders fetch by email failed:", ordersByEmailRes.status, await ordersByEmailRes.text());
    }

    if (rawOrders.length === 0) {
      const fallbackOrdersRes = await fetch(
        `${SERVER_URL}/api/orders?sort=-createdAt&limit=300&depth=2`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `JWT ${token}`,
          },
        },
      );

      if (fallbackOrdersRes.ok) {
        const fallbackOrdersData = (await fallbackOrdersRes.json()) as { docs?: OrderPayload[] };
        rawOrders = (fallbackOrdersData.docs ?? []).filter((order) => {
          if (typeof order.user !== "object" || !order.user) {
            return false;
          }

          return normalizeEmail(order.user.email) === userEmail;
        });
      } else {
        console.error("Orders fallback fetch failed:", fallbackOrdersRes.status, await fallbackOrdersRes.text());
      }
    }

    const resolveItemFiles = (files: FilePayload[] | undefined): OrderFileWithUrl[] =>
      (files ?? []).map((f, i) => {
        const fileObj = typeof f.file === "object" && f.file && "url" in f.file ? f.file : null;
        const url = fileObj?.url ? (fileObj.url.startsWith("http") ? fileObj.url : `${SERVER_URL}${fileObj.url}`) : "";
        const name = f.filename ?? (fileObj as { filename?: string } | undefined)?.filename ?? `Document ${i + 1}`;
        return { name, url };
      }).filter((f) => f.url);

    const orders = rawOrders.map((order) => {
      const inv = order.invoice;
      let invoiceDownloadUrl: string | null = null;
      if (inv != null && typeof inv === "object" && "url" in inv && inv.url) {
        invoiceDownloadUrl = inv.url.startsWith("http") ? inv.url : `${SERVER_URL}${inv.url}`;
      }
      const itemsWithFiles = (order.items ?? []).map((item) => ({
        ...item,
        filesWithUrl: resolveItemFiles(item.files),
      }));
      return { ...order, invoiceDownloadUrl, items: itemsWithFiles };
    });
    return NextResponse.json({ orders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Account orders error:", message);
    return NextResponse.json({ orders: [] }, { status: 200 });
  }
}
