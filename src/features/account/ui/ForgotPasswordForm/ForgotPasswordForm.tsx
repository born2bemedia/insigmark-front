'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthStore } from '@/features/account/store/auth';

import styles from './ForgotPasswordFormDesign.module.scss';

import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Please enter username or email'),
});

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>;

const ActionArrowIcon = () => {
  return (
    <svg
      width="14"
      height="19"
      viewBox="0 0 14.3756 18.6879"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14.1648 14.1648L9.85227 18.4773C9.7174 18.6121 9.53448 18.6879 9.34375 18.6879C9.15302 18.6879 8.9701 18.6121 8.83523 18.4773C8.70037 18.3424 8.6246 18.1595 8.6246 17.9688C8.6246 17.778 8.70037 17.5951 8.83523 17.4602L11.9214 14.375H0.71875C0.528126 14.375 0.345309 14.2993 0.210517 14.1645C0.0757254 14.0297 0 13.8469 0 13.6562V0.71875C0 0.528126 0.0757254 0.345309 0.210517 0.210517C0.345309 0.0757252 0.528126 0 0.71875 0C0.909374 0 1.09219 0.0757252 1.22698 0.210517C1.36177 0.345309 1.4375 0.528126 1.4375 0.71875V12.9375H11.9214L8.83523 9.85227C8.70037 9.7174 8.6246 9.53448 8.6246 9.34375C8.6246 9.15302 8.70037 8.9701 8.83523 8.83523C8.9701 8.70037 9.15302 8.6246 9.34375 8.6246C9.53448 8.6246 9.7174 8.70037 9.85227 8.83523L14.1648 13.1477C14.2316 13.2145 14.2846 13.2938 14.3208 13.381C14.3569 13.4683 14.3756 13.5618 14.3756 13.6562C14.3756 13.7507 14.3569 13.8442 14.3208 13.9315C14.2846 14.0187 14.2316 14.098 14.1648 14.1648Z"
        fill="#060606"
      />
    </svg>
  );
};

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const forgotPassword = useAuthStore((s) => s.forgotPassword);
  const isLoading = useAuthStore((s) => s.isLoading);
  const t = useTranslations('forgotPasswordPage');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormSchema) => {
    const result = await forgotPassword(data.email);
    if (result.ok) {
      router.push('/forgot-password/success');
    } else {
      setError('root', {
        message: result.message ?? 'Forgot password failed.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.forgot_password_form} noValidate>
      <Link href="/" className={styles.forgot_password_form__close} aria-label="Close forgot password form">
        ×
      </Link>

      <h1 className={styles.forgot_password_form__title}>
        {t('titleLong', { fallback: 'Forgot your password? ' })}
        <br />
        {t('titleLong2', { fallback: "Let's fix that!" })}
      </h1>

      <div className={styles.forgot_password_form__inputs}>
        <div
          className={`${styles.forgot_password_form__field} ${
            errors.email ? styles.forgot_password_form__field_error : ''
          }`}
        >
          <label htmlFor="email" className={styles.forgot_password_form__sr_only}>
            {t('email', { fallback: 'Email' })}
          </label>
          <input
            id="email"
            type="text"
            {...register('email')}
            autoComplete="email"
            placeholder={t('emailLabel', { fallback: 'Email:' })}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className={styles.forgot_password_form__error}>{errors.email.message}</span>
          )}
        </div>
      </div>

      {errors.root && (
        <span className={styles.forgot_password_form__root_error}>{errors.root.message}</span>
      )}

      <button type="submit" className={styles.forgot_password_form__submit} disabled={isLoading}>
        <span className={styles.forgot_password_form__submit_icon}>
          <ActionArrowIcon />
        </span>
        <span>
          {isLoading
            ? t('resettingPassword', { fallback: 'Resetting password...' })
            : t('resetPasswordCta', { fallback: 'Send reset link' })}
        </span>
      </button>
    </form>
  );
};
