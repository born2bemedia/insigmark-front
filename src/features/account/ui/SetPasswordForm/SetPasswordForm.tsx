'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthStore } from '@/features/account/store/auth';

import styles from './SetPasswordFormDesign.module.scss';

import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';

const setPasswordSchema = z
  .object({
    newPassword: z.string().min(1, 'New password is required'),
    repeatNewPassword: z.string().min(1, 'Please repeat your new password'),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    path: ['repeatNewPassword'],
    message: 'Passwords do not match.',
  });

type SetPasswordFormSchema = z.infer<typeof setPasswordSchema>;

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

export const SetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const resetPassword = useAuthStore((s) => s.resetPassword);
  const isLoading = useAuthStore((s) => s.isLoading);
  const t = useTranslations('setPasswordPage');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SetPasswordFormSchema>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { newPassword: '', repeatNewPassword: '' },
  });

  const onSubmit = async (data: SetPasswordFormSchema) => {
    const result = await resetPassword(token, data.newPassword);

    if (result.ok) {
      router.push('/set-password/success');
      return;
    }

    setError('root', { message: result.message ?? 'Reset password failed.' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.set_password_form} noValidate>
      <Link href="/" className={styles.set_password_form__close} aria-label="Close set password form">
        ×
      </Link>

      <h1 className={styles.set_password_form__title}>
        {t('titleLong', { fallback: 'Set a new password' })}
      </h1>

      <div className={styles.set_password_form__inputs}>
        <div
          className={`${styles.set_password_form__field} ${
            errors.newPassword ? styles.set_password_form__field_error : ''
          }`}
        >
          <label htmlFor="newPassword" className={styles.set_password_form__sr_only}>
            {t('newPassword', { fallback: 'New password' })}
          </label>
          <input
            id="newPassword"
            type="password"
            {...register('newPassword')}
            autoComplete="new-password"
            placeholder={t('newPasswordLabel', { fallback: 'New password:' })}
            aria-invalid={!!errors.newPassword}
          />
          {errors.newPassword && (
            <span className={styles.set_password_form__error}>{errors.newPassword.message}</span>
          )}
        </div>

        <div
          className={`${styles.set_password_form__field} ${
            errors.repeatNewPassword ? styles.set_password_form__field_error : ''
          }`}
        >
          <label htmlFor="repeatNewPassword" className={styles.set_password_form__sr_only}>
            {t('repeatNewPassword', { fallback: 'Repeat new password' })}
          </label>
          <input
            id="repeatNewPassword"
            type="password"
            {...register('repeatNewPassword')}
            autoComplete="new-password"
            placeholder={t('repeatNewPasswordLabel', { fallback: 'Repeat new password:' })}
            aria-invalid={!!errors.repeatNewPassword}
          />
          {errors.repeatNewPassword && (
            <span className={styles.set_password_form__error}>
              {errors.repeatNewPassword.message}
            </span>
          )}
        </div>
      </div>

      {errors.root && <span className={styles.set_password_form__root_error}>{errors.root.message}</span>}

      <button type="submit" className={styles.set_password_form__submit} disabled={isLoading}>
        <span className={styles.set_password_form__submit_icon}>
          <ActionArrowIcon />
        </span>
        <span>
          {isLoading
            ? t('savingPassword', { fallback: 'Saving password...' })
            : t('savePasswordCta', { fallback: 'Save password' })}
        </span>
      </button>
    </form>
  );
};
