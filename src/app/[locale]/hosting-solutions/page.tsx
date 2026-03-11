import { PriceList } from "@/shared/ui/components/price-list/PriceList";

import { HsHero, HsServices } from "./components";

export default async function HostingSolutionsPage() {
  return (
    <>
      <HsHero />
      <HsServices />
      <PriceList image="/images/hosting-solutions/pricing-cta-bg.png" />
    </>
  );
}
