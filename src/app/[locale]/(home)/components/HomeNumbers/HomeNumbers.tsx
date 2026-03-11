"use client";

import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useFormsPopup } from "@/features/forms";

import { fadeInUpLyniq, staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./HomeNumbers.module.scss";


const DURATION = 1000;
const EASING = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

type StatConfig = {
  end: number;
  suffix: string;
  decimals?: number;
};

const STAT_CONFIGS: StatConfig[] = [
  { end: 1, suffix: "+ Tb" },
  { end: 10, suffix: "+" },
  { end: 12, suffix: " days" },
  { end: 3.5, suffix: "K+", decimals: 1 },
];

function useCountUp(config: StatConfig) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        setHasAnimated(true);

        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / DURATION, 1);
          const eased = EASING(progress);
          const value = config.end * eased;

          setDisplayValue(value);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplayValue(config.end);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [config.end, config.decimals, config.suffix, hasAnimated]);

  const num =
    config.decimals !== undefined
      ? displayValue.toFixed(config.decimals)
      : Math.floor(displayValue).toString();

  const suffix =
    config.suffix === " days"
      ? Math.floor(displayValue) === 1
        ? " day"
        : " days"
      : config.suffix;

  return { ref, display: `${num}${suffix}` };
}

function CountUpValue({ config }: { config: StatConfig }) {
  const { ref, display } = useCountUp(config);
  return (
    <div ref={ref} className={styles.home_numbers__value}>
      {display}
    </div>
  );
}

export const HomeNumbers = () => {
  const t = useTranslations("homeNumbers");
  const { openCallRequest } = useFormsPopup();

  const STATS = [
    {
      config: STAT_CONFIGS[0],
      titleKey: t("stat1Title", { fallback: "Websites launched" }),
      descKey: t("stat1Desc", { fallback: "Helping brands make their mark online." }),
    },
    {
      config: STAT_CONFIGS[1],
      titleKey: t("stat2Title", { fallback: "Users reached" }),
      descKey: t("stat2Desc", { fallback: "Our designs engage millions globally." }),
    },
    {
      config: STAT_CONFIGS[2],
      titleKey: t("stat3Title", { fallback: "Client satisfaction rate" }),
      descKey: t("stat3Desc", { fallback: "We build long-term partnerships through proven results." }),
    },
    {
      config: STAT_CONFIGS[3],
      titleKey: t("stat4Title", { fallback: "Years of expertise" }),
      descKey: t("stat4Desc", { fallback: "Decades of experience in delivering impactful digital solutions." }),
    },
  ];

  return (
    <motion.section
      className={styles.home_numbers}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className={styles.home_numbers__container}>
        <motion.div
          className={styles.home_numbers__header}
          variants={staggerItem}
        >
          <button className={styles.home_numbers__link} onClick={() => {
            openCallRequest();
          }}>
            <span className={styles.home_numbers__link_icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
              >
                <path
                  d="M19.9148 16.321L15.6023 20.6335C15.4674 20.7684 15.2845 20.8442 15.0938 20.8442C14.903 20.8442 14.7201 20.7684 14.5852 20.6335C14.4504 20.4986 14.3746 20.3157 14.3746 20.125C14.3746 19.9343 14.4504 19.7514 14.5852 19.6165L17.6714 16.5312H6.46875C6.27813 16.5312 6.09531 16.4555 5.96052 16.3207C5.82573 16.1859 5.75 16.0031 5.75 15.8125V2.875C5.75 2.68438 5.82573 2.50156 5.96052 2.36677C6.09531 2.23198 6.27813 2.15625 6.46875 2.15625C6.65937 2.15625 6.84219 2.23198 6.97698 2.36677C7.11177 2.50156 7.1875 2.68438 7.1875 2.875V15.0938H17.6714L14.5852 12.0085C14.4504 11.8736 14.3746 11.6907 14.3746 11.5C14.3746 11.3093 14.4504 11.1264 14.5852 10.9915C14.7201 10.8566 14.903 10.7809 15.0938 10.7809C15.2845 10.7809 15.4674 10.8566 15.6023 10.9915L19.9148 15.304C19.9816 15.3707 20.0346 15.45 20.0708 15.5373C20.1069 15.6245 20.1256 15.718 20.1256 15.8125C20.1256 15.907 20.1069 16.0005 20.0708 16.0877C20.0346 16.175 19.9816 16.2543 19.9148 16.321Z"
                  fill="#023D65"
                />
              </svg>
            </span>
            <span>{t("letsTalk", { fallback: "Let's talk" })}</span>
          </button>
          <h2 className={styles.home_numbers__heading}>
            {t("heading1", { fallback: "Our impact is measurable." })} <br />
            {t("heading2", { fallback: "Discover the results we've created." })}
          </h2>
        </motion.div>

        <motion.div
          className={styles.home_numbers__grid}
          variants={staggerContainer}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.home_numbers__card}
              variants={staggerItem}
            >
              <CountUpValue config={stat.config} />
              <div className={styles.home_numbers__text}>
                <h3 className={styles.home_numbers__title}>
                  {stat.titleKey}
                </h3>
                <p className={styles.home_numbers__desc}>{stat.descKey}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};
