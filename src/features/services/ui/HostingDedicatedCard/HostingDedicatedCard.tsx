"use client";

import type { HostingPlanItem } from "@/features/services/model/types";

import styles from "./HostingDedicatedCard.module.scss";

import { OrderButton } from "..";

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M2 8H14M8 2V14M11.3333 4.66667L4.66667 11.3333M4.66667 4.66667L11.3333 11.3333"
      stroke="#636363"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

interface HostingDedicatedCardProps {
  item: HostingPlanItem;
  orderLabel: string;
}

export const HostingDedicatedCard = ({
  item,
  orderLabel,
}: HostingDedicatedCardProps) => {
  return (
    <div className={styles.dedicated_card}>
      <div className={styles.dedicated_card__border} />
      <div className={styles.dedicated_card__content}>
        <div className={styles.dedicated_card__left}>
          <h3 className={styles.dedicated_card__title}>{item.title}</h3>
          <div className={styles.dedicated_card__for}>
            <span className={styles.dedicated_card__for_label}>For:</span>
            <span className={styles.dedicated_card__for_text}>
              {item.forLabel}
            </span>
          </div>
        </div>
        <ul className={styles.dedicated_card__features}>
          {item.features.map((feat) => (
            <li key={feat} className={styles.dedicated_card__feature}>
              <span className={styles.dedicated_card__feature_icon}>
                <StarIcon />
              </span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.dedicated_card__footer}>
        <span className={styles.dedicated_card__price}>
          €{item.price.toLocaleString("en-IE")}
        </span>
        <OrderButton
          service={{ id: item.id, title: item.title, price: item.price }}
          orderLabel={orderLabel}
          className={styles.dedicated_card__order}
          iconClassName={styles.dedicated_card__order_icon}
        />
      </div>
    </div>
  );
};
