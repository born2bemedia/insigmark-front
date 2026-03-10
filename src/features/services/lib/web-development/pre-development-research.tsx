import { useTranslations } from "next-intl";

import type { PreDevelopmentItem } from "../../model/types";

export const PreDevelopmentResearch = (): PreDevelopmentItem[] => {
  const t = useTranslations("webDevelopment.preDevelopmentResearch");
  return [
    {
      id: "competitor-analysis",
      title: t("title1", { fallback: "Competitor Analysis" }),
      description: t("description1", {
        fallback:
          "A review of 3–5 similar websites to identify features, gaps, and opportunities.",
      }),
      price: 199,
      variant: "white",
    },
    {
      id: "audience-keyword-research",
      title: t("title2", { fallback: "Audience & Keyword Research" }),
      description: t("description2", {
        fallback:
          "Identifying target audiences and uncovering relevant keywords for reach and visibility.",
      }),
      price: 800,
      prefix: t("from", { fallback: "From" }),
      variant: 'grey-1',
    },
    {
      id: "technical-feasibility-audit",
      title: t("title3", { fallback: "Technical Feasibility Audit" }),
      description: t("description3", {
        fallback:
          "Assessing platforms, hosting requirements, and technical constraints for smooth implementation.",
      }),
      price: 1000,
      variant: 'grey-4',
    },
    {
      id: "requirements-gathering",
      title: t("title4", { fallback: "Requirements Gathering" }),
      description: t("description4", {
        fallback:
          "Creating wireframes, user flows, and sitemaps to guide website structure and functionality.",
      }),
      price: 800,
      prefix: t("from", { fallback: "From" }),
      variant: 'yellow-4',
    },
  ];
};
