import { Metadata } from "next";

import { PriceList } from "@/shared/ui/components/price-list/PriceList";

import { HsHero, HsServices } from "./components";

export const metadata: Metadata = {
  title: 'Insigmark – Hosting Solutions',
  description: 'Ensure your website runs fast, secure, and reliably with Insigmark’s hosting solutions. Get started today!',
  openGraph: {
    title: 'Insigmark – Hosting Solutions',
    description: 'Ensure your website runs fast, secure, and reliably with Insigmark’s hosting solutions. Get started today!',
    //images: 'https://theinsigmark.com/images/meta.png',
  },
};

export default async function HostingSolutionsPage() {
  return (
    <>
      <HsHero />
      <HsServices />
      <PriceList image="/images/hosting-solutions/pricing-cta-bg.png" />
    </>
  );
}
