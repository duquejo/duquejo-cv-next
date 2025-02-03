'use server';

import type { Event, EventType } from '@/interfaces';

const GITHUB_URL = process.env.GITHUB_URL;
const GITHUB_SOURCE = process.env.GITHUB_SOURCE;

export async function getEvents() {
  if (!(GITHUB_URL && GITHUB_SOURCE)) return [];

  try {
    const response = await fetch(
      buildUrl(GITHUB_URL, {
        per_page: '15',
        page: '1',
      }),
      {
        method: 'GET',
        headers: {
          Authorization: 'token '.concat(GITHUB_SOURCE),
          accept: 'application/vnd.github+json',
        },
        cache: 'force-cache',
        next: {
          revalidate: 3600,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.warn(data);
      return filterEventsByType(data);
    }

    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

const buildUrl = (url: string, queryParams = {}): string => {
  const params = new URLSearchParams(queryParams);

  const finalUrl = new URL(url);
  finalUrl.search = params.toString();

  return finalUrl.toString();
};

const filterEventsByType = (events: Event[]): Event[] => {
  return events.filter(
    (event: Event) =>
      !['PullRequestEvent', 'WatchEvent', 'PullRequestReviewEvent', 'CreateEvent'].includes(
        event.type as EventType,
      ),
  );
};
