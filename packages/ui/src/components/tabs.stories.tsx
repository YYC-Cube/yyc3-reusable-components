import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here. Click save when you're done.
      </TabsContent>
      <TabsContent value="password">
        Change your password here. After saving, you'll be logged out.
      </TabsContent>
    </Tabs>
  ),
};

export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content goes here</TabsContent>
      <TabsContent value="analytics">Analytics content goes here</TabsContent>
      <TabsContent value="reports">Reports content goes here</TabsContent>
      <TabsContent value="notifications">Notifications content goes here</TabsContent>
    </Tabs>
  ),
};

export const WithForms: Story = {
  render: () => (
    <Tabs defaultValue="personal">
      <TabsList>
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="address">Address</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="address">
        <div className="space-y-4">
          <div>
            <Label htmlFor="street">Street</Label>
            <Input id="street" placeholder="123 Main St" />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="New York" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="preferences">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="notifications" />
            <Label htmlFor="notifications">Enable notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');

    return (
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
        <TabsContent value="tab3">Content 3</TabsContent>
      </Tabs>
    );
  },
};

export const VerticalTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" orientation="vertical">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  ),
};
