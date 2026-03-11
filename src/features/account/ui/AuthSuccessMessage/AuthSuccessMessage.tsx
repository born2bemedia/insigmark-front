'use client';

import styles from './AuthSuccessMessage.module.scss';

import { Link } from '@/i18n/navigation';

type AuthSuccessMessageProps = {
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  closeHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

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

export const AuthSuccessMessage = ({
  title,
  description,
  primaryCtaLabel,
  primaryCtaHref,
  closeHref = '/',
  secondaryCtaLabel,
  secondaryCtaHref,
}: AuthSuccessMessageProps) => {
  return (
    <div className={styles.auth_success}>
      <Link href={closeHref} className={styles.auth_success__close} aria-label="Close success message">
        ×
      </Link>

      <h1 className={styles.auth_success__title}>{title}</h1>
      <p className={styles.auth_success__description}>{description}</p>

      <Link href={primaryCtaHref} className={styles.auth_success__button}>
        <span className={styles.auth_success__button_icon}>
          <ActionArrowIcon />
        </span>
        <span>{primaryCtaLabel}</span>
      </Link>

      {secondaryCtaLabel && secondaryCtaHref && (
        <Link href={secondaryCtaHref} className={styles.auth_success__secondary}>
          {secondaryCtaLabel}
        </Link>
      )}
    </div>
  );
};
