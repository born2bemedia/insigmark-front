"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { OrderButton } from "@/features/services/ui";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./PricingPackages.module.scss";

const STAR_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M1.42969 5.71442H10.0011M5.7154 1.42871V10.0001M8.09635 3.33347L3.33445 8.09538M3.33445 3.33347L8.09635 8.09538"
      stroke="#878787"
      stroke-width="1.42857"
      strokeLinejoin="round"
    />
  </svg>
);

type PricingPlan = {
  id: string;
  name: string;
  features: string[];
  price: number;
  prefix?: string;
  variant: "white" | "grey-1" | "yellow-4";
};

export const PricingPackages = () => {
  const t = useTranslations("pricing");

  const plans: PricingPlan[] = [
    {
      id: "starter",
      name: t("starterName", { fallback: "Starter" }),
      features: [
        t("starterFeature1", {
          fallback: "3–5 page WordPress/custom website",
        }),
        t("starterFeature2", {
          fallback: "Shared Hosting for 1 website",
        }),
        t("starterFeature3", {
          fallback: "3 months basic maintenance",
        }),
        t("starterFeature4", {
          fallback: "Basic User Guide",
        }),
      ],
      price: 4000,
      variant: "white",
    },
    {
      id: "standard",
      name: t("standardName", { fallback: "Standard" }),
      features: [
        t("standardFeature1", {
          fallback: "6–10 page website with forms and gallery",
        }),
        t("standardFeature2", {
          fallback: "Managed WordPress hosting for 3 sites",
        }),
        t("standardFeature3", {
          fallback: "3 months standard maintenance",
        }),
        t("standardFeature4", {
          fallback: "Technical Documentation + Basic User Guide",
        }),
      ],
      price: 8500,
      variant: "grey-1",
    },
    {
      id: "premium",
      name: t("premiumName", { fallback: "Premium" }),
      features: [
        t("premiumFeature1", {
          fallback: "10+ page website with e-commerce/CMS and user accounts",
        }),
        t("premiumFeature2", {
          fallback: "VPS/Cloud hosting",
        }),
        t("premiumFeature3", {
          fallback: "3 months full maintenance",
        }),
        t("premiumFeature4", {
          fallback: "Full Handover Package + Knowledge Transfer",
        }),
      ],
      price: 10600,
      variant: "yellow-4",
    },
  ];

  return (
    <motion.section
      className={styles.pricing_packages}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.pricing_packages__container}>
        {/* Left intro */}
        <motion.div
          className={styles.pricing_packages__intro}
          variants={staggerItem}
        >
          <h2 className={styles.pricing_packages__brand}>INSIGMARK</h2>
          <p className={styles.pricing_packages__intro_text}>
            {t("packagesIntro", {
              fallback:
                "If you're ready to shape your project with us, our complex solutions may inspire you!",
            })}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className={styles.pricing_packages__cards}
          variants={staggerItem}
        >
          {plans.map((plan) => {
            const variantClass =
              plan.variant !== "white"
                ? styles[`pricing_packages__card--${plan.variant}`]
                : "";

            return (
              <div
                key={plan.id}
                className={`${styles.pricing_packages__card} ${variantClass}`}
              >
                <div className={styles.pricing_packages__card_border} />
                <div className={styles.pricing_packages__card_top}>
                  <h3 className={styles.pricing_packages__card_name}>
                    {plan.name}
                  </h3>
                  <ul className={styles.pricing_packages__card_features}>
                    {plan.features.map((feat) => (
                      <li
                        key={feat}
                        className={styles.pricing_packages__card_feature}
                      >
                        <span
                          className={styles.pricing_packages__card_feature_icon}
                        >
                          {STAR_ICON}
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.pricing_packages__card_bottom}>
                  {plan.prefix && (
                    <span className={styles.pricing_packages__card_prefix}>
                      {plan.prefix}
                    </span>
                  )}
                  <span className={styles.pricing_packages__card_price}>
                    €{plan.price.toLocaleString("en-IE")}
                  </span>
                  <OrderButton
                    service={{
                      id: plan.id,
                      title: plan.name,
                      price: plan.price,
                    }}
                    orderLabel={t("orderNow", { fallback: "Order now!" })}
                    className={styles.pricing_packages__card_order}
                    iconClassName={styles.pricing_packages__card_order_icon}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};
