export const LENIS_REFRESH_EVENT = "lenis:refresh";
export const LENIS_STOP_EVENT = "lenis:stop";
export const LENIS_START_EVENT = "lenis:start";

/** Dispatches event to trigger Lenis scroll recalculation (e.g. after tab change / DOM update) */
export const refreshLenis = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LENIS_REFRESH_EVENT));
  }
};

/** Stops Lenis (e.g. when modal/popup opens) — page scroll is locked, modal can use native scroll */
export const stopLenis = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LENIS_STOP_EVENT));
  }
};

/** Resumes Lenis (e.g. when modal/popup closes) */
export const startLenis = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LENIS_START_EVENT));
  }
};
