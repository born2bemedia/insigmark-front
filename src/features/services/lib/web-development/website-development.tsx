import { useTranslations } from "next-intl";

import type { FullWebsiteItem, PagesSectionsItem } from "../../model/types";

export const FullWebsite = (): FullWebsiteItem[] => {
  const t = useTranslations("webDevelopmentFullWebsite");
  return [
    {
      id: "basic",
      title: t("title1", { fallback: "Basic" }),
      subtitle: t("subtitle1", { fallback: "Landing / Portfolio / Blog" }),
      description: t("description1", {
        fallback:
          "A 3–5 page site including Home, About, Contact, Blog; ready to go live.",
      }),
      price: 2000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "standard",
      title: t("title2", { fallback: "Standard" }),
      subtitle: t("subtitle2", { fallback: "6–10 pages" }),
      description: t("description2", {
        fallback:
          "Includes forms, galleries, and basic integrations; ideal for more detailed portfolios or personal sites.",
      }),
      price: 4500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "premium",
      title: t("title3", { fallback: "Premium" }),
      subtitle: t("subtitle3", { fallback: "10+ pages" }),
      description: t("description3", {
        fallback:
          "Full-featured website with e-commerce cart, user accounts, custom animations, and interactive elements.",
      }),
      price: 6000,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "advanced",
      title: t("title4", { fallback: "Advanced" }),
      subtitle: t("subtitle4", { fallback: "Custom App-Like Site" }),
      description: t("description4", {
        fallback:
          "Complex sites with API integrations, payments, memberships, and advanced UX; fully functional online solution.",
      }),
      price: 9000,
      prefix: t("from", { fallback: "From" }),
    },
  ];
};

export const PagesSections = (): PagesSectionsItem[] => {
  const t = useTranslations("webDevelopmentPagesSections");
  return [
    {
      id: "standard-page",
      title: t("title1", { fallback: "Standard Page" }),
      subtitle: t("subtitle1", { fallback: "Home/About" }),
      description: t("description1", {
        fallback: "Responsive design, SEO-friendly, essential content pages.",
      }),
      price: 599,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "content-page",
      title: t("title2", { fallback: "Content Page" }),
      subtitle: t("subtitle2", { fallback: "Blog/Services" }),
      description: t("description2", {
        fallback: "Pages integrated with CMS, images, and text content.",
      }),
      price: 499,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "contact-form",
      title: t("title3", { fallback: "Contact Form" }),
      subtitle: t("subtitle3", { fallback: "Page or Pop-up" }),
      description: t("description3", {
        fallback:
          "Pages or widgets with forms, maps, and anti-spam protection.",
      }),
      price: 900,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "portfolio-gallery",
      title: t("title4", { fallback: "Portfolio / Gallery" }),
      subtitle: t("subtitle4", { fallback: "Optimised for Visuals" }),
      description: t("description4", {
        fallback: "Dynamic grids and lightbox galleries for showcasing work.",
      }),
      price: 1300,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "shopping-cart",
      title: t("title5", { fallback: "Shopping Cart" }),
      subtitle: t("subtitle5", {
        fallback: "Fully functional ecommerce option",
      }),
      description: t("description5", {
        fallback:
          "Product catalog and checkout functionality for online sales.",
      }),
      price: 1300,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "user-account",
      title: t("title6", { fallback: "User Account" }),
      subtitle: t("subtitle6", { fallback: "With sections" }),
      description: t("description6", {
        fallback: "Login pages, profiles, and order management.",
      }),
      price: 2500,
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "custom-section",
      title: t("title7", { fallback: "Custom Section" }),
      subtitle: t("subtitle7", { fallback: "Forum / Chat / API Integration" }),
      description: t("description7", {
        fallback: "Special interactive features and third-party integrations.",
      }),
      price: 2300,
      prefix: t("from", { fallback: "From" }),
    },
  ];
};
