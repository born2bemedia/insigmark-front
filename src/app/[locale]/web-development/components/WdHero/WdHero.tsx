"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUpLyniq } from "@/shared/lib/helpers/animations";

import styles from "./WdHero.module.scss";

export const WdHero = () => {
  const t = useTranslations("webDev");

  return (
    <section className={styles.wd_hero}>
      <div className={styles.wd_hero__container}>
        <motion.h1 className={styles.wd_hero__title} initial="hidden" animate="visible" variants={fadeInUpLyniq}>
          {t("heroTitle", { fallback: "Web Development" })}
        </motion.h1>
        <motion.p className={styles.wd_hero__subtitle} initial="hidden" animate="visible" variants={fadeInUpLyniq}>
          {t("heroSubtitle", {
            fallback:
              "We transform ideas into fully functional websites that are ready for the world.",
          })}
        </motion.p>
      </div>
      <div className={styles.wd_hero__image_wrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/web-development/hero-bg.png"
          alt=""
          className={styles.wd_hero__image}
        />
      </div>
    </section>
  );
};
