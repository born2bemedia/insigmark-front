import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getArticle, getArticles } from "@/features/articles/api/get-articles";
import type { Children } from "@/features/articles/model/types";
import { ArticleContent } from "@/features/articles/ui/content/ArticleContent";

import { LenisRefreshOnMount } from "@/shared/ui/components";

import st from "./page.module.scss";

import { Link } from "@/i18n/navigation";

type RawArticle = {
  title?: string;
  slug?: string;
  category?: string;
  read_time?: string;
  seo_description?: string;
  content?: {
    root?: {
      children?: Children[];
    };
  };
  image?: {
    url?: string;
  } | null;
};

type SidebarArticle = {
  title: string;
  slug: string;
  category: string;
};

type Section = {
  id: string;
  title: string;
  nodes: Children[];
};

const CATEGORY_ORDER = [
  "web-development",
  "hosting",
  "maintenance",
  "industry-insights",
  "security",
  "optimization",
];

const normalizeCategory = (value?: string) =>
  (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[/_]/g, " ")
    .replace(/\s+/g, "-");

const toDisplayLabel = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

function extractHeadingText(node: Children): string {
  return (
    node.children
      ?.map((item) => item.text ?? "")
      .join("")
      .trim() ?? ""
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "");
}

function groupIntoSections(content: Children[]): Section[] {
  const sections: Section[] = [];
  const usedIds = new Map<string, number>();
  let current: Section | null = null;

  const makeUniqueId = (base: string) => {
    const next = (usedIds.get(base) ?? 0) + 1;
    usedIds.set(base, next);
    return next === 1 ? base : `${base}-${next}`;
  };

  for (const node of content) {
    if (node.type === "heading" && node.tag === "h2") {
      const title = extractHeadingText(node);
      const baseId = slugify(title) || `section-${sections.length + 1}`;
      current = { id: makeUniqueId(baseId), title, nodes: [node] };
      sections.push(current);
      continue;
    }

    if (current) {
      current.nodes.push(node);
      continue;
    }

    if (sections.length === 0) {
      current = { id: "intro", title: "", nodes: [node] };
      sections.push(current);
    } else {
      sections[0].nodes.push(node);
    }
  }

  return sections;
}

function getSidebarArticles(
  articles: SidebarArticle[],
  currentSlug: string,
  limit = 7,
) {
  const sliced = articles.slice(0, limit);
  const hasCurrent = sliced.some((item) => item.slug === currentSlug);

  if (hasCurrent) return sliced;

  const current = articles.find((item) => item.slug === currentSlug);
  if (!current) return sliced;

  if (sliced.length < limit) return [...sliced, current];

  return [...sliced.slice(0, limit - 1), current];
}

