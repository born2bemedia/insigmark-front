"use client";

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export type FormsPopupType =
  | "market-research"
  | "property-consultation"
  | "request"
  | "service-order"
  | "assistance-request"
  | "call-request";

export type ServiceOrderData = {
  id: string;
  title: string;
  price: number;
};

type FormsPopupStore = {
  popupType: FormsPopupType | null;
  requestName: string;
  serviceOrder: ServiceOrderData | null;
  openMarketResearch: () => void;
  openPropertyConsultation: () => void;
  openRequest: (name: string) => void;
  openServiceOrder: (service: ServiceOrderData) => void;
  openAssistanceRequest: () => void;
  openCallRequest: () => void;
  closePopup: () => void;
};

export const useFormsPopupStore = create<FormsPopupStore>((set) => ({
  popupType: null,
  requestName: "",
  serviceOrder: null,

  openMarketResearch: () => set({ popupType: "market-research" }),

  openPropertyConsultation: () => set({ popupType: "property-consultation" }),

  openRequest: (name: string) => set({ requestName: name, popupType: "request" }),

  openServiceOrder: (service: ServiceOrderData) =>
    set({ serviceOrder: service, popupType: "service-order" }),

  openAssistanceRequest: () => set({ popupType: "assistance-request" }),

  openCallRequest: () => set({ popupType: "call-request" }),

  closePopup: () =>
    set({ popupType: null, requestName: "", serviceOrder: null }),
}));

/** Hook with only actions (for components that only open/close popups). */
export function useFormsPopup() {
  return useFormsPopupStore(
    useShallow((state) => ({
      openMarketResearch: state.openMarketResearch,
      openPropertyConsultation: state.openPropertyConsultation,
      openRequest: state.openRequest,
      openServiceOrder: state.openServiceOrder,
      openAssistanceRequest: state.openAssistanceRequest,
      openCallRequest: state.openCallRequest,
      closePopup: state.closePopup,
    }))
  );
}
