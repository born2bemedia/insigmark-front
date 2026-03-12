"use client";

import { useEffect } from "react";

import { refreshLenis } from "./lenis-refresh";

export const LenisRefreshOnMount = () => {
  useEffect(() => {
    refreshLenis();
  }, []);

  return null;
};
