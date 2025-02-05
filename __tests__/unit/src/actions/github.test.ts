import { beforeEach, type MockInstance } from 'vitest';
import { getEvents } from '@/actions/github';
import { worker } from '@/msw/worker';
import { errorHandlers } from '@/msw/handlers';

describe('Github action', () => {
  let fetchSpy: MockInstance;

  const expectedConfig = {
    cache: 'force-cache',
    headers: expect.any(Object),
    method: 'GET',
    next: {
      revalidate: 3600,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    fetchSpy = vi.spyOn(global, 'fetch');
  });

  it('should retrieve the Github events', async () => {
    const response = await getEvents();

    expect(response.length).toBeGreaterThan(0);
    expect(fetchSpy).toHaveBeenCalledWith(expect.any(Object), expectedConfig);
  });

  it('should retrieve empty if the request fails', async () => {
    worker.use(...errorHandlers);

    const response = await getEvents();

    expect(response).toEqual([]);
    expect(fetchSpy).toHaveBeenCalledWith(expect.any(Object), expectedConfig);
  });

  it('should filter the non-required events', async () => {
    const response = await getEvents();

    expect(response).toHaveLength(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.any(Object), expectedConfig);
  });
});
