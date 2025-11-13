'use server';

import { getBlogPostsByLocale } from '@/actions/blog';
import type { BlogPostResult, Event, EventType } from '@/interfaces';
import { sortByDateString } from '@/lib';
import { BlogMapper } from '@/mappers/blog-mapper';

const EVENT_GITHUB_URL = process.env.EVENT_GITHUB_URL;
const EVENT_GITHUB_SOURCE = process.env.EVENT_GITHUB_SOURCE;

const EVENTS_TO_EXCLUDE = [
  'PullRequestEvent',
  'PullRequestReviewEvent',
  'CreateEvent',
  'DeleteEvent',
];

const DEFAULT_BLOG_EVENTS_LIMIT = 5;

const requestParams = { per_page: 10, page: 1 };

const requestArgs: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/vnd.github+json',
  },
  cache: 'force-cache',
  next: {
    revalidate: 3600,
  },
};

const getRequestConfig = (authSource: string): RequestInit => ({
  ...requestArgs,
  headers: {
    ...requestArgs.headers,
    Authorization: 'token '.concat(authSource),
  },
});

const buildUrl = (url: string, queryParams = {}): URL => {
  const params = new URLSearchParams(queryParams);

  const finalUrl = new URL(url);
  finalUrl.search = params.toString();

  return finalUrl;
};

const filterEventsChain = (events: Event[]): Event[] =>
  events
    .filter((event: Event) => !EVENTS_TO_EXCLUDE.includes(event.type as EventType))
    .map((event: Event) => ({
      ...event,
      payload: { ...event.payload, ref: parseBranch(event.payload?.ref) },
      actor: { ...event.actor, url: parseInnerUrls(event.actor?.url, '/users') },
      repo: { ...event.repo, url: parseInnerUrls(event.repo?.url, '/repos') },
    }));

const parseBranch = (url?: string | null) => url && String(url).replace('refs/heads/', '');

const parseInnerUrls = (url: string, pattern: string = '') =>
  String(url).replace(`https://api.github.com${pattern}`, 'https://github.com');

const mapBlogPostsIntoEvents = (blogPosts: BlogPostResult[]): Event[] =>
  blogPosts.map(({ metadata: blogPost }) => BlogMapper.toEvent(blogPost));

export async function getEvents(): Promise<Event[]> {
  if (!(EVENT_GITHUB_URL && EVENT_GITHUB_SOURCE)) return [];

  let events: Event[] = [];

  try {
    const response = await fetch(
      buildUrl(EVENT_GITHUB_URL, requestParams),
      getRequestConfig(EVENT_GITHUB_SOURCE),
    );

    if (response.ok) {
      const data = await response.json();
      events = filterEventsChain(data);
    }

    const blogPosts = await getBlogPostsByLocale(DEFAULT_BLOG_EVENTS_LIMIT);

    if (blogPosts.length > 0) {
      events.push(...mapBlogPostsIntoEvents(blogPosts));
    }

    return events.sort((a, b) => sortByDateString(a.created_at, b.created_at));
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`[error - events]: ${e.message}`);
    }
    return [];
  }
}
