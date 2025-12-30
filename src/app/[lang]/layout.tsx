import type { ReactNode } from 'react';
import { Footer } from '@/components/footer/footer';
import { AnimatedBackground } from '@/components/theme/animated-background';

interface Props {
  children: ReactNode;
}

export default function ResumeLayout({ children }: LayoutProps<'/[lang]'>) {
  return (
    <main className="container flex flex-1 h-screen">
      <div className="flex-1">
        {children}
        <Footer />
      </div>
      <AnimatedBackground />
    </main>
  );
}
