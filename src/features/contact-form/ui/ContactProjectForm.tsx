'use client';

import { useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { submitContactProjectForm } from '../api/submitContactProjectForm';
import { type ContactProjectFormSchema, createContactProjectFormSchema } from '../model/ContactForm.schema';
import styles from './ContactProjectForm.module.scss';
import { ContactProjectFormSuccess } from './ContactProjectFormSuccess';

const ArrowIcon = () => (
  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.9148 16.321L15.6023 20.6335C15.4674 20.7684 15.2845 20.8442 15.0938 20.8442C14.903 20.8442 14.7201 20.7684 14.5852 20.6335C14.4504 20.4986 14.3746 20.3157 14.3746 20.125C14.3746 19.9343 14.4504 19.7514 14.5852 19.6165L17.6714 16.5312H6.46875C6.27813 16.5312 6.09531 16.4555 5.96052 16.3207C5.82573 16.1859 5.75 16.0031 5.75 15.8125V2.875C5.75 2.68438 5.82573 2.50156 5.96052 2.36677C6.09531 2.23198 6.27813 2.15625 6.46875 2.15625C6.65937 2.15625 6.84219 2.23198 6.97698 2.36677C7.11177 2.50156 7.1875 2.68438 7.1875 2.875V15.0938H17.6714L14.5852 12.0085C14.4504 11.8736 14.3746 11.6907 14.3746 11.5C14.3746 11.3093 14.4504 11.1264 14.5852 10.9915C14.7201 10.8566 14.903 10.7809 15.0938 10.7809C15.2845 10.7809 15.4674 10.8566 15.6023 10.9915L19.9148 15.304C19.9816 15.3707 20.0346 15.45 20.0708 15.5373C20.1069 15.6245 20.1256 15.718 20.1256 15.8125C20.1256 15.907 20.1069 16.0005 20.0708 16.0877C20.0346 16.175 19.9816 16.2543 19.9148 16.321Z"
      fill="#023D65"
    />
  </svg>
);



export const ContactProjectForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('contactProjectForm');


  const PROJECT_TYPE_TEXTS = [
    t('projectTypeOptionswebsiteDevelopment', { fallback: 'Website Development' }),
    t('projectTypeOptionshostingSolutions', { fallback: 'Hosting Solutions' }),
    t('projectTypeOptionssecurityAudit', { fallback: 'Security / Audit' }),
    t('projectTypeOptionswebsiteMaintenance', { fallback: 'Website Maintenance' }),
    t('projectTypeOptionswebsiteMigration', { fallback: 'Website Migration' }),
    t('projectTypeOptionsgeneralConsultation', { fallback: 'General Consultation' }),
  ] as const;
  
  const PROJECT_SCOPE_TEXTS = [
    t('projectScopeOptionssmallWebsite', { fallback: 'Small website (3-5 pages)' }),
    t('projectScopeOptionsmediumWebsite', { fallback: 'Medium website (6-10 pages)' }),
    t('projectScopeOptionslargeWebsite', { fallback: 'Large website (10+ pages)' }),
    t('projectScopeOptionscustomPlatform', { fallback: 'Custom platform or application' }),
  ] as const;

  const projectTypeMap = useMemo(
    () =>
      Object.fromEntries(
        PROJECT_TYPE_TEXTS.map((text) => [text, text]),
      ),
    [PROJECT_TYPE_TEXTS],
  );

  const projectScopeMap = useMemo(
    () =>
      Object.fromEntries(
        PROJECT_SCOPE_TEXTS.map((text) => [text, text]),
      ),
    [PROJECT_SCOPE_TEXTS],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactProjectFormSchema>({
    resolver: zodResolver(createContactProjectFormSchema(t)),
    defaultValues: {
      projectType: [],
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      projectScope: [],
      message: '',
    },
  });

  const onSubmit = async (formData: ContactProjectFormSchema) => {
    try {
      setIsLoading(true);

      await submitContactProjectForm({
        ...formData,
        projectType: formData.projectType.map((value) => projectTypeMap[value as keyof typeof projectTypeMap] ?? value),
        projectScope: formData.projectScope.map((value) => projectScopeMap[value as keyof typeof projectScopeMap] ?? value),
      });

      reset();
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <header className={styles.header}>
          <h2 className={styles.title}>
            {t('title', { fallback: 'Tell Us About Your Project' })}
          </h2>
          <p className={styles.description}>
            {t('description', {
              fallback:
                'Provide a short description of your project so we can understand your goals and recommend the most suitable development and hosting solution.',
            })}
          </p>
        </header>

        <div className={styles.sectionRow}>
          <div className={styles.sectionHeading}>
            <h3>{t('projectTypeTitle', { fallback: 'Project type' })}</h3>
            <p>
              {t('projectTypeDescription', {
                fallback: 'Select the option that best describes your request:',
              })}
            </p>
          </div>
          <div className={styles.sectionContent}>
            {PROJECT_TYPE_TEXTS.map((text) => (
              <label key={text} className={styles.checkboxItem}>
                <input type="checkbox" value={text} {...register('projectType')} />
                <span className={styles.checkbox} aria-hidden="true" />
                <span className={styles.checkboxLabel}>
                  {text}
                </span>
              </label>
            ))}
            {errors.projectType && <p className={styles.error}>{errors.projectType.message}</p>}
          </div>
        </div>

        <div className={styles.sectionRow}>
          <div className={styles.sectionHeading}>
            <h3>{t('projectDetailsTitle', { fallback: 'Project details' })}</h3>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.field}>
              <input
                type="text"
                placeholder={t('nameLabel', { fallback: 'Name:' })}
                aria-label={t('nameLabel', { fallback: 'Name:' })}
                {...register('fullName')}
              />
              {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
            </div>
            <div className={styles.field}>
              <input
                type="email"
                placeholder={t('emailLabel', { fallback: 'Email:' })}
                aria-label={t('emailLabel', { fallback: 'Email:' })}
                {...register('email')}
              />
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>
            <div className={styles.field}>
              <input
                type="tel"
                placeholder={t('phoneLabel', { fallback: 'Phone:' })}
                aria-label={t('phoneLabel', { fallback: 'Phone:' })}
                {...register('phone')}
              />
              {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
            </div>
            <div className={styles.field}>
              <input
                type="text"
                placeholder={t('companyLabel', { fallback: 'Company / Organization (optional):' })}
                aria-label={t('companyLabel', { fallback: 'Company / Organization (optional):' })}
                {...register('companyName')}
              />
              {errors.companyName && <p className={styles.error}>{errors.companyName.message}</p>}
            </div>
          </div>
        </div>

        <div className={styles.sectionRow}>
          <div className={styles.sectionHeading}>
            <h3>{t('projectScopeTitle', { fallback: 'Estimated project scope' })}</h3>
          </div>
          <div className={styles.sectionContent}>
            {PROJECT_SCOPE_TEXTS.map((text) => (
              <label key={text} className={styles.checkboxItem}>
                <input type="checkbox" value={text} {...register('projectScope')} />
                <span className={styles.checkbox} aria-hidden="true" />
                <span className={styles.checkboxLabel}>
                  {text}
                </span>
              </label>
            ))}
            {errors.projectScope && <p className={styles.error}>{errors.projectScope.message}</p>}
          </div>
        </div>

        <div className={`${styles.sectionRow} ${styles.messageSection}`}>
          <div className={styles.sectionHeading}>
            <h3>{t('messageTitle', { fallback: 'Message' })}</h3>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.field}>
              <textarea
                placeholder={t('messagePlaceholder', { fallback: 'Type your message here...' })}
                aria-label={t('messageTitle', { fallback: 'Message' })}
                rows={3}
                {...register('message')}
              />
              {errors.message && <p className={styles.error}>{errors.message.message}</p>}
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          <ArrowIcon />
          {isLoading ? t('sending', { fallback: 'Sending...' }) : t('submit', { fallback: 'Send request' })}
        </button>
      </form>

      <ContactProjectFormSuccess isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
    </>
  );
};
