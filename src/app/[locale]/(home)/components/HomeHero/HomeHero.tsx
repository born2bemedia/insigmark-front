"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUpLyniq } from "@/shared/lib/helpers/animations";

import styles from "./HomeHero.module.scss";

export const HomeHero = () => {
  const t = useTranslations("homeHero");

  return (
    <section className={styles.home_hero}>
      <div className="container">
        <div className={styles.home_hero__content}>
          <motion.div
            className={styles.home_hero__top}
            initial="hidden"
            animate="visible"
            variants={fadeInUpLyniq}
          >
            <h1 className={styles.home_hero__title_top}>
              {t("title_top", { fallback: "Where articles" })}
            </h1>
            <p className={styles.home_hero__subtitle_top}>
              {t("subtitle", {
                fallback:
                  "We provide individuals with complete web solutions — from custom development to reliable hosting, everything handled for you so your website works seamlessly from start to finish.",
              })}
            </p>
          </motion.div>

          <motion.div
            className={styles.home_hero__bottom}
            initial="hidden"
            animate="visible"
            variants={fadeInUpLyniq}
            transition={{ delay: 0.25 }}
          >
            <h2 className={styles.home_hero__title_bottom}>
              {t("title_bottom", { fallback: "Go Live" })}
            </h2>
            <ul className={styles.home_hero__list}>
              <li>{t("list1", { fallback: "Web Development" })}</li>
              <li>{t("list2", { fallback: "Hosting Solutions" })}</li>
              <li>{t("list3", { fallback: "Maintenance Services" })}</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
