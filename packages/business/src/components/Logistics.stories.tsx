import type { Meta, StoryObj } from '@storybook/react';
import { Logistics } from './Logistics';

const meta: Meta<typeof Logistics> = {
  title: 'Business/Logistics',
  component: Logistics,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Logistics>;

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

export const InTransit: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Logistics displaying in-transit shipments',
      },
    },
  },
};

export const Arrived: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Logistics displaying arrived shipments',
      },
    },
  },
};

export const WithMap: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Logistics displaying map view',
      },
    },
  },
};
