"use client";

import { useState } from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";

import {
  WEBSITE_EMAIL,
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_PHONE,
  WEBSITE_REGISTERED_ADDRESS,
} from "@/shared/lib/constants/constants";

import styles from "./Footer.module.scss";

import { Link } from "@/i18n/navigation";

export const Footer = () => {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
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
              >
                <div className={styles.footer__newsletter_input_wrap}>
                  <input
                    type="email"
                    placeholder={t("footer-newsletter-input-placeholder", {
                      fallback: "E-mail",
                    })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.footer__newsletter_input}
                  />
                  <button
                    type="submit"
                    className={styles.footer__newsletter_btn}
                    aria-label={t("footer-newsletter-btn-aria-label", {
                      fallback: "Subscribe",
                    })}
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
  );
};
