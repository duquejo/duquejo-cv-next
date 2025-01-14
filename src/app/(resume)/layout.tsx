import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { ReactNode } from 'react';
import {
  Sheet as SheetProvider,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Props {
  children: ReactNode;
}

export default function ResumeLayout({ children }: Props): ReactNode {
  return (
    <SidebarProvider>
      <SheetProvider>
        <AppSidebar />
        <main className="flex justify-between flex-1 h-screen">
          <article className="flex-1 mt-5 lg:mt-0">{children}</article>
        </main>
        <nav className="flex flex-col justify-between max-w-16 p-2 items-center">
          <SidebarTrigger variant="secondary" className="h-10 w-10" title="Toggle sidebar" />
          <SheetTrigger asChild>
            <Button variant="secondary" className="h-10 w-10">
              <Lightbulb strokeWidth={3} />
            </Button>
          </SheetTrigger>
        </nav>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </SheetProvider>
    </SidebarProvider>
  );
}
