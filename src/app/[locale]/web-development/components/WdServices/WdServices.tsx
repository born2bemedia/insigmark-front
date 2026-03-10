"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  ComplementaryServices,
  DocumentationSupport,
  PreDevelopmentResearch,
  TechnicalOptimization,
} from "@/features/services/lib/web-development";
import { ServiceCard } from "@/features/services/ui/ServiceCard";
import { WebDevelopmentCards } from "@/features/services/ui/WebDevelopmentCards";

import { fadeInUpLyniq } from "@/shared/lib/helpers/animations";
import { refreshLenis } from "@/shared/ui/components";

import styles from "./WdServices.module.scss";

const TAB_KEYS = [
  "preDevelopment",
  "websiteDevelopment",
  "technicalOptimization",
  "documentationSupport",
  "complementaryServices",
] as const;

type TabKey = typeof TAB_KEYS[number];

export const WdServices = () => {
  const t = useTranslations("webDev");
  const [activeTab, setActiveTab] = useState<TabKey>("preDevelopment");

  const tabLabels: Record<TabKey, string> = {
    preDevelopment: t("tabPreDevelopment", {
      fallback: "Pre-Development Research",
    }),
    websiteDevelopment: t("tabWebsiteDevelopment", {
      fallback: "Website Development",
    }),
    technicalOptimization: t("tabTechnicalOptimization", {
      fallback: "Technical Optimization",
    }),
    documentationSupport: t("tabDocumentationSupport", {
      fallback: "Documentation & Support",
    }),
    complementaryServices: t("tabComplementaryServices", {
      fallback: "Complementary Services",
    }),
  };

  const tabClickHandler = (key: TabKey) => {
    setActiveTab(key);
  };

  useEffect(() => {
    refreshLenis();
  }, [activeTab]);

  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <section className={styles.wd_services}>
      <div className={styles.wd_services__container}>
        {/* Tab navigation */}
        <motion.div className={styles.wd_services__tabs} initial="hidden" animate="visible" variants={fadeInUpLyniq}>
          <div className={styles.wd_services__tabs_row}>
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.wd_services__tab} ${
                  activeTab === key ? styles["wd_services__tab--active"] : ""
                }`}
                onClick={() => tabClickHandler(key)}
              >
                {tabLabels[key]}
              </button>
            ))}
          </div>
          <div className={styles.wd_services__tabs_border} />
        </motion.div>

        {/* Tab content */}
        <motion.div className={styles.wd_services__content} initial="hidden" animate="visible" variants={fadeInUpLyniq}>
          {activeTab === "preDevelopment" && (
            <PreDevelopmentContent orderLabel={orderLabel} />
          )}
          {activeTab === "websiteDevelopment" && <WebDevelopmentCards />}
          {activeTab === "technicalOptimization" && (
            <TechnicalOptimizationContent orderLabel={orderLabel} />
          )}
          {activeTab === "documentationSupport" && (
            <DocumentationSupportContent orderLabel={orderLabel} />
          )}
          {activeTab === "complementaryServices" && (
            <ComplementaryServicesContent orderLabel={orderLabel} />
          )}
        </motion.div>
      </div>
    </section>
  );
};

const PreDevelopmentContent = ({ orderLabel }: { orderLabel: string }) => {
  const t = useTranslations("webDev");
  const items = PreDevelopmentResearch();
  return (
    <>
      <h2 className={styles.wd_services__section_title}>
        {t("preDevelopmentTitle", { fallback: "Pre-Development Research" })}
      </h2>
      <div className={styles.wd_services__row}>
        {items.map((item, i) => (
          <ServiceCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            prefix={item.prefix}
            orderLabel={orderLabel}
            variant={item.variant}
          />
        ))}
      </div>
    </>
  );
};

const TechnicalOptimizationContent = ({
  orderLabel,
}: {
  orderLabel: string;
}) => {
  const t = useTranslations("webDev");
  const items = TechnicalOptimization();
  return (
    <>
      <h2 className={styles.wd_services__section_title}>
        {t("technicalOptimizationTitle", {
          fallback: "Technical Optimization",
        })}
      </h2>
      <div className={styles.wd_services__row}>
        {items.map((item, i) => (
          <ServiceCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            prefix={item.prefix}
            orderLabel={orderLabel}
            variant={item.variant}
          />
        ))}
      </div>
    </>
  );
};

const DocumentationSupportContent = ({
  orderLabel,
}: {
  orderLabel: string;
}) => {
  const t = useTranslations("webDev");
  const items = DocumentationSupport();
  return (
    <>
      <h2 className={styles.wd_services__section_title}>
        {t("documentationSupportTitle", {
          fallback: "Documentation & Support",
        })}
      </h2>
      <div className={styles.wd_services__row}>
        {items.map((item, i) => (
          <ServiceCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            prefix={item.prefix}
            suffix={item.suffix}
            orderLabel={orderLabel}
            variant={item.variant}
          />
        ))}
      </div>
    </>
  );
};

const ComplementaryServicesContent = ({
  orderLabel,
}: {
  orderLabel: string;
}) => {
  const t = useTranslations("webDev");
  const items = ComplementaryServices();
  return (
    <>
      <h2 className={styles.wd_services__section_title}>
        {t("complementaryServicesTitle", {
          fallback: "Complementary Services",
        })}
      </h2>
      <div className={styles.wd_services__row}>
        {items.map((item, i) => (
          <ServiceCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            prefix={item.prefix}
            orderLabel={orderLabel}
            variant={item.variant}
          />
        ))}
      </div>
    </>
  );
};
