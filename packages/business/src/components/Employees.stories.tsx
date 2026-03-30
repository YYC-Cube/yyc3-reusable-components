import type { Meta, StoryObj } from '@storybook/react';
import { Employees } from './Employees';

const meta: Meta<typeof Employees> = {
  title: 'Business/Employees',
  component: Employees,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Employees>;

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
      source: 'performance',
      employeeId: 'EMP-001',
      sourceModule: 'performance',
    },
  },
};

export const WithNavigationHandler: Story = {
  args: {
    currentLanguage: 'en',
    navigationContext: {
      source: 'attendance',
      employeeId: 'EMP-002',
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
      employeeId: 'EMP-003',
      recommendations: [
        {
          title: 'View Performance',
          description: 'View performance evaluation records',
          action: 'navigate',
          data: { target: 'performance', employeeId: 'EMP-003' },
        },
      ],
    },
  },
};
