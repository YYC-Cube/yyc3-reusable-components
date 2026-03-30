import type { Meta, StoryObj } from '@storybook/react';
import { Performance } from './Performance';

const meta: Meta<typeof Performance> = {
  title: 'Business/Performance',
  component: Performance,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Performance>;

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

export const TopPerformers: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance displaying top performers',
      },
    },
  },
};

export const WithTrends: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance displaying trends',
      },
    },
  },
};

export const DepartmentComparison: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance displaying department comparison',
      },
    },
  },
};
