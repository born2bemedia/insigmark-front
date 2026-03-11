import { useTranslations } from "next-intl";

import type { SecurityServiceItem } from "../../model/types";

export const MigrationServices = (): SecurityServiceItem[] => {
  const t = useTranslations("securityAuditMaintenance.migrationServices");
  return [
    {
      id: "basic-site-migration",
      title: t("title1", { fallback: "Basic Site Migration" }),
      description: t("description1", {
        fallback:
          "Simple transfer of your website files, database, and DNS settings to a new hosting provider.",
      }),
      price: 499,
      variant: "yellow-2",
    },
    {
      id: "full-hosting-migration",
      title: t("title2", { fallback: "Full Hosting Migration" }),
      description: t("description2", {
        fallback:
          "Complete migration including email accounts, SSL certificates, and server configuration.",
      }),
      price: 1500,
      variant: "yellow-3",
    },
    {
      id: "complex-migration",
      title: t("title3", { fallback: "Complex Migration" }),
      description: t("description3", {
        fallback:
          "Multi-site or enterprise migration with zero-downtime strategy, data validation, and post-migration support.",
      }),
      price: 5000,
      variant: "yellow-4",
    },
  ];
};
