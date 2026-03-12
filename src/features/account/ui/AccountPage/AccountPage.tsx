"use client";

import { useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MyOrdersPage } from "@/features/account";
import { useAuthStore } from "@/features/account/store/auth";

import { cn } from "@/shared/lib/helpers/styles";
import { refreshLenis } from "@/shared/ui/components";

import styles from "./AccountPage.module.scss";

import { useRouter } from "@/i18n/navigation";

type AccountTab = "personal" | "orders";

const personalDataSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(1, "Postal code is required"),
});

const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(1, "New password is required"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["newPassword"],
        message: "Password must be at least 8 characters.",
      });
    }
  });

type PersonalDataSchema = z.infer<typeof personalDataSchema>;
type PasswordChangeSchema = z.infer<typeof passwordChangeSchema>;

const LinkArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
    >
      <path
        d="M19.9148 16.321L15.6023 20.6335C15.4674 20.7684 15.2845 20.8442 15.0938 20.8442C14.903 20.8442 14.7201 20.7684 14.5852 20.6335C14.4504 20.4986 14.3746 20.3157 14.3746 20.125C14.3746 19.9343 14.4504 19.7514 14.5852 19.6165L17.6714 16.5312H6.46875C6.27813 16.5312 6.09531 16.4555 5.96052 16.3207C5.82573 16.1859 5.75 16.0031 5.75 15.8125V2.875C5.75 2.68438 5.82573 2.50156 5.96052 2.36677C6.09531 2.23198 6.27813 2.15625 6.46875 2.15625C6.65937 2.15625 6.84219 2.23198 6.97698 2.36677C7.11177 2.50156 7.1875 2.68438 7.1875 2.875V15.0938H17.6714L14.5852 12.0085C14.4504 11.8736 14.3746 11.6907 14.3746 11.5C14.3746 11.3093 14.4504 11.1264 14.5852 10.9915C14.7201 10.8566 14.903 10.7809 15.0938 10.7809C15.2845 10.7809 15.4674 10.8566 15.6023 10.9915L19.9148 15.304C19.9816 15.3707 20.0346 15.45 20.0708 15.5373C20.1069 15.6245 20.1256 15.718 20.1256 15.8125C20.1256 15.907 20.1069 16.0005 20.0708 16.0877C20.0346 16.175 19.9816 16.2543 19.9148 16.321Z"
        fill="#023D65"
      />
    </svg>
  );
};

const EditIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.607 3.5C14.7394 3.50003 14.8663 3.55253 14.96 3.646L17.789 6.475C17.8827 6.56876 17.9354 6.69592 17.9354 6.8285C17.9354 6.96108 17.8827 7.08824 17.789 7.182L8.596 16.374C8.53321 16.4367 8.45486 16.4816 8.369 16.504L4.541 17.504C4.45662 17.526 4.36795 17.5256 4.2838 17.5027C4.19964 17.4799 4.12292 17.4354 4.06126 17.3737C3.9996 17.3121 3.95514 17.2354 3.93229 17.1512C3.90944 17.067 3.90899 16.9784 3.931 16.894L4.931 13.066C4.95342 12.9801 4.99829 12.9018 5.061 12.839L14.253 3.646C14.2995 3.5996 14.3547 3.56282 14.4155 3.53777C14.4762 3.51272 14.5413 3.49988 14.607 3.5ZM4 19.25C3.80109 19.25 3.61032 19.329 3.46967 19.4697C3.32902 19.6103 3.25 19.8011 3.25 20C3.25 20.1989 3.32902 20.3897 3.46967 20.5303C3.61032 20.671 3.80109 20.75 4 20.75H19C19.1989 20.75 19.3897 20.671 19.5303 20.5303C19.671 20.3897 19.75 20.1989 19.75 20C19.75 19.8011 19.671 19.6103 19.5303 19.4697C19.3897 19.329 19.1989 19.25 19 19.25H4Z"
        fill="#0C0C0C"
        fillOpacity="0.4"
      />
    </svg>
  );
};

const LogoutIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13.496 21C13.496 21 6.71 21 5.605 21C4.5 21 4.5 19.849 4.5 18.429V5.57C4.5 4.151 4.5 3 5.605 3L13.5 3M16 15.5L19.5 12L16 8.5M9.5 11.996H19.5"
        stroke="#023D65"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

function splitFullName(fullName: string, fallbackLastName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: "", lastName: fallbackLastName };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" ") || fallbackLastName,
  };
}

