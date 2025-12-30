import { beforeEach, type MockInstance } from 'vitest';
import { getBlogPostsByLocale } from '@/actions/blog';
import { getEvents } from '@/actions/events';
import type { Event } from '@/interfaces';
import { errorHandlers } from '@/msw/handlers';
import { worker } from '@/msw/worker';
import { MockBlogPostBuilder } from '../../builders';

vi.mock('@/actions/blog', () => ({
  getBlogPostsByLocale: vi.fn(),
}));

let fetchSpy: MockInstance;
let getBlogPostsByLocaleMock: MockInstance;

const expectedConfig = {
  method: 'GET',
  headers: expect.any(Object),
  cache: 'force-cache',
  next: {
    revalidate: 3600,
  },
};

describe('Events action', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    fetchSpy = vi.spyOn(global, 'fetch');
    getBlogPostsByLocaleMock = vi.mocked(getBlogPostsByLocale);
    getBlogPostsByLocaleMock.mockResolvedValueOnce([]);
  });

  it('should retrieve the events', async () => {
    const response = await getEvents();

    expect(response.length).toBeGreaterThan(0);
    expect(fetchSpy).toHaveBeenCalledWith(expect.any(Object), expectedConfig);
    expect(getBlogPostsByLocaleMock).toHaveBeenCalledWith(5);
  });

  it('should retrieve empty if the request fails', async () => {
    worker.use(...errorHandlers);

    const response = await getEvents();

    expect(response).toEqual([]);
    expect(fetchSpy).toHaveBeenCalledWith(expect.any(Object), expectedConfig);
    expect(getBlogPostsByLocaleMock).not.toHaveBeenCalled();
  });

  it('should filter the non-required events', async () => {
    const response = await getEvents();

    expect(response).toHaveLength(2);
    expect(fetchSpy).toHaveBeenCalledWith(expect.any(Object), expectedConfig);
    expect(getBlogPostsByLocaleMock).toHaveBeenCalledWith(5);
  });
});

describe('Blog events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();

    fetchSpy = vi.spyOn(global, 'fetch');
    getBlogPostsByLocaleMock = vi.mocked(getBlogPostsByLocale);
  });

  const assertBlogEventPresence = (blogEvent: Event[], expectedLimit = 1) => {
    const foundEvents = blogEvent.filter((event) => event.type === 'BlogPostEvent');

    expect(foundEvents).toHaveLength(expectedLimit);

    foundEvents.forEach((event) => {
      expect(event).toHaveProperty('id');
      expect(event).toHaveProperty('type');
      expect(event).toHaveProperty('created_at');
      expect(event).toHaveProperty('public');
      expect(event).toHaveProperty('actor');
      expect(event).toHaveProperty('repo');
      expect(event).toHaveProperty('payload');
    });
  };

  it('should include blog post events when blog posts are available', async () => {
    const mockBlogPost = new MockBlogPostBuilder()
      .withSlug('my-first-post')
      .withTitle('My First Blog Post')
      .withExcerpt('This is an excerpt')
      .withCategory('Coding')
      .withTags('typescript', 'testing')
      .withPublishDate('2024-11-01')
      .build();

    getBlogPostsByLocaleMock.mockResolvedValue([mockBlogPost]);

    const response = await getEvents();

    expect(response.length).toBeGreaterThanOrEqual(2);
    assertBlogEventPresence(response);
    expect(getBlogPostsByLocaleMock).toHaveBeenCalledWith(5);
  });

  it('should handle multiple blog posts and create multiple events', async () => {
    const mockPosts = [
      new MockBlogPostBuilder()
        .withSlug('post-1')
        .withTitle('First Post')
        .withPublishDate('2024-11-08')
        .build(),
      new MockBlogPostBuilder()
        .withSlug('post-2')
        .withTitle('Second Post')
        .withPublishDate('2024-11-07')
        .build(),
      new MockBlogPostBuilder()
        .withSlug('post-3')
        .withTitle('Third Post')
        .withPublishDate('2024-11-06')
        .build(),
    ];

    getBlogPostsByLocaleMock.mockResolvedValue(mockPosts);

    const response = await getEvents();
    assertBlogEventPresence(response, mockPosts.length);
    expect(getBlogPostsByLocaleMock).toHaveBeenCalledWith(5);
  });
});
