import { z } from "zod";

// Set to false to disable reCAPTCHA (e.g. development)
const ENABLE_RECAPTCHA = true;
type Translate = (key: string, options?: { fallback?: string }) => string;

export const createCheckoutFormSchema = (t: Translate) =>
  z
  .object({
    firstName: z.string().min(1, t("validation.firstNameRequired", { fallback: "First name is required" })),
    lastName: z.string().min(1, t("validation.lastNameRequired", { fallback: "Last name is required" })),
    address1: z.string().min(1, t("validation.address1Required", { fallback: "Address Line 1 is required" })),
    address2: z.string().optional(),
    city: z.string().min(1, t("validation.cityRequired", { fallback: "City is required" })),
    country: z.string().min(1, t("validation.countryRequired", { fallback: "Country is required" })),
    zip: z.string().min(1, t("validation.zipRequired", { fallback: "ZIP Code is required" })),
    email: z
      .string()
      .email(t("validation.invalidEmail", { fallback: "Invalid email" }))
      .min(1, t("validation.emailRequired", { fallback: "Email is required" })),
    phone: z.string().optional(),
    orderNotes: z.string().optional(),
    termsAccepted: z.boolean().refine((val) => val, {
      message: t("validation.termsAcceptedRequired", { fallback: "You must accept the Terms of Use" }),
    }),
    refundPolicyAccepted: z.boolean().refine((val) => val, {
      message: t("validation.refundPolicyAcceptedRequired", { fallback: "You must accept the Refund Policy" }),
    }),
    recaptcha: ENABLE_RECAPTCHA
      ? z.string().min(1, t("validation.recaptchaRequired", { fallback: "Please complete the reCAPTCHA verification" }))
      : z.string().optional(),
  })
  .strict();

export type CheckoutFormSchema = z.infer<ReturnType<typeof createCheckoutFormSchema>>;
