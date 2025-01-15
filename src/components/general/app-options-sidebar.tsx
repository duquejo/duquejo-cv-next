import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/general/theme-toggle';
import { SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

export const AppOptionsSidebar = () => {
  return (
    <nav className="lg:w-14 lg:h-screen lg:relative w-full fixed">
      <div className="lg:border-l p-2 flex flex-row lg:flex-col lg:justify-between lg:items-center lg:fixed top-0 bottom-0 gap-2">
        <div className="flex flex-row lg:flex-col gap-2">
          <SidebarTrigger variant="secondary" className="h-10 w-10" title="Toggle sidebar" />
          <ThemeToggle />
        </div>
        <div className="flex flex-col gap-y-2">
          <SheetTrigger asChild>
            <Button variant="secondary" className="h-10 w-10">
              <Lightbulb strokeWidth={3} />
            </Button>
          </SheetTrigger>
        </div>
      </div>
    </nav>
  );
};
