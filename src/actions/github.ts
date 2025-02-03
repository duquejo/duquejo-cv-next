'use server';

import type { Event, EventType } from '@/interfaces';

const EVENT_GITHUB_URL = process.env.EVENT_GITHUB_URL;
const EVENT_GITHUB_SOURCE = process.env.EVENT_GITHUB_SOURCE;

export async function getEvents() {
  if (!(EVENT_GITHUB_URL && EVENT_GITHUB_SOURCE)) return [];

  try {
    const response = await fetch(
      buildUrl(EVENT_GITHUB_URL, {
        per_page: '15',
        page: '1',
      }),
      {
        method: 'GET',
        headers: {
          Authorization: 'token '.concat(EVENT_GITHUB_SOURCE),
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
