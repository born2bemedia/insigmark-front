"use client";

import { useTranslations } from "next-intl";

import { useCartStore } from "@/features/cart/store/cart";
import { useFormsPopupStore } from "@/features/forms";
import {
  FullWebsite,
  PagesSections,
} from "@/features/services/lib/web-development";

import styles from "./WdWebsiteCards.module.scss";

const ArrowIcon = () => (
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
);

const FULL_WEBSITE_STYLES = [
  styles.fw_card__gradient_grey,
  styles.fw_card__gradient_grey,
  styles.fw_card__gradient_yellow,
  styles.fw_card__solid_yellow,
] as const;

const useOrder = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const openRequest = useFormsPopupStore((state) => state.openRequest);

  return (id: string, title: string, price: number) => {
    if (price < 5000) {
      addToCart({ id, title, price, quantity: 1 });
    } else {
      openRequest(title);
    }
  };
};

export const WdWebsiteCards = () => {
  const t = useTranslations("webDev");
  const fullWebsite = FullWebsite();
  const pagesSections = PagesSections();
  const handleOrder = useOrder();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      {/* Full Websites */}
      <h2 className={styles.section_title}>
        {t("fullWebsiteTitle", { fallback: "Full Websites" })}
      </h2>
      <div className={styles.fw_container}>
        <div className={styles.fw_row}>
          {fullWebsite.map((item, i) => (
            <div
              key={item.id}
              className={`${styles.fw_card} ${FULL_WEBSITE_STYLES[i] || ""}`}
            >
              <div className={styles.fw_card__top}>
                <h3 className={styles.fw_card__title}>{item.title}</h3>
                {item.subtitle && (
                  <div className={styles.fw_card__badges}>
                    {item.subtitle.split(" / ").map((badge) => (
                      <span key={badge} className={styles.fw_card__badge}>
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                <p className={styles.fw_card__desc}>{item.description}</p>
              </div>
              <div className={styles.fw_card__bottom}>
                <div className={styles.fw_card__price_block}>
                  {item.prefix && (
                    <span className={styles.fw_card__prefix}>
                      {item.prefix}
                    </span>
                  )}
                  <span className={styles.fw_card__price}>
                    €{item.price.toLocaleString("en-IE")}
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.fw_card__order}
                  onClick={() => handleOrder(item.id, item.title, item.price)}
                >
                  <span className={styles.fw_card__order_icon}>
                    <ArrowIcon />
                  </span>
                  <span>{orderLabel}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pages / Sections */}
      <h2 className={`${styles.section_title} ${styles.section_title_spaced}`}>
        {t("pagesSectionsTitle", { fallback: "Pages / Sections" })}
      </h2>
      <div className={styles.ps_container}>
        <div className={styles.ps_grid}>
          {pagesSections.map((item, i) => {
            const isLast =
              i === pagesSections.length - 1 && pagesSections.length % 2 !== 0;
            return (
              <div
                key={item.id}
                className={`${styles.ps_card} ${
                  isLast ? styles.ps_card__full : ""
                }`}
              >
                <div className={styles.ps_card__left}>
                  <h3 className={styles.ps_card__title}>{item.title}</h3>
                  {item.subtitle && (
                    <span className={styles.ps_card__badge}>
                      {item.subtitle}
                    </span>
                  )}
                  <p className={styles.ps_card__desc}>{item.description}</p>
                </div>
                <div className={styles.ps_card__right}>
                  <div className={styles.ps_card__price_block}>
                    {item.prefix && (
                      <span className={styles.ps_card__prefix}>
                        {item.prefix}
                      </span>
                    )}
                    <span className={styles.ps_card__price}>
                      €{item.price.toLocaleString("en-IE")}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.ps_card__order}
                    onClick={() => handleOrder(item.id, item.title, item.price)}
                  >
                    <span className={styles.ps_card__order_icon}>
                      <ArrowIcon />
                    </span>
                    <span>{orderLabel}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
