'use client';

import type { ExperienceType, Skill } from '@/interfaces';
import { ExperienceItem } from '@/components/resume/experience-item';
import { useCallback, useRef, useState } from 'react';
import { ProjectsFilter, type ProjectsFilterRef } from '@/components/projects/projects-filter';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { filterProjectsByTags } from '@/lib';
import { usePathname, useRouter } from '@/i18n/routing';
import { getProjectByFilters } from '@/actions/projects';
import { useTranslations } from 'next-intl';

interface Props {
  initialProjects?: ExperienceType[];
  availableFilters: Skill[];
  initialFilters?: string[];
}

export default function ProjectsShowcase({
  availableFilters,
  initialProjects = [],
  initialFilters = [],
}: Props) {
  const t = useTranslations('Experience.filters');

  const router = useRouter();
  const pathname = usePathname();

  const filterRef = useRef<ProjectsFilterRef>(null);

  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [projects, setProjects] = useState(initialProjects);

  const onFilterChange = useCallback(
    (filters: string[]) => {
      const filteredProjects = filterProjectsByTags(initialProjects, filters);
      setProjects(filteredProjects);
      setActiveFilters(filters);
    },
    [initialProjects],
  );

  const handleSearchClear = useCallback(async () => {
    if (filterRef.current) {
      filterRef.current.resetFilters();
    }

    if (initialFilters.length === 0) {
      return setProjects(initialProjects);
    }

    setActiveFilters([]);
    const projects = await getProjectByFilters();
    setProjects(projects);
    router.replace(pathname);
  }, [initialFilters, initialProjects, router, pathname]);

  return (
    <>
      <div className="h-10 inline-flex gap-x-2 w-full justify-between items-center mb-4">
        <ProjectsFilter
          ref={filterRef}
          title={t('title.skill')}
          initialFilters={new Set<string>(activeFilters)}
          filters={availableFilters}
          onFilterChange={onFilterChange}
          onSearchClear={handleSearchClear}
        />
        <Button
          variant="ghost"
          size="sm"
          className="font-semibold px-2 lg:px-3"
          onClick={() => handleSearchClear()}
        >
          {t('reset')}
          <X />
        </Button>
      </div>
      <ul>
        {projects.map((exp: ExperienceType) => (
          <ExperienceItem className="animate-entrance" key={exp.project} {...exp} />
        ))}
      </ul>
    </>
  );
}
