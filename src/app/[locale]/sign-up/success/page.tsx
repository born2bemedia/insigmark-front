import styles from '@/features/account/ui/AuthSuccessMessage/AuthSuccessHero.module.scss';
import { AuthSuccessMessage } from '@/features/account/ui/AuthSuccessMessage/AuthSuccessMessage';

import { SignUpAssistance } from '@/app/[locale]/sign-up/components';

export default function SignUpSuccessPage() {
  return (
    <>
      <section className={styles.auth_success_hero}>
        <div className={styles.auth_success_hero__inner}>
          <AuthSuccessMessage
            title="Welcome to Insigmark!"
            description="Your account has been created. Check your email to verify your address and get started."
            primaryCtaLabel="Got it"
            primaryCtaHref="/sign-in"
            closeHref="/"
          />
        </div>
      </section>

      <SignUpAssistance />
    </>
  );
}
