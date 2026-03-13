import { Metadata } from "next";

import { FaqContent, FaqHero } from "./components";

export const metadata: Metadata = {
  title: 'Insigmark – Frequently Asked Questions',
  description: 'Find clear answers to common questions about web development, hosting, and maintenance services with Insigmark.',
  openGraph: {
    title: 'Insigmark – Frequently Asked Questions',
    description: 'Find clear answers to common questions about web development, hosting, and maintenance services with Insigmark.',
    images: 'https://theinsigmark.com/images/meta.png',
  },
};

export default async function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqContent />
    </>
  );
}
