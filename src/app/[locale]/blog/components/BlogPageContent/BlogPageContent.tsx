"use client";

import { useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { FaqRequestForm } from "@/features/contact-form/ui/FaqRequestForm";

import styles from "./BlogPageContent.module.scss";

import { Link } from "@/i18n/navigation";

type BlogArticle = {
  id?: number | string;
  title: string;
  slug: string;
  excerpt?: string;
  featured?: boolean;
  category?: string;
  read_time?: string;
  image?: {
    url?: string;
    alt?: string;
  } | null;
};

const CATEGORY_ORDER = [
  "web-development",
  "hosting",
  "maintenance",
  "industry-insights",
  "security",
  "optimization",
];

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

const FeaturedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <path
      d="M27.7075 16.7076L18.7075 25.7076C18.5199 25.8952 18.2654 26.0006 18 26.0006C17.7346 26.0006 17.4801 25.8952 17.2925 25.7076C17.1049 25.5199 16.9994 25.2654 16.9994 25.0001C16.9994 24.7347 17.1049 24.4802 17.2925 24.2926L24.5863 17.0001H5C4.73478 17.0001 4.48043 16.8947 4.29289 16.7072C4.10536 16.5196 4 16.2653 4 16.0001C4 15.7349 4.10536 15.4805 4.29289 15.293C4.48043 15.1054 4.73478 15.0001 5 15.0001H24.5863L17.2925 7.70757C17.1049 7.51993 16.9994 7.26543 16.9994 7.00007C16.9994 6.7347 17.1049 6.48021 17.2925 6.29257C17.4801 6.10493 17.7346 5.99951 18 5.99951C18.2654 5.99951 18.5199 6.10493 18.7075 6.29257L27.7075 15.2926C27.8005 15.3854 27.8742 15.4957 27.9246 15.6171C27.9749 15.7385 28.0008 15.8687 28.0008 16.0001C28.0008 16.1315 27.9749 16.2616 27.9246 16.383C27.8742 16.5044 27.8005 16.6147 27.7075 16.7076Z"
      fill="#0C0C0C"
    />
    <path
      d="M27.7075 16.7076L18.7075 25.7076C18.5199 25.8952 18.2654 26.0006 18 26.0006C17.7346 26.0006 17.4801 25.8952 17.2925 25.7076C17.1049 25.5199 16.9994 25.2654 16.9994 25.0001C16.9994 24.7347 17.1049 24.4802 17.2925 24.2926L24.5863 17.0001H5C4.73478 17.0001 4.48043 16.8947 4.29289 16.7072C4.10536 16.5196 4 16.2653 4 16.0001C4 15.7349 4.10536 15.4805 4.29289 15.293C4.48043 15.1054 4.73478 15.0001 5 15.0001H24.5863L17.2925 7.70757C17.1049 7.51993 16.9994 7.26543 16.9994 7.00007C16.9994 6.7347 17.1049 6.48021 17.2925 6.29257C17.4801 6.10493 17.7346 5.99951 18 5.99951C18.2654 5.99951 18.5199 6.10493 18.7075 6.29257L27.7075 15.2926C27.8005 15.3854 27.8742 15.4957 27.9246 15.6171C27.9749 15.7385 28.0008 15.8687 28.0008 16.0001C28.0008 16.1315 27.9749 16.2616 27.9246 16.383C27.8742 16.5044 27.8005 16.6147 27.7075 16.7076Z"
      fill="black"
      fillOpacity="0.2"
    />
    <path
      d="M27.7075 16.7076L18.7075 25.7076C18.5199 25.8952 18.2654 26.0006 18 26.0006C17.7346 26.0006 17.4801 25.8952 17.2925 25.7076C17.1049 25.5199 16.9994 25.2654 16.9994 25.0001C16.9994 24.7347 17.1049 24.4802 17.2925 24.2926L24.5863 17.0001H5C4.73478 17.0001 4.48043 16.8947 4.29289 16.7072C4.10536 16.5196 4 16.2653 4 16.0001C4 15.7349 4.10536 15.4805 4.29289 15.293C4.48043 15.1054 4.73478 15.0001 5 15.0001H24.5863L17.2925 7.70757C17.1049 7.51993 16.9994 7.26543 16.9994 7.00007C16.9994 6.7347 17.1049 6.48021 17.2925 6.29257C17.4801 6.10493 17.7346 5.99951 18 5.99951C18.2654 5.99951 18.5199 6.10493 18.7075 6.29257L27.7075 15.2926C27.8005 15.3854 27.8742 15.4957 27.9246 15.6171C27.9749 15.7385 28.0008 15.8687 28.0008 16.0001C28.0008 16.1315 27.9749 16.2616 27.9246 16.383C27.8742 16.5044 27.8005 16.6147 27.7075 16.7076Z"
      fill="black"
      fillOpacity="0.2"
    />
    <path
      d="M27.7075 16.7076L18.7075 25.7076C18.5199 25.8952 18.2654 26.0006 18 26.0006C17.7346 26.0006 17.4801 25.8952 17.2925 25.7076C17.1049 25.5199 16.9994 25.2654 16.9994 25.0001C16.9994 24.7347 17.1049 24.4802 17.2925 24.2926L24.5863 17.0001H5C4.73478 17.0001 4.48043 16.8947 4.29289 16.7072C4.10536 16.5196 4 16.2653 4 16.0001C4 15.7349 4.10536 15.4805 4.29289 15.293C4.48043 15.1054 4.73478 15.0001 5 15.0001H24.5863L17.2925 7.70757C17.1049 7.51993 16.9994 7.26543 16.9994 7.00007C16.9994 6.7347 17.1049 6.48021 17.2925 6.29257C17.4801 6.10493 17.7346 5.99951 18 5.99951C18.2654 5.99951 18.5199 6.10493 18.7075 6.29257L27.7075 15.2926C27.8005 15.3854 27.8742 15.4957 27.9246 15.6171C27.9749 15.7385 28.0008 15.8687 28.0008 16.0001C28.0008 16.1315 27.9749 16.2616 27.9246 16.383C27.8742 16.5044 27.8005 16.6147 27.7075 16.7076Z"
      fill="black"
      fillOpacity="0.2"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M13.8327 8.83333C13.8327 12.0533 11.2193 14.6667 7.99935 14.6667C4.77935 14.6667 2.16602 12.0533 2.16602 8.83333C2.16602 5.61333 4.77935 3 7.99935 3C11.2193 3 13.8327 5.61333 13.8327 8.83333Z"
      stroke="#0C0C0C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 5.33325V8.66659"
      stroke="#0C0C0C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 1.33325H10"
      stroke="#0C0C0C"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GridIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M14.6667 5.67992V2.65325C14.6667 1.71325 14.24 1.33325 13.18 1.33325H10.4867C9.42667 1.33325 9 1.71325 9 2.65325V5.67325C9 6.61992 9.42667 6.99325 10.4867 6.99325H13.18C14.24 6.99992 14.6667 6.61992 14.6667 5.67992Z"
      stroke="#0C0C0C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6667 13.18V10.4867C14.6667 9.42667 14.24 9 13.18 9H10.4867C9.42667 9 9 9.42667 9 10.4867V13.18C9 14.24 9.42667 14.6667 10.4867 14.6667H13.18C14.24 14.6667 14.6667 14.24 14.6667 13.18Z"
      stroke="#0C0C0C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.00065 5.67992V2.65325C7.00065 1.71325 6.57398 1.33325 5.51398 1.33325H2.82065C1.76065 1.33325 1.33398 1.71325 1.33398 2.65325V5.67325C1.33398 6.61992 1.76065 6.99325 2.82065 6.99325H5.51398C6.57398 6.99992 7.00065 6.61992 7.00065 5.67992Z"
      stroke="#0C0C0C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.00065 13.18V10.4867C7.00065 9.42667 6.57398 9 5.51398 9H2.82065C1.76065 9 1.33398 9.42667 1.33398 10.4867V13.18C1.33398 14.24 1.76065 14.6667 2.82065 14.6667H5.51398C6.57398 14.6667 7.00065 14.24 7.00065 13.18Z"
      stroke="#171717"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const normalizeCategory = (category: string) => category.trim().toLowerCase();

const getCategoryOrder = (category: string) => {
  const normalized = normalizeCategory(category);
  const idx = CATEGORY_ORDER.indexOf(normalized);
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
};

const getArticleImage = (article: BlogArticle, serverUrl: string) => {
  const imageUrl = article.image?.url;
  if (!imageUrl) return "/images/blog/featured-fallback.webp";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))
    return imageUrl;
  if (!serverUrl) return imageUrl;
  return `${serverUrl}${imageUrl}`;
};

