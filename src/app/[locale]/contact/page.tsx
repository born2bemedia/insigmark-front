import { Metadata } from 'next';

import { ContactPage } from './components/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Insigmark – Web Development & Hosting Support',
  description: 'Get in touch with Insigmark to discuss your website, hosting, or support needs and start your project today.',
  openGraph: {
    title: 'Contact Insigmark – Web Development & Hosting Support',
    description: 'Get in touch with Insigmark to discuss your website, hosting, or support needs and start your project today.',
    images: 'https://theinsigmark.com/images/meta.png',
  },
};

export default function Page() {
  return <ContactPage />;
}
