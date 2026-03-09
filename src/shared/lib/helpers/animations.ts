export const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: customDelay },
  }),
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -50 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: customDelay },
  }),
};

export const fadeInUpSlow = {
  hidden: { opacity: 0, y: 50 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: customDelay },
  }),
};

export const fadeInDownSlow = {
  hidden: { opacity: 0, y: -50 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: customDelay },
  }),
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: customDelay },
  }),
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: customDelay },
  }),
};

/** Lyniq-style: fade in with subtle Y, smooth easing */
export const fadeInUpLyniq = {
  hidden: { opacity: 0, y: 30 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: customDelay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

/** Lyniq-style: stagger container for children */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    transition: {
      delayChildren: customDelay,
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  }),
};

/** Lyniq-style: stagger item */
export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

/** Lyniq-style: scale + fade for cards */
export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: customDelay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};
