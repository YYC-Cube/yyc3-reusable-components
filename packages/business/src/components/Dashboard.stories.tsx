import type { Meta, StoryObj } from '@storybook/react';
import { Dashboard } from './Dashboard';

const meta: Meta<typeof Dashboard> = {
  title: 'Business/Dashboard',
  component: Dashboard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {
  args: {
    title: 'Business Dashboard',
  },
};

export const WithData: Story = {
  args: {
    title: 'Sales Dashboard',
    metrics: {
      totalRevenue: 125000,
      activeUsers: 1234,
      conversionRate: 3.2,
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithError: Story = {
  args: {
    error: 'Failed to load dashboard data',
  },
};

export const Compact: Story = {
  args: {
    layout: 'compact',
    title: 'Compact Dashboard',
  },
};

export const Detailed: Story = {
  args: {
    layout: 'detailed',
    title: 'Detailed Dashboard',
    showAdvancedMetrics: true,
  },
};
