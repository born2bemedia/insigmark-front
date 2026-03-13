"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import { FormPopup } from "@/features/forms/ui/FormPopup/FormPopup";

import {
  WEBSITE_EMAIL,
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_PHONE,
  WEBSITE_REGISTERED_ADDRESS,
} from "@/shared/lib/constants/constants";
import { startLenis, stopLenis } from "@/shared/ui/components";

import styles from "./Footer.module.scss";

import { Link } from "@/i18n/navigation";

const ArrowIcon = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.9148 16.321L15.6023 20.6335C15.4674 20.7684 15.2845 20.8442 15.0938 20.8442C14.903 20.8442 14.7201 20.7684 14.5852 20.6335C14.4504 20.4986 14.3746 20.3157 14.3746 20.125C14.3746 19.9343 14.4504 19.7514 14.5852 19.6165L17.6714 16.5312H6.46875C6.27813 16.5312 6.09531 16.4555 5.96052 16.3207C5.82573 16.1859 5.75 16.0031 5.75 15.8125V2.875C5.75 2.68438 5.82573 2.50156 5.96052 2.36677C6.09531 2.23198 6.27813 2.15625 6.46875 2.15625C6.65937 2.15625 6.84219 2.23198 6.97698 2.36677C7.11177 2.50156 7.1875 2.68438 7.1875 2.875V15.0938H17.6714L14.5852 12.0085C14.4504 11.8736 14.3746 11.6907 14.3746 11.5C14.3746 11.3093 14.4504 11.1264 14.5852 10.9915C14.7201 10.8566 14.903 10.7809 15.0938 10.7809C15.2845 10.7809 15.4674 10.8566 15.6023 10.9915L19.9148 15.304C19.9816 15.3707 20.0346 15.45 20.0708 15.5373C20.1069 15.6245 20.1256 15.718 20.1256 15.8125C20.1256 15.907 20.1069 16.0005 20.0708 16.0877C20.0346 16.175 19.9816 16.2543 19.9148 16.321Z"
      fill="currentColor"
    />
  </svg>
);

