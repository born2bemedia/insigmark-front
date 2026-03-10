"use client";

import { useTranslations } from "next-intl";

import {
  FullWebsite,
  PagesSections,
} from "@/features/services/lib/web-development";

import type { FullWebsiteCardVariant } from "../FullWebsiteCard";
import { FullWebsiteCard } from "../FullWebsiteCard";
import { PagesSectionCard } from "../PagesSectionCard";
import styles from "./WebDevelopmentCards.module.scss";

const FULL_WEBSITE_VARIANTS: FullWebsiteCardVariant[] = [
  "gradient_grey",
  "gradient_grey",
  "gradient_yellow",
  "solid_yellow",
];

export const WebDevelopmentCards = () => {
  const t = useTranslations("webDev");
  const fullWebsite = FullWebsite();
  const pagesSections = PagesSections();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.section_title}>
        {t("fullWebsiteTitle", { fallback: "Full Websites" })}
      </h2>
      <div className={styles.fw_container}>
        <div className={styles.fw_row}>
          {fullWebsite.map((item, i) => (
            <FullWebsiteCard
              key={item.id}
              item={item}
              orderLabel={orderLabel}
              variant={FULL_WEBSITE_VARIANTS[i] || "gradient_grey"}
            />
          ))}
        </div>
      </div>

      <h2 className={`${styles.section_title} ${styles.section_title_spaced}`}>
        {t("pagesSectionsTitle", { fallback: "Pages / Sections" })}
      </h2>
      <div className={styles.ps_container}>
        <div className={styles.ps_grid}>
          {pagesSections.map((item, i) => {
            const isLast =
              i === pagesSections.length - 1 && pagesSections.length % 2 !== 0;
            return (
              <PagesSectionCard
                key={item.id}
                item={item}
                orderLabel={orderLabel}
                fullWidth={isLast}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
