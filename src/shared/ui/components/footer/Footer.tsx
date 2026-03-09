'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import {
  WEBSITE_EMAIL,
  WEBSITE_OFFICE_ADDRESS,
  WEBSITE_PHONE,
  WEBSITE_REGISTERED_ADDRESS,
} from '@/shared/lib/constants/constants';

import styles from './Footer.module.scss';

import { Link } from '@/i18n/navigation';

export const Footer = () => {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const NAV_COL_1 = [
    { text: 'Web Development', href: '/what' },
    { text: 'Hosting Solutions', href: '/pricing' },
    { text: 'Security, Audit & Maintenance', href: '/why' },
  ];

  const NAV_COL_2 = [
    { text: t('footer-pricing', { fallback: 'Pricing' }), href: '/pricing' },
    { text: t('footer-ideas', { fallback: 'Blog' }), href: '/ideas' },
    { text: 'FAQ', href: '/why' },
    { text: t('footer-who', { fallback: 'Company' }), href: '/who' },
    { text: t('footer-connect', { fallback: 'Contact' }), href: '/connect' },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__bg} />
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          <Link href="/" className={styles.footer__wordmark}>
            INSIGMARK
          </Link>

          <div className={styles.footer__right}>
            <div className={styles.footer__newsletter}>
              <div className={styles.footer__newsletter_heading}>
                <p className={styles.footer__newsletter_title}>
                  Stay
                  <br />
                  connected
                </p>
                <p className={styles.footer__newsletter_desc}>
                  Be the first to know about our special offers, deals, and new services.
                </p>
              </div>
              <form
                className={styles.footer__newsletter_form}
                onSubmit={handleNewsletterSubmit}
              >
                <div className={styles.footer__newsletter_input_wrap}>
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.footer__newsletter_input}
                  />
                  <button
                    type="submit"
                    className={styles.footer__newsletter_btn}
                    aria-label="Subscribe"
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
                  <Link key={link.href + link.text} href={link.href} className={styles.footer__nav_link}>
                    {link.text}
                  </Link>
                ))}
              </div>
              <div className={styles.footer__nav_col}>
                {NAV_COL_2.map((link) => (
                  <Link key={link.href + link.text} href={link.href} className={styles.footer__nav_link}>
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <div className={styles.footer__contact}>
            {WEBSITE_PHONE && <p>Phone: {WEBSITE_PHONE}</p>}
            {WEBSITE_EMAIL && <p>Email: {WEBSITE_EMAIL}</p>}
            {WEBSITE_REGISTERED_ADDRESS && <p>Registered address: {WEBSITE_REGISTERED_ADDRESS}</p>}
            {WEBSITE_OFFICE_ADDRESS && <p>Office address: {WEBSITE_OFFICE_ADDRESS}</p>}
          </div>

          <div className={styles.footer__bottom_right}>
            <div className={styles.footer__company_info}>
              <p className={styles.footer__company_name}>Insigmark Sp. z o.o.</p>
              <p className={styles.footer__company_desc}>
                Complex web development, hosting and maintenance solutions.
              </p>
            </div>
            <p className={styles.footer__copyright}>
              © {year} Insigmark Sp. z o.o. All rights reserved. Web development, hosting, and
              digital infrastructure solutions.
            </p>
          </div>
        </div>

        <div className={styles.footer__legal}>
          <Link href="/legal/terms-of-use">{t('terms-of-use', { fallback: 'Terms of Use' })}</Link>
          <span className={styles.footer__legal_sep} aria-hidden="true" />
          <Link href="/legal/privacy-policy">
            {t('privacy-policy-full', { fallback: 'Privacy Policy' })}
          </Link>
          <span className={styles.footer__legal_sep} aria-hidden="true" />
          <Link href="/legal/cookie-policy">
            {t('cookie-policy-full', { fallback: 'Cookie Policy' })}
          </Link>
          <span className={styles.footer__legal_sep} aria-hidden="true" />
          <Link href="/legal/refund-policy">
            {t('refund-policy-full', { fallback: 'Refund Policy' })}
          </Link>
        </div>
      </div>
    </footer>
  );
};
