'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

import { getArticles } from '@/features/articles/api/get-articles';
import { Article } from '@/features/articles/model/types';

import { fadeInUp } from '@/shared/lib/helpers/animations';
import { Button } from '@/shared/ui/kit/button/Button';

import styles from './ArticlesLoop.module.scss';

export const ArticlesLoop = ({ title }: { title?: string }) => {
  const [articles, setArticle] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('blog');
  const locale = useLocale();
  const isMountedRef = useRef(true);

  const fetcharticles = useCallback(async () => {
    if (!isMountedRef.current) return;

    setLoading(true);
    try {
      const fetchedarticles = await getArticles({ locale: locale });
      if (isMountedRef.current) {
        console.log(fetchedarticles[0].image.url);
        setArticle(fetchedarticles);
        setLoading(false);
      }
    } catch (error) {
      if (isMountedRef.current) {
        setLoading(false);
      }
      console.error('Error fetching articles:', error);
    }
  }, [locale]);

  useEffect(() => {
    isMountedRef.current = true;
    queueMicrotask(() => {
      void fetcharticles();
    });

    return () => {
      isMountedRef.current = false;
    };
  }, [fetcharticles]);

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  return (
    <section className={styles.articles_loop}>
      <div className={'container'}>
        <div className={styles.articles_loop__content}>
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={styles.articles_loop__skeleton_item} />
            ))
          ) : articles.length > 0 ? (
            articles.map((idea) => (
              <motion.div
                key={idea.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={styles.articles_loop__item}
              >
                <div
                  className={styles.articles_loop__image}
                  style={{
                    backgroundImage: `url(${SERVER_URL}${idea?.image?.url || ''})`,
                  }}
                >
                  <Image
                    src={SERVER_URL + idea?.image?.url || `/images/articles/${idea.slug}.png`}
                    alt={idea.title}
                    width={760}
                    height={400}
                  />
                </div>
                <div className={styles.articles_loop__details}>
                  <h3>{idea.title}</h3>
                  <p>{idea.excerpt}</p>
                  <Button variant="black" url={`/articles/${idea.slug}`} type="link">
                    {t('button', { fallback: 'Read Article' })}
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className={styles.articles_loop__empty}>
              <p>{t('empty', { fallback: 'No guides found' })}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
