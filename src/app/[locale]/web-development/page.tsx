import type { Metadata } from 'next';

import { PriceList } from "@/shared/ui/components/price-list/PriceList";

import { WdHero, WdServices } from "./components";

export const metadata: Metadata = {
  title: 'Insigmark – Web Development Services',
  description: 'Build a fully functional website from concept to launch. Start your web project with Insigmark today!',
  openGraph: {
    title: 'Insigmark – Web Development Services',
    description: 'Build a fully functional website from concept to launch. Start your web project with Insigmark today!',
    images: 'https://theinsigmark.com/images/meta.png',
  },
};

export default async function WebDevelopmentPage() {
  return (
    <>
      <WdHero />
      <WdServices />
      <PriceList image="/images/web-development/hero-bg.png" />
    </>
  );
}
