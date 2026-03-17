'use client';

import { useEffect, useState } from 'react';

import st from './page.module.scss';

type TocItem = {
  id: string;
  title: string;
};

type Props = {
  items: TocItem[];
};

export function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const offset = 150;

    const handleScroll = () => {
      let current = '';

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        if (el.getBoundingClientRect().top <= offset) {
          current = item.id;
        }
      }

      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <nav className={st.chapterList}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`${st.chapterItem} ${
            item.id === activeId ? st['chapterItem--active'] : ''
          }`}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
