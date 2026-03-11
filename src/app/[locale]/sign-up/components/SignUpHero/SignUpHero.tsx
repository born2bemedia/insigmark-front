'use client';

import { motion } from 'framer-motion';

import { RegistrationForm } from '@/features/account';

import { fadeInUp } from '@/shared/lib/helpers/animations';

import { SignUpAssistance } from '../SignUpAssistance/SignUpAssistance';
import styles from './SignUpHero.module.scss';

export const SignUpHero = () => {
  return (
    <>
      <motion.section
        className={styles.sign_up_hero}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className={styles.sign_up_hero__inner}>
          <RegistrationForm />
        </div>
      </motion.section>

      <SignUpAssistance />
    </>
  );
};
