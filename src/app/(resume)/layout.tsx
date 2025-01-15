import { ReactNode } from 'react';
import { AppFooter } from '@/components/general/app-footer';

interface Props {
  children: ReactNode;
}

export default function ResumeLayout({ children }: Props): ReactNode {
  return (
    <main className="container flex flex-1 h-screen">
      <span className="bg-cover bg-gradient-to-t from-background from-90% to-100% dark:to-primary-foreground/20 dark:lg:to-primary-foreground/30 to-secondary/50 absolute top-0 left-0 right-0 bottom-0 z-0" />
      <div className="flex-1 mt-5 lg:mt-0 relative">
        {children}
        <AppFooter />
      </div>
    </main>
  );
}
