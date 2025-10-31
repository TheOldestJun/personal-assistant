import { Geist, Geist_Mono } from 'next/font/google';

import Layout from '@/components/layout';
import Providers from '@/libs/providers';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Персональній асистент',
  description: 'Мій електронний асистент',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Layout>
            {children}
          </Layout>
          </Providers>
      </body>
    </html>
  );
}