import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/general/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/general/app-sidebar';
import { AppOptionsSidebar } from '@/components/general/app-options-sidebar';
import { METADATA } from '@/lib/constants';
import { AppActivityProvider } from '@/components/general/app-activity-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = METADATA['default'];

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} antialiased relative`}>
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
      </body>
    </html>
  );
}
