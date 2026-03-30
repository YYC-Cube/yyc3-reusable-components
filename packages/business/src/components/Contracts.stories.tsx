import type { Meta, StoryObj } from '@storybook/react';
import { Contracts } from './Contracts';

const meta: Meta<typeof Contracts> = {
  title: 'Business/Contracts',
  component: Contracts,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Contracts>;

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

export const Overview: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Contracts displaying overview',
      },
    },
  },
};

export const List: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Contracts displaying list view',
      },
    },
  },
};

export const Templates: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Contracts displaying templates',
      },
    },
  },
};

export const Analytics: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Contracts displaying analytics',
      },
    },
  },
};
