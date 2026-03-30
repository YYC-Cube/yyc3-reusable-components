import type { Meta, StoryObj } from '@storybook/react';
import { Approvals } from './Approvals';

const meta: Meta<typeof Approvals> = {
  title: 'Business/Approvals',
  component: Approvals,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Approvals>;

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

export const WithPending: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Approvals displaying pending requests',
      },
    },
  },
};

export const WithApproved: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Approvals displaying approved requests',
      },
    },
  },
};

export const WithHighPriority: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Approvals showing high priority requests',
      },
    },
  },
};
