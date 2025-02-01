import { beforeEach, afterEach, type Mock } from 'vitest';
import { getEvents } from '@/actions/github';

const mockFetch = vi.fn();

vi.stubGlobal('fetch', mockFetch);

describe('Github action', () => {
  const payload = [
    {
      id: 123,
      type: 'PushEvent',
    },
  ];

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
  });

  it('should retrieve the Github events', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(payload),
    });

    const response = await getEvents();

    expect(response).toEqual(payload);
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });

  it('should retrieve empty if the request fails', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const response = await getEvents();

    expect(response).toEqual([]);
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });

  it('should filter the non-required events', async () => {
    const payloadWithoutFilters = [
      ...payload,
      {
        id: 123,
        type: 'CreateEvent',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(payloadWithoutFilters),
    });

    const response = await getEvents();

    expect(response).not.toEqual(payloadWithoutFilters);
    expect(response).toHaveLength(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });

  it('should return empty if the request failed', async () => {
    mockFetch.mockRejectedValueOnce('Something happened');

    const response = await getEvents();

    expect(response).toEqual([]);
    expect(mockFetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });
});
