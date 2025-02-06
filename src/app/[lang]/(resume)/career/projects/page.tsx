import { generateMetadata } from '@/lib';
import { getProjectByFilter, getProjectSkills } from '@/actions/projects';
import { getTranslations } from 'next-intl/server';
import ProjectsShowcase from '@/components/projects/projects-showcase';

export async function metadata() {
  return generateMetadata('Experience');
}

export default async function ProjectsPage() {
  const t = await getTranslations('Experience');

  const [filters, projects] = await Promise.all([getProjectSkills(), getProjectByFilter()]);

  return (
    <article className="px-5 pt-5 pb-20 sm:pb-5">
      <h1 className="main-title">{t('title')}</h1>
      <section className="mt-10">
        <ProjectsShowcase initialProjects={projects} availableFilters={filters} />
      </section>
    </article>
  );
}
