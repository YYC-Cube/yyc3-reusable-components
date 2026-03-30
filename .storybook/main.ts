import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../packages/ui/src/**/*.mdx',
    '../packages/ui/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/hooks/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/business/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/ai/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/smart/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/effects/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
    '../packages/navigation/src/**/*.stories.@(js|jsx|mjs|tsx|ts)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: undefined,
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  features: {
    buildStoriesJson: true,
    storyStoreV7: true,
    previewMdx2: true,
  },
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
};

export default config;
