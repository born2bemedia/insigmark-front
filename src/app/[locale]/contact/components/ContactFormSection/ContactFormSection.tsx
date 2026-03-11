import { ContactProjectForm } from '@/features/contact-form/ui/ContactProjectForm';

import styles from './ContactFormSection.module.scss';

export const ContactFormSection = () => (
  <section className={styles.formSection} id="contact-project-form">
    <div className={styles.formContainer}>
      <ContactProjectForm />
    </div>
  </section>
);
