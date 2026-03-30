import type { Meta, StoryObj } from '@storybook/react';
import { Reports } from './Reports';

const meta: Meta<typeof Reports> = {
  title: 'Business/Reports',
  component: Reports,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Reports>;

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

export const WithFinancialReports: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Reports displaying financial statements and analysis',
      },
    },
  },
};

export const WithSalesReports: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Reports showing sales analytics and trends',
      },
    },
  },
};

export const WithZATCACompliance: Story = {
  args: {
    currentLanguage: 'en',
  },
  parameters: {
    docs: {
      description: {
        story: 'Reports displaying ZATCA compliance and tax information',
      },
    },
  },
};
