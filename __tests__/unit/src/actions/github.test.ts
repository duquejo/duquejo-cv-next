import { beforeEach, type Mock } from 'vitest';
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
    vi.clearAllMocks();
  });

  it('should retrieve the Github events', async () => {
    const mockedResponse = {
      ok: true,
      json: () => Promise.resolve(payload),
    };
    global.fetch = vi.fn().mockImplementation(() => Promise.resolve(mockedResponse)) as Mock;

    const response = await getEvents();

    expect(response).toEqual(payload);
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });

  it('should retrieve empty if the request fails', async () => {
    const mockedResponse = {
      ok: false,
    };
    global.fetch = vi.fn().mockImplementation(() => Promise.resolve(mockedResponse)) as Mock;

    const response = await getEvents();

    expect(response).toEqual([]);
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });

  it('should filter the non-required events', async () => {
    const payloadWithoutFilters = [
      ...payload,
      {
        id: 123,
        type: 'CreateEvent',
      },
    ];
    const mockedResponse = {
      ok: true,
      json: () => Promise.resolve(payloadWithoutFilters),
    };
    global.fetch = vi.fn().mockImplementation(() => Promise.resolve(mockedResponse)) as Mock;

    const response = await getEvents();

    expect(response).not.toEqual(payloadWithoutFilters);
    expect(response).toHaveLength(1);
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });

  it('should return empty if the request failed', async () => {
    global.fetch = vi.fn().mockImplementation(() => Promise.reject('Something happened')) as Mock;

    const response = await getEvents();

    expect(response).toEqual([]);
    expect(consoleMock).toHaveBeenCalledWith('Something happened');
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expectedConfig);
  });
});
