"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { useTranslations } from "next-intl";

import styles from "./HomeTeam.module.scss";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

const AVATARS = [
  { src: "/images/home/team-avatar1.png", alt: "Team member" },
  { src: "/images/home/team-avatar2.png", alt: "Team member" },
  { src: "/images/home/team-avatar3.png", alt: "Team member" },
  { src: "/images/home/team-avatar4.png", alt: "Team member" },
];

export const HomeTeam = () => {
  const t = useTranslations("homeTeam");

  return (
    <motion.section
      className={styles.home_team}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {/* Background image */}
      <Image
        src="/images/home/team-bg.png"
        alt=""
        fill
        className={styles.home_team__bg}
        sizes="100vw"
        priority
      />
      {/* Gradient overlay */}
      <div className={styles.home_team__overlay} />

      <div className={styles.home_team__container}>
        {/* Top bar */}
        <motion.div
          className={styles.home_team__top}
          variants={staggerItem}
        >
          <span className={styles.home_team__wordmark}>Insigmark</span>

          {/* Stacked avatars + 20+ */}
          <div className={styles.home_team__avatars}>
            {AVATARS.map((avatar, i) => (
              <div
                key={i}
                className={styles.home_team__avatar}
                style={{ left: `${i * 30}px` }}
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt}
                  width={54}
                  height={54}
                  className={styles.home_team__avatar_img}
                />
              </div>
            ))}
            <div
              className={`${styles.home_team__avatar} ${styles["home_team__avatar--count"]}`}
              style={{ left: `${4 * 30}px` }}
            >
              <span>20+</span>
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          className={styles.home_team__heading}
          variants={staggerItem}
        >
          <h2 className={styles.home_team__title}>
            {t("title", { fallback: "Meet Our Experts" })}
          </h2>
          <p className={styles.home_team__subtitle}>
            {t("subtitle", {
              fallback:
                "A team of thinkers and builders who turn articles into original, fully realized digital experiences.",
            })}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
