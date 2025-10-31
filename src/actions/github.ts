'use server';

import type { BlogPostResult, Event, EventType } from '@/interfaces';
import { getBlogPostsByLocale } from './blog';

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

const getRequestConfig = (authSource: string): RequestInit => ({
  method: 'GET',
  headers: {
    Authorization: authSource,
    accept: 'application/vnd.github+json',
  },
  cache: 'force-cache',
  next: {
    revalidate: 3600,
  },
});

export async function getEvents(): Promise<Event[]> {
  if (!(EVENT_GITHUB_URL && EVENT_GITHUB_SOURCE)) return [];

  const authSource = 'token '.concat(EVENT_GITHUB_SOURCE);
  let events: Event[] = [];

  try {
    const response = await fetch(
      buildUrl(EVENT_GITHUB_URL, requestParams),
      getRequestConfig(authSource),
    );

    if (response.ok) {
      const data = await response.json();
      events = filterEventsChain(data);
    }

    const blogPosts = await getBlogPostsByLocale(DEFAULT_BLOG_EVENTS_LIMIT);

    if (blogPosts.length > 0) {
      events.push(...transformBlogPostsToEvents(blogPosts));
    }

    return events.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
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

const filterEventsChain = (events: Event[]): Event[] =>
  events.filter(filterGithubEvents).map(parseGithubProperties);

const filterGithubEvents = (event: Event) => !EVENTS_TO_EXCLUDE.includes(event.type as EventType);

const parseGithubProperties = (event: Event) => ({
  ...event,
  payload: { ...event.payload, ref: parseBranch(event.payload?.ref) },
  actor: { ...event.actor, url: parseInnerUrls(event.actor?.url, '/users') },
  repo: { ...event.repo, url: parseInnerUrls(event.repo?.url, '/repos') },
});

const parseBranch = (url?: string | null) => url && String(url).replace('refs/heads/', '');

const parseInnerUrls = (url: string, pattern: string = '') =>
  String(url).replace(`https://api.github.com${pattern}`, 'https://github.com');

const transformBlogPostsToEvents = (blogPosts: BlogPostResult[]): Event[] =>
  blogPosts.map(({ metadata }) => ({
    id: `blog-${metadata.slug}`,
    type: 'BlogPostEvent',
    created_at: metadata.publishDate,
    public: true,
    actor: {
      id: 0,
      login: 'duquejo/duquejo-cv-next',
      display_login: 'José Duque',
      gravatar_id: '',
      url: '',
      avatar_url: 'https://avatars.githubusercontent.com/u/47703424',
    },
    repo: {
      id: 0,
      name: 'duquejo/duquejo-cv-next',
      url: `/blog/${metadata.slug}`,
    },
    payload: {
      ref: 'blog',
      blog_slug: metadata.slug,
      blog_title: metadata.title,
      description: metadata.excerpt,
      blog_category: metadata.category,
      blog_tags: metadata.tags,
    },
  }));
