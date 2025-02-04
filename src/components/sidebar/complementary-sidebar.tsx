import { ThemeToggle } from '@/components/theme/theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SheetTrigger } from '@/components/ui/sheet';
import { Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { PdfGeneratorToggle } from '@/components/pdf/pdf-toggle';
import { useTranslations } from 'next-intl';

interface Props {
  outerClassName?: string;
  innerClassName?: string;
}

export const ComplementarySidebar = ({ outerClassName, innerClassName }: Props) => {
  const t = useTranslations('Sidebar.complementary');

  return (
    <div role="complementary" className={outerClassName}>
      <div className={innerClassName}>
        <SidebarTrigger
          variant="outline"
          className="h-8 w-8 lg:h-10 lg:w-10 hidden sm:flex"
          title={t('sidebar.title')}
        />
        <PdfGeneratorToggle
          variant="outline"
          className="h-8 w-8 lg:h-10 lg:w-10"
          buttonTitle={t('pdf.title')}
          formTitle={t('pdf.dialog.title')}
          formDescription={t('pdf.dialog.description')}
          formButtonText={t('pdf.dialog.button')}
          formButtonTextLoading={t('pdf.dialog.loading')}
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
            className=" h-8 w-8 lg:h-10 lg:w-10 hidden sm:flex"
            title={t('activity.title')}
          >
            <Lightbulb />
            <span className="sr-only">{t('activity.title')}</span>
          </Button>
        </SheetTrigger>
      </div>
    </div>
  );
};
