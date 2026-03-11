"use client";

import { useFormsPopupStore } from "@/features/forms/model/store";

import { AssistanceRequestPopup } from "../AssistanceRequestPopup/AssistanceRequestPopup";
import { CallRequestPopup } from "../CallRequestPopup/CallRequestPopup";
import { RequestPopup } from "../RequestPopup/RequestPopup";
import { ServiceOrderPopup } from "../ServiceOrderPopup/ServiceOrderPopup";

export function FormsPopupRenderer() {
  const popupType = useFormsPopupStore((state) => state.popupType);
  const requestName = useFormsPopupStore((state) => state.requestName);
  const serviceOrder = useFormsPopupStore((state) => state.serviceOrder);

  const closePopup = () => {
    useFormsPopupStore.setState({
      popupType: null,
      requestName: "",
      serviceOrder: null,
    });
  };

  return (
    <>
      {popupType === "request" && requestName && (
        <RequestPopup
          service={requestName}
          isOpen
          onClose={closePopup}
          onReturnHome={closePopup}
        />
      )}
      {popupType === "service-order" && serviceOrder && (
        <ServiceOrderPopup
          service={serviceOrder}
          isOpen
          onClose={closePopup}
        />
      )}
      {popupType === "assistance-request" && (
        <AssistanceRequestPopup isOpen onClose={closePopup} />
      )}
      {popupType === "call-request" && (
        <CallRequestPopup isOpen onClose={closePopup} />
      )}
    </>
  );
}
