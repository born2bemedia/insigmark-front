import { useTranslations } from "next-intl";

import type { HostingPlanItem } from "../../model/types";

export const VpsCloud = (): HostingPlanItem[] => {
  const t = useTranslations("hostingSolutions.vpsCloud");
  return [
    {
      id: "entry-vps",
      title: t("title1", { fallback: "Entry VPS" }),
      forLabel: t("for1", { fallback: "Small websites or personal projects" }),
      features: [
        t("feature1_1", { fallback: "1 vCPU, 1 GB RAM, 20 GB SSD" }),
        t("feature1_2", { fallback: "Root access for full control" }),
        t("feature1_3", { fallback: "DDoS protection" }),
        t("feature1_4", { fallback: "Basic server management" }),
      ],
      price: 800,
      variant: "yellow-1",
    },
    {
      id: "mid-vps",
      title: t("title2", { fallback: "Mid VPS" }),
      forLabel: t("for2", { fallback: "Growing websites or small e-commerce" }),
      features: [
        t("feature2_1", { fallback: "2 vCPU, 4 GB RAM, 50 GB NVMe" }),
        t("feature2_2", { fallback: "Snapshots for quick recovery" }),
        t("feature2_3", { fallback: "Firewall & security setup" }),
        t("feature2_4", { fallback: "Moderate traffic handling" }),
      ],
      price: 2000,
      variant: "yellow-2",
    },
    {
      id: "high-vps",
      title: t("title3", { fallback: "High VPS" }),
      forLabel: t("for3", { fallback: "High-traffic websites or advanced applications" }),
      features: [
        t("feature3_1", { fallback: "4+ vCPU, 8 GB RAM, 100 GB NVMe" }),
        t("feature3_2", { fallback: "Load balancer option" }),
        t("feature3_3", { fallback: "Scalable resources" }),
        t("feature3_4", { fallback: "Priority support" }),
      ],
      price: 5000,
      variant: "yellow-3",
    },
    {
      id: "cloud-pro",
      title: t("title4", { fallback: "Cloud Pro" }),
      forLabel: t("for4", { fallback: "Enterprise-scale projects with variable traffic" }),
      features: [
        t("feature4_1", { fallback: "Auto-scaling & fully managed" }),
        t("feature4_2", { fallback: "Custom resource allocation (16 GB+ RAM)" }),
        t("feature4_3", { fallback: "Advanced monitoring & backups" }),
        t("feature4_4", { fallback: "High availability and performance" }),
      ],
      price: 10000,
      variant: "yellow-4",
    },
  ];
};
