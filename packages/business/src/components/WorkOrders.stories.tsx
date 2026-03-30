import type { Meta, StoryObj } from '@storybook/react';
import { WorkOrders } from './WorkOrders';

const meta: Meta<typeof WorkOrders> = {
  title: 'Business/WorkOrders',
  component: WorkOrders,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WorkOrders>;

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

export const BoardView: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'WorkOrders displaying board view',
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
        story: 'WorkOrders displaying list view',
      },
    },
  },
};

export const StatsView: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'WorkOrders displaying statistics',
      },
    },
  },
};
