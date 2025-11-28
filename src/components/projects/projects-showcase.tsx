'use client';

import { getProjectByFilters } from '@/actions/projects';
import { ProjectsFilter, type ProjectsFilterRef } from '@/components/projects/projects-filter';
import { ExperienceItem } from '@/components/resume/experience-item';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from '@/i18n/routing';
import type { ExperienceType, Skill } from '@/interfaces';
import { filterProjectsByTags } from '@/lib';
import { X } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { ProjectsShowcaseNotFound } from './projects-showcase-not-found';
import { ProjectsShowcaseStart } from './projects-showcase-start';

interface Props {
  filterTitle: string;
  filterResetText: string;
  filterNoResultsText: string;
  filterMaxSelection: string;
  filterInputPlaceholder: string;
  experienceItemTitle: string;
  experienceItemButtonLabel: string;
  experienceFooterText: string;
  noProjectResultsText: string;
  filterMaxMobileSelection: string;
  availableFilters: Skill[];
  initialProjects: ExperienceType[];
  experienceShowcaseStartText?: string;
  initialFilters?: string[];
}

export default function ProjectsShowcase({
  filterTitle,
  filterResetText,
  filterNoResultsText,
  availableFilters,
  filterInputPlaceholder,
  filterMaxSelection,
  experienceItemTitle,
  experienceItemButtonLabel,
  filterMaxMobileSelection,
  experienceShowcaseStartText,
  experienceFooterText,
  noProjectResultsText,
  initialProjects = [],
  initialFilters = [],
}: Props) {
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

    // @ts-expect-error -- next/intl typescript issue https://next-intl.dev/docs/routing/navigation#usepathname
    router.replace({ pathname });
  }, [initialFilters, initialProjects, router, pathname]);

  return (
    <>
      <div className="h-10 inline-flex gap-x-2 w-full justify-between items-center mb-4">
        <ProjectsFilter
          ref={filterRef}
          title={filterTitle}
          filterInputPlaceholder={filterInputPlaceholder}
          filterResetText={filterResetText}
          maxAmountMobileText={filterMaxMobileSelection}
          filterMaxSelection={filterMaxSelection}
          filterNoResultsText={filterNoResultsText}
          initialFilters={new Set<string>(activeFilters)}
          filters={availableFilters}
          onFilterChange={onFilterChange}
          onSearchClear={handleSearchClear}
        />
        <Button
          variant="ghost"
          size="sm"
          className="font-semibold px-0 lg:px-3 cursor-pointer"
          onClick={() => handleSearchClear()}
        >
          {filterResetText}
          <X />
        </Button>
      </div>
      {projects.length > 0 ? (
        <ul>
          {projects.map((exp: ExperienceType) => (
            <ExperienceItem
              experienceItemTitle={experienceItemTitle}
              experienceItemButtonLabel={experienceItemButtonLabel}
              experienceFooterText={experienceFooterText}
              className="animate-entrance"
              key={exp.project}
              {...exp}
            />
          ))}
          <ProjectsShowcaseStart text={experienceShowcaseStartText} />
        </ul>
      ) : (
        <ProjectsShowcaseNotFound text={noProjectResultsText} />
      )}
    </>
  );
}
