/**
 * file: chart.stories.tsx
 * description: Chart 组件的 Storybook 文档
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-30
 * updated: 2026-03-30
 * status: active
 * tags: [storybook],[ui],[chart]
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './chart';

const meta: Meta<typeof Chart> = {
  title: 'UI/Chart',
  component: Chart,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

const sampleData = [
  { name: '一月', value: 400 },
  { name: '二月', value: 300 },
  { name: '三月', value: 500 },
  { name: '四月', value: 450 },
  { name: '五月', value: 600 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    width: 400,
    height: 300,
  },
};

export const LineChart: Story = {
  args: {
    data: sampleData,
    type: 'line',
    width: 400,
    height: 300,
  },
};

export const BarChart: Story = {
  args: {
    data: sampleData,
    type: 'bar',
    width: 400,
    height: 300,
  },
};

export const AreaChart: Story = {
  args: {
    data: sampleData,
    type: 'area',
    width: 400,
    height: 300,
  },
};

export const PieChart: Story = {
  args: {
    data: sampleData,
    type: 'pie',
    width: 400,
    height: 300,
  },
};
