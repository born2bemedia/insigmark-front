'use client';

import { motion } from 'framer-motion';

import { ForgotPasswordForm } from '@/features/account/ui/ForgotPasswordForm/ForgotPasswordForm';

import { fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './ForgotPasswordHero.module.scss';

export const ForgotPasswordHero = () => {
  return (
    <motion.section
      className={styles.forgot_password_form}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className={styles.forgot_password_form__inner}>
        <ForgotPasswordForm />
      </div>
    </motion.section>
  );
};
