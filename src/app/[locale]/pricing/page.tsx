import { PriceList } from "@/shared/ui/components/price-list/PriceList";

import {
  PricingApproach,
  PricingHero,
  PricingPackages,
  PricingPayment,
  PricingQuote,
  PricingRequest,
} from "./components";

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
