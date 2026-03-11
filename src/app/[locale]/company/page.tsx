import {
  CompanyClients,
  CompanyFocus,
  CompanyHero,
  CompanyInfo,
  CompanyPricing,
  CompanyProcess,
  CompanyServices,
  CompanyTech,
} from "./components";

export default async function CompanyPage() {
  return (
    <>
      <CompanyHero />
      <CompanyServices />
      <CompanyProcess />
      <CompanyFocus />
      <CompanyTech />
      <CompanyClients />
      <CompanyPricing />
      <CompanyInfo />
    </>
  );
}
