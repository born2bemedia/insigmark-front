"use client";
import { useTranslations } from "next-intl";

import styles from "@/features/account/ui/AuthSuccessMessage/AuthSuccessHero.module.scss";
import { AuthSuccessMessage } from "@/features/account/ui/AuthSuccessMessage/AuthSuccessMessage";

export default function ForgotPasswordSuccessPage() {
  const t = useTranslations("forgotPasswordSuccessPage");
  return (
    <section className={styles.auth_success_hero}>
      <div className={styles.auth_success_hero__inner}>
        <AuthSuccessMessage
          title={t("title", { fallback: "Success!" })}
          description={t("description", {
            fallback:
              "Check your inbox – we just sent a password reset link. Can’t find the email? Make sure to check your spam or promotions folder.",
          })}
          primaryCtaLabel={t("primaryCtaLabel", { fallback: "Got it" })}
          primaryCtaHref="/sign-in"
          closeHref="/"
        />
      </div>
    </section>
  );
}
