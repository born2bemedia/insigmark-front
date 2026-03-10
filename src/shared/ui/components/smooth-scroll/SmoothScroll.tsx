"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import Lenis from "lenis";

import { LENIS_REFRESH_EVENT } from "./lenis-refresh";

export const SmoothScroll = () => {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleRefresh = () => {
      setTimeout(() => lenis.resize(), 50);
    };

    window.addEventListener(LENIS_REFRESH_EVENT, handleRefresh);

    return () => {
      window.removeEventListener(LENIS_REFRESH_EVENT, handleRefresh);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => lenisRef.current?.resize(), 100);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};
