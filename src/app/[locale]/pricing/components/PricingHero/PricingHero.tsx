"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUpLyniq } from "@/shared/lib/helpers/animations";

import styles from "./PricingHero.module.scss";

export const PricingHero = () => {
  const t = useTranslations("pricing");

  return (
    <section className={styles.pricing_hero}>
      <div className={styles.pricing_hero__container}>
        <motion.h1
          className={styles.pricing_hero__title}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          {t("heroTitle", { fallback: "Pricing Approach" })}
        </motion.h1>
      </div>
    </section>
  );
};
