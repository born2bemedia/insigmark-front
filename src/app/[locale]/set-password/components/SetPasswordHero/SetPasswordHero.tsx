'use client';

import { motion } from 'framer-motion';

import { SetPasswordForm } from '@/features/account/ui/SetPasswordForm/SetPasswordForm';

import { fadeInUp } from '@/shared/lib/helpers/animations';

import styles from './SetPasswordHero.module.scss';

export const SetPasswordHero = ({ token }: { token: string }) => {
  return (
    <motion.section
      className={styles.set_password_form}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className={styles.set_password_form__inner}>
        <SetPasswordForm token={token} />
      </div>
    </motion.section>
  );
};
