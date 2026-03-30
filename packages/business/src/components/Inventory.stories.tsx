import type { Meta, StoryObj } from '@storybook/react';
import { Inventory } from './Inventory';

const meta: Meta<typeof Inventory> = {
  title: 'Business/Inventory',
  component: Inventory,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Inventory>;

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

export const WithLowStock: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inventory with low stock alerts displayed',
      },
    },
  },
};

export const WithIncomingStock: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inventory showing incoming stock from procurement',
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
        story: 'Inventory displaying trend indicators for each item',
      },
    },
  },
};
