"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./ContactReview.module.scss";

const ARROW_ICON = (
  <svg
    width="14"
    height="19"
    viewBox="0 0 14.3756 18.6879"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.1648 14.1648L9.85227 18.4773C9.7174 18.6121 9.53448 18.6879 9.34375 18.6879C9.15302 18.6879 8.9701 18.6121 8.83523 18.4773C8.70037 18.3424 8.6246 18.1595 8.6246 17.9688C8.6246 17.778 8.70037 17.5951 8.83523 17.4602L11.9214 14.375H0.71875C0.528126 14.375 0.345309 14.2993 0.210517 14.1645C0.0757254 14.0297 0 13.8469 0 13.6562V0.71875C0 0.528126 0.0757254 0.345309 0.210517 0.210517C0.345309 0.0757252 0.528126 0 0.71875 0C0.909374 0 1.09219 0.0757252 1.22698 0.210517C1.36177 0.345309 1.4375 0.528126 1.4375 0.71875V12.9375H11.9214L8.83523 9.85227C8.70037 9.7174 8.6246 9.53448 8.6246 9.34375C8.6246 9.15302 8.70037 8.9701 8.83523 8.83523C8.9701 8.70037 9.15302 8.6246 9.34375 8.6246C9.53448 8.6246 9.7174 8.70037 9.85227 8.83523L14.1648 13.1477C14.2316 13.2145 14.2846 13.2938 14.3208 13.381C14.3569 13.4683 14.3756 13.5618 14.3756 13.6562C14.3756 13.7507 14.3569 13.8442 14.3208 13.9315C14.2846 14.0187 14.2316 14.098 14.1648 14.1648Z"
      fill="#D2FF37"
    />
  </svg>
);

export const ContactReview = () => {
  const t = useTranslations("contactPage");

  const reviewItems = [
    { num: "01", text: t("reviewItem1", { fallback: "Reviewing your project idea and technical requirements" }) },
    { num: "02", text: t("reviewItem2", { fallback: "Identifying the most suitable development approach" }) },
    { num: "03", text: t("reviewItem3", { fallback: "Evaluating hosting and infrastructure needs" }) },
    { num: "04", text: t("reviewItem4", { fallback: "Preparing an initial proposal or consultation response" }) },
  ];

  return (
    <motion.section
      className={styles.review}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.review__container}>
        <motion.div
          className={styles.review__left}
          variants={staggerItem}
        >
          <div className={styles.review__heading}>
            <h2 className={styles.review__title}>
              {t("reviewTitle", { fallback: "What Happens After You Send a Request" })}
            </h2>
            <div className={styles.review__desc_block}>
              <p className={styles.review__subtitle}>
                {t("reviewDescription", {
                  fallback:
                    "After receiving your message, our team reviews the information to understand the scope of your project.",
                })}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.review__right}
          variants={staggerItem}
        >
          <p className={styles.review__right_label}>
            {t("reviewLabel", {
              fallback: "Our review typically includes:",
            })}
          </p>
          <div className={styles.review__grid}>
            {reviewItems.map((item) => (
              <div key={item.num} className={styles.review__card}>
                <div className={styles.review__card_border} />
                <div className={styles.review__card_number}>{item.num}</div>
                <p className={styles.review__card_text}>{item.text}</p>
                <div className={styles.review__card_corner} />
              </div>
            ))}
          </div>
          <p className={styles.review__note}>
            {t("reviewNote", {
              fallback:
                "Once this evaluation is complete, we will contact you to discuss the next stage of the project.",
            })}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
