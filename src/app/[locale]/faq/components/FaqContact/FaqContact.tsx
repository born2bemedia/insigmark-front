"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { FaqRequestForm } from "@/features/contact-form/ui/FaqRequestForm";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./FaqContact.module.scss";

export const FaqContact = () => {
  const t = useTranslations("faq");

  return (
    <motion.section
      className={styles.faq_contact}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/faq/contact-bg.png"
        alt=""
        aria-hidden="true"
        className={styles.faq_contact__bg}
      />
      <div className={styles.faq_contact__overlay} aria-hidden="true" />

      <div className={styles.faq_contact__content}>
        <div className={styles.faq_contact__heading}>
          <motion.h2
            className={styles.faq_contact__title}
            variants={staggerItem}
          >
            {t("contactTitle", {
              fallback: "Still Have Questions?",
            })}
          </motion.h2>

          <motion.p
            className={styles.faq_contact__desc}
            variants={staggerItem}
          >
            {t("contactDesc", {
              fallback:
                "If you didn't find the answer you were looking for, send us your request. Our team will review it and get back to you shortly.",
            })}
          </motion.p>
        </div>

        <motion.div variants={staggerItem}>
          <FaqRequestForm />
        </motion.div>
      </div>
    </motion.section>
  );
};
