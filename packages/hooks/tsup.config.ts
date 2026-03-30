import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'sonner',
    '../services/DevOpsService',
    '../utils/supabase/info',
    '../services/DatabaseService',
    '../components/NotificationCenter',
  ],
});
