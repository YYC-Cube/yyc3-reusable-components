import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // 暂时禁用 DTS 生成，因为存在未解决的导入
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@yyc3/ui',
    '@yyc3/core',
    '@yyc3/hooks',
    '@yyc3/utils',
    '@yyc3/themes',
  ],
  // 跳过不存在的模块
  ignoreNodeModules: true,
  // 忽略外部依赖警告
  esbuildOptions(options) {
    options.logLevel = 'error';
  },
});
