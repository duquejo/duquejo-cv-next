import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('General.404');

  return (
    <article className="flex justify-center items-center flex-1 h-screen">
      <section className="flex flex-col items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold underline underline-offset-8 decoration-primary">
            {t('title')}
          </h1>
          <p className="my-3">{t('subtitle')}</p>
          <Button variant="secondary" asChild>
            <Link href="/">{t('button')}</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
