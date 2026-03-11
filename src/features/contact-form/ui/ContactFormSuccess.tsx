"use client";

import { useEffect } from "react";

import { useTranslations } from "next-intl";

import { FormPopup } from "@/features/forms/ui/FormPopup/FormPopup";

import { startLenis, stopLenis } from "@/shared/ui/components";

import styles from "./ContactFormSuccess.module.scss";

const ArrowIcon = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.9148 16.321L15.6023 20.6335C15.4674 20.7684 15.2845 20.8442 15.0938 20.8442C14.903 20.8442 14.7201 20.7684 14.5852 20.6335C14.4504 20.4986 14.3746 20.3157 14.3746 20.125C14.3746 19.9343 14.4504 19.7514 14.5852 19.6165L17.6714 16.5312H6.46875C6.27813 16.5312 6.09531 16.4555 5.96052 16.3207C5.82573 16.1859 5.75 16.0031 5.75 15.8125V2.875C5.75 2.68438 5.82573 2.50156 5.96052 2.36677C6.09531 2.23198 6.27813 2.15625 6.46875 2.15625C6.65937 2.15625 6.84219 2.23198 6.97698 2.36677C7.11177 2.50156 7.1875 2.68438 7.1875 2.875V15.0938H17.6714L14.5852 12.0085C14.4504 11.8736 14.3746 11.6907 14.3746 11.5C14.3746 11.3093 14.4504 11.1264 14.5852 10.9915C14.7201 10.8566 14.903 10.7809 15.0938 10.7809C15.2845 10.7809 15.4674 10.8566 15.6023 10.9915L19.9148 15.304C19.9816 15.3707 20.0346 15.45 20.0708 15.5373C20.1069 15.6245 20.1256 15.718 20.1256 15.8125C20.1256 15.907 20.1069 16.0005 20.0708 16.0877C20.0346 16.175 19.9816 16.2543 19.9148 16.321Z"
      fill="currentColor"
    />
  </svg>
);

type ContactFormSuccessProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ContactFormSuccess = ({
  isOpen,
  onClose,
}: ContactFormSuccessProps) => {
  const t = useTranslations("forms");

  const handleClose = () => {
    startLenis();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      stopLenis();
    } else {
      startLenis();
    }
    return () => startLenis();
  }, [isOpen]);

  return (
    <FormPopup
      isOpen={isOpen}
      onClose={handleClose}
      ariaLabelledBy="contact-success-popup-title"
      panelClassName={styles.panel}
    >
      <div className={styles.successWrapper}>
        <h2
          id="contact-success-popup-title"
          className={styles.successTitle}
        >
          {t("requestForm.successTitle", { fallback: "Thank you!" })}
        </h2>
        <p className={styles.successDesc}>
          {t("requestForm.successMessage1", {
            fallback:
              "Your request for our service has been successfully submitted. Our team will review the information provided and get in touch with you shortly to discuss the next steps and how we can assist you.",
          })}
        </p>
        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleClose}
        >
          <ArrowIcon />
          {t("gotIt", { fallback: "Got it" })}
        </button>
      </div>
    </FormPopup>
  );
};
