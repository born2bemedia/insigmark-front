"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import Lenis from "lenis";

import {
  LENIS_REFRESH_EVENT,
  LENIS_START_EVENT,
  LENIS_STOP_EVENT,
} from "./lenis-refresh";

export const SmoothScroll = () => {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      prevent: (node) => node.hasAttribute?.("data-lenis-prevent") === true,
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

    const handleStop = () => lenis.stop();
    const handleStart = () => lenis.start();

    window.addEventListener(LENIS_REFRESH_EVENT, handleRefresh);
    window.addEventListener(LENIS_STOP_EVENT, handleStop);
    window.addEventListener(LENIS_START_EVENT, handleStart);

    return () => {
      window.removeEventListener(LENIS_REFRESH_EVENT, handleRefresh);
      window.removeEventListener(LENIS_STOP_EVENT, handleStop);
      window.removeEventListener(LENIS_START_EVENT, handleStart);
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
