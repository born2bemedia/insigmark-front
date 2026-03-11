"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./CompanyTech.module.scss";

const LOGOS = [
  { src: "/images/company/tech-nextjs.svg", alt: "Next.js", label: "Next.js" },
  { src: "/images/company/tech-nodejs.svg", alt: "Node.js", label: "Node.js" },
  { src: "/images/company/tech-typescript.svg", alt: "TypeScript", label: "TypeScript" },
  { src: "/images/company/tech-wordpress.svg", alt: "WordPress", label: "WordPress" },
  { src: "/images/company/tech-aws.svg", alt: "AWS", label: "AWS" },
];

export const CompanyTech = () => {
  const t = useTranslations("company");

  return (
    <motion.section
      className={styles.company_tech}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.company_tech__container}>
        <motion.div className={styles.company_tech__heading} variants={staggerItem}>
          <h2 className={styles.company_tech__title}>
            {t("techTitle", { fallback: "Technology Stack" })}
          </h2>
          <div className={styles.company_tech__subtitle_block}>
            <p className={styles.company_tech__subtitle}>
              {t("techSubtitleBold", { fallback: "Tools we build with" })}
            </p>
            <p className={styles.company_tech__subtitle_desc}>
              {t("techSubtitleDesc", {
                fallback: "We use modern frameworks and infrastructure tools selected for stability, scalability, and performance.",
              })}
            </p>
          </div>
        </motion.div>

        <motion.div className={styles.company_tech__slider} variants={staggerItem}>
          <div className={styles.company_tech__track}>
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div key={i} className={styles.company_tech__item}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={100}
                  className={styles.company_tech__logo}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
