"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { fadeInUp } from "@/shared/lib/helpers/animations";

import styles from "./articlesHero.module.scss";

export const articlesHero = () => {
  const t = useTranslations("articlesHero");

  return (
    <section className={styles.articles_hero}>
      <div className={"container"}>
        <div className={styles.articles_hero__content}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.articles_hero__left}
          >
            <Image
              src="/images/articles/star1.svg"
              alt="Star 1"
              width={644}
              height={16}
            />
            <div>
              <h1>
                {t("title1", {
                  fallback: "Strategic insights for entrepreneurs.",
                })}
              </h1>
              <p>
                {t("description", {
                  fallback:
                    "A modern, action-oriented title that emphasizes strategic thinking and growth. Combines insightful and sharp articles, perfect for entrepreneurs looking to fine-tune their approach.",
                })}
              </p>
            </div>
            <Image
              src="/images/articles/star2.svg"
              alt="Star 1"
              width={644}
              height={16}
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className={styles.articles_hero__right}
          >
            <Image
              src="/images/articles/hero.png"
              alt="articles"
              width={600}
              height={600}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
