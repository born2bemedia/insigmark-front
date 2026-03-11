"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { HomeRequestForm } from "@/features/contact-form/ui/HomeRequestForm";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./PricingRequest.module.scss";

export const PricingRequest = () => {
  const t = useTranslations("pricing");

  return (
    <motion.section
      className={styles.pricing_request}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/request-bg.png"
        alt=""
        aria-hidden="true"
        className={styles.pricing_request__bg}
      />

      <div className={styles.pricing_request__container}>
        <motion.h2
          className={styles.pricing_request__title}
          variants={staggerItem}
        >
          {t("requestTitle", {
            fallback: "Let's bring your vision to life",
          })}
        </motion.h2>

        <motion.div
          className={styles.pricing_request__row}
          variants={staggerItem}
        >
          <div className={styles.pricing_request__left}>
            <p className={styles.pricing_request__desc}>
              {t("requestDesc", {
                fallback:
                  "We're here to make sure you can confidently trust us with your website development, hosting, and support. Reach out! Our team will respond as soon as possible.",
              })}
            </p>
            <p className={styles.pricing_request__team}>
              {t("requestTeam", { fallback: "Insigmark Team" })}
            </p>
          </div>

          <div className={styles.pricing_request__right}>
            <HomeRequestForm />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
