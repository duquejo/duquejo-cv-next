import { getBlogPostsByLocale } from '@/actions/blog';
import { getEvents } from '@/actions/events';
import { errorHandlers } from '@/msw/handlers';
import { worker } from '@/msw/worker';
import { beforeEach, type MockInstance } from 'vitest';

vi.mock('@/actions/blog');

describe('Events action', () => {
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

    expect(response).toHaveLength(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.any(Object), expectedConfig);
    expect(getBlogPostsByLocaleMock).toHaveBeenCalledWith(5);
  });
});