export const BlogPageContent = ({ articles }: { articles: BlogArticle[] }) => {
  const t = useTranslations("blog");
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

  const CATEGORY_LABELS: Record<string, string> = {
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

  const formatCategory = (category: string) => {
    const normalized = normalizeCategory(category);
    if (CATEGORY_LABELS[normalized]) return CATEGORY_LABELS[normalized];

    return normalized
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const featuredArticle = useMemo(
    () => articles.find((article) => article.featured) ?? articles[0] ?? null,
    [articles],
  );

  const regularArticles = useMemo(() => {
    if (!featuredArticle) return articles;
    return articles.filter((article) => article.slug !== featuredArticle.slug);
  }, [articles, featuredArticle]);

  const categories = useMemo(() => {
    const allCategories = regularArticles
      .map((article) => article.category)
      .filter((category): category is string => Boolean(category));
    const uniqueCategories = Array.from(new Set(allCategories));
    const sorted = [...uniqueCategories].sort((a, b) => {
      const byOrder = getCategoryOrder(a) - getCategoryOrder(b);
      if (byOrder !== 0) return byOrder;
      return normalizeCategory(a).localeCompare(normalizeCategory(b));
    });
    return ["all", ...sorted];
  }, [regularArticles]);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(5);
  const activeCategoryValue = categories.includes(activeCategory)
    ? activeCategory
    : "all";

  const filteredArticles = useMemo(() => {
    if (activeCategoryValue === "all") return regularArticles;
    return regularArticles.filter(
      (article) =>
        normalizeCategory(article.category ?? "") ===
        normalizeCategory(activeCategoryValue),
    );
  }, [activeCategoryValue, regularArticles]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  return (
    <>
      {featuredArticle && (
        <section className={styles.featured}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getArticleImage(featuredArticle, serverUrl)}
            alt={featuredArticle.image?.alt || featuredArticle.title}
            className={styles.featured__bg}
          />
          <div className={styles.featured__overlay} />

          <div className={styles.featured__label}>
            <span className={styles.featured__label_icon}>
              <ArrowIcon />
            </span>
            <span>{t("featuredLabel", { fallback: "Featured Insight" })}</span>
          </div>

          <div className={styles.featured__content}>
            <div className={styles.featured__content_text}>
              <h2>{featuredArticle.title}</h2>
              <p>{featuredArticle.excerpt}</p>
            </div>
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className={styles.featured__link}
            >
              <span className={styles.featured__link_icon}>
                <FeaturedIcon />
              </span>
              <span>{t("readFeatured", { fallback: "Read Article" })}</span>
            </Link>
          </div>
        </section>
      )}

      <section className={styles.insights} id="blog-insights">
        <div className="container">
          <div className={styles.insights__grid}>
            <aside className={styles.sidebar}>
              <div className={styles.sidebar__heading}>
                <div className={styles.sidebar__latest}>
                  <span className={styles.sidebar__latest_icon}>
                    <ArrowIcon />
                  </span>
                  <span>
                    {t("latestLabel", { fallback: "Latest Insights" })}
                  </span>
                </div>
                <p>
                  {t("latestDescription", {
                    fallback:
                      "Explore our newest articles covering web technologies, hosting strategies, and performance optimization.",
                  })}
                </p>
              </div>

              <div className={styles.sidebar__categories}>
                <h3>{t("categoriesTitle", { fallback: "Categories" })}</h3>
                <div className={styles.tabs}>
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`${styles.tab} ${
                        activeCategory === category ? styles["tab--active"] : ""
                      }`}
                      onClick={() => {
                        setActiveCategory(category);
                        setVisibleCount(5);
                      }}
                    >
                      {category === "all"
                        ? t("allArticles", { fallback: "All Articles" })
                        : formatCategory(category)}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className={styles.content}>
              {visibleArticles.length === 0 ? (
                <div className={styles.empty}>
                  <p>{t("empty", { fallback: "No articles found" })}</p>
                </div>
              ) : (
                <div className={styles.cards}>
                  {visibleArticles.map((article) => (
                    <article
                      key={article.id ?? article.slug}
                      className={styles.card}
                    >
                      <div className={styles.card__media}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getArticleImage(article, serverUrl)}
                          alt={article.image?.alt || article.title}
                        />
                        <div className={styles.card__tags}>
                          {article.read_time && (
                            <span className={styles.pill}>
                              <ClockIcon />
                              <span>{article.read_time}</span>
                            </span>
                          )}
                          {article.category && (
                            <span className={styles.pill}>
                              <GridIcon />
                              <span>{formatCategory(article.category)}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className={styles.card__body}>
                        <span
                          className={styles.card__corner}
                          aria-hidden="true"
                        />
                        <h4>{article.title}</h4>
                        <p>{article.excerpt}</p>
                        <Link
                          href={`/blog/${article.slug}`}
                          className={styles.card__link}
                        >
                          {t("button", { fallback: "Read Article" })}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {hasMore && (
                <button
                  type="button"
                  className={styles.loadMore}
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                >
                  <span className={styles.loadMore__icon}>
                    <ArrowIcon />
                  </span>
                  <span>
                    {t("loadMore", { fallback: "Load More Articles" })}
                  </span>
                </button>
              )}

              <div className={styles.connect}>
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet="/images/blog/stay-connected-mobile.webp"
                  />
                  <img
                    src="/images/blog/stay-connected-desktop.webp"
                    alt=""
                    aria-hidden="true"
                  />
                </picture>
                <div className={styles.connect__overlay} />
                <div className={styles.connect__content}>
                  <div className={styles.connect__heading}>
                    <h3>
                      {t("stayConnectedTitle", { fallback: "Stay Connected" })}
                    </h3>
                    <p>
                      {t("stayConnectedDesc", {
                        fallback:
                          "Be the first to know about our latest articles, technical insights, and special offers.",
                      })}
                    </p>
                  </div>
                  <FaqRequestForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
