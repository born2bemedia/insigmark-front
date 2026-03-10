import { useTranslations } from "next-intl";

import type { ComplementaryServicesItem } from "../../model/types";

export const ComplementaryServices = (): ComplementaryServicesItem[] => {
  const t = useTranslations("webDevelopment.complementaryServices");
  return [
    {
      id: "ab-testing-setup",
      title: t("title1", { fallback: "A/B Testing Setup" }),
      description: t("description1", {
        fallback:
          "Setting up experiments to optimize conversion rates on key pages.",
      }),
      price: 600,
      prefix: t("from", { fallback: "From" }),
      variant: 'yellow-1',
    },
    {
      id: "analytics-integration",
      title: t("title2", { fallback: "Analytics Integration" }),
      description: t("description2", {
        fallback:
          "Implementing Google Analytics, heatmaps, and custom dashboards for insights.",
      }),
      price: 1900,
      prefix: t("from", { fallback: "From" }),
      variant: 'yellow-2',
    },
    {
      id: "multilingual-setup",
      title: t("title3", { fallback: "Multilingual Setup" }),
      description: t("description3", {
        fallback:
          "Configuring websites for 2–3 languages with proper hreflang tags.",
      }),
      price: 1700,
      prefix: t("from", { fallback: "From" }),
      variant: 'yellow-3',
    },
    {
      id: "custom-api-development",
      title: t("title4", { fallback: "Custom API Development" }),
      description: t("description4", {
        fallback:
          "Integrating third-party tools like calendars, forms, or other services.",
      }),
      price: 6000,
      prefix: t("from", { fallback: "From" }),
      variant: 'yellow-4',
    },
  ];
};
