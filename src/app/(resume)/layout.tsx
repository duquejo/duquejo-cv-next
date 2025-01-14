import { ReactNode } from 'react';
import { AppFooter } from '@/components/general/app-footer';

interface Props {
  children: ReactNode;
}

export default function ResumeLayout({ children }: Props): ReactNode {
  return (
    <main className="flex justify-between flex-1 relative h-screen">
      <div className="flex-1 mt-5 lg:mt-0 relative">
        {children}
        <AppFooter />
      </div>
    </main>
  );
}
