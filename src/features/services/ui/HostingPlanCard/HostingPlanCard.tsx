"use client";

import type { HostingPlanItem } from "@/features/services/model/types";

import styles from "./HostingPlanCard.module.scss";

import { OrderButton } from "..";

const DARK_VARIANTS = new Set(["grey-2", "grey-3", "grey-4", "black"]);

const StarIcon = ({ color = "#636363" }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M2 8H14M8 2V14M11.3333 4.66667L4.66667 11.3333M4.66667 4.66667L11.3333 11.3333"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

interface HostingPlanCardProps {
  item: HostingPlanItem;
  orderLabel: string;
}

export const HostingPlanCard = ({ item, orderLabel }: HostingPlanCardProps) => {
  const variant = item.variant || "white";
  const dark = DARK_VARIANTS.has(variant);
  const variantClass =
    variant !== "white" ? styles[`plan_card--${variant}`] : "";

  return (
    <div className={`${styles.plan_card} ${variantClass}`}>
      <div className={styles.plan_card__border} />
      <div className={styles.plan_card__top}>
        <h3 className={styles.plan_card__title}>{item.title}</h3>
        <div className={styles.plan_card__for}>
          <span className={styles.plan_card__for_label}>For:</span>
          <span className={styles.plan_card__for_text}>{item.forLabel}</span>
        </div>
        <ul className={styles.plan_card__features}>
          {item.features.map((feat) => (
            <li key={feat} className={styles.plan_card__feature}>
              <span className={styles.plan_card__feature_icon}>
                <StarIcon />
              </span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.plan_card__bottom}>
        <span className={styles.plan_card__price}>
          €{item.price.toLocaleString("en-IE")}
        </span>
        <OrderButton
          service={{ id: item.id, title: item.title, price: item.price }}
          orderLabel={orderLabel}
          className={styles.plan_card__order}
          iconClassName={styles.plan_card__order_icon}
          arrowColor={dark ? "#D2FF37" : "#023D65"}
        />
      </div>
    </div>
  );
};
