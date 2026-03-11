import { useTranslations } from "next-intl";

import type { SecurityServiceItem } from "../../model/types";

export const AuditSecurity = (): SecurityServiceItem[] => {
  const t = useTranslations("securityAuditMaintenance.auditSecurity");
  return [
    {
      id: "security-audit",
      title: t("title1", { fallback: "Security Audit" }),
      description: t("description1", {
        fallback:
          "Comprehensive security assessment covering vulnerabilities, access controls, and compliance gaps.",
      }),
      price: 750,
      variant: "white",
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "performance-audit",
      title: t("title2", { fallback: "Performance Audit" }),
      description: t("description2", {
        fallback:
          "In-depth analysis of website speed, Core Web Vitals, and server response times with optimization recommendations.",
      }),
      price: 900,
      variant: "grey-1",
      prefix: t("from", { fallback: "From" }),
    },
    {
      id: "full-compliance-audit",
      title: t("title3", { fallback: "Full Compliance Audit" }),
      description: t("description3", {
        fallback:
          "Complete review of GDPR, accessibility (WCAG), and industry-standard compliance with actionable remediation plan.",
      }),
      price: 1500,
      variant: "grey-4",
      prefix: t("from", { fallback: "From" }),
    },
  ];
};
