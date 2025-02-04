import { Poppins } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/general/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/general/app-sidebar';
import { AppActivityProvider } from '@/components/general/app-activity-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { generateMetadata } from '@/lib';
import { AppMobileHeader } from '@/components/mobile/app-mobile-header';
import { AppOptionsSidebar } from '@/components/general/app-options-sidebar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '500', '600', '700'],
  display: 'swap',
});

export async function metadata() {
  return generateMetadata('General');
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

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
              <AppActivityProvider>
                <AppMobileHeader />
                <AppSidebar />
                {children}
                <AppOptionsSidebar
                  outerClassName="hidden sm:flex lg:w-14 lg:max-w-14 lg:h-screen lg:relative w-auto fixed right-0 lg:mr-1"
                  innerClassName="flex flex-row gap-2 bg-sidebar rounded-lg p-2 m-2 lg:mx-0 lg:mb-2 lg:flex-col lg:fixed lg:bottom-0 lg:border lg:p-1"
                />
              </AppActivityProvider>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
