import type { Meta, StoryObj } from '@storybook/react';
import { Projects } from './Projects';

const meta: Meta<typeof Projects> = {
  title: 'Business/Projects',
  component: Projects,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Projects>;

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

export const WithNavigationContext: Story = {
  args: {
    currentLanguage: 'en',
    navigationContext: {
      source: 'customers',
      customerId: 'CUST-001',
    },
  },
};

export const WithNavigationHandler: Story = {
  args: {
    currentLanguage: 'en',
    navigationContext: {
      source: 'dashboard',
      customerId: 'CUST-002',
    },
    onNavigate: (view: string, context?: Record<string, any>) => {
      console.log('Navigate to:', view, 'with context:', context);
    },
  },
};

export const WithRecommendations: Story = {
  args: {
    currentLanguage: 'en',
    navigationContext: {
      source: 'dashboard',
      customerId: 'CUST-001',
      recommendations: [
        {
          title: 'Create New Project',
          description: 'Create a new project for this customer',
          action: 'create',
          data: { customerId: 'CUST-001' },
        },
      ],
    },
  },
};
