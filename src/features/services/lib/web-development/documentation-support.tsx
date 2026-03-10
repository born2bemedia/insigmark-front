import { useTranslations } from "next-intl";

import type { DocumentationSupportItem } from "../../model/types";

export const DocumentationSupport = (): DocumentationSupportItem[] => {
  const t = useTranslations("webDevelopment.documentationSupport");
  return [
    {
      id: "basic-user-guide",
      title: t("title1", { fallback: "Basic User Guide" }),
      description: t("description1", {
        fallback:
          "A manual (PDF/video) explaining login, setup, and content editing",
      }),
      price: 599,
      prefix: t("from", { fallback: "From" }),
      variant: 'grey-2',
    },
    {
      id: "technical-documentation",
      title: t("title2", { fallback: "Technical Documentation" }),
      description: t("description2", {
        fallback:
          "Detailed documentation of code structure, API endpoints, and maintenance procedures.",
      }),
      price: 1000,
      prefix: t("from", { fallback: "From" }),
      variant: 'grey-3',
    },
    {
      id: "full-handover-package",
      title: t("title3", { fallback: "Full Handover Package" }),
      description: t("description3", {
        fallback:
          "Complete project handover including hosting access, update procedures, and changelog.",
      }),
      price: 2000,
      prefix: t("from", { fallback: "From" }),
      variant: 'grey-4',
    },
    {
      id: "ongoing-knowledge-transfer",
      title: t("title4", { fallback: "Ongoing Knowledge Transfer" }),
      description: t("description4", {
        fallback:
          "Live training sessions and a custom playbook to ensure clients understand their website fully.",
      }),
      price: 1000,
      prefix: t("from", { fallback: "From" }),
      suffix: t("perMonth", { fallback: "per month" }),
      variant: 'black',
    },
  ];
};
