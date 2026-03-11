'use client';
import { useTranslations } from 'next-intl';

import styles from '@/features/account/ui/AuthSuccessMessage/AuthSuccessHero.module.scss';
import { AuthSuccessMessage } from '@/features/account/ui/AuthSuccessMessage/AuthSuccessMessage';

export default function SetPasswordSuccessPage() {
  const t = useTranslations('setPasswordSuccessPage');
  return (
    <section className={styles.auth_success_hero}>
      <div className={styles.auth_success_hero__inner}>
        <AuthSuccessMessage
          title={t('title', { fallback: 'Password updated' })}
          description={t('description', { fallback: 'Your password has been changed successfully. You can now log in with your new password.' })}
          primaryCtaLabel={t('primaryCtaLabel', { fallback: 'Got it' })}
          primaryCtaHref="/log-in"
          closeHref="/"
        />
      </div>
    </section>
  );
}
