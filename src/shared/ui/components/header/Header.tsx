'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useLocale, useTranslations } from 'next-intl';

import { useAuthStore } from '@/features/account';
import { useCartStore } from '@/features/cart';

import { LangSelector } from '../language-switcher/LangSelector';
import styles from './Header.module.scss';

import { Link } from '@/i18n/navigation';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const totalItems = useCartStore((state) => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  });
  const locale = useLocale();

  const t = useTranslations('header');

  let color = 'black';
  if (pathname === '/') {
    color = 'navy';
  }

  const NAV_ITEMS = [
    { text: t('company', { fallback: 'Company' }), href: '/company' },
    { text: t('pricing', { fallback: 'Pricing' }), href: '/pricing' },
    { text: t('faq', { fallback: 'FAQ' }), href: '/faq' },
    { text: t('signin', { fallback: 'Sign In' }), href: '/signin' },
  ] as const;

  useEffect(() => {
    if (!isInitialized) {
      fetchUser();
    }
  }, [isInitialized, fetchUser]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === `${locale === 'en' ? '' : `/${locale}`}${href}`;

  return (
    <header
      className={`${styles.header} ${isMobileMenuOpen ? styles.open : ''} ${
        isScrolled ? styles.scrolled : ''
      } ${color === 'navy' ? styles.navy : ''}`}
    >
      <div className={styles.header__inner}>
        <Link href="/" className={styles.header__logo}>
          INSIGMARK
        </Link>

        <nav className={styles.header__nav}>
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={isActive(item.href) ? styles.active : ''}
            >
              {item.text}
            </Link>
          ))}
        </nav>

        <button
          className={`${styles.header__burger} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.header__mobile_menu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <nav>
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={isActive(item.href) ? styles.active : ''}
            >
              {item.text}
            </Link>
          ))}
        </nav>
        <div className={styles.header__mobile_actions}>
          {user ? (
            <Link href="/account" className={styles.header__btn_login}>
              {t('account', { fallback: 'Account' })}
            </Link>
          ) : (
            <>
              <Link href="/sign-up" className={styles.header__btn_signin}>
                {t('sign-up', { fallback: 'Sign up' })}
              </Link>
              <Link href="/log-in" className={styles.header__btn_login}>
                {t('login', { fallback: 'Login' })}
              </Link>
            </>
          )}
          <Link href="/checkout" className={styles.header__btn_cart}>
            {t('cart', { fallback: 'Cart' })}
            {totalItems > 0 && <span className={styles.header__cart_badge}>{totalItems}</span>}
          </Link>
        </div>
        <LangSelector />
      </div>
    </header>
  );
};
