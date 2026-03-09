"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { HomeRequestForm } from "@/features/contact-form/ui/HomeRequestForm";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./HomeRequest.module.scss";

export const HomeRequest = () => {
  const t = useTranslations("HomeRequest");

  return (
    <motion.section
      className={styles.home_request}
      id="home-form"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/request-bg.png"
        alt=""
        aria-hidden="true"
        className={styles.home_request__bg}
      />

      {/* Category label top-right */}
      <motion.div
        className={styles.home_request__category}
        variants={staggerItem}
      >
        <div className={styles.home_request__corner} />
        <span>{t("category", { fallback: "Contact us" })}</span>
      </motion.div>

      <div className={styles.home_request__container}>
        {/* Title */}
        <motion.h2
          className={styles.home_request__title}
          variants={staggerItem}
        >
          {t("title", {
            fallback: "Let’s bring your vision to life",
          })}
        </motion.h2>

        {/* Form row */}
        <motion.div
          className={styles.home_request__row}
          variants={staggerItem}
        >
          {/* Left: description */}
          <div className={styles.home_request__left}>
            <p className={styles.home_request__desc}>
              {t("description", {
                fallback:
                  "We’re here to make sure you can confidently trust us with your website development, hosting, and support. Reach out! Our team will respond as soon as possible.",
              })}
            </p>
            <p className={styles.home_request__team}>
              {t("team", { fallback: "Insigmark Team" })}
            </p>
          </div>

          {/* Right: form */}
          <div className={styles.home_request__right}>
            <HomeRequestForm />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
