'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { isOrderCompleted, type Order } from '@/features/account/model/orders.types';

import styles from './MyOrdersPage.module.scss';

type OrderRow = {
  orderId: string;
  orderNumber: string;
  date: string;
  service: string;
  total: number;
  status: string;
  invoiceDownloadUrl?: string | null;
};

const DownloadIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <g clipPath="url(#clip0_261_2144)">
    <path d="M6 1V8M3 5.5L6 8.5L9 5.5M1 9.5V10.5C1 10.6326 1.05268 10.7598 1.14645 10.8536C1.24021 10.9473 1.36739 11 1.5 11H10.5C10.6326 11 10.7598 10.9473 10.8536 10.8536C10.9473 10.7598 11 10.6326 11 10.5V9.5" stroke="#374151" strokeLinecap="round" strokeLinejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_261_2144">
      <rect width="12" height="12" fill="white"/>
    </clipPath>
  </defs>
</svg>
  );
};

function formatDate(createdAt: string): string {
  try {
    const d = new Date(createdAt);

    const year = d.getFullYear();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');

    return `${day}-${month}-${year}`;
  } catch {
    return createdAt;
  }
}

function formatNumber(value: number): string {
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getStatusClass(status: string): string {
  const normalized = status.toLowerCase();

  if (normalized === 'completed') return styles.statusPill_completed;
  if (normalized === 'cancelled') return styles.statusPill_cancelled;
  return styles.statusPill_pending;
}

export const MyOrdersPage = () => {
  const t = useTranslations('myOrdersPage');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch('/api/account/orders', { credentials: 'include' });
        const data = (await res.json()) as { orders?: Order[] };
        if (!cancelled) setOrders(data.orders ?? []);
      } catch {
        if (!cancelled) setOrders([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const rows: OrderRow[] = orders.map((order) => {
    const orderNumber = order.orderNumber ?? order.id;
    const date = formatDate(order.createdAt);
    const status = order.status ?? 'Pending';
    const service =
      (
        order.items?.map((item) => {
          return item.product ?? '—';
        }) ?? []
      ).join(', ') || '—';
    const total = order.total ?? 0;

    return {
      orderId: order.id,
      orderNumber,
      date,
      service,
      total,
      status,
      invoiceDownloadUrl: order.invoiceDownloadUrl,
    };
  });

  const labels = {
    orderId: t('orderId', { fallback: 'Order ID' }),
    serviceOrdered: t('serviceOrdered', { fallback: 'Service' }),
    total: t('total', { fallback: 'Price' }),
    orderDate: t('date', { fallback: 'Order Date' }),
    status: t('status', { fallback: 'Order Status' }),
    invoice: t('invoice', { fallback: 'Invoice' }),
    download: t('download', { fallback: 'Download' }),
  };

  if (loading) {
    return <p className={styles.loadingText}>{t('loading', { fallback: 'Loading orders...' })}</p>;
  }

  if (rows.length === 0) {
    return <p className={styles.empty}>{t('noOrders', { fallback: 'You have no orders yet.' })}</p>;
  }

  return (
    <div className={styles.orders}>
      <div className={styles.desktopWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{labels.orderId}</th>
              <th>{labels.serviceOrdered}</th>
              <th>{labels.total}</th>
              <th>{labels.orderDate}</th>
              <th>{labels.status}</th>
              <th>{labels.invoice}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.orderId}>
                <td>{row.orderNumber}</td>
                <td>{row.service}</td>
                <td className={styles.price}>€{formatNumber(row.total)}</td>
                <td className={styles.date}>{row.date}</td>
                <td>
                  <span className={`${styles.statusPill} ${getStatusClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  {isOrderCompleted(row.status) && row.invoiceDownloadUrl ? (
                    <a
                      href={row.invoiceDownloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.downloadBtn}
                    >
                      <DownloadIcon />
                      <span>{labels.download}</span>
                    </a>
                  ) : (
                    <span className={styles.downloadBtnDisabled}>
                      <DownloadIcon />
                      <span>{labels.download}</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.mobileCards}>
        {rows.map((row) => (
          <article key={row.orderId} className={styles.card}>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>{labels.orderId}</span>
              <span className={styles.cardValue}>{row.orderNumber}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>{labels.serviceOrdered}</span>
              <span className={styles.cardValue}>{row.service}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>{labels.total}</span>
              <span className={styles.cardValue}>€{formatNumber(row.total)}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>{labels.orderDate}</span>
              <span className={styles.cardValue}>{row.date}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>{labels.status}</span>
              <span className={`${styles.statusPill} ${getStatusClass(row.status)}`}>
                {row.status}
              </span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>{labels.invoice}</span>
              {isOrderCompleted(row.status) && row.invoiceDownloadUrl ? (
                <a
                  href={row.invoiceDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadBtn}
                >
                  <DownloadIcon />
                  <span>{labels.download}</span>
                </a>
              ) : (
                <span className={styles.downloadBtnDisabled}>
                  <DownloadIcon />
                  <span>{labels.download}</span>
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
