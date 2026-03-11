"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./HomeFaq.module.scss";

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

const PLUS_ICON = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 1V17M1 9H17"
      stroke="#023D65"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MINUS_ICON = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 9H17"
      stroke="#023D65"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const HomeFaq = () => {
  const t = useTranslations("homeFaq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const FAQ_ITEMS = [
    {
      qKey: t("q1", {
        fallback:
          "How long does it take to get a website live?",
      }),
      aKey: t("a1", {
        fallback:
          "Typically between a few days for a simple site and a few weeks for more complex projects.",
      }),
    },
    {
      qKey: t("q2", {
        fallback:
          "Do I need to know coding to support my website?",
      }),
      aKey: t("a2", {
        fallback:
          "No coding is required. We provide full support, documentation, and guidance so you can manage content and updates easily.",
      }),
    },
    {
      qKey: t("q3", {
        fallback:
          "Will my website be secure and reliable?",
      }),
      aKey: t("a3", {
        fallback:
          "Yes — every site is hosted, optimized, and monitored to stay online safely.",
      }),
    },
    {
      qKey: t("q4", {
        fallback:
          "Can I make changes to my website later?",
      }),
      aKey: t("a4", {
        fallback:
          "Absolutely — we provide guidance and documentation so you can update content anytime.",
      }),
    },
    {
      qKey: t("q5", {
        fallback:
          "How much will it cost?",
      }),
      aKey: t("a5", {
        fallback:
          "Pricing is transparent and customizable based on your pages, features, and hosting needs.",
      }),
    },
  ];

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <motion.section
      className={styles.home_faq}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.home_faq__container}>
        {/* Left */}
        <motion.div
          className={styles.home_faq__left}
          variants={staggerItem}
        >
          <div className={styles.home_faq__heading}>
            <h2 className={styles.home_faq__title}>
              {t("title", { fallback: "FAQ" })}
            </h2>
            <p className={styles.home_faq__subtitle}>
              {t("subtitle", {
                fallback:
                  "Got questions? Find clear answers to everything about our process, services, and pricing.",
              })}
            </p>
          </div>
          <Link href="/faq" className={styles.home_faq__link}>
            <span className={styles.home_faq__link_icon}>{ARROW_ICON}</span>
            <span>{t("exploreAll", { fallback: "Explore all FAQ" })}</span>
          </Link>
        </motion.div>

        {/* Right: accordion */}
        <motion.div
          className={styles.home_faq__items}
          variants={staggerContainer}
        >
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className={styles.home_faq__item}
              variants={staggerItem}
            >
              <button
                type="button"
                className={styles.home_faq__item_header}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className={styles.home_faq__item_question}>
                  {item.qKey}
                </span>
                <span className={styles.home_faq__item_icon}>
                  {openIndex === i ? MINUS_ICON : PLUS_ICON}
                </span>
              </button>
              {openIndex === i && (
                <div className={styles.home_faq__item_answer}>
                  <p>{item.aKey}</p>
                </div>
              )}
              <div className={styles.home_faq__item_border} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
