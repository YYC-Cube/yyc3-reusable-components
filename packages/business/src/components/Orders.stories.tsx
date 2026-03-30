import type { Meta, StoryObj } from '@storybook/react';
import { Orders } from './Orders';

const meta: Meta<typeof Orders> = {
  title: 'Business/Orders',
  component: Orders,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Orders>;

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
      orderId: 'ORD-2025-001',
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
      customerId: 'CUST-002',
      recommendations: [
        {
          title: 'Create New Order',
          description: 'Create a new order for this customer',
          action: 'create',
          data: { customerId: 'CUST-002' },
        },
      ],
    },
  },
};
