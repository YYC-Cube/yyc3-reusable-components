import type { Meta, StoryObj } from '@storybook/react';
import { Payments } from './Payments';

const meta: Meta<typeof Payments> = {
  title: 'Business/Payments',
  component: Payments,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Payments>;

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

export const WithReceived: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Payments displaying received payments',
      },
    },
  },
};

export const WithSent: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Payments displaying sent payments',
      },
    },
  },
};

export const WithPending: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Payments showing pending status',
      },
    },
  },
};
