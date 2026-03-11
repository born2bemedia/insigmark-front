"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUpLyniq } from "@/shared/lib/helpers/animations";

import styles from "./SamHero.module.scss";

export const SamHero = () => {
  const t = useTranslations("sam");

  return (
    <section className={styles.sam_hero}>
      <div className={styles.sam_hero__container}>
        <motion.h1
          className={styles.sam_hero__title}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          {t("heroTitle", { fallback: "Security, Audit & Maintenance" })}
        </motion.h1>
        <motion.p
          className={styles.sam_hero__subtitle}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          {t("heroSubtitle", {
            fallback:
              "Keeping your website secure, reliable, and performing at its best.",
          })}
        </motion.p>
      </div>
      <div className={styles.sam_hero__image_wrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hosting-solutions/hero-bg.png"
          alt=""
          className={styles.sam_hero__image}
        />
      </div>
    </section>
  );
};
