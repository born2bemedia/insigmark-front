import { useTranslations } from "next-intl";

import type { HostingPlanItem } from "../../model/types";

export const ManagedWordPress = (): HostingPlanItem[] => {
  const t = useTranslations("hostingSolutions.managedWordPress");
  return [
    {
      id: "basic-wp",
      title: t("title1", { fallback: "Basic WP" }),
      forLabel: t("for1", { fallback: "Single WordPress site" }),
      features: [
        t("feature1_1", { fallback: "Auto-updates & WP CLI access" }),
        t("feature1_2", { fallback: "20 GB storage / 25k visits per month" }),
        t("feature1_3", { fallback: "Security monitoring" }),
        t("feature1_4", { fallback: "Basic support" }),
      ],
      price: 550,
      variant: "grey-3",
    },
    {
      id: "plus-wp",
      title: t("title2", { fallback: "Plus WP" }),
      forLabel: t("for2", { fallback: "Small portfolio or multi-site setup" }),
      features: [
        t("feature2_1", { fallback: "Staging environment for testing" }),
        t("feature2_2", { fallback: "Object Cache & daily backups" }),
        t("feature2_3", { fallback: "40 GB storage / 100k visits per month" }),
        t("feature2_4", { fallback: "Priority support" }),
      ],
      price: 900,
      variant: "grey-4",
    },
    {
      id: "elite-wp",
      title: t("title3", { fallback: "Elite WP" }),
      forLabel: t("for3", { fallback: "High-traffic or professional WordPress websites" }),
      features: [
        t("feature3_1", { fallback: "Unlimited sites & API access" }),
        t("feature3_2", { fallback: "White-label management" }),
        t("feature3_3", { fallback: "80 GB storage / 400k visits per month" }),
        t("feature3_4", { fallback: "Advanced performance monitoring" }),
      ],
      price: 2000,
      variant: "black",
    },
  ];
};
