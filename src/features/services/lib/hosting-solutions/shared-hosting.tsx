import { useTranslations } from "next-intl";

import type { HostingPlanItem } from "../../model/types";

export const SharedHosting = (): HostingPlanItem[] => {
  const t = useTranslations("hostingSolutions.sharedHosting");
  return [
    {
      id: "starter-plan",
      title: t("title1", { fallback: "Starter Plan" }),
      forLabel: t("for1", { fallback: "Single website or personal portfolio" }),
      features: [
        t("feature1_1", { fallback: "1-click WordPress installation" }),
        t("feature1_2", { fallback: "25 GB storage" }),
        t("feature1_3", { fallback: "Daily backups" }),
        t("feature1_4", { fallback: "Basic support" }),
      ],
      price: 299,
      variant: "white",
    },
    {
      id: "growth-plan",
      title: t("title2", { fallback: "Growth Plan" }),
      forLabel: t("for2", { fallback: "Up to 5 small websites or growing projects" }),
      features: [
        t("feature2_1", { fallback: "Daily backups" }),
        t("feature2_2", { fallback: "Malware scan & protection" }),
        t("feature2_3", { fallback: "50 GB storage" }),
        t("feature2_4", { fallback: "Priority support" }),
      ],
      price: 599,
      variant: "white",
    },
    {
      id: "pro-plan",
      title: t("title3", { fallback: "Pro Plan" }),
      forLabel: t("for3", { fallback: "Multiple websites or high-performance needs" }),
      features: [
        t("feature3_1", { fallback: "Unlimited websites" }),
        t("feature3_2", { fallback: "100 GB storage" }),
        t("feature3_3", { fallback: "CDN & staging environment" }),
        t("feature3_4", { fallback: "Advanced caching" }),
      ],
      price: 1200,
      variant: "yellow-4",
    },
  ];
};
