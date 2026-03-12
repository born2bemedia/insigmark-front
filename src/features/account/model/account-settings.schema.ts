import { z } from 'zod';
type Translate = (key: string, options?: { fallback?: string }) => string;

export const createContactDataSchema = (t: Translate) =>
  z.object({
    firstName: z.string().min(1, t('validation.nameRequired', { fallback: 'Name is required' })),
    lastName: z.string().min(1, t('validation.lastNameRequired', { fallback: 'Last name is required' })),
    phone: z.string().optional(),
    email: z
      .string()
      .email(t('validation.invalidEmail', { fallback: 'Invalid email' }))
      .min(1, t('validation.emailRequired', { fallback: 'Email is required' })),
    address1: z.string().min(1, t('validation.addressRequired', { fallback: 'Address is required' })),
    address2: z.string().min(1, t('validation.addressRequired', { fallback: 'Address is required' })),
    city: z.string().min(1, t('validation.cityRequired', { fallback: 'City is required' })),
    country: z.string().min(1, t('validation.countryRequired', { fallback: 'Country is required' })),
    zip: z.string().min(1, t('validation.zipRequired', { fallback: 'Zip is required' })),
  });

export const createChangePasswordSchema = (t: Translate) =>
  z
    .object({
      currentPassword: z.string().min(1, t('validation.currentPasswordRequired', { fallback: 'Current password is required' })),
      newPassword: z.string().min(1, t('validation.newPasswordRequired', { fallback: 'New password is required' })),
      repeatNewPassword: z.string().min(1, t('validation.repeatNewPasswordRequired', { fallback: 'Repeat new password' })),
    })
    .refine((data) => data.newPassword === data.repeatNewPassword, {
      message: t('validation.passwordsDoNotMatch', { fallback: 'The passwords do not match.' }),
      path: ['repeatNewPassword'],
    });

export const createRegistrationSchema = (t: Translate) =>
  z
    .object({
      firstName: z.string().min(1, t('validation.firstNameRequired', { fallback: 'Please enter your first name.' })),
      lastName: z.string().min(1, t('validation.lastNameRequired', { fallback: 'Please enter your last name.' })),
      username: z.string().optional(),
      email: z
        .string()
        .min(1, t('validation.emailRequired', { fallback: 'Please enter your email address.' }))
        .email(t('validation.invalidEmail', { fallback: 'Please enter a valid email address.' })),
      phone: z.string().optional(),
      password: z.string().min(1, t('validation.passwordRequired', { fallback: 'Please create a password.' })),
      repeatPassword: z.string().min(1, t('validation.repeatPasswordRequired', { fallback: 'Please repeat your password' })),
      agreement: z.boolean().optional(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t('validation.passwordsDoNotMatch', { fallback: "Passwords don't match" }),
      path: ['repeatPassword'],
    });

export type ContactDataSchema = z.infer<ReturnType<typeof createContactDataSchema>>;
export type ChangePasswordSchema = z.infer<ReturnType<typeof createChangePasswordSchema>>;
export type RegistrationSchema = z.infer<ReturnType<typeof createRegistrationSchema>>;
