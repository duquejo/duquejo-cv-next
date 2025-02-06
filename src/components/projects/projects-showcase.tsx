'use client';

import type { ExperienceType } from '@/interfaces';
import { ExperienceItem } from '@/components/resume/experience-item';
import { useRef, useState } from 'react';
import { ProjectsFilter, type ProjectsFilterRef } from '@/components/projects/projects-filter';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { filterProjectsByTags } from '@/lib';

interface Props {
  initialProjects?: ExperienceType[];
  availableFilters: string[];
  initialFilters?: string[];
}

export default function ProjectsShowcase({
  initialProjects = [],
  initialFilters = [],
  availableFilters,
}: Props) {
  const filterRef = useRef<ProjectsFilterRef>(null);
  const [projects, setProjects] = useState(initialProjects);

  const onFilterChange = (filters: string[]) => {
    const filteredProjects = filterProjectsByTags(initialProjects, filters);
    setProjects(filteredProjects);
  };

  const handleSearchClear = () => {
    if (filterRef.current) {
      filterRef.current.resetFilters();
    }
    setProjects(initialProjects);
  };

  return (
    <>
      <div className="h-10 inline-flex gap-x-2 w-full justify-between items-center mb-4">
        <ProjectsFilter
          ref={filterRef}
          title="Skills"
          initialFilters={new Set<string>(initialFilters)}
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
          Reset filters
          <X />
        </Button>
      </div>
      <ul>
        {projects.map((exp: ExperienceType, i: number) => (
          <ExperienceItem className="animate-entrance" key={i} {...exp} />
        ))}
      </ul>
    </>
  );
}
