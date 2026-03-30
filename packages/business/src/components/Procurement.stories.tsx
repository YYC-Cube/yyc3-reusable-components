import type { Meta, StoryObj } from '@storybook/react';
import { Procurement } from './Procurement';

const meta: Meta<typeof Procurement> = {
  title: 'Business/Procurement',
  component: Procurement,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Procurement>;

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

export const WithHighPriority: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Procurement with high priority orders displayed',
      },
    },
  },
};

export const WithInTransit: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Procurement showing orders in transit status',
      },
    },
  },
};

export const WithAIRisk: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Procurement displaying AI risk indicators for orders',
      },
    },
  },
};
