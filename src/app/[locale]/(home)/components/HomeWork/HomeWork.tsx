"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  fadeInUpLyniq,
  staggerContainer,
  staggerItem,
} from "@/shared/lib/helpers/animations";

import styles from "./HomeWork.module.scss";

import { Link } from "@/i18n/navigation";

export const HomeWork = () => {
  const t = useTranslations("homeWork");

  const CASES = [
    {
      id: "1",
      image: "/images/home/work1.png",
      titleKey: "case1Title",
      titleFallback: t("case1Title", {
        fallback: "Next-Gen Web Development 2026",
      }),
      descKey: "case1Desc",
      descFallback: t("case1Desc", {
        fallback:
          "Discover the trends transforming websites into faster, smarter, and more dynamic digital experiences.",
      }),
      link: "/blog//blog/2026-web-development-trends-that-will-shape-the-next-generation-of-websites",
    },
    {
      id: "2",
      image: "/images/home/work2.png",
      titleKey: "case2Title",
      titleFallback: t("case2Title", {
        fallback: "Boost Your Google Scores with Core Web Vitals",
      }),
      descKey: "case2Desc",
      descFallback: t("case2Desc", {
        fallback:
          "Optimize loading speed, layout stability, and responsiveness to enhance user experience and search visibility.",
      }),
      link: "/blog/how-fast-hosting-impacts-website-performance",
    },
    {
      id: "3",
      image: "/images/home/work3.png",
      titleKey: "case3Title",
      titleFallback: t("case3Title", {
        fallback: "Boost Website Speed with Fast Hosting",
      }),
      descKey: "case3Desc",
      descFallback: t("case3Desc", {
        fallback:
          "Learn how optimized hosting and caching directly improve page load, user experience, and search visibility.",
      }),
      link: "/blog/core-web-vitals-explained-why-google-performance-metrics-matter",
    },
  ] as const;

  return (
    <motion.section
      className={styles.home_work}
    >
      <div className={styles.home_work__container}>
        {/* Sticky heading */}
        <motion.div
          className={styles.home_work__heading}
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={styles.home_work__top}>
            <div className={styles.home_work__category}>
              <div className={styles.home_work__corner} />
              <span>{t("category", { fallback: "OUR VISION" })}</span>
            </div>
            <h2 className={styles.home_work__title}>
              {t("title1", { fallback: "Market trends," })}
              <br />
              {t("title2", { fallback: "expert analysis" })}
            </h2>
          </div>
          <span className={styles.home_work__year}>2K26</span>
        </motion.div>

        {/* Large card */}
        <motion.div
          className={styles.home_work__main}
          variants={staggerItem}  
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href={CASES[0].link} className={styles.home_work__card_large}>
            <div className={styles.home_work__corner} />
            <div className={styles.home_work__img_wrap}>
              <Image
                src={CASES[0].image}
                alt=""
                fill
                className={styles.home_work__img}
                sizes="(max-width: 768px) 100vw, 684px"
              />
            </div>
            <div className={styles.home_work__card_text}>
              <h3 className={styles.home_work__card_title}>
                {t(CASES[0].titleKey, { fallback: CASES[0].titleFallback })}
              </h3>
              <p className={styles.home_work__card_desc}>
                {t(CASES[0].descKey, { fallback: CASES[0].descFallback })}
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Two-column grid */}
        <motion.div
          className={styles.home_work__grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
              >
          <motion.div variants={staggerItem} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <Link href={CASES[1].link} className={styles.home_work__card}>
              <div className={styles.home_work__corner} />
              <div className={styles.home_work__img_wrap}>
                <Image
                  src={CASES[1].image}
                  alt=""
                  fill
                  className={styles.home_work__img}
                  sizes="(max-width: 768px) 100vw, 675px"
                />
              </div>
              <div className={styles.home_work__card_text}>
                <h3 className={styles.home_work__card_title}>
                  {t(CASES[1].titleKey, { fallback: CASES[1].titleFallback })}
                </h3>
                <p className={styles.home_work__card_desc}>
                  {t(CASES[1].descKey, { fallback: CASES[1].descFallback })}
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={staggerItem} viewport={{ once: true, amount: 0.1 }} initial="hidden" whileInView="visible">
          <Link href={CASES[2].link} className={styles.home_work__card}>
            <div className={styles.home_work__corner} />
            <div className={styles.home_work__img_wrap}>
              <Image
                src={CASES[2].image}
                alt=""
                fill
                className={styles.home_work__img}
                sizes="(max-width: 768px) 100vw, 393px"
              />
            </div>
            <div className={styles.home_work__card_text}>
              <h3 className={styles.home_work__card_title}>
                {t(CASES[2].titleKey, { fallback: CASES[2].titleFallback })}
              </h3>
              <p className={styles.home_work__card_desc}>
                {t(CASES[2].descKey, { fallback: CASES[2].descFallback })}
              </p>
            </div>
          </Link>
          </motion.div>
        </motion.div>

        {/* Footer: fade + "All reports" link */}
        <motion.div
          className={styles.home_work__footer}
          variants={staggerItem}
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
          >
          <div className={styles.home_work__fade} />
          <Link href="/blog" className={styles.home_work__link}>
            <span className={styles.home_work__link_icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="27"
                viewBox="0 0 32 27"
                fill="none"
              >
                <path
                  d="M31.1161 14.0543L19.3036 25.8668C19.0573 26.1131 18.7233 26.2515 18.375 26.2515C18.0267 26.2515 17.6927 26.1131 17.4464 25.8668C17.2001 25.6205 17.0618 25.2865 17.0618 24.9382C17.0618 24.5899 17.2001 24.2559 17.4464 24.0096L27.0195 14.4382H1.3125C0.964403 14.4382 0.630564 14.2999 0.384423 14.0538C0.138281 13.8077 0 13.4738 0 13.1257C0 12.7776 0.138281 12.4438 0.384423 12.1977C0.630564 11.9515 0.964403 11.8132 1.3125 11.8132H27.0195L17.4464 2.24182C17.2001 1.99555 17.0618 1.66152 17.0618 1.31323C17.0618 0.96494 17.2001 0.630914 17.4464 0.384636C17.6927 0.138358 18.0267 0 18.375 0C18.7233 0 19.0573 0.138358 19.3036 0.384636L31.1161 12.1971C31.2381 12.319 31.3349 12.4638 31.401 12.6231C31.467 12.7825 31.501 12.9532 31.501 13.1257C31.501 13.2982 31.467 13.469 31.401 13.6283C31.3349 13.7877 31.2381 13.9324 31.1161 14.0543Z"
                  fill="#0C0C0C"
                />
                <path
                  d="M31.1161 14.0543L19.3036 25.8668C19.0573 26.1131 18.7233 26.2515 18.375 26.2515C18.0267 26.2515 17.6927 26.1131 17.4464 25.8668C17.2001 25.6205 17.0618 25.2865 17.0618 24.9382C17.0618 24.5899 17.2001 24.2559 17.4464 24.0096L27.0195 14.4382H1.3125C0.964403 14.4382 0.630564 14.2999 0.384423 14.0538C0.138281 13.8077 0 13.4738 0 13.1257C0 12.7776 0.138281 12.4438 0.384423 12.1977C0.630564 11.9515 0.964403 11.8132 1.3125 11.8132H27.0195L17.4464 2.24182C17.2001 1.99555 17.0618 1.66152 17.0618 1.31323C17.0618 0.96494 17.2001 0.630914 17.4464 0.384636C17.6927 0.138358 18.0267 0 18.375 0C18.7233 0 19.0573 0.138358 19.3036 0.384636L31.1161 12.1971C31.2381 12.319 31.3349 12.4638 31.401 12.6231C31.467 12.7825 31.501 12.9532 31.501 13.1257C31.501 13.2982 31.467 13.469 31.401 13.6283C31.3349 13.7877 31.2381 13.9324 31.1161 14.0543Z"
                  fill="black"
                  fillOpacity="0.2"
                />
                <path
                  d="M31.1161 14.0543L19.3036 25.8668C19.0573 26.1131 18.7233 26.2515 18.375 26.2515C18.0267 26.2515 17.6927 26.1131 17.4464 25.8668C17.2001 25.6205 17.0618 25.2865 17.0618 24.9382C17.0618 24.5899 17.2001 24.2559 17.4464 24.0096L27.0195 14.4382H1.3125C0.964403 14.4382 0.630564 14.2999 0.384423 14.0538C0.138281 13.8077 0 13.4738 0 13.1257C0 12.7776 0.138281 12.4438 0.384423 12.1977C0.630564 11.9515 0.964403 11.8132 1.3125 11.8132H27.0195L17.4464 2.24182C17.2001 1.99555 17.0618 1.66152 17.0618 1.31323C17.0618 0.96494 17.2001 0.630914 17.4464 0.384636C17.6927 0.138358 18.0267 0 18.375 0C18.7233 0 19.0573 0.138358 19.3036 0.384636L31.1161 12.1971C31.2381 12.319 31.3349 12.4638 31.401 12.6231C31.467 12.7825 31.501 12.9532 31.501 13.1257C31.501 13.2982 31.467 13.469 31.401 13.6283C31.3349 13.7877 31.2381 13.9324 31.1161 14.0543Z"
                  fill="black"
                  fillOpacity="0.2"
                />
                <path
                  d="M31.1161 14.0543L19.3036 25.8668C19.0573 26.1131 18.7233 26.2515 18.375 26.2515C18.0267 26.2515 17.6927 26.1131 17.4464 25.8668C17.2001 25.6205 17.0618 25.2865 17.0618 24.9382C17.0618 24.5899 17.2001 24.2559 17.4464 24.0096L27.0195 14.4382H1.3125C0.964403 14.4382 0.630564 14.2999 0.384423 14.0538C0.138281 13.8077 0 13.4738 0 13.1257C0 12.7776 0.138281 12.4438 0.384423 12.1977C0.630564 11.9515 0.964403 11.8132 1.3125 11.8132H27.0195L17.4464 2.24182C17.2001 1.99555 17.0618 1.66152 17.0618 1.31323C17.0618 0.96494 17.2001 0.630914 17.4464 0.384636C17.6927 0.138358 18.0267 0 18.375 0C18.7233 0 19.0573 0.138358 19.3036 0.384636L31.1161 12.1971C31.2381 12.319 31.3349 12.4638 31.401 12.6231C31.467 12.7825 31.501 12.9532 31.501 13.1257C31.501 13.2982 31.467 13.469 31.401 13.6283C31.3349 13.7877 31.2381 13.9324 31.1161 14.0543Z"
                  fill="black"
                  fillOpacity="0.2"
                />
              </svg>
            </span>
            <span className={styles.home_work__link_text}>
              {t("allReports", { fallback: "All reports" })}
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
