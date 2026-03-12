import type { Metadata } from 'next';

import { getArticles } from '@/features/articles/api/get-articles';

import { HomeRequest } from '../(home)/components';
import { BlogHero, BlogPageContent } from './components';

type RawArticle = {
  id?: number | string;
  title?: string;
  slug?: string;
  excerpt?: string;
  featured?: boolean;
  category?: string;
  read_time?: string;
  image?: {
    url?: string;
    alt?: string;
  } | null;
};

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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = (await getArticles({ locale })) as RawArticle[];
  const normalizedArticles = (articles ?? [])
    .filter((article): article is RawArticle & { title: string; slug: string } => {
      return Boolean(article?.title && article?.slug);
    })
    .map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      featured: article.featured,
      category: article.category,
      read_time: article.read_time,
      image: article.image
        ? {
            url: article.image.url,
            alt: article.image.alt,
          }
        : null,
    }));

  return (
    <>
      <BlogHero />
      <BlogPageContent articles={normalizedArticles} />
      <HomeRequest />
    </>
  );
}
