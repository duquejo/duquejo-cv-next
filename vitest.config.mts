import react from '@vitejs/plugin-react';
import { configDefaults, coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['./__tests__/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['setupTests.ts'],
    exclude: ['**/e2e/**', ...configDefaults.exclude],
    coverage: {
      include: ['src/**'],
      reporter: ['text', 'html'],
      exclude: [
        '**/interfaces/**',
        '**/components/ui/**',
        '**/e2e/**',
        ...coverageConfigDefaults.exclude,
      ],
    },
    server: {
      deps: {
        inline: ['next-intl'],
      },
    },
  },
});
