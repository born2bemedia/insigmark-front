"use client";

import type { FullWebsiteItem } from "@/features/services/model/types";

import styles from "./FullWebsiteCard.module.scss";

import { OrderButton } from "..";

export type FullWebsiteCardVariant =
  | "gradient_grey"
  | "gradient_yellow"
  | "solid_yellow";

interface FullWebsiteCardProps {
  item: FullWebsiteItem;
  orderLabel: string;
  variant?: FullWebsiteCardVariant;
}

export const FullWebsiteCard = ({
  item,
  orderLabel,
  variant = "gradient_grey",
}: FullWebsiteCardProps) => {
  const variantClass = styles[`fw_card--${variant}`] || "";

  return (
    <div className={`${styles.fw_card} ${variantClass}`}>
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
            <span className={styles.fw_card__prefix}>{item.prefix}</span>
          )}
          <span className={styles.fw_card__price}>
            €{item.price.toLocaleString("en-IE")}
          </span>
        </div>
        <OrderButton
          service={{ id: item.id, title: item.title, price: item.price }}
          orderLabel={orderLabel}
          className={styles.fw_card__order}
          iconClassName={styles.fw_card__order_icon}
        />
      </div>
    </div>
  );
};
