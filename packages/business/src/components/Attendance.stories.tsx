import type { Meta, StoryObj } from '@storybook/react';
import { Attendance } from './Attendance';

const meta: Meta<typeof Attendance> = {
  title: 'Business/Attendance',
  component: Attendance,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Attendance>;

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

export const CalendarView: Story = {
  args: {
    currentLanguage: 'zh',
  },
  parameters: {
    docs: {
      description: {
        story: 'Attendance displaying calendar view',
      },
    },
  },
};

export const RecordsView: Story = {
  args: {
    currentLanguage: 'zh',
  },
  parameters: {
    docs: {
      description: {
        story: 'Attendance displaying records view',
      },
    },
  },
};

export const LeaveView: Story = {
  args: {
    currentLanguage: 'zh',
  },
  parameters: {
    docs: {
      description: {
        story: 'Attendance displaying leave requests',
      },
    },
  },
};

export const StatisticsView: Story = {
  args: {
    currentLanguage: 'zh',
  },
  parameters: {
    docs: {
      description: {
        story: 'Attendance displaying statistics',
      },
    },
  },
};
