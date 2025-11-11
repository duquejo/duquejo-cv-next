import type { BlogCategory, ExperienceType } from '@/interfaces';
import { START_ADVENTURE_YEAR } from '@/lib';

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

export const getCategoryVariant = (category: BlogCategory) => {
  const variants: Record<BlogCategory, 'default' | 'secondary' | 'outline'> = {
    Coding: 'default',
    Lifestyle: 'secondary',
    Music: 'outline',
    Gaming: 'outline',
    General: 'outline',
  };
  return variants[category];
};

export const toLocaleDateString = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
    });
  } catch (error) {
    console.error(`Error parsing blog date: ${dateString}`, error);
    return new Date().toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
    });
  }
};
