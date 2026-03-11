import { useTranslations } from 'next-intl';

import { WEBSITE_EMAIL, WEBSITE_OFFICE_ADDRESS, WEBSITE_PHONE, WEBSITE_REGISTERED_ADDRESS } from '@/shared/lib/constants/constants';

import styles from './ContactCompany.module.scss';

export const ContactCompany = () => {
  const t = useTranslations('contactPage');

  return (
    <section className={styles.company}>
      <div className={styles.containerWide}>
        <picture className={styles.companyImageWrap}>
          <source media="(max-width: 768px)" srcSet="/images/contact/contact-illustration-mobile.webp" />
          <img
            src="/images/contact/contact-illustration-desktop.webp"
            alt=""
            aria-hidden="true"
            className={styles.companyImage}
          />
        </picture>

        <div className={styles.companyContent}>
          <div className={styles.directCard}>
            <h2>{t('directTitle', { fallback: 'Prefer Direct Contact?' })}</h2>
            <p>
              {t('directDescription', {
                fallback:
                  'If you would like to contact us directly instead of submitting the form, you can reach our team using the details below.',
              })}
            </p>
            <div className={styles.directGrid}>
              <div>
                <span>{t('phoneLabel', { fallback: 'Phone:' })}</span>
                <a href={`tel:${WEBSITE_PHONE}`}>{WEBSITE_PHONE}</a>
              </div>
              <div>
                <span>{t('emailLabel', { fallback: 'Email' })}</span>
                <a href={`mailto:${WEBSITE_EMAIL}`}>{WEBSITE_EMAIL}</a>
              </div>
            </div>
            <p className={styles.directNote}>
              {t('directNote', {
                fallback: 'Our team monitors incoming messages regularly and will respond as soon as possible.',
              })}
            </p>
          </div>

          <div className={styles.infoBlock}>
            <h2>{t('companyInfoTitle', { fallback: 'Company Information' })}</h2>
            <p>
              {t('companyInfoDescription', {
                fallback:
                  "If you're ready to launch a website or improve an existing one, tell us what you're building. We'll review your request and reply with the next steps.",
              })}
            </p>
            <div className={styles.companyCard}>
              <h3>Insigmark Sp. z o.o.</h3>
              <div className={styles.companyCardGrid}>
                <div>
                  <span>{t('registeredAddressLabel', { fallback: 'Registered address:' })}</span>
                  <p>{WEBSITE_REGISTERED_ADDRESS}</p>
                </div>
                <div>
                  <span>{t('officeAddressLabel', { fallback: 'Office address:' })}</span>
                  <p>{WEBSITE_OFFICE_ADDRESS}</p>
                </div>
              </div>
              <p className={styles.companyCardText}>
                {t('companyCardText', {
                  fallback:
                    'We provide complete web development, hosting, and digital infrastructure solutions designed to support websites from the first idea to long-term operation.',
                })}
              </p>
            </div>
          </div>

          <div className={styles.footerCopy}>
            <h2>{t('finalTitle', { fallback: "Let's Build Something Reliable!" })}</h2>
            <p>
              {t('finalDescription', {
                fallback:
                  "If you're ready to start your project or explore the best technical solution for your website, our team will be happy to assist you.",
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