export const Footer = () => {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const NAV_COL_1 = [
    { text: t("footer-web-development", { fallback: "Web Development" }), href: "/web-development" },
    { text: t("footer-hosting-solutions", { fallback: "Hosting Solutions" }), href: "/hosting-solutions" },
    {
      text: t("footer-security-audit-maintenance", { fallback: "Security, Audit & Maintenance" }),
      href: "/security-audit-maintenance",
    },
  ];

  const NAV_COL_2 = [
    { text: t("footer-pricing", { fallback: "Pricing" }), href: "/pricing" },
    { text: t("footer-articles", { fallback: "Blog" }), href: "/blog" },
    { text: t("footer-faq", { fallback: "FAQ" }), href: "/faq" },
    { text: t("footer-who", { fallback: "Company" }), href: "/company" },
    { text: t("footer-connect", { fallback: "Contact" }), href: "/contact" },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/footer-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(
          json.message ??
            t("footer-newsletter-error", {
              fallback: "Failed to submit your request. Please try again.",
            }),
        );
      }

      setEmail("");
      setIsSuccessOpen(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : t("footer-newsletter-error", {
              fallback: "Failed to submit your request. Please try again.",
            }),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  useEffect(() => {
    if (isSuccessOpen) {
      stopLenis();
    } else {
      startLenis();
    }

    return () => startLenis();
  }, [isSuccessOpen]);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footer__bg} />
        <div className={styles.footer__container}>
          <div className={styles.footer__top}>
            <Link href="/" className={styles.footer__wordmark}>
              <Image
                src="/images/logo_black.svg"
                alt="Insigmark"
                width={294}
                height={57}
              />
            </Link>

            <div className={styles.footer__right}>
              <div className={styles.footer__newsletter}>
                <div className={styles.footer__newsletter_heading}>
                  <p className={styles.footer__newsletter_title}>
                    {t("footer-newsletter-title", { fallback: "Stay" })}
                    <br />
                    {t("footer-newsletter-connected", { fallback: "connected" })}
                  </p>
                  <p className={styles.footer__newsletter_desc}>
                    {t("footer-newsletter-desc", {
                      fallback:
                        "Be the first to know about our special offers, deals, and new services.",
                    })}
                  </p>
                </div>
                <form
                  className={styles.footer__newsletter_form}
                  onSubmit={handleNewsletterSubmit}
                  noValidate
                >
                  <div className={styles.footer__newsletter_input_wrap}>
                    <input
                      type="email"
                      placeholder={t("footer-newsletter-input-placeholder", {
                        fallback: "E-mail",
                      })}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${styles.footer__newsletter_input} ${error ? styles.footer__newsletter_input_error : ""}`}
                      aria-invalid={Boolean(error)}
                      disabled={isSubmitting}
                      required
                    />
                    <button
                      type="submit"
                      className={styles.footer__newsletter_btn}
                      aria-label={t("footer-newsletter-btn-aria-label", {
                        fallback: "Subscribe",
                      })}
                      disabled={isSubmitting}
                    >
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none">
                        <path
                          d="M1 6.5H14M14 6.5L8.5 1M14 6.5L8.5 12"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  {error && <p className={styles.footer__newsletter_error}>{error}</p>}
                  {isSubmitting && (
                    <p className={styles.footer__newsletter_status}>
                      {t("footer-newsletter-loading", { fallback: "Sending..." })}
                    </p>
                  )}
                </form>
              </div>

              <div className={styles.footer__nav}>
                <div className={styles.footer__nav_col}>
                  {NAV_COL_1.map((link) => (
                    <Link
                      key={link.href + link.text}
                      href={link.href}
                      className={styles.footer__nav_link}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
                <div className={styles.footer__nav_col}>
                  {NAV_COL_2.map((link) => (
                    <Link
                      key={link.href + link.text}
                      href={link.href}
                      className={styles.footer__nav_link}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer__bottom}>
            <div className={styles.footer__contact}>
              {WEBSITE_PHONE && (
                <div className={styles.footer__contact__item}>
                  <span>
                    {t("footer-contact-phone", { fallback: "Phone" })}:{" "}
                  </span>
                  <a href={`tel:${WEBSITE_PHONE}`}>{WEBSITE_PHONE}</a>
                </div>
              )}
              {WEBSITE_EMAIL && (
                <div className={styles.footer__contact__item}>
                  <span>
                    {t("footer-contact-email", { fallback: "Email" })}:{" "}
                  </span>
                  <a href={`mailto:${WEBSITE_EMAIL}`}>{WEBSITE_EMAIL}</a>
                </div>
              )}
              {WEBSITE_REGISTERED_ADDRESS && (
                <div className={styles.footer__contact__item}>
                  <span>
                    {t("footer-contact-registered-address", {
                      fallback: "Registered address",
                    })}
                    :
                  </span>
                  <p>{WEBSITE_REGISTERED_ADDRESS}</p>
                </div>
              )}
              {WEBSITE_OFFICE_ADDRESS && (
                <div className={styles.footer__contact__item}>
                  <span>
                    {t("footer-contact-office-address", {
                      fallback: "Office address",
                    })}
                    :
                  </span>
                  <p>{WEBSITE_OFFICE_ADDRESS}</p>
                </div>
              )}
            </div>

            <div className={styles.footer__bottom_right}>
              <div className={styles.footer__company_info}>
                <p className={styles.footer__company_name}>
                  Insigmark Sp. z o.o.
                </p>
                <p className={styles.footer__company_desc}>
                  {t("footer-company-desc", {
                    fallback:
                      "Complex web development, hosting and maintenance solutions.",
                  })}
                </p>
              </div>
              <p className={styles.footer__copyright}>
                © {year} Insigmark Sp. z o.o.{" "}
                {t("footer-all-rights", { fallback: "All rights reserved." })}{" "}
                {t(
                  "footer-web-development-hosting-and-digital-infrastructure-solutions",
                  {
                    fallback:
                      "Web development, hosting, and digital infrastructure solutions.",
                  },
                )}
              </p>
            </div>
          </div>

          <div className={styles.footer__legal}>
            <Link href="/legal/terms-and-conditions">
              {t("termsAndConditions", { fallback: "Terms and Conditions" })}
            </Link>
            <span className={styles.footer__legal_sep} aria-hidden="true" />
            <Link href="/legal/privacy-policy">
              {t("privacyPolicy", { fallback: "Privacy Policy" })}
            </Link>
            <span className={styles.footer__legal_sep} aria-hidden="true" />
            <Link href="/legal/cookie-policy">
              {t("cookiePolicy", { fallback: "Cookie Policy" })}
            </Link>
            <span className={styles.footer__legal_sep} aria-hidden="true" />
            <Link href="/legal/refund-policy">
              {t("refundPolicy", { fallback: "Refund Policy" })}
            </Link>
          </div>
        </div>
      </footer>

      <FormPopup
        isOpen={isSuccessOpen}
        onClose={handleCloseSuccess}
        ariaLabelledBy="footer-newsletter-success-title"
        panelClassName={styles.footer__popup_panel}
      >
        <div className={styles.footer__popup_success}>
          <h2 id="footer-newsletter-success-title" className={styles.footer__popup_title}>
            {t("footer-newsletter-success-title", { fallback: "Thank you!" })}
          </h2>
          <p className={styles.footer__popup_desc}>
            {t("footer-newsletter-success-message", {
              fallback:
                "Your request has been received. We will keep you updated with selected news, service updates, and special offers.",
            })}
          </p>
          <button
            type="button"
            className={styles.footer__popup_btn}
            onClick={handleCloseSuccess}
          >
            <ArrowIcon />
            {t("footer-newsletter-success-button", { fallback: "Got it" })}
          </button>
        </div>
      </FormPopup>
    </>
  );
};
