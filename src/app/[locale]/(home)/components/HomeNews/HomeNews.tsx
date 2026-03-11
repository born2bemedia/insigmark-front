"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./HomeNews.module.scss";

import { Link } from "@/i18n/navigation";

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

export const HomeNews = () => {
  const t = useTranslations("homeNews");

  const ARTICLES = [
    {
      img: "/images/home/news-1.jpg",
      title: t("article1Title", {
        fallback:
          "WordPress vs Custom Development: Which Is Right for Your Website?",
      }),
      href: "#",
      large: true,
    },
    {
      img: "/images/home/news-2.jpg",
      title: t("article2Title", {
        fallback: "How to Secure Your Website from Common Cyber Threats",
      }),
      href: "#",
      large: false,
    },
    {
      img: "/images/home/news-3.jpg",
      title: t("article3Title", {
        fallback:
          "Scaling Your Website: When to Move from Shared Hosting to VPS",
      }),
      href: "#",
      large: false,
    },
  ];

  return (
    <motion.section
      className={styles.home_news}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.home_news__container}>
        {/* Heading row */}
        <motion.div
          className={styles.home_news__heading}
          variants={staggerItem}
        >
          <div className={styles.home_news__heading_left}>
            <h2 className={styles.home_news__title}>
              {t("title", { fallback: "Our News" })}
            </h2>
          </div>
          <div className={styles.home_news__heading_right}>
            <p className={styles.home_news__subtitle}>
              {t("subtitle", {
                fallback:
                  "Stay updated on our latest services, special offers, and tips to make your website work smarter and faster.",
              })}
            </p>
            <Link href="/contact" className={styles.home_news__link}>
              <span className={styles.home_news__link_icon}>{ARROW_ICON}</span>
              <span>{t("scheduleCall", { fallback: "Schedule a call" })}</span>
            </Link>
          </div>
        </motion.div>

        {/* Articles grid */}
        <motion.div
          className={styles.home_news__articles}
          variants={staggerContainer}
        >
          {/* Large card (left) */}
          <motion.div variants={staggerItem}>
          <Link
            href={ARTICLES[0].href}
            className={`${styles.home_news__card} ${styles["home_news__card--large"]}`}
          >
            <div className={styles.home_news__card_corner}>{CORNER_ICON}</div>
            <div className={styles.home_news__card_image}>
              <img src={ARTICLES[0].img} alt="" />
            </div>
            <div className={styles.home_news__card_body}>
              <h3 className={styles.home_news__card_title}>
                {ARTICLES[0].title}
              </h3>
              <span className={styles.home_news__card_btn}>
                {t("readMore", { fallback: "Read more" })}
              </span>
            </div>
          </Link>
          </motion.div>

          {/* Two smaller cards (right) */}
          <motion.div
            className={styles.home_news__cards_right}
            variants={staggerContainer}
          >
            {ARTICLES.slice(1).map((article, i) => (
              <motion.div key={i} variants={staggerItem}>
              <Link
                href={article.href}
                className={`${styles.home_news__card} ${styles["home_news__card--small"]}`}
              >
                <div className={styles.home_news__card_corner}>
                  {CORNER_ICON}
                </div>
                <div className={styles.home_news__card_image}>
                  <img src={article.img} alt="" />
                </div>
                <div
                  className={`${styles.home_news__card_body} ${styles["home_news__card_body--small"]}`}
                >
                  <h3 className={styles.home_news__card_title}>
                    {article.title}
                  </h3>
                  <span className={styles.home_news__card_btn}>
                    {t("readMore", { fallback: "Read more" })}
                  </span>
                </div>
              </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
