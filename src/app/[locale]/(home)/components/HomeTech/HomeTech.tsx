"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { fadeInUpLyniq } from "@/shared/lib/helpers/animations";

import styles from "./HomeTech.module.scss";

const LOGOS = [
  { src: "/images/home/tech-nextjs.svg", alt: "Next.js" },
  { src: "/images/home/tech-nodejs.svg", alt: "Node.js" },
  { src: "/images/home/tech-typescript.svg", alt: "TypeScript" },
  { src: "/images/home/tech-wordpress.svg", alt: "WordPress" },
  { src: "/images/home/tech-aws.svg", alt: "AWS" },
];

export const HomeTech = () => {
  return (
    <motion.section
      className={styles.home_tech}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUpLyniq}
    >
      <div className={styles.home_tech__track}>
        {/* Render twice for seamless loop */}
        { [...LOGOS, ...LOGOS].map((logo, i) => (
          <div key={i} className={styles.home_tech__item}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={100}
              height={100}
              className={styles.home_tech__logo}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};
