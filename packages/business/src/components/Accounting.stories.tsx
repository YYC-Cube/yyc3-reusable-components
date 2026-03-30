import type { Meta, StoryObj } from '@storybook/react';
import { Accounting } from './Accounting';

const meta: Meta<typeof Accounting> = {
  title: 'Business/Accounting',
  component: Accounting,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accounting>;

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

export const WithAssets: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accounting displaying asset accounts',
      },
    },
  },
};

export const WithLiabilities: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accounting displaying liability accounts',
      },
    },
  },
};

export const WithRevenue: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accounting displaying revenue and expense accounts',
      },
    },
  },
};
