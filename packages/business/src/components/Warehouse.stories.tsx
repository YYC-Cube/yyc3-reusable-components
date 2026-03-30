import type { Meta, StoryObj } from '@storybook/react';
import { Warehouse } from './Warehouse';

const meta: Meta<typeof Warehouse> = {
  title: 'Business/Warehouse',
  component: Warehouse,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Warehouse>;

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

export const Active: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warehouse displaying active status',
      },
    },
  },
};

export const HighUtilization: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warehouse with high utilization',
      },
    },
  },
};

export const Maintenance: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warehouse under maintenance',
      },
    },
  },
};
