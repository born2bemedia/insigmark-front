"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./HomeProcess.module.scss";

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
      fill="#023D65"
    />
  </svg>
);

const CORNER_ICON = (
  <svg
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 0H9V9" stroke="#023D65" strokeWidth="2" fill="none" />
  </svg>
);

export const HomeProcess = () => {
  const t = useTranslations("homeProcess");
  const { openCallRequest } = useFormsPopup();
  const STEPS = [
    {
      num: "01",
      title: t("step1Title", { fallback: "Idea Discovery & Validation" }),
      desc: t("step1Desc", {
        fallback:
          "Refine and validate your concept through research and planning to ensure a solid foundation.",
      }),
    },
    {
      num: "02",
      title: t("step2Title", { fallback: "Prototyping & Approval" }),
      desc: t("step2Desc", {
        fallback:
          "Create wireframes and mockups for review and approval before development begins.",
      }),
    },
    {
      num: "03",
      title: t("step3Title", { fallback: "Coding & Development" }),
      desc: t("step3Desc", {
        fallback:
          "Build a fully functional website with interactive features, forms, and galleries.",
      }),
    },
    {
      num: "04",
      title: t("step4Title", { fallback: "Launch & Maintenance" }),
      desc: t("step4Desc", {
        fallback:
          "Deploy your website and host it securely, with ongoing updates, monitoring, and support.",
      }),
    },
  ];

  return (
    <motion.section
      className={styles.home_process}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.home_process__container}>
        {/* Left column */}
        <motion.div
          className={styles.home_process__left}
          variants={staggerItem}
        >
          <div className={styles.home_process__heading}>
            <h2 className={styles.home_process__title}>
              {t("title", { fallback: "Our process" })}
            </h2>
            <p className={styles.home_process__subtitle}>
              {t("subtitle", {
                fallback:
                  "Our four-step process guides your project from planning to live deployment, keeping you informed and supported at every stage.",
              })}
            </p>
          </div>
          <button
            className={styles.home_process__link}
            onClick={() => {
              openCallRequest();
            }}
          >
            <span className={styles.home_process__link_icon}>{ARROW_ICON}</span>
            <span>{t("scheduleCall", { fallback: "Schedule a call" })}</span>
          </button>
        </motion.div>

        {/* Right column: steps */}
        <motion.div
          className={styles.home_process__steps}
          variants={staggerContainer}
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.num}
              className={styles.home_process__step}
              variants={staggerItem}
            >
              <div className={styles.home_process__step_border} />
              <div className={styles.home_process__step_content}>
                <div className={styles.home_process__step_number}>
                  <span>{step.num}</span>
                </div>
                <div className={styles.home_process__step_text}>
                  <h3 className={styles.home_process__step_title}>
                    {step.title}
                  </h3>
                  <p className={styles.home_process__step_desc}>{step.desc}</p>
                </div>
              </div>
              <div className={styles.home_process__step_corner}>
                {CORNER_ICON}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
