'use server';

import { type Event, EventType } from '@/interfaces';

const GITHUB_URL = process.env.GITHUB_URL || '';
const GITHUB_SOURCE = process.env.GITHUB_SOURCE || '';

export const getEvents = async () => {
  const pathParams = new URLSearchParams({
    per_page: '15',
    page: '1',
  });

  const url = new URL(GITHUB_URL);
  url.search = pathParams.toString();

  try {
    const events = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: 'token '.concat(GITHUB_SOURCE),
        accept: 'application/vnd.github+json',
      },
    }).then((response) => response.json());
    return filterEventsByType(events);
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
