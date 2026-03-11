"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./CompanyFocus.module.scss";

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
      fill="#E4E4E4"
    />
  </svg>
);

export const CompanyFocus = () => {
  const t = useTranslations("company");

  return (
    <motion.section
      className={styles.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* Background image covering full section */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/company/focus-bg.png"
        alt=""
        className={styles.section__bg}
      />
      <div className={styles.section__overlay} />

      <div className={styles.container}>
        {/* Heading */}
        <motion.div className={styles.heading} variants={staggerItem}>
          <div className={styles.heading__top}>
            <h2 className={styles.heading__title}>
              {t("focusTitle", { fallback: "What We Focus On" })}
            </h2>
            <div className={styles.heading__subtitle}>
              <p className={styles.heading__subtitle_bold}>
                {t("focusSubtitleBold", {
                  fallback: "Practical standards that keep websites reliable",
                })}
              </p>
              <p className={styles.heading__subtitle_desc}>
                {t("focusSubtitleDesc", {
                  fallback:
                    "We follow practices that make websites easier to maintain and safer to operate. That includes performance planning, infrastructure setup, and clear documentation.",
                })}
              </p>
            </div>
          </div>
          <Link href="/hosting-solutions" className={styles.heading__link}>
            <span className={styles.heading__link_icon}>{ARROW_ICON}</span>
            <span>
              {t("focusHostingLink", { fallback: "Explore hosting solutions" })}
            </span>
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div className={styles.cards} variants={staggerContainer}>
          {/* Card 1 — White */}
          <motion.div className={styles.card1} variants={staggerItem}>
            <div className={styles.card1__border} />
            <div className={styles.card1__image}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/company/focus-card1.png"
                alt=""
                className={styles.card1__img}
              />
            </div>
            <div className={styles.card1__text}>
              <h3 className={styles.card_title}>
                {t("focusCard1TitleNew", {
                  fallback: "Verified planning before development begins",
                })}
              </h3>
            </div>
          </motion.div>

          {/* Card 2 — Grey */}
          <motion.div className={styles.card2} variants={staggerItem}>
            <h3 className={styles.card_title}>
              {t("focusCard2TitleNew", {
                fallback: "Step-by-step feedback during key project stages",
              })}
            </h3>
            <div className={styles.card2__corner} />
            <div className={styles.card2__dots} />
          </motion.div>

          {/* Card 3 — Dark */}
          <motion.div className={styles.card3} variants={staggerItem}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/company/focus-card3.png"
              alt=""
              className={styles.card3__img}
            />
            <div className={styles.card3__content}>
              <h3 className={`${styles.card_title} ${styles.card_title_white}`}>
                {t("focusCard3TitleNew", {
                  fallback:
                    "Optimized launch with hosting configuration and monitoring",
                })}
              </h3>
            </div>
            <div className={styles.card3__line_top} />
            <div className={styles.card3__line_bottom} />
            <div className={styles.card3__line_left} />
            <div className={styles.card3__line_right} />
          </motion.div>

          {/* Card 4 — Yellow */}
          <motion.div className={styles.card4} variants={staggerItem}>
            <div className={styles.card4__border} />
            <div className={styles.card4__dots} />
            <div className={styles.card4__text}>
              <h3 className={styles.card_title}>
                {t("focusCard4TitleNew", {
                  fallback:
                    "Security measures integrated into infrastructure and maintenance",
                })}
              </h3>
            </div>
            <div className={styles.card4__image}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/company/focus-card4.png"
                alt=""
                className={styles.card4__img}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
