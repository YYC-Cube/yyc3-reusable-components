import type { Meta, StoryObj } from '@storybook/react';
import { Customers } from './Customers';

const meta: Meta<typeof Customers> = {
  title: 'Business/Customers',
  component: Customers,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Customers>;

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
      source: 'orders',
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
          title: 'View Customer Orders',
          description: 'View all orders for this customer',
          action: 'navigate',
          data: { target: 'orders', customerId: 'CUST-001' },
        },
      ],
    },
  },
};
