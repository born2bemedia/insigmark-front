import { PriceList } from "@/shared/ui/components/price-list/PriceList";

import { WdHero, WdServices } from "./components";

export default async function WebDevelopmentPage() {
  return (
    <>
      <WdHero />
      <WdServices />
      <PriceList image="/images/web-development/hero-bg.png" />
    </>
  );
}
