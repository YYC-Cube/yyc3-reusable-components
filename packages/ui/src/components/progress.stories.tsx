import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const ZeroProgress: Story = {
  args: {
    value: 0,
  },
};

export const HalfProgress: Story = {
  args: {
    value: 50,
  },
};

export const CompleteProgress: Story = {
  args: {
    value: 100,
  },
};

export const MultipleProgress: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Downloading...</span>
          <span>25%</span>
        </div>
        <Progress value={25} className="h-2" />
      </div>
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Processing...</span>
          <span>50%</span>
        </div>
        <Progress value={50} className="h-2" />
      </div>
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Almost done...</span>
          <span>75%</span>
        </div>
        <Progress value={75} className="h-2" />
      </div>
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Complete!</span>
          <span>100%</span>
        </div>
        <Progress value={100} className="h-2" />
      </div>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={60} className="h-1" />
      <Progress value={60} className="h-2" />
      <Progress value={60} className="h-3" />
      <Progress value={60} className="h-4" />
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={75} className="h-2 [&>div]:bg-blue-500" />
      <Progress value={75} className="h-2 [&>div]:bg-green-500" />
      <Progress value={75} className="h-2 [&>div]:bg-yellow-500" />
      <Progress value={75} className="h-2 [&>div]:bg-red-500" />
    </div>
  ),
};

export const TaskProgress: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-6">
      {[
        { task: 'Setup project', progress: 100 },
        { task: 'Design UI', progress: 85 },
        { task: 'Develop features', progress: 60 },
        { task: 'Testing', progress: 30 },
        { task: 'Deployment', progress: 0 },
      ].map((item) => (
        <div key={item.task}>
          <div className="mb-2 flex justify-between text-sm">
            <span>{item.task}</span>
            <span className="text-muted-foreground">{item.progress}%</span>
          </div>
          <Progress value={item.progress} className="h-2" />
        </div>
      ))}
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium">Loading data...</p>
        <Progress value={45} className="h-2 animate-pulse" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Processing files...</p>
        <Progress value={72} className="h-2 animate-pulse" />
      </div>
    </div>
  ),
};

export const StorageUsage: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Storage Used</span>
          <span>7.5 GB / 10 GB</span>
        </div>
        <Progress value={75} className="h-3" />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded bg-blue-500" />
          <span>Photos (3 GB)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded bg-green-500" />
          <span>Videos (2.5 GB)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded bg-yellow-500" />
          <span>Documents (1 GB)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-3 rounded bg-gray-500" />
          <span>Other (1 GB)</span>
        </div>
      </div>
    </div>
  ),
};
