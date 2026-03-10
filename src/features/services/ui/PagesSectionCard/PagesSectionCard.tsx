"use client";

import type { PagesSectionsItem } from "@/features/services/model/types";

import styles from "./PagesSectionCard.module.scss";

import { OrderButton } from "..";

interface PagesSectionCardProps {
  item: PagesSectionsItem;
  orderLabel: string;
  fullWidth?: boolean;
}

export const PagesSectionCard = ({
  item,
  orderLabel,
  fullWidth = false,
}: PagesSectionCardProps) => {
  return (
    <div
      className={`${styles.ps_card} ${fullWidth ? styles.ps_card__full : ""}`}
    >
      <div className={styles.ps_card__left}>
        <h3 className={styles.ps_card__title}>{item.title}</h3>
        {item.subtitle && (
          <span className={styles.ps_card__badge}>{item.subtitle}</span>
        )}
        <p className={styles.ps_card__desc}>{item.description}</p>
      </div>
      <div className={styles.ps_card__right}>
        <div className={styles.ps_card__price_block}>
          {item.prefix && (
            <span className={styles.ps_card__prefix}>{item.prefix}</span>
          )}
          <span className={styles.ps_card__price}>
            €{item.price.toLocaleString("en-IE")}
          </span>
        </div>
        <OrderButton
          service={{ id: item.id, title: item.title, price: item.price }}
          orderLabel={orderLabel}
          className={styles.ps_card__order}
          iconClassName={styles.ps_card__order_icon}
        />
      </div>
    </div>
  );
};
