import { useTranslations } from "next-intl";

import type { SecurityServiceItem } from "../../model/types";

export const BackupRecovery = (): SecurityServiceItem[] => {
  const t = useTranslations("securityAuditMaintenance.backupRecovery");
  return [
    {
      id: "forced-on-demand-backup",
      title: t("title1", { fallback: "Forced/On-Demand Backup" }),
      description: t("description1", {
        fallback:
          "Immediate full-site backup triggered manually or on schedule, stored securely off-site.",
      }),
      price: 499,
      variant: "white",
    },
    {
      id: "custom-backup-plan",
      title: t("title2", { fallback: "Custom Backup Plan" }),
      description: t("description2", {
        fallback:
          "Tailored backup strategy with custom frequency, retention policies, and multi-location storage.",
      }),
      price: 1000,
      variant: "white",
      prefix: t("from", { fallback: "From" }),
      suffix: t("monthly", { fallback: "monthly" }),
    },
    {
      id: "disaster-recovery",
      title: t("title3", { fallback: "Disaster Recovery" }),
      description: t("description3", {
        fallback:
          "Complete recovery plan including data restoration, failover setup, and business continuity measures.",
      }),
      price: 2000,
      variant: "yellow-4",
      prefix: t("from", { fallback: "From" }),
      suffix: t("incident", { fallback: "incident" }),
    },
  ];
};
