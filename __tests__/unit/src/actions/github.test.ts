import { beforeEach, afterEach, type Mock } from 'vitest';
import { getEvents } from '@/actions/github';

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

  const consoleMock = vi.spyOn(console, 'error');

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should retrieve the Github events', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(payload),
    });

    const response = await getEvents();

    expect(response).toEqual(payload);
    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });

  it('should retrieve empty if the request fails', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: false,
    });

    const response = await getEvents();

    expect(response).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });

  it('should filter the non-required events', async () => {
    const payloadWithoutFilters = [
      ...payload,
      {
        id: 123,
        type: 'CreateEvent',
      },
    ];
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(payloadWithoutFilters),
    });

    const response = await getEvents();

    expect(response).not.toEqual(payloadWithoutFilters);
    expect(response).toHaveLength(1);
    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });

  it('should return empty if the request failed', async () => {
    (global.fetch as Mock).mockRejectedValueOnce('Something happened');

    const response = await getEvents();

    expect(response).toEqual([]);
    expect(consoleMock).toHaveBeenCalledWith('Something happened');
    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });
});
