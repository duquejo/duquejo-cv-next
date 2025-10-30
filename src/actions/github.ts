'use server';

import type { Event, EventType } from '@/interfaces';

const EVENT_GITHUB_URL = process.env.EVENT_GITHUB_URL;
const EVENT_GITHUB_SOURCE = process.env.EVENT_GITHUB_SOURCE;

export async function getEvents() {
  if (!(EVENT_GITHUB_URL && EVENT_GITHUB_SOURCE)) return [];

  const authSource = 'token '.concat(EVENT_GITHUB_SOURCE);

  const requestParams = {
    per_page: '10',
    page: '1',
  };

  const requestConfig = {
    method: 'GET',
    headers: {
      Authorization: authSource,
      accept: 'application/vnd.github+json',
    },
    cache: 'force-cache',
    next: {
      revalidate: 3600,
    },
  } satisfies RequestInit;

  try {
    const response = await fetch(buildUrl(EVENT_GITHUB_URL, requestParams), requestConfig);

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

const filterEventsByType = (events: Event[]): Event[] =>
  events.filter(
    (event: Event) =>
      !['PullRequestEvent', 'PullRequestReviewEvent', 'CreateEvent', 'DeleteEvent'].includes(
        event.type as EventType,
      ),
  );
