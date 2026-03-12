import type { Metadata } from 'next';

import { articlesHero, articlesLoop } from './components';

export const metadata: Metadata = {
  title: 'articles | Insigmark Business Insights & Articles',
  description:
    'Insigmark shares expert insights, strategies, and thought leadership on business development, focus, scalability, and entrepreneurship. Read our latest articles and empower your business.',
  openGraph: {
    title: 'articles | Insigmark Business Insights & Articles',
    description:
      'Insigmark shares expert insights, strategies, and thought leadership on business development, focus, scalability, and entrepreneurship. Read our latest articles and empower your business.',
    images: 'https://insigmark.com/images/meta.png',
  },
};

export default async function Home() {
  return (
    <>
      <articlesHero />
      <articlesLoop />
    </>
  );
}
