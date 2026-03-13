"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useLocale, useTranslations } from "next-intl";

import { useAuthStore } from "@/features/account";

import { WEBSITE_EMAIL, WEBSITE_PHONE } from "@/shared/lib/constants/constants";

import { LangSelector } from "../language-switcher/LangSelector";
import styles from "./Header.module.scss";

import { Link } from "@/i18n/navigation";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const locale = useLocale();

  const t = useTranslations("header");

  let color = "black";
  if (pathname === "/ " || pathname === "/de" || pathname === "/it" || pathname === "/pl") {
    color = "navy";
  }

  const navItems = [
    { text: t("company", { fallback: "Company" }), href: "/company" },
    { text: t("pricing", { fallback: "Pricing" }), href: "/pricing" },
    { text: t("faq", { fallback: "FAQ" }), href: "/faq" },
    {
      text: user
        ? t("account", { fallback: "Account" })
        : t("signin", { fallback: "Sign In" }),
      href: user ? "/account" : "/sign-in",
    },
  ];

  const serviceItems = [
    {
      text: t("webDevelopment", { fallback: "Web Development" }),
      href: "/web-development",
    },
    { text: t("hosting", { fallback: "Hosting" }), href: "/hosting-solutions" },
    {
      text: t("maintenance", { fallback: "Maintenance" }),
      href: "/security-audit-maintenance",
    },
    {
      text: t("contactProposal", { fallback: "Contact + Request Proposal" }),
      href: "/contact",
    },
  ];

  const mobileDropdownItems = [...serviceItems, ...navItems];

  useEffect(() => {
    if (!isInitialized) {
      fetchUser();
    }
  }, [isInitialized, fetchUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(max-width: 1024px)").matches) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    pathname === `${locale === "en" ? "" : `/${locale}`}${href}`;

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
        color === "navy" ? styles.navy : ""
      }`}
    >
      <div className={styles.header__inner}>
        <Link href="/" className={styles.header__logo}>
          <Image
            src="/images/logo.svg"
            alt="Insigmark"
            width={105}
            height={20}
          />
        </Link>

        <nav className={styles.header__nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.header__link} ${
                isActive(item.href) ? styles.header__link_active : ""
              }`}
            >
              {item.text}
            </Link>
          ))}
        </nav>

        <button
          className={`${styles.header__burger} ${
            isMenuOpen ? styles.header__burger_open : ""
          }`}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          type="button"
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={`${styles.header__dropdown_desktop} ${
          isMenuOpen ? styles.header__dropdown_desktop_open : ""
        }`}
      >
        <button
          className={styles.header__close}
          onClick={() => setIsMenuOpen(false)}
          aria-label={t("closeMenu", { fallback: "Close menu" })}
          type="button"
        >
          <span className={styles.header__close_line} />
          <span className={styles.header__close_line} />
        </button>

        <div className={styles.header__dropdown_body}>
          <nav className={styles.header__dropdown_nav}>
            {serviceItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`${styles.header__dropdown_link} ${
                  isActive(item.href) ? styles.header__dropdown_link_active : ""
                }`}
              >
                {item.text}
              </Link>
            ))}

          </nav>

          <LangSelector />

          <div className={styles.header__contacts}>
            <p className={styles.header__contact_label}>
              {t("phoneLabel", { fallback: "Phone:" })}
            </p>
            <a
              className={styles.header__contact_value}
              href={`tel:${WEBSITE_PHONE}`}
            >
              {WEBSITE_PHONE}
            </a>
            <p className={styles.header__contact_label}>
              {t("emailLabel", { fallback: "Email:" })}
            </p>
            <a
              className={`${styles.header__contact_value} ${styles.header__contact_email}`}
              href={`mailto:${WEBSITE_EMAIL}`}
            >
              {WEBSITE_EMAIL}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`${styles.header__dropdown_mobile} ${
          isMenuOpen ? styles.header__dropdown_mobile_open : ""
        }`}
      >
        <button
          className={styles.header__close}
          onClick={() => setIsMenuOpen(false)}
          aria-label={t("closeMenu", { fallback: "Close menu" })}
          type="button"
        >
          <span className={styles.header__close_line} />
          <span className={styles.header__close_line} />
        </button>

        <div className={styles.header__dropdown_body}>
          <nav className={styles.header__dropdown_nav}>
            {mobileDropdownItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`${styles.header__dropdown_link} ${
                  isActive(item.href) ? styles.header__dropdown_link_active : ""
                }`}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <LangSelector />

          <div className={styles.header__contacts}>
            <p className={styles.header__contact_label}>
              {t("phoneLabel", { fallback: "Phone:" })}
            </p>
            <a
              className={styles.header__contact_value}
              href={`tel:${WEBSITE_PHONE}`}
            >
              {WEBSITE_PHONE}
            </a>
            <p className={styles.header__contact_label}>
              {t("emailLabel", { fallback: "Email:" })}
            </p>
            <a
              className={`${styles.header__contact_value} ${styles.header__contact_email}`}
              href={`mailto:${WEBSITE_EMAIL}`}
            >
              {WEBSITE_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
