'use server';

import { getMessages } from 'next-intl/server';
import type { IntlMessages } from '../../global';
import { filterProjectsByTags } from '@/lib';
import type { Skill } from '@/interfaces';

async function getProjectsJSON(): Promise<IntlMessages['Experience']['content']> {
  const intlMessages = (await getMessages()) as unknown as IntlMessages;
  return intlMessages.Experience.content;
}

export async function getProjectSkills(): Promise<Skill[]> {
  const projects = await getProjectsJSON();

  const allSkills = [...new Set(projects.flatMap(({ additional_info }) => additional_info))];

  return allSkills
    .sort((a: string, b: string) => a.localeCompare(b))
    .map((skill) => ({
      name: skill,
      value: skill.toLowerCase().replace(/\s+/g, ''),
    }));
}

export async function getProjectByFilters(filters: string[] = []) {
  const projects = await getProjectsJSON();

  if (filters.length === 0) return projects;

  return filterProjectsByTags(projects, filters);
}
