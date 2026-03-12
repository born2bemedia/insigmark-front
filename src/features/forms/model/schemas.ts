import { z } from "zod";

// Set to false to disable reCAPTCHA (e.g. development)
const ENABLE_RECAPTCHA = true;

const serviceSchema = z.string().optional();
const messageSchema = z.string().optional();
const recaptchaSchema = ENABLE_RECAPTCHA
  ? z.string().min(1, "Please complete the reCAPTCHA verification")
  : z.string().optional();

const phoneSchema = z
  .string()
  .min(1, "This field is required")
  .refine(
    (val) => /^[+]?[\d\s-]{10,}$/.test(val.replace(/\s/g, "")),
    "Please provide a valid phone number.",
  );

const companyNameSchema = z.string().optional();
const websiteSchema = z.string().optional();
const emailSchema = z
  .string()
  .min(1, "This field is required")
  .email("Please provide a valid email address.");

const fullNameSchema = z.string().min(1, "This field is required");

// 1. [PACKAGE NAME] / [SERVICE NAME] Request (same schema)
export const requestFormSchema = z.object({
  service: serviceSchema,
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  companyName: companyNameSchema,
  website: websiteSchema,
  message: messageSchema,
  recaptcha: recaptchaSchema,
});

export type RequestFormSchema = z.infer<typeof requestFormSchema>;

// 2. Assistance Request (Simple request form: Name, E-mail, Phone, Message)
export const assistanceRequestFormSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: messageSchema,
  recaptcha: recaptchaSchema,
});

export type AssistanceRequestFormSchema = z.infer<typeof assistanceRequestFormSchema>;

// 3. Call Request (Name, Phone, Message - optional Email for confirmation)
export const callRequestFormSchema = z.object({
  fullName: fullNameSchema,
  phone: phoneSchema,
  email: z.union([z.string().email(), z.literal('')]).optional(),
  message: messageSchema,
  recaptcha: recaptchaSchema,
});

export type CallRequestFormSchema = z.infer<typeof callRequestFormSchema>;
