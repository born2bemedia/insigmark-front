"use client";

import { useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

import { submitRequestForm } from "@/features/forms/api/submitForm";
import { type RequestFormSchema, requestFormSchema } from "@/features/forms/model/schemas";
import type { ServiceOrderData } from "@/features/forms/model/store";

import { excludedCountries } from "@/shared/lib/helpers/excludedCountries";
import { startLenis, stopLenis } from "@/shared/ui/components";

import { FormPopup } from "../FormPopup/FormPopup";
import styles from "./ServiceOrderPopup.module.scss";

import "react-phone-input-2/lib/style.css";

const ENABLE_RECAPTCHA = true;

const CloseIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 18.2334L28.3 9.93335L30.0667 11.7L21.7667 20L30.0667 28.3L28.3 30.0667L20 21.7667L11.7 30.0667L9.93335 28.3L18.2334 20L9.93335 11.7L11.7 9.93335L20 18.2334Z"
      fill="currentColor"
    />
  </svg>
);

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

type ServiceOrderPopupProps = {
  service: ServiceOrderData;
  isOpen: boolean;
  onClose: () => void;
};

export const ServiceOrderPopup = ({
  service,
  isOpen,
  onClose,
}: ServiceOrderPopupProps) => {
  const t = useTranslations("forms");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RequestFormSchema>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      companyName: "",
      website: "",
      message: "",
      recaptcha: "",
    },
  });

  const handleRecaptchaChange = (token: string | null) => {
    if (ENABLE_RECAPTCHA) {
      form.setValue("recaptcha", token ?? "", { shouldValidate: true });
    } else {
      form.setValue("recaptcha", "disabled", { shouldValidate: false });
    }
  };

  const onSubmit = async (data: RequestFormSchema) => {
    setError(null);
    setIsLoading(true);
    try {
      await submitRequestForm(data, service.title);
      setIsSuccess(true);
      form.reset();
      recaptchaRef.current?.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
      recaptchaRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
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
      onClose={onClose}
      ariaLabelledBy="service-order-popup-title"
      panelClassName={styles.panel}
    >
      <button
        type="button"
        className={styles.close}
        onClick={handleClose}
        aria-label="Close"
      >
        <CloseIcon />
      </button>

      {isSuccess ? (
        <div className={styles.successWrapper}>
          <h2
            id="service-order-popup-title"
            className={styles.successTitle}
          >
            {t("requestForm.successTitle", { fallback: "Thank you!" })}
          </h2>
          <p className={styles.successDesc}>
            {t("serviceOrder.successMessage", {
              fallback:
                "Your order has been submitted. Our team will review your request and contact you shortly. Please check your inbox for confirmation and updates.",
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
      ) : (
        <>
          <div className={styles.titleBlock}>
            <h2
              id="service-order-popup-title"
              className={styles.title}
            >
              Order <br />
              {service.title}
            </h2>
          </div>

          <div className={styles.formWrapper}>
            <form
              className={styles.form}
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="order-fullName">
                  {t("fullName", { fallback: "Name" })}
                </label>
                <input
                  id="order-fullName"
                  type="text"
                  className={`${styles.input} ${
                    form.formState.errors.fullName ? styles.inputError : ""
                  }`}
                  placeholder={t("fullNamePlaceholder", {
                    fallback: "Enter your full name",
                  })}
                  {...form.register("fullName")}
                />
                {form.formState.errors.fullName && (
                  <span className={styles.error}>
                    {form.formState.errors.fullName.message}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="order-email">
                  {t("email", { fallback: "E-mail" })}
                </label>
                <input
                  id="order-email"
                  type="email"
                  className={`${styles.input} ${
                    form.formState.errors.email ? styles.inputError : ""
                  }`}
                  placeholder={t("emailPlaceholder", {
                    fallback: "Enter your email address",
                  })}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <span className={styles.error}>
                    {form.formState.errors.email.message}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="order-phone">
                  {t("phone", { fallback: "Phone" })}
                </label>
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <PhoneInput
                      country="gb"
                      value={field.value}
                      onChange={field.onChange}
                      excludeCountries={[...new Set(excludedCountries)]}
                      containerClass={`${styles.phoneContainer} ${
                        form.formState.errors.phone ? styles.phoneError : ""
                      }`}
                      inputProps={{ id: "order-phone" }}
                      enableSearch
                      preferredCountries={["gb"]}
                    />
                  )}
                />
                {form.formState.errors.phone && (
                  <span className={styles.error}>
                    {form.formState.errors.phone.message}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="order-message">
                  {t("message", { fallback: "Message" })}{" "}
                  <span className={styles.labelOptional}>
                    {t("optional", { fallback: "(optional)" })}
                  </span>
                </label>
                <textarea
                  id="order-message"
                  className={styles.textarea}
                  placeholder={t("messagePlaceholder", {
                    fallback: "Enter your message",
                  })}
                  {...form.register("message")}
                />
              </div>

              {ENABLE_RECAPTCHA && (
                <div className={styles.recaptcha}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={
                      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""
                    }
                    onChange={handleRecaptchaChange}
                    theme="light"
                  />
                  {form.formState.errors.recaptcha && (
                    <span className={styles.error}>
                      {form.formState.errors.recaptcha.message}
                    </span>
                  )}
                </div>
              )}

              {error && <p className={styles.submitError}>{error}</p>}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={form.formState.isSubmitting || isLoading}
              >
                <ArrowIcon />
                {isLoading
                  ? t("loading", { fallback: "Sending…" })
                  : t("orderNow", { fallback: "Order now!" })}
              </button>
            </form>
          </div>
        </>
      )}
    </FormPopup>
  );
};