const ArrowIcon = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.9148 16.321L15.6023 20.6335C15.4674 20.7684 15.2845 20.8442 15.0938 20.8442C14.903 20.8442 14.7201 20.7684 14.5852 20.6335C14.4504 20.4986 14.3746 20.3157 14.3746 20.125C14.3746 19.9343 14.4504 19.7514 14.5852 19.6165L17.6714 16.5312H6.46875C6.27813 16.5312 6.09531 16.4555 5.96052 16.3207C5.82573 16.1859 5.75 16.0031 5.75 15.8125V2.875C5.75 2.68438 5.82573 2.50156 5.96052 2.36677C6.09531 2.23198 6.27813 2.15625 6.46875 2.15625C6.65937 2.15625 6.84219 2.23198 6.97698 2.36677C7.11177 2.50156 7.1875 2.68438 7.1875 2.875V15.0938H17.6714L14.5852 12.0085C14.4504 11.8736 14.3746 11.6907 14.3746 11.5C14.3746 11.3093 14.4504 11.1264 14.5852 10.9915C14.7201 10.8566 14.903 10.7809 15.0938 10.7809C15.2845 10.7809 15.4674 10.8566 15.6023 10.9915L19.9148 15.304C19.9816 15.3707 20.0346 15.45 20.0708 15.5373C20.1069 15.6245 20.1256 15.718 20.1256 15.8125C20.1256 15.907 20.1069 16.0005 20.0708 16.0877C20.0346 16.175 19.9816 16.2543 19.9148 16.321Z"
      fill="currentColor"
    />
  </svg>
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { locale, slug } = awaitedParams;
  const article = (await getArticle({ slug, locale })) as RawArticle | null;
  if (!article) notFound();
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
  const article = (await getArticle({ slug, locale })) as RawArticle | null;
  if (!article) notFound();

  function getSolutionCta(category: string) {
    if (category === "hosting") {
      return {
        href: "/hosting-solutions",
        label: t("ourHostingSolutions", { fallback: "Our hosting solutions" }),
      };
    }

    if (category === "web-development" || category === "optimization") {
      return {
        href: "/web-development",
        label: t("ourWebDevelopmentSolutions", {
          fallback: "Our web development solutions",
        }),
      };
    }

    if (category === "security" || category === "maintenance") {
      return {
        href: "/security-audit-maintenance",
        label: t("ourSecuritySolutions", {
          fallback: "Our security solutions",
        }),
      };
    }

    return {
      href: "/web-development",
      label: t("ourWebDevelopmentSolutions", {
        fallback: "Our web development solutions",
      }),
    };
  }

  const allArticles = ((await getArticles({ locale })) ?? []) as RawArticle[];
  const normalizedArticles = allArticles.flatMap((item) => {
    if (!item?.title || !item?.slug) return [];

    return [
      {
        title: item.title,
        slug: item.slug,
        category: normalizeCategory(item.category),
      },
    ];
  });

  const categoryLabels: Record<string, string> = {
    "web-development": t("categoryWebDevelopment", {
      fallback: "Web Development",
    }),
    hosting: t("categoryHosting", { fallback: "Hosting" }),
    maintenance: t("categoryMaintenance", { fallback: "Maintenance" }),
    "industry-insights": t("categoryIndustryInsights", {
      fallback: "Industry Insights",
    }),
    security: t("categorySecurity", { fallback: "Security" }),
    optimization: t("categoryOptimization", { fallback: "Optimization" }),
  };

  const formatCategory = (value: string) =>
    categoryLabels[value] ?? toDisplayLabel(value);

  const currentCategory = normalizeCategory(article.category);
  const currentCategoryLabel = currentCategory
    ? formatCategory(currentCategory)
    : t("categoryFallback", { fallback: "General" });
  const categories = Array.from(
    new Set(normalizedArticles.map((item) => item.category).filter(Boolean)),
  ).sort((a, b) => {
    const aIdx = CATEGORY_ORDER.indexOf(a);
    const bIdx = CATEGORY_ORDER.indexOf(b);

    const byOrder =
      (aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx) -
      (bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx);

    if (byOrder !== 0) return byOrder;

    return a.localeCompare(b);
  });

  const sidebarArticles = getSidebarArticles(normalizedArticles, slug);
  const content = (article.content?.root?.children ?? []) as Children[];
  const sections = groupIntoSections(content);
  const headingSections = sections.filter((section) => section.title);
  const solutionCta = getSolutionCta(currentCategory);
  const backgroundImage = article.image?.url
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}${article.image.url}`
    : null;

  return (
    <>
      <LenisRefreshOnMount />
      <section
        className={st.hero}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container">
          <div className={st.hero__content}>
            <h1>{article.title}</h1>
            <div className={st.hero__meta}>
              <p>
                <span>{t("categoryLabel", { fallback: "Category" })}:</span>{" "}
                {currentCategoryLabel}
              </p>
              {article.read_time && (
                <p>
                  <span>
                    {t("readingTimeLabel", { fallback: "Reading time" })}:
                  </span>{" "}
                  {article.read_time}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      {content.length > 0 && (
        <section className={st.post}>
          <div className="container">
            <div className={st.layout}>
              <aside className={st.sidebar} data-lenis-prevent>
                {headingSections.length > 0 && (
                  <div className={st.sidebar__block}>
                    <p className={st.sidebar__label}>
                      {t("articleContentLabel", {
                        fallback: "Article content",
                      })}
                    </p>
                    <nav className={st.chapterList}>
                      {headingSections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className={st.chapterItem}
                        >
                          {section.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/**<div className={st.sidebar__block}>
                  <p className={st.sidebar__label}>
                    {t("categoriesTitle", { fallback: "Categories" })}
                  </p>
                  <div className={st.categoryList}>
                    {categories.map((category) => (
                      <span
                        key={category}
                        className={`${st.categoryItem} ${
                          category === currentCategory
                            ? st["categoryItem--active"]
                            : ""
                        }`}
                      >
                        {formatCategory(category)}
                      </span>
                    ))}
                  </div>
                </div> */}

                <div className={st.sidebar__block}>
                  <p className={st.sidebar__label}>
                    {t("articlesLabel", { fallback: "Articles" })}
                  </p>
                  <nav className={st.articleList}>
                    {sidebarArticles.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/blog/${item.slug}`}
                        className={`${st.articleItem} ${
                          item.slug === slug ? st["articleItem--active"] : ""
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </aside>

              <article className={st.content}>
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={st.contentBlock}
                  >
                    {section.nodes.map((node, index) => (
                      <ArticleContent
                        key={`${section.id}-${index}`}
                        node={node}
                        type={node.type}
                      />
                    ))}
                  </section>
                ))}

                <div className={st.bottomLinks}>
                  <Link href={solutionCta.href} className={st.bottomLink}>
                    <span className={st.bottomLink__icon}>
                      <ArrowIcon />
                    </span>
                    <span>{solutionCta.label}</span>
                  </Link>

                  <Link href="/contact" className={st.bottomLink}>
                    <span className={st.bottomLink__icon}>
                      <ArrowIcon />
                    </span>
                    <span>{t("contactUs", { fallback: "Contact us" })}</span>
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
