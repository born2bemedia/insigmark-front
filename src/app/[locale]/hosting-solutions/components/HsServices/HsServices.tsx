"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useCartStore } from "@/features/cart/store/cart";
import { useFormsPopupStore } from "@/features/forms";
import type { HostingPlanItem } from "@/features/services/lib/hosting-solutions";
import {
  DedicatedPlans,
  ManagedWordPress,
  SharedHosting,
  VpsCloud,
} from "@/features/services/lib/hosting-solutions";

import { fadeInUpLyniq } from "@/shared/lib/helpers/animations";

import styles from "./HsServices.module.scss";

const TAB_KEYS = [
  "sharedHosting",
  "managedWordPress",
  "vpsCloud",
  "dedicatedPlans",
] as const;

type TabKey = typeof TAB_KEYS[number];

const DARK_VARIANTS = new Set(["grey-2", "grey-3", "grey-4", "black"]);

const ArrowIcon = ({ color = "#023D65" }: { color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
  >
    <path
      d="M19.9148 16.321L15.6023 20.6335C15.4674 20.7684 15.2845 20.8442 15.0938 20.8442C14.903 20.8442 14.7201 20.7684 14.5852 20.6335C14.4504 20.4986 14.3746 20.3157 14.3746 20.125C14.3746 19.9343 14.4504 19.7514 14.5852 19.6165L17.6714 16.5312H6.46875C6.27813 16.5312 6.09531 16.4555 5.96052 16.3207C5.82573 16.1859 5.75 16.0031 5.75 15.8125V2.875C5.75 2.68438 5.82573 2.50156 5.96052 2.36677C6.09531 2.23198 6.27813 2.15625 6.46875 2.15625C6.65937 2.15625 6.84219 2.23198 6.97698 2.36677C7.11177 2.50156 7.1875 2.68438 7.1875 2.875V15.0938H17.6714L14.5852 12.0085C14.4504 11.8736 14.3746 11.6907 14.3746 11.5C14.3746 11.3093 14.4504 11.1264 14.5852 10.9915C14.7201 10.8566 14.903 10.7809 15.0938 10.7809C15.2845 10.7809 15.4674 10.8566 15.6023 10.9915L19.9148 15.304C19.9816 15.3707 20.0346 15.45 20.0708 15.5373C20.1069 15.6245 20.1256 15.718 20.1256 15.8125C20.1256 15.907 20.1069 16.0005 20.0708 16.0877C20.0346 16.175 19.9816 16.2543 19.9148 16.321Z"
      fill={color}
    />
  </svg>
);

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

export const HsServices = () => {
  const t = useTranslations("hosting");
  const [activeTab, setActiveTab] = useState<TabKey>("sharedHosting");

  const tabLabels: Record<TabKey, string> = {
    sharedHosting: t("tabSharedHosting", { fallback: "Shared Hosting" }),
    managedWordPress: t("tabManagedWordPress", {
      fallback: "Managed WordPress Hosting",
    }),
    vpsCloud: t("tabVpsCloud", { fallback: "VPS/Cloud Hosting" }),
    dedicatedPlans: t("tabDedicatedPlans", { fallback: "Dedicated Plans" }),
  };

  return (
    <section className={styles.hs_services}>
      <div className={styles.hs_services__container}>
        <motion.div
          className={styles.hs_services__tabs}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          <div className={styles.hs_services__tabs_row}>
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.hs_services__tab} ${
                  activeTab === key ? styles["hs_services__tab--active"] : ""
                }`}
                onClick={() => setActiveTab(key)}
              >
                {tabLabels[key]}
              </button>
            ))}
          </div>
          <div className={styles.hs_services__tabs_border} />
        </motion.div>

        <motion.div
          className={styles.hs_services__content}
          initial="hidden"
          animate="visible"
          variants={fadeInUpLyniq}
        >
          {activeTab === "sharedHosting" && <SharedHostingContent />}
          {activeTab === "managedWordPress" && <ManagedWordPressContent />}
          {activeTab === "vpsCloud" && <VpsCloudContent />}
          {activeTab === "dedicatedPlans" && <DedicatedPlansContent />}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Standard hosting plan card (vertical) ───────────────────────────────────

const PlanCard = ({
  item,
  orderLabel,
}: {
  item: HostingPlanItem;
  orderLabel: string;
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const openRequest = useFormsPopupStore((state) => state.openRequest);

  const handleOrder = () => {
    if (item.price < 5000) {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
      });
    } else {
      openRequest(item.title);
    }
  };

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
        <button
          type="button"
          className={styles.plan_card__order}
          onClick={handleOrder}
        >
          <span className={styles.plan_card__order_icon}>
            <ArrowIcon color={dark ? "#D2FF37" : "#023D65"} />
          </span>
          <span>{orderLabel}</span>
        </button>
      </div>
    </div>
  );
};

// ─── Dedicated plan card (horizontal / wide) ─────────────────────────────────

const DedicatedCard = ({
  item,
  orderLabel,
}: {
  item: HostingPlanItem;
  orderLabel: string;
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const openRequest = useFormsPopupStore((state) => state.openRequest);

  const handleOrder = () => {
    if (item.price < 5000) {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
      });
    } else {
      openRequest(item.title);
    }
  };

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
        <button
          type="button"
          className={styles.dedicated_card__order}
          onClick={handleOrder}
        >
          <span className={styles.dedicated_card__order_icon}>
            <ArrowIcon />
          </span>
          <span>{orderLabel}</span>
        </button>
      </div>
    </div>
  );
};

// ─── Tab content components ──────────────────────────────────────────────────

const SharedHostingContent = () => {
  const t = useTranslations("hosting");
  const items = SharedHosting();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.hs_services__section_title}>
        {t("sharedHostingTitle", { fallback: "Shared Hosting" })}
      </h2>
      <div className={styles.hs_services__row}>
        {items.map((item) => (
          <PlanCard key={item.id} item={item} orderLabel={orderLabel} />
        ))}
      </div>
    </>
  );
};

const ManagedWordPressContent = () => {
  const t = useTranslations("hosting");
  const items = ManagedWordPress();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.hs_services__section_title}>
        {t("managedWordPressTitle", { fallback: "Managed WordPress Hosting" })}
      </h2>
      <div className={styles.hs_services__row}>
        {items.map((item) => (
          <PlanCard key={item.id} item={item} orderLabel={orderLabel} />
        ))}
      </div>
    </>
  );
};

const VpsCloudContent = () => {
  const t = useTranslations("hosting");
  const items = VpsCloud();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.hs_services__section_title}>
        {t("vpsCloudTitle", { fallback: "VPS/Cloud Hosting" })}
      </h2>
      <div className={styles.hs_services__row}>
        {items.map((item) => (
          <PlanCard key={item.id} item={item} orderLabel={orderLabel} />
        ))}
      </div>
    </>
  );
};

const DedicatedPlansContent = () => {
  const t = useTranslations("hosting");
  const items = DedicatedPlans();
  const orderLabel = t("orderNow", { fallback: "Order now!" });

  return (
    <>
      <h2 className={styles.hs_services__section_title}>
        {t("dedicatedPlansTitle", { fallback: "Dedicated Plans" })}
      </h2>
      <div className={styles.hs_services__dedicated_row}>
        {items.map((item) => (
          <DedicatedCard key={item.id} item={item} orderLabel={orderLabel} />
        ))}
      </div>
    </>
  );
};
