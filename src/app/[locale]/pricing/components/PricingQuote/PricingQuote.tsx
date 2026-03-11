"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./PricingQuote.module.scss";

const QUOTE_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="25"
    viewBox="0 0 40 25"
    fill="none"
  >
    <g clipPath="url(#clip0_272_1617)">
      <path
        d="M4.585 0H20L10.13 25H0L4.585 0ZM24.585 0H40L30.15 25H20L24.585 0Z"
        fill="#023D65"
      />
    </g>
    <defs>
      <clipPath id="clip0_272_1617">
        <rect width="40" height="25" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const PricingQuote = () => {
  const t = useTranslations("pricing");

  return (
    <motion.section
      className={styles.pricing_quote}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.pricing_quote__container}>
        <motion.div className={styles.pricing_quote__image_wrap} variants={staggerItem} initial="hidden" whileInView="visible" viewport={{ once: true }}>

          <Image
            src="/images/pricing/quote.png"
            alt=""
            width={332}
            height={741}
            className={styles.pricing_quote__image}
          />
        </motion.div>
        <motion.div
          className={styles.pricing_quote__content}
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Quote */}
          <div className={styles.pricing_quote__quote}>
            <div className={styles.pricing_quote__icon} aria-hidden>
              {QUOTE_ICON}
            </div>
            <p className={styles.pricing_quote__text}>
              {t("quoteText", {
                fallback:
                  "We like to keep it simple — you should always know what you're paying for and why. No surprises, no hidden fees.",
              })}
            </p>
          </div>

          {/* Description */}
          <p className={styles.pricing_quote__desc}>
            {t("quoteDesc", {
              fallback:
                "We break down website development, hosting, and support into meaningful components. Every feature, page, and optimization step is considered, so pricing is fair, predictable, and tailored to your project's needs.",
            })}
          </p>

          {/* Why It Matters */}
          <div className={styles.pricing_quote__matters}>
            <h3 className={styles.pricing_quote__matters_title}>
              {t("whyItMatters", { fallback: "Why It Matters" })}
            </h3>
            <p className={styles.pricing_quote__matters_desc}>
              {t("whyItMattersDesc", {
                fallback:
                  "Hidden fees or one-size-fits-all packages don't exist here. You pay only for what adds real value, with flexibility to adjust as your project evolves.",
              })}
            </p>
          </div>

          {/* Link */}
          <div className={styles.pricing_quote__link_row}>
            <span className={styles.pricing_quote__link}>
              {t("teamLink", { fallback: "The Insigmark team" })}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
