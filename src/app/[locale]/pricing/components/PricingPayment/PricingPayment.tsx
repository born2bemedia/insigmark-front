"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { staggerContainer, staggerItem } from "@/shared/lib/helpers/animations";

import styles from "./PricingPayment.module.scss";

export const PricingPayment = () => {
  const t = useTranslations("pricing");

  return (
    <motion.section
      className={styles.pricing_payment}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className={styles.pricing_payment__container}>
        <motion.h2
          className={styles.pricing_payment__title}
          variants={staggerItem}
        >
          {t("paymentTitle", { fallback: "How you can pay" })}
        </motion.h2>

        <motion.div
          className={styles.pricing_payment__cards}
          variants={staggerItem}
        >
          {/* Single Payment */}
          <div className={styles.pricing_payment__card}>
            <div className={styles.pricing_payment__card_corner} />
            <div className={styles.pricing_payment__card_number}>01</div>
            <div className={styles.pricing_payment__card_content}>
              <h3 className={styles.pricing_payment__card_label}>
                {t("singlePaymentLabel", { fallback: "SINGLE PAYMENT" })}
              </h3>
              <p className={styles.pricing_payment__card_desc}>
                {t("singlePaymentDesc", {
                  fallback:
                    "Pay the full project cost in one invoice. This simplifies the process and secures all stages upfront. Prepayment covers development, hosting, maintenance, and documentation.",
                })}
              </p>
            </div>
          </div>

          {/* Stage-by-Stage */}
          <div className={styles.pricing_payment__card}>
            <div className={styles.pricing_payment__card_corner} />
            <div className={styles.pricing_payment__card_number}>02</div>
            <div className={styles.pricing_payment__card_content}>
              <h3 className={styles.pricing_payment__card_label}>
                {t("stagePaymentLabel", {
                  fallback: "STAGE-BY-STAGE PAYMENT",
                })}
              </h3>
              <p className={styles.pricing_payment__card_desc}>
                {t("stagePaymentDesc", {
                  fallback:
                    "Pay per project stage as you go. Prepayment is required for each stage before work begins, ensuring transparency and control while keeping the project moving smoothly.",
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
