import { createMetadata } from '@/lib';
import { getProjectByFilters, getProjectSkills } from '@/actions/projects';
import { getTranslations } from 'next-intl/server';
import ProjectsShowcase from '@/components/projects/projects-showcase';

export async function generateMetadata() {
  return createMetadata('Experience');
}

export default async function ProjectsPage(props: PageProps<'/[lang]/career/projects'>) {
  const { query } = (await props?.searchParams) || { query: [] };

  const queryFilters = Array.isArray(query) ? query : query ? [query] : [];

  const [t, filters, projects] = await Promise.all([
    getTranslations('Experience'),
    getProjectSkills(),
    getProjectByFilters(queryFilters),
  ]);

  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5">
      <h1 className="main-title">{t('title')}</h1>
      <section className="mt-10">
        <ProjectsShowcase
          filterTitle={t('filters.title')}
          filterResetText={t('filters.reset')}
          filterInputPlaceholder={t('filters.input-placeholder')}
          filterMaxMobileSelection={t('filters.max-selection-mobile')}
          filterMaxSelection={t('filters.max-selection')}
          noProjectResultsText={t('no-results')}
          filterNoResultsText={t('filters.no-results')}
          experienceItemTitle={t('subtitle')}
          experienceItemButtonLabel={t('button')}
          experienceFooterText={t('footer')}
          initialProjects={projects}
          availableFilters={filters}
          initialFilters={queryFilters}
        />
      </section>
    </article>
  );
}
