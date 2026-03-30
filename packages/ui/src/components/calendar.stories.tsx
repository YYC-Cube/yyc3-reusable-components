/**
 * file: calendar.stories.tsx
 * description: Calendar 组件的 Storybook 文档
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-30
 * updated: 2026-03-30
 * status: active
 * tags: [storybook],[ui],[calendar]
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    mode: 'single',
    className: 'rounded-md border',
  },
};

export const WithSelectedDate: Story = {
  args: {
    mode: 'single',
    selected: new Date(),
    className: 'rounded-md border',
  },
};

export const MultipleSelect: Story = {
  args: {
    mode: 'multiple',
    selected: [new Date(), new Date(Date.now() + 86400000), new Date(Date.now() + 172800000)],
    className: 'rounded-md border',
  },
};

export const RangeSelect: Story = {
  args: {
    mode: 'range',
    defaultMonth: new Date(),
    numberOfMonths: 2,
    className: 'rounded-md border',
  },
};

export const DisabledDates: Story = {
  args: {
    mode: 'single',
    disabled: { before: new Date() },
    className: 'rounded-md border',
  },
};

export const CustomCaption: Story = {
  args: {
    mode: 'single',
    formatters: {
      formatCaption: (date) => {
        return `${date.getFullYear()}年 ${date.getMonth() + 1}月`;
      },
    },
    className: 'rounded-md border',
  },
};

export const WeekStartsOnMonday: Story = {
  args: {
    mode: 'single',
    weekStartsOn: 1,
    className: 'rounded-md border',
  },
};