export const AccountPage = () => {
  const settingsT = useTranslations("account");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const logout = useAuthStore((s) => s.logout);
  const setUser = useAuthStore((s) => s.setUser);
  const [personalMessage, setPersonalMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<AccountTab>("personal");
  const [editingFields, setEditingFields] = useState<Set<string>>(new Set());

  const toggleFieldEdit = (fieldName: string) => {
    setEditingFields((prev) => {
      const next = new Set(prev);
      if (next.has(fieldName)) {
        next.delete(fieldName);
      } else {
        next.add(fieldName);
        const inputId = `account-${fieldName}`;
        setTimeout(() => {
          (document.getElementById(inputId) as HTMLInputElement | null)?.focus();
        }, 0);
      }
      return next;
    });
  };

  const personalForm = useForm<PersonalDataSchema>({
    resolver: zodResolver(personalDataSchema),
    defaultValues: {
      fullName: "",
      email: "",
      country: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      zip: "",
    },
  });

  const passwordForm = useForm<PasswordChangeSchema>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!isInitialized) return;
    if (!user) {
      router.replace("/sign-in");
    }
  }, [isInitialized, user, router]);

  useEffect(() => {
    if (!user) return;
    personalForm.reset({
      fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      email: user.email ?? "",
      country: user.country ?? "",
      phone: user.phone ?? "",
      address1: user.address1 ?? "",
      address2: user.address2 ?? "",
      city: user.city ?? "",
      zip: user.zip ?? "",
    });
  }, [personalForm, user]);

  useEffect(() => {
    if (isInitialized && user) {
      refreshLenis();
    }
  }, [isInitialized, user, activeTab]);

  const handleLogout = async () => {
    await logout();
    router.push("/sign-in");
  };

  const onPersonalSubmit = async (data: PersonalDataSchema) => {
    if (!user) return;
    setPersonalMessage(null);

    const { firstName, lastName } = splitFullName(
      data.fullName,
      user.lastName ?? "",
    );

    try {
      const profileResponse = await fetch("/api/account/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          email: data.email,
          phone: data.phone || undefined,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          country: data.country,
          zip: data.zip,
        }),
      });

      const profileJson = (await profileResponse.json()) as {
        user?: Record<string, unknown>;
        message?: string;
      };

      if (!profileResponse.ok || !profileJson.user) {
        setPersonalMessage({
          type: "error",
          text: profileJson.message ?? "Update failed.",
        });
        return;
      }

      const updated = profileJson.user as {
        email?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        address1?: string;
        address2?: string;
        city?: string;
        country?: string;
        zip?: string;
      };

      setUser({
        id: user.id,
        email: updated.email ?? data.email,
        firstName: updated.firstName ?? firstName,
        lastName: updated.lastName ?? lastName,
        phone: updated.phone ?? data.phone,
        address1: updated.address1 ?? data.address1,
        address2: updated.address2 ?? data.address2,
        city: updated.city ?? data.city,
        country: updated.country ?? data.country,
        zip: updated.zip ?? data.zip,
      });

      await fetchUser();
      setEditingFields(new Set());
      setPersonalMessage({
        type: "success",
        text: settingsT("dataUpdated", {
          fallback: "Data updated successfully!",
        }),
      });
    } catch {
      setPersonalMessage({
        type: "error",
        text: "Update failed.",
      });
    }
  };

  const onPasswordSubmit = async (data: PasswordChangeSchema) => {
    if (!user) return;
    setPasswordMessage(null);

    try {
      const passwordResponse = await fetch("/api/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const passwordJson = (await passwordResponse.json()) as {
        message?: string;
      };

      if (!passwordResponse.ok) {
        setPasswordMessage({
          type: "error",
          text: passwordJson.message ?? "Password update failed.",
        });
        return;
      }

      passwordForm.reset({ currentPassword: "", newPassword: "" });
      setEditingFields((prev) => {
        const next = new Set(prev);
        next.delete("currentPassword");
        next.delete("newPassword");
        return next;
      });
      setPasswordMessage({
        type: "success",
        text: settingsT("passwordUpdated", {
          fallback: "Password updated successfully!",
        }),
      });
    } catch {
      setPasswordMessage({
        type: "error",
        text: "Update failed.",
      });
    }
  };

  const userFullName = useMemo(() => {
    if (!user) return "";
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    return name || "User";
  }, [user]);

  if (!isInitialized || !user) {
    return (
      <section className={styles.account}>
        <div className="container">
          <p className={styles.loadingText}>
            {settingsT("loading", { fallback: "Loading..." })}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.account}>
      <div className={styles.hero}>
        <div className="container">
          <div className={styles.hero__inner}>
            <h1 className={styles.hero__title}>
              {settingsT("heroGreeting", { fallback: "Hello" })}, {userFullName}
              !
            </h1>
            <p className={styles.hero__description}>
              {settingsT("heroDescription", {
                fallback:
                  "Welcome back to your account. Manage your personal details, review order status, and download your invoices.",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.switcher}>
        <div className="container">
          <div className={styles.switcher__inner}>
            <button
              type="button"
              className={`${styles.tabs__item} ${
                activeTab === "personal" ? styles.tabs__item_active : ""
              }`}
              onClick={() => setActiveTab("personal")}
            >
              <LinkArrowIcon />
              <span>
                {settingsT("personalDataTitle", {
                  fallback: "Your personal data",
                })}
              </span>
            </button>
            <button
              type="button"
              className={`${styles.tabs__item} ${
                activeTab === "orders" ? styles.tabs__item_active : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <LinkArrowIcon />
              <span>
                {settingsT("ordersTitle", { fallback: "Your orders" })}
              </span>
            </button>
            <button
              type="button"
              className={styles.switcher__link}
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span>
                {settingsT("logOutLinkTitle", { fallback: "Log out" })}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className="container">
          {activeTab === "personal" && (
            <>
              <section className={styles.personalSection} id="personal-data">
                <h2 className={styles.sectionTitle}>
                  {settingsT("personalDataTitle", {
                    fallback: "Your personal data",
                  })}
                </h2>

                <form
                  className={styles.personalForm}
                  onSubmit={personalForm.handleSubmit(onPersonalSubmit)}
                >
                  <div className={styles.personalForm__grid}>
                    <div
                      className={cn(
                        styles.field,
                        editingFields.has("fullName") && styles.field_editing,
                      )}
                    >
                      <div className={styles.field__meta}>
                        <label htmlFor="account-fullName">
                          {settingsT("fieldYourName", {
                            fallback: "Your name",
                          })}
                        </label>
                        <button
                          type="button"
                          className={styles.field__editBtn}
                          onClick={() => toggleFieldEdit("fullName")}
                          title={settingsT("editField", { fallback: "Edit" })}
                          aria-label={settingsT("editField", {
                            fallback: "Edit",
                          })}
                        >
                          <EditIcon />
                        </button>
                      </div>
                      <input
                        id="account-fullName"
                        type="text"
                        {...personalForm.register("fullName")}
                        readOnly={!editingFields.has("fullName")}
                      />
                      {personalForm.formState.errors.fullName && (
                        <p className={styles.error}>
                          {personalForm.formState.errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div
                      className={cn(
                        styles.field,
                        editingFields.has("email") && styles.field_editing,
                      )}
                    >
                      <div className={styles.field__meta}>
                        <label htmlFor="account-email">
                          {settingsT("fieldYourEmail", {
                            fallback: "Your email",
                          })}
                        </label>
                        <button
                          type="button"
                          className={styles.field__editBtn}
                          onClick={() => toggleFieldEdit("email")}
                          title={settingsT("editField", { fallback: "Edit" })}
                          aria-label={settingsT("editField", {
                            fallback: "Edit",
                          })}
                        >
                          <EditIcon />
                        </button>
                      </div>
                      <input
                        id="account-email"
                        type="email"
                        {...personalForm.register("email")}
                        readOnly={!editingFields.has("email")}
                      />
                      {personalForm.formState.errors.email && (
                        <p className={styles.error}>
                          {personalForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div
                      className={cn(
                        styles.field,
                        editingFields.has("country") && styles.field_editing,
                      )}
                    >
                      <div className={styles.field__meta}>
                        <label htmlFor="account-country">
                          {settingsT("fieldCountry", {
                            fallback: "Your country",
                          })}
                        </label>
                        <button
                          type="button"
                          className={styles.field__editBtn}
                          onClick={() => toggleFieldEdit("country")}
                          title={settingsT("editField", { fallback: "Edit" })}
                          aria-label={settingsT("editField", {
                            fallback: "Edit",
                          })}
                        >
                          <EditIcon />
                        </button>
                      </div>
                      <input
                        id="account-country"
                        type="text"
                        {...personalForm.register("country")}
                        readOnly={!editingFields.has("country")}
                      />
                      {personalForm.formState.errors.country && (
                        <p className={styles.error}>
                          {personalForm.formState.errors.country.message}
                        </p>
                      )}
                    </div>

                    <div
                      className={cn(
                        styles.field,
                        editingFields.has("phone") && styles.field_editing,
                      )}
                    >
                      <div className={styles.field__meta}>
                        <label htmlFor="account-phone">
                          {settingsT("fieldPhone", { fallback: "Your phone" })}
                        </label>
                        <button
                          type="button"
                          className={styles.field__editBtn}
                          onClick={() => toggleFieldEdit("phone")}
                          title={settingsT("editField", { fallback: "Edit" })}
                          aria-label={settingsT("editField", {
                            fallback: "Edit",
                          })}
                        >
                          <EditIcon />
                        </button>
                      </div>
                      <input
                        id="account-phone"
                        type="text"
                        {...personalForm.register("phone")}
                        readOnly={!editingFields.has("phone")}
                      />
                    </div>

                    <div
                      className={cn(
                        styles.field,
                        editingFields.has("address1") && styles.field_editing,
                      )}
                    >
                      <div className={styles.field__meta}>
                        <label htmlFor="account-address1">
                          {settingsT("fieldAddress1", {
                            fallback: "Address line 1",
                          })}
                        </label>
                        <button
                          type="button"
                          className={styles.field__editBtn}
                          onClick={() => toggleFieldEdit("address1")}
                          title={settingsT("editField", { fallback: "Edit" })}
                          aria-label={settingsT("editField", {
                            fallback: "Edit",
                          })}
                        >
                          <EditIcon />
                        </button>
                      </div>
                      <input
                        id="account-address1"
                        type="text"
                        {...personalForm.register("address1")}
                        readOnly={!editingFields.has("address1")}
                      />
                      {personalForm.formState.errors.address1 && (
                        <p className={styles.error}>
                          {personalForm.formState.errors.address1.message}
                        </p>
                      )}
                    </div>

                    <div
                      className={cn(
                        styles.field,
                        editingFields.has("address2") && styles.field_editing,
                      )}
                    >
                      <div className={styles.field__meta}>
                        <label htmlFor="account-address2">
                          {settingsT("fieldAddress2", {
                            fallback: "Address line 2",
                          })}
                        </label>
                        <button
                          type="button"
                          className={styles.field__editBtn}
                          onClick={() => toggleFieldEdit("address2")}
                          title={settingsT("editField", { fallback: "Edit" })}
                          aria-label={settingsT("editField", {
                            fallback: "Edit",
                          })}
                        >
                          <EditIcon />
                        </button>
                      </div>
                      <input
                        id="account-address2"
                        type="text"
                        {...personalForm.register("address2")}
                        readOnly={!editingFields.has("address2")}
                      />
                      {personalForm.formState.errors.address2 && (
                        <p className={styles.error}>
                          {personalForm.formState.errors.address2.message}
                        </p>
                      )}
                    </div>
                    {/**
                <div className={styles.mapPlaceholder} aria-hidden="true" />
                <div className={styles.mapPlaceholder} aria-hidden="true" /> */}

                    <div
                      className={cn(
                        styles.field,
                        editingFields.has("city") && styles.field_editing,
                      )}
                    >
                      <div className={styles.field__meta}>
                        <label htmlFor="account-city">
                          {settingsT("fieldCity", { fallback: "City" })}
                        </label>
                        <button
                          type="button"
                          className={styles.field__editBtn}
                          onClick={() => toggleFieldEdit("city")}
                          title={settingsT("editField", { fallback: "Edit" })}
                          aria-label={settingsT("editField", {
                            fallback: "Edit",
                          })}
                        >
                          <EditIcon />
                        </button>
                      </div>
                      <input
                        id="account-city"
                        type="text"
                        {...personalForm.register("city")}
                        readOnly={!editingFields.has("city")}
                      />
                      {personalForm.formState.errors.city && (
                        <p className={styles.error}>
                          {personalForm.formState.errors.city.message}
                        </p>
                      )}
                    </div>

                    <div
                      className={cn(
                        styles.field,
                        editingFields.has("zip") && styles.field_editing,
                      )}
                    >
                      <div className={styles.field__meta}>
                        <label htmlFor="account-zip">
                          {settingsT("fieldPostalCode", {
                            fallback: "Postal code",
                          })}
                        </label>
                        <button
                          type="button"
                          className={styles.field__editBtn}
                          onClick={() => toggleFieldEdit("zip")}
                          title={settingsT("editField", { fallback: "Edit" })}
                          aria-label={settingsT("editField", {
                            fallback: "Edit",
                          })}
                        >
                          <EditIcon />
                        </button>
                      </div>
                      <input
                        id="account-zip"
                        type="text"
                        {...personalForm.register("zip")}
                        readOnly={!editingFields.has("zip")}
                      />
                      {personalForm.formState.errors.zip && (
                        <p className={styles.error}>
                          {personalForm.formState.errors.zip.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={styles.personalForm__actions}>
                    <button
                      type="submit"
                      className={styles.saveButton}
                      disabled={personalForm.formState.isSubmitting}
                    >
                      <LinkArrowIcon />
                      <span>
                        {settingsT("updateData", { fallback: "Save changes" })}
                      </span>
                    </button>
                  </div>

                  {personalMessage && (
                    <p
                      className={`${styles.message} ${
                        personalMessage.type === "error"
                          ? styles.message_error
                          : styles.message_success
                      }`}
                    >
                      {personalMessage.text}
                    </p>
                  )}
                </form>
              </section>

              <section className={styles.passwordSection} id="change-password">
                <h2 className={styles.sectionTitle}>
                  {settingsT("passwordChangeTitle", {
                    fallback: "Change password",
                  })}
                </h2>

                <form
                  className={styles.personalForm}
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                >
                  <div className={styles.passwordForm__grid}>
                    <div
                      className={cn(
                        styles.field,
                        editingFields.has("currentPassword") &&
                          styles.field_editing,
                      )}
                    >
                      <div className={styles.field__meta}>
                        <label htmlFor="account-currentPassword">
                          {settingsT("fieldCurrentPassword", {
                            fallback: "Your current password",
                          })}
                        </label>
                        <button
                          type="button"
                          className={styles.field__editBtn}
                          onClick={() => toggleFieldEdit("currentPassword")}
                          title={settingsT("editField", { fallback: "Edit" })}
                          aria-label={settingsT("editField", {
                            fallback: "Edit",
                          })}
                        >
                          <EditIcon />
                        </button>
                      </div>
                      <input
                        id="account-currentPassword"
                        type="password"
                        {...passwordForm.register("currentPassword")}
                        readOnly={!editingFields.has("currentPassword")}
                      />
                      {passwordForm.formState.errors.currentPassword && (
                        <p className={styles.error}>
                          {
                            passwordForm.formState.errors.currentPassword
                              .message
                          }
                        </p>
                      )}
                    </div>

                    <div
                      className={cn(
                        styles.field,
                        editingFields.has("newPassword") &&
                          styles.field_editing,
                      )}
                    >
                      <div className={styles.field__meta}>
                        <label htmlFor="account-newPassword">
                          {settingsT("fieldNewPassword", {
                            fallback: "Your new password",
                          })}
                        </label>
                        <button
                          type="button"
                          className={styles.field__editBtn}
                          onClick={() => toggleFieldEdit("newPassword")}
                          title={settingsT("editField", { fallback: "Edit" })}
                          aria-label={settingsT("editField", {
                            fallback: "Edit",
                          })}
                        >
                          <EditIcon />
                        </button>
                      </div>
                      <input
                        id="account-newPassword"
                        type="password"
                        {...passwordForm.register("newPassword")}
                        readOnly={!editingFields.has("newPassword")}
                      />
                      {passwordForm.formState.errors.newPassword && (
                        <p className={styles.error}>
                          {passwordForm.formState.errors.newPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={styles.personalForm__actions}>
                    <button
                      type="submit"
                      className={styles.saveButton}
                      disabled={passwordForm.formState.isSubmitting}
                    >
                      <LinkArrowIcon />
                      <span>
                        {settingsT("updatePassword", {
                          fallback: "Update password",
                        })}
                      </span>
                    </button>
                  </div>

                  {passwordMessage && (
                    <p
                      className={`${styles.message} ${
                        passwordMessage.type === "error"
                          ? styles.message_error
                          : styles.message_success
                      }`}
                    >
                      {passwordMessage.text}
                    </p>
                  )}
                </form>
              </section>
            </>
          )}

          {activeTab === "orders" && (
            <section className={styles.ordersSection} id="orders">
              <h2 className={styles.sectionTitle}>
                {settingsT("ordersTitle", { fallback: "Your orders" })}
              </h2>
              <MyOrdersPage />
            </section>
          )}
        </div>
      </div>
    </section>
  );
};
