import { ContactCompany } from './ContactCompany/ContactCompany';
import { ContactFormSection } from './ContactFormSection/ContactFormSection';
import { ContactHero } from './ContactHero/ContactHero';
import styles from './ContactPage.module.scss';
import { ContactPlanning } from './ContactPlanning/ContactPlanning';
import { ContactReview } from './ContactReview/ContactReview';

export const ContactPage = () => (
  <main className={styles.page}>
    <ContactHero />
    <ContactPlanning />
    <ContactFormSection />
    <ContactReview />
    <ContactCompany />
  </main>
);
