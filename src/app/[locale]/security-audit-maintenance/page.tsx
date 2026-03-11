import { PriceList } from "@/shared/ui/components/price-list/PriceList";

import { SamHero, SamServices } from "./components";

export default async function SecurityAuditMaintenancePage() {
  return (
    <>
      <SamHero />
      <SamServices />
      <PriceList image="/images/security-audit-maintenance/pricelist.png" />
    </>
  );
}
