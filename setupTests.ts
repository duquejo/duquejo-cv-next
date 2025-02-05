import '@testing-library/jest-dom/vitest';
import { loadEnvConfig } from '@next/env';
import { worker } from '@/msw/worker';

loadEnvConfig(process.cwd());

// Start worker before all tests
beforeAll(() => {
  worker.listen({
    onUnhandledRequest: 'error',
  });
});

//  Close worker after all tests
afterAll(() => {
  worker.close();
});

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  worker.resetHandlers();
});
