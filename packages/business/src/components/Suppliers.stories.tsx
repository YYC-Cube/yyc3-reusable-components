import type { Meta, StoryObj } from '@storybook/react';
import { Suppliers } from './Suppliers';

const meta: Meta<typeof Suppliers> = {
  title: 'Business/Suppliers',
  component: Suppliers,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Suppliers>;

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

export const Verified: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Suppliers displaying verified status',
      },
    },
  },
};

export const HighRating: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Suppliers with high ratings',
      },
    },
  },
};

export const WithReliability: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Suppliers displaying reliability scores',
      },
    },
  },
};
