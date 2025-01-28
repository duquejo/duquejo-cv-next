import type { ReactNode } from 'react';
import { AppFooter } from '@/components/general/app-footer';

interface Props {
  children: ReactNode;
}

export default function ResumeLayout({ children }: Props) {
  return (
    <main className="container flex flex-1 h-screen">
      <div className="flex-1 relative">
        {children}
        <AppFooter />
      </div>
    </main>
  );
}
