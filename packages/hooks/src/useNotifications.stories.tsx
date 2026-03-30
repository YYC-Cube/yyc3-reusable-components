import type { Meta, StoryObj } from '@storybook/react';
import { useNotifications } from './useNotifications';

const meta: Meta = {
  title: 'Hooks/useNotifications',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

function NotificationsDemo() {
  const { notifications, addNotification, removeNotification, clearNotifications } =
    useNotifications();

  const addSuccess = () => {
    addNotification({
      id: Date.now().toString(),
      type: 'success',
      message: 'Operation completed successfully!',
      duration: 3000,
    });
  };

  const addError = () => {
    addNotification({
      id: Date.now().toString(),
      type: 'error',
      message: 'Something went wrong!',
      duration: 5000,
    });
  };

  const addWarning = () => {
    addNotification({
      id: Date.now().toString(),
      type: 'warning',
      message: 'Please check your input',
      duration: 4000,
    });
  };

  const addInfo = () => {
    addNotification({
      id: Date.now().toString(),
      type: 'info',
      message: 'New update available',
      duration: 3000,
    });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="text-2xl font-bold">Notification System</div>
      <div className="flex gap-2">
        <button onClick={addSuccess} className="bg-green-500 text-white px-4 py-2 rounded">
          Success
        </button>
        <button onClick={addError} className="bg-red-500 text-white px-4 py-2 rounded">
          Error
        </button>
        <button onClick={addWarning} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Warning
        </button>
        <button onClick={addInfo} className="bg-blue-500 text-white px-4 py-2 rounded">
          Info
        </button>
      </div>
      <button onClick={clearNotifications} className="bg-gray-500 text-white px-4 py-2 rounded">
        Clear All
      </button>
      <div className="space-y-2">
        <div className="font-semibold">Active Notifications ({notifications.length})</div>
        {notifications.length === 0 ? (
          <div className="text-gray-500">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded ${
                notification.type === 'success'
                  ? 'bg-green-100'
                  : notification.type === 'error'
                    ? 'bg-red-100'
                    : notification.type === 'warning'
                      ? 'bg-yellow-100'
                      : 'bg-blue-100'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{notification.message}</span>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <NotificationsDemo />,
};

function AutoDismissDemo() {
  const { notifications, addNotification } = useNotifications();

  const addAutoNotification = () => {
    addNotification({
      id: Date.now().toString(),
      type: 'info',
      message: 'This notification will auto-dismiss in 3 seconds',
      duration: 3000,
    });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="text-2xl font-bold">Auto-Dismiss Notifications</div>
      <button onClick={addAutoNotification} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Notification (3s auto-dismiss)
      </button>
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-3 bg-blue-100 rounded">
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export const AutoDismiss: Story = {
  render: () => <AutoDismissDemo />,
};

function MultipleNotificationsDemo() {
  const { notifications, addNotification, clearNotifications } = useNotifications();

  const addMultiple = () => {
    const types = ['success', 'error', 'warning', 'info'] as const;
    types.forEach((type, index) => {
      setTimeout(() => {
        addNotification({
          id: `${Date.now()}-${index}`,
          type,
          message: `${type.charAt(0).toUpperCase() + type.slice(1)} notification ${index + 1}`,
          duration: 5000,
        });
      }, index * 500);
    });
  };

  return (
    <div className="p-6 space-y-4">
      <div className="text-2xl font-bold">Multiple Notifications</div>
      <button onClick={addMultiple} className="bg-purple-500 text-white px-4 py-2 rounded">
        Add Multiple Notifications
      </button>
      <button onClick={clearNotifications} className="bg-gray-500 text-white px-4 py-2 rounded">
        Clear All ({notifications.length})
      </button>
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded ${
              notification.type === 'success'
                ? 'bg-green-100'
                : notification.type === 'error'
                  ? 'bg-red-100'
                  : notification.type === 'warning'
                    ? 'bg-yellow-100'
                    : 'bg-blue-100'
            }`}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export const MultipleNotifications: Story = {
  render: () => <MultipleNotificationsDemo />,
};
