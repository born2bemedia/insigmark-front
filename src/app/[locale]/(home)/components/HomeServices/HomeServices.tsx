"use client";

import { useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./HomeServices.module.scss";

import { Link } from "@/i18n/navigation";

export const HomeServices = () => {
  const t = useTranslations("homeServices");

  const SERVICES = [
    {
      id: "website",
      titleKey: "service1Title",
      titleFallback: t("service1Title", { fallback: "Website Development" }),
      descKey: "service1Desc",
      descFallback: t("service1Desc", {
        fallback:
          "Design and build fully functional websites, blogs, portfolios, and landing pages with interactive elements, galleries, forms, and advanced features, ready for immediate use.",
      }),
      image: "/images/home/service1.png",
    },
    {
      id: "hosting",
      titleKey: "service2Title",
      titleFallback: t("service2Title", { fallback: "Hosting Solutions" }),
      descKey: "service2Desc",
      descFallback: t("service2Desc", {
        fallback:
          "Provide secure, high-performance hosting with daily backups, monitoring, malware protection, and scalable storage to ensure websites stay online and reliable.",
      }),
      image: "/images/home/service1.png",
    },
    {
      id: "maintenance",
      titleKey: "service3Title",
      titleFallback: t("service3Title", { fallback: "Maintenance Services" }),
      descKey: "service3Desc",
      descFallback: t("service3Desc", {
        fallback:
          "Perform updates, performance tweaks, security scans, and content adjustments, keeping websites up-to-date, fast, and functioning smoothly over time.",
      }),
      image: "/images/home/service1.png",
    },
    {
      id: "pricing",
      titleKey: "service4Title",
      titleFallback: t("service4Title", { fallback: "Pricing Approach" }),
      descKey: "service4Desc",
      descFallback: t("service4Desc", {
        fallback: "Transparent pricing with clear calculations, detailed breakdowns, and customizable options so clients know exactly what they pay for and why.",
      }),
      image: "/images/home/service1.png",
    },
  ] as const;
  const [activeId, setActiveId] = useState<typeof SERVICES[number]["id"]>(
    SERVICES[0].id,
  );
  const active = SERVICES.find((s) => s.id === activeId) ?? SERVICES[0];

  return (
    <motion.section
      className={styles.home_services}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.home_services__container}>
        {/* Top bar: wordmark left, category right */}
        <motion.div
          className={styles.home_services__top}
          variants={staggerItem}
        >
          <span className={styles.home_services__wordmark}>Insigmark</span>
          <div className={styles.home_services__category}>
            <div className={styles.home_services__corner} />
            <span>{t("category", { fallback: "Services" })}</span>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          className={styles.home_services__content}
          variants={staggerContainer}
        >
          {/* Desktop: left panel + right tabs */}
          <motion.div
            className={styles.home_services__main}
            variants={staggerItem}
          >
            {/* Left: image + label + description */}
            <div className={styles.home_services__panel}>
              <div className={styles.home_services__panel_img}>
                <Image
                  src={active.image}
                  alt=""
                  fill
                  className={styles.home_services__img}
                  sizes="225px"
                />
              </div>
              <div className={styles.home_services__panel_text}>
                <p className={styles.home_services__panel_label}>
                  {t(active.titleKey, { fallback: active.titleFallback })}
                </p>
                <p className={styles.home_services__panel_desc}>
                  {t(active.descKey, { fallback: active.descFallback })}
                </p>
              </div>
            </div>

            {/* Right: large service tabs */}
            <div className={styles.home_services__tabs}>
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className={`${styles.home_services__tab} ${
                    activeId === service.id
                      ? styles["home_services__tab--active"]
                      : ""
                  }`}
                  onMouseEnter={() => setActiveId(service.id)}
                  onMouseLeave={() => setActiveId(activeId)}
                >
                  <span className={styles.home_services__tab_text}>
                    {t(service.titleKey, { fallback: service.titleFallback })}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Mobile: image + description below tabs */}
          <motion.div
            className={styles.home_services__mobile_panel}
            variants={staggerItem}
          >
            <div className={styles.home_services__panel_img}>
              <Image
                src={active.image}
                alt=""
                fill
                className={styles.home_services__img}
                sizes="100vw"
              />
            </div>
            <div className={styles.home_services__panel_text}>
              <p className={styles.home_services__panel_label}>
                {t(active.titleKey, { fallback: active.titleFallback })}
              </p>
              <p className={styles.home_services__panel_desc}>
                {t(active.descKey, { fallback: active.descFallback })}
              </p>
            </div>
          </motion.div>

          {/* Link */}
          <motion.div
            className={styles.home_services__link_row}
            variants={staggerItem}
          >
            <Link href="/company" className={styles.home_services__link}>
              <span className={styles.home_services__link_icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <path
                    d="M19.9148 16.321L15.6023 20.6335C15.4674 20.7684 15.2845 20.8442 15.0938 20.8442C14.903 20.8442 14.7201 20.7684 14.5852 20.6335C14.4504 20.4986 14.3746 20.3157 14.3746 20.125C14.3746 19.9343 14.4504 19.7514 14.5852 19.6165L17.6714 16.5312H6.46875C6.27813 16.5312 6.09531 16.4555 5.96052 16.3207C5.82573 16.1859 5.75 16.0031 5.75 15.8125V2.875C5.75 2.68438 5.82573 2.50156 5.96052 2.36677C6.09531 2.23198 6.27813 2.15625 6.46875 2.15625C6.65937 2.15625 6.84219 2.23198 6.97698 2.36677C7.11177 2.50156 7.1875 2.68438 7.1875 2.875V15.0938H17.6714L14.5852 12.0085C14.4504 11.8736 14.3746 11.6907 14.3746 11.5C14.3746 11.3093 14.4504 11.1264 14.5852 10.9915C14.7201 10.8566 14.903 10.7809 15.0938 10.7809C15.2845 10.7809 15.4674 10.8566 15.6023 10.9915L19.9148 15.304C19.9816 15.3707 20.0346 15.45 20.0708 15.5373C20.1069 15.6245 20.1256 15.718 20.1256 15.8125C20.1256 15.907 20.1069 16.0005 20.0708 16.0877C20.0346 16.175 19.9816 16.2543 19.9148 16.321Z"
                    fill="#D2FF37"
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
