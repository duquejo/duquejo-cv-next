import { ThemeToggle } from '@/components/general/theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SheetTrigger } from '@/components/ui/sheet';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { PdfGeneratorToggle } from '@/components/general/pdf-toggle';
import { useTranslations } from 'next-intl';

export const AppOptionsSidebar = () => {
  const t = useTranslations('Sidebar.complementary');

  return (
    <div
      role="complementary"
      className="lg:w-14 lg:max-w-14 lg:h-screen lg:relative w-auto fixed right-0 lg:mr-1"
    >
      <div className="flex flex-row gap-2 bg-sidebar rounded-lg p-2 m-2 lg:mx-0 lg:mb-2 lg:flex-col lg:fixed lg:bottom-0 lg:border lg:p-1">
        <SidebarTrigger
          variant="outline"
          className="h-8 w-8 lg:h-10 lg:w-10"
          title={t('sidebar.title')}
        />
        <PdfGeneratorToggle
          variant="outline"
          className="h-8 w-8 lg:h-10 lg:w-10"
          title={t('pdf.title')}
          description={t('pdf.description')}
          button={t('pdf.button')}
          buttonLoading={t('pdf.loading')}
        />
        <ThemeToggle
          variant="outline"
          className="h-8 w-8 lg:h-10 lg:w-10"
          title={t('theme.title')}
          light={t('theme.light')}
          dark={t('theme.dark')}
          system={t('theme.system')}
        />
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className=" h-8 w-8 lg:h-10 lg:w-10"
            title={t('activity.title')}
          >
            <Lightbulb />
          </Button>
        </SheetTrigger>
      </div>
    </div>
  );
};
