"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./HomePricing.module.scss";

import { Link } from "@/i18n/navigation";

const ARROW_ICON = (
  <svg
    width="14"
    height="19"
    viewBox="0 0 14.3756 18.6879"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.1648 14.1648L9.85227 18.4773C9.7174 18.6121 9.53448 18.6879 9.34375 18.6879C9.15302 18.6879 8.9701 18.6121 8.83523 18.4773C8.70037 18.3424 8.6246 18.1595 8.6246 17.9688C8.6246 17.778 8.70037 17.5951 8.83523 17.4602L11.9214 14.375H0.71875C0.528126 14.375 0.345309 14.2993 0.210517 14.1645C0.0757254 14.0297 0 13.8469 0 13.6562V0.71875C0 0.528126 0.0757254 0.345309 0.210517 0.210517C0.345309 0.0757252 0.528126 0 0.71875 0C0.909374 0 1.09219 0.0757252 1.22698 0.210517C1.36177 0.345309 1.4375 0.528126 1.4375 0.71875V12.9375H11.9214L8.83523 9.85227C8.70037 9.7174 8.6246 9.53448 8.6246 9.34375C8.6246 9.15302 8.70037 8.9701 8.83523 8.83523C8.9701 8.70037 9.15302 8.6246 9.34375 8.6246C9.53448 8.6246 9.7174 8.70037 9.85227 8.83523L14.1648 13.1477C14.2316 13.2145 14.2846 13.2938 14.3208 13.381C14.3569 13.4683 14.3756 13.5618 14.3756 13.6562C14.3756 13.7507 14.3569 13.8442 14.3208 13.9315C14.2846 14.0187 14.2316 14.098 14.1648 14.1648Z"
      fill="#023D65"
    />
  </svg>
);

export const HomePricing = () => {
  const t = useTranslations("homePricing");
  const [activeTab, setActiveTab] = useState<"development" | "hosting">(
    "development",
  );

  const DEVELOPMENT_ROWS = [
    [
      { price: "€500", unit: `${t("perSite", { fallback: "/per site" })}` },
      { price: "€100", unit: `${t("perPage", { fallback: "/per page" })}` },
      {
        price: "€200",
        unit: `${t("monthForMaintenance", {
          fallback: "/month for maintenance",
        })}`,
        accent: true,
      },
    ],
    [
      {
        price: "€1,500",
        unit: `${t("perCustomFeature", { fallback: "/per custom feature" })}`,
      },
      {
        price: "€1,000",
        unit: `${t("forHandoverDocs", { fallback: "/for handover & docs" })}`,
        accent: true,
      },
    ],
  ];

  const HOSTING_ROWS = [
    [
      {
        price: "€199",
        unit: `${t("yearSharedHosting", {
          fallback: "/year – shared hosting",
        })}`,
      },
      {
        price: "€500",
        unit: `${t("yearManagedWordPress", {
          fallback: "/year – managed WordPress",
        })}`,
      },
      {
        price: "€400",
        unit: `${t("yearEntryVPS", { fallback: "/year – entry VPS" })}`,
        accent: true,
      },
    ],
    [
      {
        price: "€1,000",
        unit: `${t("yearProVPS", { fallback: "/year – pro VPS" })}`,
      },
      {
        price: "€2,000",
        unit: `${t("yearDedicatedServer", {
          fallback: "/year – dedicated server",
        })}`,
        accent: true,
      },
    ],
  ];

  const rows = activeTab === "development" ? DEVELOPMENT_ROWS : HOSTING_ROWS;

  return (
    <motion.section
      className={styles.home_pricing}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.home_pricing__container}>
        {/* Heading */}
        <motion.div
          className={styles.home_pricing__heading}
          variants={staggerItem}
        >
          <h2 className={styles.home_pricing__title}>
            {t("title", { fallback: "Flexible pricing" })}
          </h2>
          <div className={styles.home_pricing__subtitle_block}>
            <p className={styles.home_pricing__approach}>
              {t("approach", { fallback: "Approach" })}
            </p>
            <p className={styles.home_pricing__desc}>
              {t("desc", {
                fallback:
                  "Your project isn't limited by preset patterns: we offer fully customizable web development and hosting tailored to your needs.",
              })}
            </p>
          </div>
        </motion.div>

        {/* Tabs + Cards */}
        <motion.div
          className={styles.home_pricing__body}
          variants={staggerItem}
        >
          {/* Tab buttons */}
          <div className={styles.home_pricing__tabs}>
            <button
              type="button"
              className={`${styles.home_pricing__tab} ${
                activeTab === "development"
                  ? styles["home_pricing__tab--active"]
                  : ""
              }`}
              onClick={() => setActiveTab("development")}
            >
              <span className={styles.home_pricing__tab_icon}>
                {ARROW_ICON}
              </span>
              <span>{t("tabDevelopment", { fallback: "Development" })}</span>
            </button>
            <button
              type="button"
              className={`${styles.home_pricing__tab} ${
                activeTab === "hosting"
                  ? styles["home_pricing__tab--active"]
                  : ""
              }`}
              onClick={() => setActiveTab("hosting")}
            >
              <span className={styles.home_pricing__tab_icon}>
                {ARROW_ICON}
              </span>
              <span>{t("tabHosting", { fallback: "Hosting" })}</span>
            </button>
          </div>

          {/* Price card rows */}
          <div className={styles.home_pricing__rows}>
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className={styles.home_pricing__row}>
                {row.map((card, cardIdx) => (
                  <div
                    key={cardIdx}
                    className={`${styles.home_pricing__card} ${
                      card.accent ? styles["home_pricing__card--accent"] : ""
                    }`}
                  >
                    <span className={styles.home_pricing__card_from}>
                      {t("from", { fallback: "From" })}
                    </span>
                    <div className={styles.home_pricing__card_price}>
                      <span className={styles.home_pricing__card_amount}>
                        {card.price}
                      </span>
                      <span className={styles.home_pricing__card_unit}>
                        {card.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom link */}
      <motion.div
        className={styles.home_pricing__link_row}
        variants={staggerItem}
      >
        <Link href="/pricing" className={styles.home_pricing__link}>
          <span className={styles.home_pricing__link_icon}>{ARROW_ICON}</span>
          <span>{t("seeApproach", { fallback: "See pricing approach" })}</span>
        </Link>
      </motion.div>
    </motion.section>
  );
};
