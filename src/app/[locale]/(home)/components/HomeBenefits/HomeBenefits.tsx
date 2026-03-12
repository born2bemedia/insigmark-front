"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  fadeInUpLyniq,
  staggerContainer,
  staggerItem,
} from "@/shared/lib/helpers/animations";

import styles from "./HomeBenefits.module.scss";

export const HomeBenefits = () => {
  const t = useTranslations("homeBenefits");

  return (
    <motion.section className={styles.home_benefits}>
      <div className={styles.home_benefits__container}>
        <motion.div
          className={styles.home_benefits__heading}
          variants={staggerItem}
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
        >
          <h2 className={styles.home_benefits__title}>
            {t("title", { fallback: "Our Approach to Your articles" })}
          </h2>
          <p className={styles.home_benefits__subtitle}>
            {t("subtitle", {
              fallback:
                "A complete process for your articles: research, development, optimization, and hosting to make them accessible to the world.",
            })}
          </p>
        </motion.div>

        <motion.div className={styles.home_benefits__grid}>
          {/* Card 1 — White, image top */}
          <motion.div
            className={`${styles.home_benefits__card} ${styles["home_benefits__card--white"]}`}
            variants={staggerItem}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="visible"
          >
            <Image
              src="/images/home/research.png"
              alt=""
              className={styles.home_benefits__img}
              width={327}
              height={462}
            />
            <div className={styles.home_benefits__content}>
              <h3 className={styles.home_benefits__card_title}>
                {t("card1Title", { fallback: "Research & Alignment" })}
              </h3>
              <p className={styles.home_benefits__card_desc}>
                {t("card1Desc", {
                  fallback:
                    "Study the market, competitors, and user expectations while working closely with you to clarify goals, priorities, and success criteria before development begins.",
                })}
              </p>
            </div>
          </motion.div>

          {/* Card 2 — Grey, text only + corner + dots */}
          <motion.div
            className={`${styles.home_benefits__card} ${styles["home_benefits__card--grey"]}`}
            variants={staggerItem}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="visible"
          >
            <div className={styles.home_benefits__corner} />
            <div className={styles.home_benefits__dots} />
            <div className={styles.home_benefits__content}>
              <h3 className={styles.home_benefits__card_title}>
                {t("card2Title", { fallback: "Evolving Tech Stack" })}
              </h3>
              <p className={styles.home_benefits__card_desc}>
                {t("card2Desc", {
                  fallback:
                    "Continuously monitor new technologies, frameworks, and tools, integrating proven innovations that can bring measurable value to your project.",
                })}
              </p>
            </div>
          </motion.div>

          {/* Card 3 — Dark, background image + lines + centered text */}
          <motion.div
            className={`${styles.home_benefits__card} ${styles["home_benefits__card--dark"]}`}
            variants={staggerItem}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="visible"
          >
            <div className={styles.home_benefits__img_bg}>
              <Image
                src="/images/home/development.png"
                alt=""
                className={styles.home_benefits__img}
                width={327}
                height={446}
              />
            </div>
            <div className={styles.home_benefits__line_top} />
            <div className={styles.home_benefits__line_bottom} />
            <div className={styles.home_benefits__line_left} />
            <div className={styles.home_benefits__line_right} />
            <div className={styles.home_benefits__content}>
              <h3 className={styles.home_benefits__card_title}>
                {t("card3Title", { fallback: "Development & Hosting" })}
              </h3>
              <p className={styles.home_benefits__card_desc}>
                {t("card3Desc", {
                  fallback:
                    "Deliver a fully operational website and host it in a reliable environment, so you launch immediately without searching for additional providers.",
                })}
              </p>
            </div>
          </motion.div>

          {/* Card 4 — Yellow, text top + image bottom + dots */}
          <motion.div
            className={`${styles.home_benefits__card} ${styles["home_benefits__card--yellow"]}`}
            variants={staggerItem}
            viewport={{ once: true }}
            initial="hidden"
            whileInView="visible"
          >
            <div className={styles.home_benefits__dots} />
            <div className={styles.home_benefits__content}>
              <h3 className={styles.home_benefits__card_title}>
                {t("card4Title", { fallback: "Ongoing Support" })}
              </h3>
              <p className={styles.home_benefits__card_desc}>
                {t("card4Desc", {
                  fallback:
                    "Provide continuous assistance, updates, and guidance, plus practical instruction so you can confidently manage and grow your website over time.",
                })}
              </p>
            </div>
            <Image
              src="/images/home/ongoing.png"
              alt=""
              width={290}
              height={446}
              className={styles.home_benefits__img}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
