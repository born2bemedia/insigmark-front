export const LENIS_REFRESH_EVENT = "lenis:refresh";

/** Dispatches event to trigger Lenis scroll recalculation (e.g. after tab change / DOM update) */
export const refreshLenis = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(LENIS_REFRESH_EVENT));
  }
};
