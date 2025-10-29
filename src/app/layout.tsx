import { Poppins } from 'next/font/google';
import './globals.css';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MainSidebar } from '@/components/sidebar/main-sidebar';
import { EventProvider } from '@/components/events/event-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { createMetadata } from '@/lib';
import { MobileHeader } from '@/components/header/mobile-header';
import { ComplementarySidebar } from '@/components/sidebar/complementary-sidebar';
import { GoogleAnalytics } from '@next/third-parties/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '600', '700'],
  display: 'swap',
});

export async function generateMetadata() {
  return createMetadata('General');
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  const gaId = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_ANALYTICS_ID : null;

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased relative`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider className="justify-between">
              <EventProvider>
                <MobileHeader />
                <MainSidebar />
                {children}
                <ComplementarySidebar
                  outerClassName="hidden sm:flex z-10 lg:w-14 lg:max-w-14 lg:h-screen lg:relative w-auto fixed right-0 lg:mr-1"
                  innerClassName="flex flex-row gap-2 bg-sidebar rounded-lg p-2 m-2 lg:mx-0 lg:mb-2 lg:flex-col lg:fixed lg:bottom-0 lg:border lg:p-1"
                />
              </EventProvider>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
