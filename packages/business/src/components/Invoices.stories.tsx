import type { Meta, StoryObj } from '@storybook/react';
import { Invoices } from './Invoices';

const meta: Meta<typeof Invoices> = {
  title: 'Business/Invoices',
  component: Invoices,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Invoices>;

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
      orderId: 'ORD-2025-001',
    },
  },
};

export const WithNavigationHandler: Story = {
  args: {
    currentLanguage: 'en',
    navigationContext: {
      source: 'dashboard',
      customerId: 'CUST-001',
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
      orderId: 'ORD-2025-001',
      recommendations: [
        {
          title: 'Generate Invoice from Order',
          description: 'Auto-generate invoice from order data',
          action: 'generate',
          data: { orderId: 'ORD-2025-001' },
        },
      ],
    },
  },
};
