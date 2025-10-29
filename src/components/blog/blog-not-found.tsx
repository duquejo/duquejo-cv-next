import { useTranslations } from 'next-intl';

export const BlogNotFound = () => {
  const t = useTranslations('Blog');
  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5">
      <h1 className="main-title">{t('title')}</h1>
      <p className="mt-5 text-muted-foreground">{t('no_articles')}</p>
    </article>
  );
};
