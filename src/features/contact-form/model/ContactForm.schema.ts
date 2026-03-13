import { z } from 'zod';

// Set to false to disable reCAPTCHA validation (useful for development/testing)
const ENABLE_RECAPTCHA = true;
type Translate = (key: string, options?: { fallback?: string }) => string;

export const createContactFormSchema = (t: Translate) =>
  z.object({
    fullName: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    email: z
      .string()
      .email(t('validation.invalidEmail', { fallback: 'Invalid email address' }))
      .min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    phone: z.string().optional(),
    propertyLocation: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    primaryObjective: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    inheritance: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    description: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    documents: z.array(z.instanceof(File)).optional(),
    recaptcha: ENABLE_RECAPTCHA
      ? z.string().min(1, t('validation.recaptchaRequired', { fallback: 'Please complete the reCAPTCHA verification' }))
      : z.string().optional(),
  });

export type ContactFormSchema = z.infer<ReturnType<typeof createContactFormSchema>>;


export const createContactFormNewSchema = (t: Translate) =>
  z.object({
    fullName: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    email: z
      .string()
      .email(t('validation.invalidEmail', { fallback: 'Invalid email address' }))
      .min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    phone: z.string().optional(),
    message: z.string().optional(),
    recaptcha: ENABLE_RECAPTCHA
      ? z.string().min(1, t('validation.recaptchaRequired', { fallback: 'Please complete the reCAPTCHA verification' }))
      : z.string().optional(),
  });

export type ContactFormNewSchema = z.infer<ReturnType<typeof createContactFormNewSchema>>;

export const createHomeRequestSimpleSchema = (t: Translate) =>
  z.object({
    fullName: z.string().min(1, t('validation.nameRequired', { fallback: 'Name is required' })),
    email: z
      .string()
      .min(1, t('validation.emailRequired', { fallback: 'Email is required' }))
      .email(t('validation.invalidEmail', { fallback: 'Please enter a valid email' })),
    phone: z
      .string()
      .min(1, t('validation.phoneRequired', { fallback: 'Phone is required' }))
      .refine(
        (val) => /^[+]?[\d\s\-()]{10,}$/.test(val.replace(/\s/g, '')),
        t('validation.invalidPhone', { fallback: 'Please enter a valid phone number' }),
      ),
    message: z.string().optional(),
  });

export type HomeRequestSimpleSchema = z.infer<ReturnType<typeof createHomeRequestSimpleSchema>>;

export const createHomeFaqRequestFormSchema = (t: Translate) =>
  createHomeRequestSimpleSchema(t).extend({
    recaptcha: ENABLE_RECAPTCHA
      ? z.string().min(1, t('validation.recaptchaRequired', { fallback: 'Please complete the reCAPTCHA verification' }))
      : z.string().optional(),
  });

export type HomeFaqRequestFormSchema = z.infer<ReturnType<typeof createHomeFaqRequestFormSchema>>;

export const createHomeRequestFormSchema = (t: Translate) =>
  z.object({
    fullName: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    email: z
      .string()
      .email(t('validation.invalidEmail', { fallback: 'Invalid email address' }))
      .min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    phone: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    companyName: z.string().optional(),
    website: z.string().optional(),
    projectType: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    projectTypeOther: z.string().optional(),
    investmentRange: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    goals: z.string().optional(),
    frictionPoints: z.string().optional(),
    clientContext: z.string().optional(),
    timing: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    followUp: z.string().min(1, t('validation.requiredField', { fallback: 'This field is required' })),
    attachments: z.array(z.instanceof(File)).optional(),
  });

export type HomeRequestFormSchema = z.infer<ReturnType<typeof createHomeRequestFormSchema>>;

export const createContactProjectFormSchema = (t: Translate) =>
  z.object({
    projectType: z.array(z.string()).min(1, t('validation.checkboxRequired', { fallback: 'This checkbox is required.' })),
    fullName: z.string().trim().min(1, t('validation.requiredField', { fallback: 'This field is required.' })),
    email: z
      .string()
      .trim()
      .min(1, t('validation.requiredField', { fallback: 'This field is required.' }))
      .email(t('validation.invalidEmail', { fallback: 'Please check this field and provide the correct email address.' })),
    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => !value || /^[+]?[\d\s\-()]{7,}$/.test(value.replace(/\s/g, '')),
        t('validation.invalidPhone', { fallback: 'Please provide a valid phone number.' }),
      ),
    companyName: z.string().trim().optional(),
    projectScope: z.array(z.string()).min(1, t('validation.checkboxRequired', { fallback: 'This checkbox is required.' })),
    message: z.string().trim().min(1, t('validation.requiredField', { fallback: 'This field is required.' })),
    recaptcha: ENABLE_RECAPTCHA
      ? z.string().min(1, t('validation.recaptchaRequired', { fallback: 'Please complete the reCAPTCHA verification' }))
      : z.string().optional(),
  });

export type ContactProjectFormSchema = z.infer<ReturnType<typeof createContactProjectFormSchema>>;
