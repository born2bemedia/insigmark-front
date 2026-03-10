"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUpLyniq } from "@/shared/lib/helpers/animations";

import styles from "./HsHero.module.scss";

export const HsHero = () => {
  const t = useTranslations("hosting");

  return (
    <section className={styles.hs_hero}>
      <div className={styles.hs_hero__container}>
        <motion.h1
          className={styles.hs_hero__title}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          {t("heroTitle", { fallback: "Hosting Solutions" })}
        </motion.h1>
        <motion.p
          className={styles.hs_hero__subtitle}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          {t("heroSubtitle", {
            fallback:
              "Reliable hosting that keeps your website online, fast, and secure from day one.",
          })}
        </motion.p>
      </div>
      <div className={styles.hs_hero__image_wrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hosting-solutions/hero-bg.png"
          alt=""
          className={styles.hs_hero__image}
        />
      </div>
    </section>
  );
};
