import { useTranslations } from "next-intl";

import type { HostingPlanItem } from "../../model/types";

export const DedicatedPlans = (): HostingPlanItem[] => {
  const t = useTranslations("hostingSolutions.dedicatedPlans");
  return [
    {
      id: "basic-dedicated",
      title: t("title1", { fallback: "Basic Dedicated" }),
      forLabel: t("for1", { fallback: "Large websites or multiple high-traffic projects" }),
      features: [
        t("feature1_1", { fallback: "4 CPU cores, 16 GB RAM" }),
        t("feature1_2", { fallback: "Managed server & cPanel access" }),
        t("feature1_3", { fallback: "Unmetered bandwidth" }),
        t("feature1_4", { fallback: "24/7 monitoring" }),
      ],
      price: 4000,
      variant: "white",
    },
    {
      id: "advanced-dedicated",
      title: t("title2", { fallback: "Advanced Dedicated" }),
      forLabel: t("for2", { fallback: "Resource-intensive applications or mission-critical sites" }),
      features: [
        t("feature2_1", { fallback: "8 CPU cores, 32 GB RAM" }),
        t("feature2_2", { fallback: "RAID storage & IPMI access" }),
        t("feature2_3", { fallback: "Full server management & monitoring" }),
        t("feature2_4", { fallback: "High availability & redundancy" }),
      ],
      price: 8000,
      variant: "white",
    },
  ];
};
