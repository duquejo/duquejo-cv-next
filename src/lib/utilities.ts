import { START_ADVENTURE_YEAR } from '@/lib';
import type { BlogPost, ExperienceType } from '@/interfaces';

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

export const getCategoryVariant = (category: BlogPost['category']) => {
  switch (category) {
    case 'Coding':
      return 'default';
    case 'Lifestyle':
      return 'secondary';
    case 'Music':
      return 'outline';
    case 'Gaming':
      return 'outline';
    default:
      return 'outline';
  }
};
