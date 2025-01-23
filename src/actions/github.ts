'use server';

import { type Event, EventType } from '@/interfaces';

const GITHUB_URL = process.env.GITHUB_URL || '';
const GITHUB_SOURCE = process.env.GITHUB_SOURCE || '';

export const getEvents = async () => {
  try {
    const pathParams = new URLSearchParams({
      per_page: '15',
      page: '1',
    });

    const url = new URL(GITHUB_URL);
    url.search = pathParams.toString();

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: 'token '.concat(GITHUB_SOURCE),
        accept: 'application/vnd.github+json',
      },
      cache: 'force-cache',
      next: {
        revalidate: 3600,
      },
    });

    if (response.ok) {
      return filterEventsByType(await response.json());
    }

    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

const filterEventsByType = (events: Event[]): Event[] => {
  return events.filter(
    (event: Event) =>
      ![
        EventType.PullRequestEvent,
        EventType.WatchEvent,
        EventType.PullRequestReviewEvent,
        EventType.CreateEvent,
      ].includes(event.type),
  );
};
