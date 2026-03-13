import { Metadata } from "next";

import { PriceList } from "@/shared/ui/components/price-list/PriceList";

import { SamHero, SamServices } from "./components";

export const metadata: Metadata = {
  title: 'Insigmark – Website Security, Audit & Maintenance',
  description: 'Protect your website and ensure peak performance with Insigmark’s security audits and maintenance services. Secure your site now!',
  openGraph: {
    title: 'Insigmark – Website Security, Audit & Maintenance',
    description: 'Protect your website and ensure peak performance with Insigmark’s security audits and maintenance services. Secure your site now!',
    images: 'https://theinsigmark.com/images/meta.png',
  },
};

export default async function SecurityAuditMaintenancePage() {
  return (
    <>
      <SamHero />
      <SamServices />
      <PriceList image="/images/security-audit-maintenance/pricelist.png" />
    </>
  );
}
