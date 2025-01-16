import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['setupTests.mts'],
    coverage: {
      include: ['src/**'],
      reporter: ['text', 'html'],
      exclude: ['**/interfaces/', ...coverageConfigDefaults.exclude],
    },
  },
});
