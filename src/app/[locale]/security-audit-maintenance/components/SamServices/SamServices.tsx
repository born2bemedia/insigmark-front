"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  AdditionalServices,
  AuditSecurity,
  BackupRecovery,
  BugDetection,
  MigrationServices,
  ServerSetup,
} from "@/features/services/lib/security-audit-maintenance";
import { ServiceCard } from "@/features/services/ui/ServiceCard";

import { fadeInUpLyniq } from "@/shared/lib/helpers/animations";
import { refreshLenis } from "@/shared/ui/components";

import styles from "./SamServices.module.scss";

const TAB_KEYS = [
  "serverSetup",
  "backupRecovery",
  "bugDetection",
  "migrationServices",
  "auditSecurity",
  "additionalServices",
] as const;

type TabKey = typeof TAB_KEYS[number];

export const SamServices = () => {
  const t = useTranslations("sam");
  const [activeTab, setActiveTab] = useState<TabKey>("serverSetup");

  const tabLabels: Record<TabKey, string> = {
    serverSetup: t("tabServerSetup", {
      fallback: "Server Setup & Optimization",
    }),
    backupRecovery: t("tabBackupRecovery", {
      fallback: "Backup & Recovery",
    }),
    bugDetection: t("tabBugDetection", {
      fallback: "Bug Detection & Fixes",
    }),
    migrationServices: t("tabMigrationServices", {
      fallback: "Migration Services",
    }),
    auditSecurity: t("tabAuditSecurity", {
      fallback: "Audit & Security",
    }),
    additionalServices: t("tabAdditionalServices", {
      fallback: "Additional Services",
    }),
  };

  useEffect(() => {
    refreshLenis();
  }, [activeTab]);

  return (
    <section className={styles.sam_services}>
      <div className={styles.sam_services__container}>
        <motion.div
          className={styles.sam_services__tabs}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          <div className={styles.sam_services__tabs_row}>
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.sam_services__tab} ${
                  activeTab === key
                    ? styles["sam_services__tab--active"]
                    : ""
                }`}
                onClick={() => setActiveTab(key)}
              >
                {tabLabels[key]}
              </button>
            ))}
          </div>
          <div className={styles.sam_services__tabs_border} />
        </motion.div>

        <motion.div
          className={styles.sam_services__content}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          {activeTab === "serverSetup" && <ServerSetupContent />}
          {activeTab === "backupRecovery" && <BackupRecoveryContent />}
          {activeTab === "bugDetection" && <BugDetectionContent />}
          {activeTab === "migrationServices" && <MigrationServicesContent />}
          {activeTab === "auditSecurity" && <AuditSecurityContent />}
          {activeTab === "additionalServices" && (
            <AdditionalServicesContent />
          )}
        </motion.div>
      </div>
    </section>
  );
};

const ServerSetupContent = () => {
  const t = useTranslations("sam");
  const items = ServerSetup();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.sam_services__section_title}>
        {t("serverSetupTitle", {
          fallback: "Server Setup & Optimization",
        })}
      </h2>
      <div className={styles.sam_services__row}>
        {items.map((item) => (
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

const BackupRecoveryContent = () => {
  const t = useTranslations("sam");
  const items = BackupRecovery();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.sam_services__section_title}>
        {t("backupRecoveryTitle", { fallback: "Backup & Recovery" })}
      </h2>
      <div className={styles.sam_services__row}>
        {items.map((item) => (
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

const BugDetectionContent = () => {
  const t = useTranslations("sam");
  const items = BugDetection();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.sam_services__section_title}>
        {t("bugDetectionTitle", { fallback: "Bug Detection & Fixes" })}
      </h2>
      <div className={styles.sam_services__row}>
        {items.map((item) => (
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

const MigrationServicesContent = () => {
  const t = useTranslations("sam");
  const items = MigrationServices();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.sam_services__section_title}>
        {t("migrationServicesTitle", { fallback: "Migration Services" })}
      </h2>
      <div className={styles.sam_services__row}>
        {items.map((item) => (
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

const AuditSecurityContent = () => {
  const t = useTranslations("sam");
  const items = AuditSecurity();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.sam_services__section_title}>
        {t("auditSecurityTitle", { fallback: "Audit & Security" })}
      </h2>
      <div className={styles.sam_services__row}>
        {items.map((item) => (
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

const AdditionalServicesContent = () => {
  const t = useTranslations("sam");
  const items = AdditionalServices();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.sam_services__section_title}>
        {t("additionalServicesTitle", { fallback: "Additional Services" })}
      </h2>
      <div className={styles.sam_services__row}>
        {items.map((item) => (
          <ServiceCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            prefix={item.prefix}
            suffix={item.suffix}
            additionalPrice={item.additionalPrice}
            additionalPriceSuffix={item.additionalPriceSuffix}
            orderLabel={orderLabel}
            variant={item.variant}
          />
        ))}
      </div>
    </>
  );
};
