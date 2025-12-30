import { Lightbulb } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PdfGeneratorToggle } from '@/components/pdf/pdf-toggle';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet';
import { SidebarTrigger } from '@/components/ui/sidebar';

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
          className="h-8 w-8 lg:h-10 lg:w-10 hidden md:flex cursor-pointer"
          title={t('sidebar.title')}
        />
        <PdfGeneratorToggle
          variant="outline"
          className="h-8 w-8 lg:h-10 lg:w-10 cursor-pointer"
          buttonTitle={t('pdf.title')}
          formTitle={t('pdf.dialog.title')}
          formDescription={t('pdf.dialog.description')}
          formButtonText={t('pdf.dialog.button')}
          formButtonTextLoading={t('pdf.dialog.loading')}
        />
        <ThemeToggle
          variant="outline"
          className="h-8 w-8 lg:h-10 lg:w-10 cursor-pointer"
          title={t('theme.title')}
          light={t('theme.light')}
          dark={t('theme.dark')}
          system={t('theme.system')}
        />
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="h-8 w-8 lg:h-10 lg:w-10 hidden sm:flex cursor-pointer"
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
