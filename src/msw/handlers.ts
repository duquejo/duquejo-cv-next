import { http, HttpResponse } from 'msw';

export const handlers = [
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

export const errorHandlers = [
  http.get('https://abc.xyz/events', () => {
    return HttpResponse.error();
  }),

  http.post('/api/v1/pdf', () => {
    return HttpResponse.error();
  }),
];
