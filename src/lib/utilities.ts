import { START_ADVENTURE_YEAR } from '@/lib';
import { ExperienceType } from '@/interfaces';

export function calculateYears() {
  return String(new Date().getFullYear() - START_ADVENTURE_YEAR);
}

export function filterProjectsByTags(projects: ExperienceType[], tags: string[]) {
  return projects.filter((project) =>
    tags.every((tag) =>
      project.additional_info.map((skill) => skill.toLowerCase().replace(/\s+/g, '')).includes(tag),
    ),
  );
}
