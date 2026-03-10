"use client";

import { CardVariant } from "../../model/types";
import styles from "./ServiceCard.module.scss";

import { OrderButton } from "..";

const ARROW_COLORS = {
  blue: "#023D65",
  yellow: "#D2FF37",
};

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  price: number;
  prefix?: string;
  suffix?: string;
  variant?: CardVariant;
  orderLabel?: string;
}

export const ServiceCard = ({
  id,
  title,
  description,
  subtitle,
  price,
  prefix,
  suffix,
  variant = "white",
  orderLabel,
}: ServiceCardProps) => {
  const formattedPrice = `€${price.toLocaleString("en-IE")}`;

  const variantClass =
    variant !== "white" ? styles[`service_card--${variant}`] : "";

  return (
    <div className={`${styles.service_card} ${variantClass}`}>
      <div className={styles.service_card__border} />
      <div className={styles.service_card__top}>
        <h3 className={styles.service_card__title}>{title}</h3>
        {subtitle && (
          <span className={styles.service_card__subtitle}>{subtitle}</span>
        )}
        <p className={styles.service_card__desc}>{description}</p>
      </div>
      <div className={styles.service_card__bottom}>
        <div className={styles.service_card__price_row}>
          {prefix && (
            <span className={styles.service_card__prefix}>{prefix}</span>
          )}
          <div>
            <span className={styles.service_card__price}>{formattedPrice}</span>
            {suffix && (
              <span className={styles.service_card__suffix}>/{suffix}</span>
            )}
          </div>
        </div>
        {orderLabel && (
          <OrderButton
            service={{ id, title, price }}
            orderLabel={orderLabel}
            className={styles.service_card__order}
            iconClassName={styles.service_card__order_icon}
            arrowColor={
              ["grey-2", "grey-3", "grey-4", "black"].includes(variant)
                ? ARROW_COLORS.yellow
                : ARROW_COLORS.blue
            }
          />
        )}
      </div>
    </div>
  );
};
