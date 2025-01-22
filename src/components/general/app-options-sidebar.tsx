import { ThemeToggle } from '@/components/general/theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SheetTrigger } from '@/components/ui/sheet';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AppOptionsSidebar = () => {
  return (
    <div
      role="complementary"
      className="lg:w-14 lg:max-w-14 lg:h-screen lg:relative w-auto fixed right-0 lg:mr-1"
    >
      <div className="flex flex-row gap-2 bg-sidebar rounded-lg p-2 m-2 lg:mx-0 lg:mb-2 lg:flex-col lg:fixed lg:bottom-0 lg:border lg:p-1">
        <SidebarTrigger
          variant="outline"
          className="h-8 w-8 lg:h-10 lg:w-10"
          title="Toggle sidebar"
        />
        <ThemeToggle
          variant="outline"
          className="h-8 w-8 lg:h-10 lg:w-10"
          title="Change color theme"
        />
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className=" h-8 w-8 lg:h-10 lg:w-10"
            title="Open latest activity"
          >
            <Lightbulb />
          </Button>
        </SheetTrigger>
      </div>
    </div>
  );
};
