import React from "react";
import Link from "next/link";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getArticle } from "@/features/articles/api/get-articles";
import { Article } from "@/features/articles/ui/article/Article";
import { InfoRenderer } from "@/features/articles/ui/renderer/InfoRenderer";

import st from "./page.module.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const article = await getArticle({ slug: slug, locale });
  return {
    title: article.title,
    description: article.seo_description,
    openGraph: {
      title: article.title,
      description: article.seo_description,
      images: "",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const t = await getTranslations("blog");
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const article = await getArticle({ slug: slug, locale });
  console.log(article.content.root.children);

  const SERVER_URL = process.env.SERVER_URL;

  return (
    <>
      <section className={st.postTitle}>
        <div className="container">
          <div className={st.postTitle__content}>
            <Link href="/blog">
              {t("back-to-articles", { fallback: "Back" })}
            </Link>
            <h1>{article.title}</h1>
            <div className={st.postTitle__info}>
              <InfoRenderer content={article.info.root.children} />
            </div>
          </div>
        </div>
      </section>
      {article.content && (
        <section className={st.postContent}>
          <div className="container">
            <Article content={article.content.root.children} />
          </div>
        </section>
      )}
    </>
  );
}
