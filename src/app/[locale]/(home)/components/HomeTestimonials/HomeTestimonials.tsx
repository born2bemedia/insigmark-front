"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./HomeTestimonials.module.scss";

export const HomeTestimonials = () => {
  const t = useTranslations("homeTestimonials");

  return (
    <motion.section
      className={styles.home_testimonials}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.home_testimonials__container}>
        {/* Column 1: White with title */}
        <motion.div
          className={styles.home_testimonials__col1}
          variants={staggerItem}
        >
          <div className={styles.home_testimonials__col1_top}>
            <div className={styles.home_testimonials__col1_border} />
            <div className={styles.home_testimonials__col1_corner} />
            <h2 className={styles.home_testimonials__col1_title}>
              {t("col1Title", { fallback: "How We Drive\nSuccess" })}
            </h2>
          </div>
          <p className={styles.home_testimonials__col1_desc}>
            {t("col1Desc", {
              fallback: "Our approach is shaped by global industry standards.",
            })}
          </p>
        </motion.div>

        {/* Column 2: Dark with photo */}
        <motion.div
          className={styles.home_testimonials__col2}
          variants={staggerItem}
        >
          <img
            src="/images/home/testimonials-photo.jpg"
            alt=""
            className={styles.home_testimonials__col2_photo}
          />
          <div className={styles.home_testimonials__col2_gradient} />
          <div className={styles.home_testimonials__col2_content}>
            <div className={styles.home_testimonials__col2_name}>
              <div className={styles.home_testimonials__col2_border} />
              <span className={styles.home_testimonials__item_title}>
                {t("col2Title", { fallback: "Verified from the Start" })}
              </span>
              <p className={styles.home_testimonials__item_desc}>
                {t("col2Desc", {
                  fallback:
                    "We test every idea against real-world needs and user expectations before building anything, so your website works as intended from day one.",
                })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Column 3: Dark with dot pattern */}
        <motion.div
          className={styles.home_testimonials__col3}
          variants={staggerItem}
        >
          <div className={styles.home_testimonials__col3_content}>
            <div className={styles.home_testimonials__col3_border} />
            <span className={styles.home_testimonials__item_title}>
              {t("col3Title", { fallback: "Step-by-Step Feedback" })}
            </span>
            <p className={styles.home_testimonials__item_desc}>
              {t("col3Desc", {
                fallback:
                  "You review prototypes and drafts throughout the process, ensuring the site matches your vision at every stage.",
              })}
            </p>
          </div>
        </motion.div>

        {/* Column 4: Light grey with robot image */}
        <motion.div
          className={styles.home_testimonials__col4}
          variants={staggerItem}
        >
          <img
            src="/images/home/testimonials-robot.png"
            alt=""
            className={styles.home_testimonials__col4_image}
          />
          <div className={styles.home_testimonials__col4_content}>
            <div className={styles.home_testimonials__col4_border} />
            <span className={styles.home_testimonials__item_title_dark}>
              {t("col4Title", { fallback: "Optimized Launch" })}
            </span>
            <p className={styles.home_testimonials__item_desc_dark}>
              {t("col4Desc", {
                fallback:
                  "We make sure your website loads fast, stays online, and is protected, so it's ready for visitors the moment it goes live.",
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
