import type { Meta, StoryObj } from '@storybook/react';
import { Leads } from './Leads';

const meta: Meta<typeof Leads> = {
  title: 'Business/Leads',
  component: Leads,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Leads>;

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

export const Pipeline: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Leads displaying pipeline view',
      },
    },
  },
};

export const List: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Leads displaying list view',
      },
    },
  },
};

export const Analytics: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Leads displaying analytics',
      },
    },
  },
};
