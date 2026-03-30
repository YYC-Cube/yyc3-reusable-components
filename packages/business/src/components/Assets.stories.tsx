import type { Meta, StoryObj } from '@storybook/react';
import { Assets } from './Assets';

const meta: Meta<typeof Assets> = {
  title: 'Business/Assets',
  component: Assets,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Assets>;

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

export const WithOperational: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Assets displaying operational status',
      },
    },
  },
};

export const WithMaintenance: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Assets showing maintenance required',
      },
    },
  },
};

export const WithDepreciation: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Assets displaying depreciation chart',
      },
    },
  },
};
