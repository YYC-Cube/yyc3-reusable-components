import type { Meta, StoryObj } from '@storybook/react';
import { VAT } from './VAT';

const meta: Meta<typeof VAT> = {
  title: 'Business/VAT',
  component: VAT,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VAT>;

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

export const Pending: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'VAT displaying pending returns',
      },
    },
  },
};

export const Submitted: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'VAT displaying submitted returns',
      },
    },
  },
};

export const Approved: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'VAT displaying approved returns',
      },
    },
  },
};
