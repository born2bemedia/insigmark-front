import { useTranslations } from "next-intl";

import type { TechnicalOptimizationItem } from "../../model/types";

export const TechnicalOptimization = (): TechnicalOptimizationItem[] => {
  const t = useTranslations("webDevelopment.technicalOptimization");
  return [
    {
      id: "speed-optimization",
      title: t("title1", { fallback: "Speed Optimization" }),
      description: t("description1", {
        fallback:
          "Improving page load times through image compression, caching, and code minification.",
      }),
      price: 800,
      prefix: t("from", { fallback: "From" }),
      variant: 'white',
    },
    {
      id: "core-web-vitals-fix",
      title: t("title2", { fallback: "Core Web Vitals Fix" }),
      description: t("description2", {
        fallback:
          "Enhancing LCP, FCP, CLS, and mobile performance to meet Google's performance standards.",
      }),
      price: 1500,
      prefix: t("from", { fallback: "From" }),
      variant: 'grey-1',
    },
    {
      id: "technical-seo-audit-fix",
      title: t("title3", { fallback: "Technical SEO Audit & Fix" }),
      description: t("description3", {
        fallback:
          "Correcting crawl errors, implementing schema, robots.txt, HTTPS migration for search engine visibility.",
      }),
      price: 900,
      prefix: t("from", { fallback: "From" }),
      variant: 'grey-4',
    },
    {
      id: "accessibility-optimization",
      title: t("title4", { fallback: "Accessibility Optimization" }),
      description: t("description4", {
        fallback:
          "Ensuring WCAG compliance with alt texts, keyboard navigation, and other accessibility standards.",
      }),
      price: 1800,
      prefix: t("from", { fallback: "From" }),
      variant: 'yellow-4',
    },
  ];
};
