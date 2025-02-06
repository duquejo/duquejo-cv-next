'use server';

import { getMessages } from 'next-intl/server';
import type { IntlMessages } from '../../global';
import { alphabeticallyArraySort, filterProjectsByTags } from '@/lib';

async function retrieveProjects(): Promise<IntlMessages['Experience']['content']> {
  const intlMessages = (await getMessages()) as unknown as IntlMessages;
  return intlMessages.Experience.content;
}

export async function getProjectSkills() {
  const projects = await retrieveProjects();

  const allSkills = projects.reduce<string[]>((acc, { additional_info }) => {
    return acc.concat(additional_info);
  }, []);

  return alphabeticallyArraySort([...new Set(allSkills)]);
}

export async function getProjectByFilter(filters: string[] = []) {
  const projects = await retrieveProjects();

  if (filters.length === 0) return projects;

  return filterProjectsByTags(projects, filters);
}
