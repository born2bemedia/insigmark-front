"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { FaqRequestForm } from "@/features/contact-form/ui/FaqRequestForm";
import { useFaqCategories } from "@/features/faq/lib/faq-data";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./FaqContent.module.scss";

export const FaqContent = () => {
  const t = useTranslations("faq");
  const categories = useFaqCategories();
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
  };

  const activeItems = categories[activeCategory]?.items ?? [];

  const contactBlock = (
    <div className={styles.faq_content__contact}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/faq/contact-bg.png"
        alt=""
        aria-hidden="true"
        className={styles.faq_content__contact_bg}
      />
      <div className={styles.faq_content__contact_overlay} />
      <div className={styles.faq_content__contact_inner}>
        <div className={styles.faq_content__contact_heading}>
          <h2 className={styles.faq_content__contact_title}>
            {t("contactTitle", { fallback: "Still Have Questions?" })}
          </h2>
          <p className={styles.faq_content__contact_desc}>
            {t("contactDesc", {
              fallback:
                "If you didn't find the answer you were looking for, send us your request. Our team will review it and get back to you shortly.",
            })}
          </p>
        </div>
        <div className={styles.faq_content__contact_form}>
          <FaqRequestForm />
        </div>
      </div>
    </div>
  );

  return (
    <motion.section
      className={styles.faq_content}
      id="faq-content"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={staggerContainer}
    >
      <div className={styles.faq_content__container}>
        {/* Left: category tabs */}
        <motion.aside
          className={styles.faq_content__sidebar}
          variants={staggerItem}
        >
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.faq_content__tab} ${
                activeCategory === i ? styles["faq_content__tab--active"] : ""
              }`}
              onClick={() => handleCategoryChange(i)}
            >
              <span className={styles.faq_content__tab_label}>{cat.label}</span>
              <div className={styles.faq_content__tab_border} />
              <div className={styles.faq_content__tab_corner} />
            </button>
          ))}
        </motion.aside>

        {/* Right: FAQ items + contact */}
        <motion.div
          className={styles.faq_content__right}
          variants={staggerItem}
        >
          <div className={styles.faq_content__items} key={activeCategory}>
            {activeItems.map((item, i) => (
              <div key={i} className={styles.faq_content__item}>
                <div className={styles.faq_content__item_content}>
                  <div className={styles.faq_content__item_number}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.faq_content__item_text}>
                    <h3 className={styles.faq_content__item_question}>
                      {item.question}
                    </h3>
                    <p className={styles.faq_content__item_answer}>
                      {item.answer}
                    </p>
                  </div>
                </div>
                <div className={styles.faq_content__item_border} />
                <div className={styles.faq_content__item_corner} />
              </div>
            ))}
          </div>

          {contactBlock}
        </motion.div>

        {/* Mobile: active category items on top, other tabs below */}
        <div className={styles.faq_content__mobile}>
          <div className={styles.faq_content__mobile_active}>
            <span className={styles.faq_content__mobile_active_label}>
              {categories[activeCategory]?.label}
            </span>
            <div className={styles.faq_content__tab_corner} />
          </div>

          <div className={styles.faq_content__mobile_items}>
            {activeItems.map((item, i) => (
              <div key={i} className={styles.faq_content__item}>
                <div className={styles.faq_content__item_content}>
                  <div className={styles.faq_content__item_number}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className={styles.faq_content__item_text}>
                    <h3 className={styles.faq_content__item_question}>
                      {item.question}
                    </h3>
                    <p className={styles.faq_content__item_answer}>
                      {item.answer}
                    </p>
                  </div>
                </div>
                <div className={styles.faq_content__item_border} />
              </div>
            ))}
          </div>

          {contactBlock}

          <div className={styles.faq_content__mobile_tabs}>
            {categories.map((cat, i) => {
              if (i === activeCategory) return null;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={styles.faq_content__mobile_tab}
                  onClick={() => handleCategoryChange(i)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
