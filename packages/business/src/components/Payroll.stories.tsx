import type { Meta, StoryObj } from '@storybook/react';
import { Payroll } from './Payroll';

const meta: Meta<typeof Payroll> = {
  title: 'Business/Payroll',
  component: Payroll,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Payroll>;

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

export const WithProcessing: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Payroll with processing status displayed',
      },
    },
  },
};

export const WithErrors: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Payroll showing error states and WPS rejections',
      },
    },
  },
};

export const WithCompliance: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Payroll displaying WPS compliance information',
      },
    },
  },
};
