"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  DedicatedPlans,
  ManagedWordPress,
  SharedHosting,
  VpsCloud,
} from "@/features/services/lib/hosting-solutions";
import { HostingDedicatedCard } from "@/features/services/ui/HostingDedicatedCard";
import { HostingPlanCard } from "@/features/services/ui/HostingPlanCard";

import { fadeInUpLyniq } from "@/shared/lib/helpers/animations";
import { refreshLenis } from "@/shared/ui/components";

import styles from "./HsServices.module.scss";

const TAB_KEYS = [
  "sharedHosting",
  "managedWordPress",
  "vpsCloud",
  "dedicatedPlans",
] as const;

type TabKey = typeof TAB_KEYS[number];

export const HsServices = () => {
  const t = useTranslations("hosting");
  const [activeTab, setActiveTab] = useState<TabKey>("sharedHosting");

  const tabLabels: Record<TabKey, string> = {
    sharedHosting: t("tabSharedHosting", { fallback: "Shared Hosting" }),
    managedWordPress: t("tabManagedWordPress", {
      fallback: "Managed WordPress Hosting",
    }),
    vpsCloud: t("tabVpsCloud", { fallback: "VPS/Cloud Hosting" }),
    dedicatedPlans: t("tabDedicatedPlans", { fallback: "Dedicated Plans" }),
  };

  useEffect(() => {
    refreshLenis();
  }, [activeTab]);

  return (
    <section className={styles.hs_services}>
      <div className={styles.hs_services__container}>
        <motion.div
          className={styles.hs_services__tabs}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          <div className={styles.hs_services__tabs_row}>
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.hs_services__tab} ${
                  activeTab === key ? styles["hs_services__tab--active"] : ""
                }`}
                onClick={() => setActiveTab(key)}
              >
                {tabLabels[key]}
              </button>
            ))}
          </div>
          <div className={styles.hs_services__tabs_border} />
        </motion.div>

        <motion.div
          className={styles.hs_services__content}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          {activeTab === "sharedHosting" && <SharedHostingContent />}
          {activeTab === "managedWordPress" && <ManagedWordPressContent />}
          {activeTab === "vpsCloud" && <VpsCloudContent />}
          {activeTab === "dedicatedPlans" && <DedicatedPlansContent />}
        </motion.div>
      </div>
    </section>
  );
};

const SharedHostingContent = () => {
  const t = useTranslations("hosting");
  const items = SharedHosting();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.hs_services__section_title}>
        {t("sharedHostingTitle", { fallback: "Shared Hosting" })}
      </h2>
      <div className={styles.hs_services__row}>
        {items.map((item) => (
          <HostingPlanCard key={item.id} item={item} orderLabel={orderLabel} />
        ))}
      </div>
    </>
  );
};

const ManagedWordPressContent = () => {
  const t = useTranslations("hosting");
  const items = ManagedWordPress();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.hs_services__section_title}>
        {t("managedWordPressTitle", { fallback: "Managed WordPress Hosting" })}
      </h2>
      <div className={styles.hs_services__row}>
        {items.map((item) => (
          <HostingPlanCard key={item.id} item={item} orderLabel={orderLabel} />
        ))}
      </div>
    </>
  );
};

const VpsCloudContent = () => {
  const t = useTranslations("hosting");
  const items = VpsCloud();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.hs_services__section_title}>
        {t("vpsCloudTitle", { fallback: "VPS/Cloud Hosting" })}
      </h2>
      <div className={styles.hs_services__row}>
        {items.map((item) => (
          <HostingPlanCard key={item.id} item={item} orderLabel={orderLabel} />
        ))}
      </div>
    </>
  );
};

const DedicatedPlansContent = () => {
  const t = useTranslations("hosting");
  const items = DedicatedPlans();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.hs_services__section_title}>
        {t("dedicatedPlansTitle", { fallback: "Dedicated Plans" })}
      </h2>
      <div className={styles.hs_services__dedicated_row}>
        {items.map((item) => (
          <HostingDedicatedCard key={item.id} item={item} orderLabel={orderLabel} />
        ))}
      </div>
    </>
  );
};
