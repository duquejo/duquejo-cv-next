import { ExperienceItem } from '@/components/resume/experience/experience-item';
import { useTranslations } from 'next-intl';
import { ExperienceType } from '@/interfaces';
import { generateMetadata } from '@/lib';

export async function metadata() {
  return generateMetadata('Experience');
}

export default function ProjectsPage() {
  const t = useTranslations('Experience');

  return (
    <article className="px-8 pt-5 pb-10">
      <h1 className="main-title">{t('title')}</h1>
      <section className="mt-10">
        {t
          .raw('content')
          ?.map((exp: ExperienceType, i: number) => <ExperienceItem key={i} {...exp} />)}
      </section>
    </article>
  );
}
