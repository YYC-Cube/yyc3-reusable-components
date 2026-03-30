import type { Meta, StoryObj } from '@storybook/react';
import { Loans } from './Loans';

const meta: Meta<typeof Loans> = {
  title: 'Business/Loans',
  component: Loans,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loans>;

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
        story: 'Loans displaying active status',
      },
    },
  },
};

export const Completed: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loans displaying completed status',
      },
    },
  },
};

export const WithHighInterest: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loans with high interest rates',
      },
    },
  },
};
