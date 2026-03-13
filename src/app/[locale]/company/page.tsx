import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: 'About Insigmark',
  description: 'Learn how Insigmark transforms articles into fully functional websites with expert development, hosting, and ongoing support.',
  openGraph: {
    title: 'About Insigmark',
    description: 'Learn how Insigmark transforms articles into fully functional websites with expert development, hosting, and ongoing support.',
    images: 'https://theinsigmark.com/images/meta.png',
  },
};

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
