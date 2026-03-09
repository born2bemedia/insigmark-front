"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./HomeQuote.module.scss";

import { Link } from "@/i18n/navigation";

export const HomeQuote = () => {
  const t = useTranslations("homeQuote");

  return (
    <motion.section
      className={styles.home_quote}
    >
      <div className={styles.home_quote__container}>
        {/* Left image (desktop) */}
        <motion.div
          className={styles.home_quote__img_wrap}
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
        >
          <Image
            src="/images/home/quote.png"
            alt=""
            fill
            className={styles.home_quote__img}
            sizes="332px"
          />
          <div className={styles.home_quote__corner} />
        </motion.div>

        {/* Top image (mobile) */}
        <motion.div
          className={styles.home_quote__img_mobile}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerItem}
        >
          <Image
            src="/images/home/quote.png"
            alt=""
            fill
            className={styles.home_quote__img}
            sizes="100vw"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className={styles.home_quote__content}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Quote section */}
          <motion.div
            className={styles.home_quote__quote}
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
          >
            <div className={styles.home_quote__icon} aria-hidden>
              <svg
                width="40"
                height="25"
                viewBox="0 0 40 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.585 0H20L10.13 25H0L4.585 0ZM24.585 0H40L30.15 25H20L24.585 0Z"
                  fill="#023D65"
                />
              </svg>
            </div>
            <p className={styles.home_quote__text}>
              {t("quote", {
                fallback:
                  "An idea shouldn't stay trapped in your head or on your laptop. We shape it, structure it, and build it into a working product ready to meet its audience.",
              })}
            </p>
          </motion.div>

          {/* Bottom */}
          <div className={styles.home_quote__bottom}>
            <p className={styles.home_quote__subtitle}>
              {t("subtitle", {
                fallback:
                  "From rough concept to fully operational website, the process is designed to transform vision into something visible, usable, and lasting.",
              })}
            </p>
            <div className={styles.home_quote__founder}>
              <div className={styles.home_quote__founder_border} />
              <p className={styles.home_quote__founder_name}>
                {t("founder", { fallback: "Insigmark Team" })}
              </p>
            </div>
          </div>

          {/* Link */}
          <motion.div
            className={styles.home_quote__link_row}
            variants={staggerItem}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link href="/who" className={styles.home_quote__link}>
              <span className={styles.home_quote__link_icon}>
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
              <span>{t("moreAbout", { fallback: "More about us" })}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
