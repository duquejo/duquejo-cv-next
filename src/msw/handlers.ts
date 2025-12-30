import { HttpResponse, http, type RequestHandler } from 'msw';

export const handlers: RequestHandler[] = [
  http.get('https://abc.xyz/events', () => {
    const interceptedResponse = [
      {
        id: '123',
        type: 'PushEvent',
      },
      {
        id: '456',
        type: 'CreateEvent',
      },
      {
        id: '789',
        type: 'IssuesEvent',
      },
    ];

    return new HttpResponse(JSON.stringify(interceptedResponse), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }),

  http.post('/api/v1/pdf', () => {
    const buffer = Buffer.from('PDF content');
    return HttpResponse.arrayBuffer(buffer.buffer, {
      headers: {
        contentType: 'application/pdf',
      },
    });
  }),
];

export const errorHandlers: RequestHandler[] = [
  http.get('https://abc.xyz/events', () => {
    return HttpResponse.error();
  }),

  http.post('/api/v1/pdf', () => {
    return HttpResponse.error();
  }),
];
