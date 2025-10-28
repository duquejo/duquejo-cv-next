'use server';

import type { Event, EventType } from '@/interfaces';

export async function getEvents() {
  const EVENT_GITHUB_URL = process.env.EVENT_GITHUB_URL;
  const EVENT_GITHUB_SOURCE = process.env.EVENT_GITHUB_SOURCE;

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
      return filterEventsByType(data);
    }

    return [];
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`[error - events]: ${e.message}`);
    }
    return [];
  }
}

const buildUrl = (url: string, queryParams = {}): URL => {
  const params = new URLSearchParams(queryParams);

  const finalUrl = new URL(url);
  finalUrl.search = params.toString();

  return finalUrl;
};

const filterEventsByType = (events: Event[]): Event[] => {
  return events.filter(
    (event: Event) =>
      !['PullRequestEvent', 'WatchEvent', 'PullRequestReviewEvent', 'CreateEvent'].includes(
        event.type as EventType,
      ),
  );
};
