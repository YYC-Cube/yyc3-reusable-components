import type { Meta, StoryObj } from '@storybook/react';
import { Documents } from './Documents';

const meta: Meta<typeof Documents> = {
  title: 'Business/Documents',
  component: Documents,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Documents>;

export const English: Story = {
  args: {
    currentLanguage: 'en',
  },
};

export const Chinese: Story = {
  args: {
    currentLanguage: 'zh',
  },
};

export const GridView: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Documents displaying grid view',
      },
    },
  },
};

export const ListView: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Documents displaying list view',
      },
    },
  },
};

export const WithRecentFiles: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Documents displaying recent files',
      },
    },
  },
};
