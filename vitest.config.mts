import { configDefaults, coverageConfigDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['./__tests__/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['setupTests.mts'],
    exclude: ['**/e2e/**', ...configDefaults.exclude],
    coverage: {
      include: ['src/**'],
      reporter: ['text', 'html'],
      exclude: ['**/interfaces/**', '**/e2e/**', ...coverageConfigDefaults.exclude],
    },
  },
});
