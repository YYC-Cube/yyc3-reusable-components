import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '**/*.test.tsx',
        '**/*.test.ts',
        '**/*.stories.tsx',
        '**/dist/',
        '**/build/',
      ],
    },
    performance: {
      enabled: true,
      thresholds: {
        duration: 100, // ms
        memory: 1024 * 1024, // 1MB
      },
      reporters: ['json', 'html'],
    },
    reporters: ['json', 'html', 'verbose'],
    outputFile: {
      json: './performance-results/results.json',
      html: './performance-results/report.html',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './packages/core/src'),
      '@ui': path.resolve(__dirname, './packages/ui/src'),
      '@business': path.resolve(__dirname, './packages/business/src'),
      '@hooks': path.resolve(__dirname, './packages/hooks/src'),
      '@utils': path.resolve(__dirname, './packages/utils/src'),
    },
  },
});
