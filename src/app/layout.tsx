import { Bebas_Neue,Inter } from 'next/font/google';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';

import { FormsPopupRenderer } from '@/features/forms';

import { cn } from '@/shared/lib/helpers/styles';
import { CookiePopup, Footer, Header, SmoothScroll } from '@/shared/ui/components';

import 'react-toastify/dist/ReactToastify.css';
import '@/shared/lib/styles/null.scss';
import '@/shared/lib/styles/base.scss';

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Insigmark – Personal Web Development, Hosting & Maintenance',
  description:
    'Bring your articles online with Insigmark! Get custom website development, reliable hosting, and ongoing support — start your project today.',
  openGraph: {
    title: 'Insigmark – Personal Web Development, Hosting & Maintenance',
    description:
      'Bring your articles online with Insigmark! Get custom website development, reliable hosting, and ongoing support — start your project today.',
    //images: 'https://theinsigmark.com/images/meta.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={cn(bebasNeue.variable, inter.variable)}>
        <NextIntlClientProvider>
          <SmoothScroll />
          <Header />
          {children}
          <Footer />
          <ToastContainer />
          <CookiePopup />
          <FormsPopupRenderer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
