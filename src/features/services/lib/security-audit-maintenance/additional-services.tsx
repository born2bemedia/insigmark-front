import { useTranslations } from "next-intl";

import type { SecurityServiceItem } from "../../model/types";

export const AdditionalServices = (): SecurityServiceItem[] => {
  const t = useTranslations("securityAuditMaintenance.additionalServices");
  return [
    {
      id: "monitoring-alerts",
      title: t("title1", { fallback: "Monitoring & Alerts" }),
      description: t("description1", {
        fallback:
          "24/7 uptime monitoring with instant alerts for downtime, security threats, and performance issues.",
      }),
      price: 1000,
      variant: "white",
      prefix: t("from", { fallback: "From" }),
      suffix: t("annually", { fallback: "billed annually" }),
    },
    {
      id: "staging-environment",
      title: t("title2", { fallback: "Staging Environment" }),
      description: t("description2", {
        fallback:
          "Dedicated testing environment mirroring your live site for safe updates and feature testing.",
      }),
      price: 1000,
      variant: "grey-1",
      suffix: t("setup", { fallback: "setup" }),
      additionalPrice: 350,
      additionalPriceSuffix: t("monthly", { fallback: "monthly" }),
    },
    {
      id: "custom-integrations",
      title: t("title3", { fallback: "Custom Integrations" }),
      description: t("description3", {
        fallback:
          "Connecting third-party tools, APIs, and services to streamline your website operations and workflows.",
      }),
      price: 4000,
      variant: "yellow-4",
    },
  ];
};
