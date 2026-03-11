"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { WEBSITE_EMAIL, WEBSITE_PHONE, WEBSITE_REGISTERED_ADDRESS } from "@/shared/lib/constants/constants";
import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./CompanyInfo.module.scss";

import { Link } from "@/i18n/navigation";

const ARROW_ICON_DARK = (
  <svg width="14" height="19" viewBox="0 0 14.3756 18.6879" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1648 14.1648L9.85227 18.4773C9.7174 18.6121 9.53448 18.6879 9.34375 18.6879C9.15302 18.6879 8.9701 18.6121 8.83523 18.4773C8.70037 18.3424 8.6246 18.1595 8.6246 17.9688C8.6246 17.778 8.70037 17.5951 8.83523 17.4602L11.9214 14.375H0.71875C0.528126 14.375 0.345309 14.2993 0.210517 14.1645C0.0757254 14.0297 0 13.8469 0 13.6562V0.71875C0 0.528126 0.0757254 0.345309 0.210517 0.210517C0.345309 0.0757252 0.528126 0 0.71875 0C0.909374 0 1.09219 0.0757252 1.22698 0.210517C1.36177 0.345309 1.4375 0.528126 1.4375 0.71875V12.9375H11.9214L8.83523 9.85227C8.70037 9.7174 8.6246 9.53448 8.6246 9.34375C8.6246 9.15302 8.70037 8.9701 8.83523 8.83523C8.9701 8.70037 9.15302 8.6246 9.34375 8.6246C9.53448 8.6246 9.7174 8.70037 9.85227 8.83523L14.1648 13.1477C14.2316 13.2145 14.2846 13.2938 14.3208 13.381C14.3569 13.4683 14.3756 13.5618 14.3756 13.6562C14.3756 13.7507 14.3569 13.8442 14.3208 13.9315C14.2846 14.0187 14.2316 14.098 14.1648 14.1648Z" fill="#023D65" />
  </svg>
);

const ARROW_ICON_WHITE = (
  <svg width="14" height="19" viewBox="0 0 14.3756 18.6879" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1648 14.1648L9.85227 18.4773C9.7174 18.6121 9.53448 18.6879 9.34375 18.6879C9.15302 18.6879 8.9701 18.6121 8.83523 18.4773C8.70037 18.3424 8.6246 18.1595 8.6246 17.9688C8.6246 17.778 8.70037 17.5951 8.83523 17.4602L11.9214 14.375H0.71875C0.528126 14.375 0.345309 14.2993 0.210517 14.1645C0.0757254 14.0297 0 13.8469 0 13.6562V0.71875C0 0.528126 0.0757254 0.345309 0.210517 0.210517C0.345309 0.0757252 0.528126 0 0.71875 0C0.909374 0 1.09219 0.0757252 1.22698 0.210517C1.36177 0.345309 1.4375 0.528126 1.4375 0.71875V12.9375H11.9214L8.83523 9.85227C8.70037 9.7174 8.6246 9.53448 8.6246 9.34375C8.6246 9.15302 8.70037 8.9701 8.83523 8.83523C8.9701 8.70037 9.15302 8.6246 9.34375 8.6246C9.53448 8.6246 9.7174 8.70037 9.85227 8.83523L14.1648 13.1477C14.2316 13.2145 14.2846 13.2938 14.3208 13.381C14.3569 13.4683 14.3756 13.5618 14.3756 13.6562C14.3756 13.7507 14.3569 13.8442 14.3208 13.9315C14.2846 14.0187 14.2316 14.098 14.1648 14.1648Z" fill="#FFFFFF" />
  </svg>
);

export const CompanyInfo = () => {
  const t = useTranslations("company");

  return (
    <motion.section
      className={styles.company_info}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.company_info__container}>
        <motion.div className={styles.company_info__grid} variants={staggerItem}>
          <div className={styles.company_info__label}>
            <span className={styles.company_info__label_icon}>{ARROW_ICON_DARK}</span>
            <span className={styles.company_info__label_text}>
              {t("infoLabel", { fallback: "Company Information" })}
            </span>
          </div>

          <div className={styles.company_info__content}>
            <div className={styles.company_info__heading}>
              <h2 className={styles.company_info__title}>
                {t("infoTitle", { fallback: "Let's Build Something Reliable" })}
              </h2>
              <p className={styles.company_info__desc}>
                {t("infoDesc", {
                  fallback:
                    "If you're ready to launch a website or improve an existing one, tell us what you're building. We'll review your request and reply with the next steps.",
                })}
              </p>
            </div>

            <div className={styles.company_info__card}>
              <h3 className={styles.company_info__card_name}>Insigmark Sp. z o.o.</h3>

              <div className={styles.company_info__card_details}>
                <div className={styles.company_info__card_detail}>
                  <p className={styles.company_info__card_detail_label}>
                    {t("infoEmail", { fallback: "Email" })}:
                  </p>
                  <p className={styles.company_info__card_detail_value}>
                    <a href={`mailto:${WEBSITE_EMAIL}`} className={styles.company_info__card_detail_link}>
                      {WEBSITE_EMAIL}
                    </a>
                  </p>
                </div>
                <div className={styles.company_info__card_detail}>
                  <p className={styles.company_info__card_detail_label}>
                    {t("infoPhone", { fallback: "Phone" })}:
                  </p>
                  <p className={styles.company_info__card_detail_value}>
                    <a href={`tel:${WEBSITE_PHONE}`} className={styles.company_info__card_detail_link}>
                      {WEBSITE_PHONE}
                    </a>
                  </p>
                </div>
                <div className={styles.company_info__card_detail}>
                  <p className={styles.company_info__card_detail_label}>
                    {t("infoRegistered", { fallback: "Registered address" })}:
                  </p>
                  <p className={styles.company_info__card_detail_value}>
                      {WEBSITE_REGISTERED_ADDRESS}
                  </p>
                </div>
                <div className={styles.company_info__card_detail}>
                  <p className={styles.company_info__card_detail_label}>
                    {t("infoOffice", { fallback: "Office address" })}:
                  </p>
                  <p className={styles.company_info__card_detail_value}>—</p>
                </div>
              </div>

              <Link href="/connect" className={styles.company_info__card_link}>
                <span className={styles.company_info__card_link_icon}>{ARROW_ICON_WHITE}</span>
                <span>{t("infoContactLink", { fallback: "Request a proposal" })}</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
