"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./CompanyClients.module.scss";

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

export const CompanyClients = () => {
  const t = useTranslations("company");
  const USE_CASES = [
    {
      num: "01",
      text: t("clientCase1", {
        fallback: "Personal websites and portfolios",
      }),
    },
    {
      num: "02",
      text: t("clientCase2", {
        fallback: "Blogs and content platforms",
      }),
    },
    {
      num: "03",
      text: t("clientCase3", {
        fallback: "Landing pages for services and products",
      }),
    },
    {
      num: "04",
      text: t("clientCase4", {
        fallback:
          "Websites that require hosting, monitoring, and maintenance",
      }),
    },
    {
      num: "05",
      text: t("clientCase5", {
        fallback:
          "Projects that need security checks or technical optimization",
      }),
    },
  ];
  return (
    <motion.section
      className={styles.company_clients}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.company_clients__container}>
        <motion.div
          className={styles.company_clients__top}
          variants={staggerItem}
        >
          <div className={styles.company_clients__heading}>
            <h2 className={styles.company_clients__title}>
              {t("clientsTitle", { fallback: "Who We Work With" })}
            </h2>
            <div className={styles.company_clients__subtitle_block}>
              <p className={styles.company_clients__subtitle}>
                {t("clientsSubtitleBold", {
                  fallback: "Built for individuals who need reliable delivery",
                })}
              </p>
              <p className={styles.company_clients__subtitle_desc}>
                {t("clientsSubtitleDesc", {
                  fallback:
                    "Insigmark is structured around C2B projects. This includes creators, independent professionals, and individuals launching personal brands, portfolios, or digital products.",
                })}
              </p>
            </div>
          </div>
          <Link
            href="/web-development"
            className={styles.company_clients__link}
          >
            <span className={styles.company_clients__link_icon}>
              {ARROW_ICON}
            </span>
            <span>
              {t("clientsServicesLink", { fallback: "View services" })}
            </span>
          </Link>
        </motion.div>

        <motion.div
          className={styles.company_clients__bar}
          variants={staggerItem}
        >
          <p className={styles.company_clients__bar_label}>
            {t("clientsBarLabel", { fallback: "Common use cases include:" })}
          </p>
          <div className={styles.company_clients__items}>
            {USE_CASES.map((uc) => (
              <div key={uc.num} className={styles.company_clients__item}>
                <div className={styles.company_clients__item_border} />
                <div className={styles.company_clients__item_number}>
                  {uc.num}
                </div>
                <p className={styles.company_clients__item_text}>
                  {uc.text}
                </p>
                <div className={styles.company_clients__item_corner} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
