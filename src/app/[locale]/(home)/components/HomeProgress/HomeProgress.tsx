"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./HomeProgress.module.scss";

export const HomeProgress = () => {
  const t = useTranslations("homeProgress");

  return (
    <>
      <section className={styles.home_progress}>
        <div className={styles.home_progress__wrapper}>
          <div className={"container"}>
            <div className={styles.home_progress__content}>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {t("title1", {
                  fallback: "Progress doesn’t disappear.",
                })}{" "}
                <br />
                <span>
                  {t("title2", {
                    fallback: "It gets scattered.",
                  })}
                </span>
              </motion.h2>
              <motion.p>
                {t("subtitle1", {
                  fallback: "As things grow, clarity fades.",
                })}{" "}
                <br />
                {t("subtitle2", {
                  fallback:
                    "Insigmark restores focus, helping you prioritize what matters now and making progress purposeful.",
                })}{" "}
                <br />
                {t("subtitle3", {
                  fallback:
                    "We ensure your effort adds up to steady, sustainable progress.",
                })}
              </motion.p>
            </div>
          </div>
        </div>
        <Image src="/images/home/progress.svg" alt="Progress" width={1312} height={228} />
      </section>
    </>
  );
};
