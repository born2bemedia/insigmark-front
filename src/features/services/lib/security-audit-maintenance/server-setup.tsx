import { useTranslations } from "next-intl";

import type { SecurityServiceItem } from "../../model/types";

export const ServerSetup = (): SecurityServiceItem[] => {
  const t = useTranslations("securityAuditMaintenance.serverSetup");
  return [
    {
      id: "shared-wp-server-setup",
      title: t("title1", { fallback: "Shared/WP Server Setup" }),
      description: t("description1", {
        fallback:
          "Configuration of shared or WordPress servers with security, caching, and GDPR-ready settings.",
      }),
      price: 999,
      variant: "white",
    },
    {
      id: "vps-cloud-setup",
      title: t("title2", { fallback: "VPS/Cloud Setup" }),
      description: t("description2", {
        fallback:
          "Preparation of virtual or cloud servers including OS installation, firewall, and control panel setup.",
      }),
      price: 1499,
      variant: "grey-1",
    },
    {
      id: "advanced-optimization",
      title: t("title3", { fallback: "Advanced Optimization" }),
      description: t("description3", {
        fallback:
          "Fine-tuning of servers for speed, scalability, and reliability, including load management and CDN integration.",
      }),
      price: 3000,
      variant: "grey-4",
    },
  ];
};
