import { useTranslations } from "next-intl";

import type { SecurityServiceItem } from "../../model/types";

export const BugDetection = (): SecurityServiceItem[] => {
  const t = useTranslations("securityAuditMaintenance.bugDetection");
  return [
    {
      id: "bug-audit-report",
      title: t("title1", { fallback: "Bug Audit & Report" }),
      description: t("description1", {
        fallback:
          "Thorough inspection of your website to identify bugs, errors, and performance issues with a detailed report.",
      }),
      price: 700,
      variant: "grey-2",
    },
    {
      id: "bug-fixes",
      title: t("title2", { fallback: "Bug Fixes" }),
      description: t("description2", {
        fallback:
          "Targeted resolution of specific bugs and errors to restore full website functionality.",
      }),
      price: 220,
      prefix: t("from", { fallback: "From" }),
      variant: "grey-3",
      suffix: t("hourly", { fallback: "hourly" }),
    },
    {
      id: "comprehensive-fix-package",
      title: t("title3", { fallback: "Comprehensive Fix Package" }),
      description: t("description3", {
        fallback:
          "End-to-end bug resolution including audit, fixes, testing, and post-fix monitoring.",
      }),
      price: 3000,
      variant: "grey-4",
    },
  ];
};
