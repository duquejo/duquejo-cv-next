import { generateMetadata } from '@/lib';
import { getProjectByFilters, getProjectSkills } from '@/actions/projects';
import { getTranslations } from 'next-intl/server';
import ProjectsShowcase from '@/components/projects/projects-showcase';

export async function metadata() {
  return generateMetadata('Experience');
}

interface Props {
  searchParams: Promise<{ [key: string]: string[] }>;
}

export default async function ProjectsPage({ searchParams }: Props) {
  const { query } = await searchParams;

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
          initialProjects={projects}
          availableFilters={filters}
          initialFilters={queryFilters}
        />
      </section>
    </article>
  );
}
