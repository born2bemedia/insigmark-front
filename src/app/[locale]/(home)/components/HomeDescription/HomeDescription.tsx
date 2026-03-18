'use client';

import { useRef } from 'react';

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useTranslations } from 'next-intl';

import styles from './HomeDescription.module.scss';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.35, ease: EASE },
  },
};

export const HomeDescription = () => {
  const t = useTranslations('homeDescription');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const textScale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [1.05, 0.9, 0.8, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [-30, 0, 0, 40]);

  return (
    <section ref={sectionRef} className={styles.home_description}>
      <div className={styles.home_description__img}>
        {/* Static image */}
        <div className={styles.home_description__img_inner} />

        {/* Scroll-driven text overlay */}
        <motion.div
          className={styles.home_description__overlay}
          style={{ scale: textScale, y: textY }}
        >
          <span className={styles.home_description__line1}>
            {t('line1', { fallback: 'From idea' })}
          </span>
          <span className={styles.home_description__line2}>
            {t('line2', { fallback: 'to impact' })}
          </span>
        </motion.div>
      </div>

      <motion.div
        className={styles.home_description__text}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
      >
        <div className={styles.home_description__text_inner}>
          <p className={styles.home_description__slogan}>
            {t('slogan', {
              fallback: 'Make your ideas visible, shareable, and alive online.',
            })}
            <br />
            {t('brand', { fallback: 'Insigmark' })}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
