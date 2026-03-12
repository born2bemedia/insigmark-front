import { Metadata } from "next";

import { PriceList } from "@/shared/ui/components/price-list/PriceList";

import {
  PricingApproach,
  PricingHero,
  PricingPackages,
  PricingPayment,
  PricingQuote,
  PricingRequest,
} from "./components";

export const metadata: Metadata = {
  title: 'Insigmark – Pricing Approach',
  description: 'Understand exactly how Insigmark calculates costs for web development, hosting, and maintenance. Explore our transparent pricing approach!',
  openGraph: {
    title: 'Insigmark – Pricing Approach',
    description: 'Understand exactly how Insigmark calculates costs for web development, hosting, and maintenance. Explore our transparent pricing approach!',
    //images: 'https://theinsigmark.com/images/meta.png',
  },
};

export default async function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingQuote />
      <PricingPackages />
      <PriceList image="/images/pricing/pricelist.png" />
      <PricingApproach />
      <PricingPayment />
      <PricingRequest />
    </>
  );
}
