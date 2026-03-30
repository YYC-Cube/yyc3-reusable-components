import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { Label } from './label';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const MultipleCheckboxes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" defaultChecked />
        <Label htmlFor="option2">Option 2 (default checked)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" disabled />
        <Label htmlFor="option3">Option 3 (disabled)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option4" disabled checked />
        <Label htmlFor="option4">Option 4 (disabled & checked)</Label>
      </div>
    </div>
  ),
};

export const SettingsForm: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="email" defaultChecked />
            <div className="grid gap-1 leading-none">
              <Label htmlFor="email">Email notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about your account activity.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="push" />
            <div className="grid gap-1 leading-none">
              <Label htmlFor="push">Push notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications on your device.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sms" disabled />
            <div className="grid gap-1 leading-none">
              <Label htmlFor="sms">SMS notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive SMS notifications (coming soon).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <Checkbox />
        <span className="text-xs text-muted-foreground">Unchecked</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox defaultChecked />
        <span className="text-xs text-muted-foreground">Checked</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox disabled />
        <span className="text-xs text-muted-foreground">Disabled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Checkbox disabled checked />
        <span className="text-xs text-muted-foreground">Disabled Checked</span>
      </div>
    </div>
  ),
};
