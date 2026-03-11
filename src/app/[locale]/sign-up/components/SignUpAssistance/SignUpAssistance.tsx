'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { HomeRequestForm } from '@/features/contact-form/ui/HomeRequestForm';

import { fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './SignUpAssistance.module.scss';

export const SignUpAssistance = () => {
  const t = useTranslations('HomeRequest');

  return (
    <motion.section
      className={styles.sign_up_assistance}
      id="home-form"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeInUp}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/request-bg.png"
        alt=""
        aria-hidden="true"
        className={styles.sign_up_assistance__bg}
      />

      <div className={styles.sign_up_assistance__inner}>
        <h2 className={styles.sign_up_assistance__title}>
          {t('titleNeedAssistance', { fallback: 'Need Assistance?' })}
        </h2>

        <div className={styles.sign_up_assistance__row}>
          <div className={styles.sign_up_assistance__left}>
            <p className={styles.sign_up_assistance__desc}>
              {t('description', {
                fallback:
                  'We’re here to make sure you can confidently trust us with your website development, hosting, and support. Reach out! Our team will respond as soon as possible.',
              })}
            </p>
            <p className={styles.sign_up_assistance__team}>
              {t('team', { fallback: 'Insigmark Team' })}
            </p>
          </div>

          <div className={styles.sign_up_assistance__right}>
            <HomeRequestForm />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
