import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/general/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/general/app-sidebar';
import { AppOptionsSidebar } from '@/components/general/app-options-sidebar';
import { AppActivityProvider } from '@/components/general/app-activity-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { generateMetadata } from '@/lib';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} antialiased relative`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider className="justify-between">
              <AppActivityProvider>
                <AppSidebar />
                {children}
                <AppOptionsSidebar />
              </AppActivityProvider>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
