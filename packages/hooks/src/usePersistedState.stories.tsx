import type { Meta, StoryObj } from '@storybook/react';
import { usePersistedState } from './usePersistedState';

const meta: Meta = {
  title: 'Hooks/usePersistedState',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

function PersistedStateDemo() {
  const [value, setValue] = usePersistedState('demo-key', 'default value');

  return (
    <div className="p-4 space-y-4">
      <div className="text-lg font-semibold">Current Value: {value}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded px-3 py-2 w-full"
        placeholder="Type something..."
      />
      <button onClick={() => setValue('')} className="bg-red-500 text-white px-4 py-2 rounded">
        Clear
      </button>
      <button
        onClick={() => setValue('preset value')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Set Preset
      </button>
    </div>
  );
}

export const Default: Story = {
  render: () => <PersistedStateDemo />,
};

function ObjectStateDemo() {
  const [user, setUser] = usePersistedState('user-key', { name: '', age: 0 });

  return (
    <div className="p-4 space-y-4">
      <div className="text-lg font-semibold">User Object State</div>
      <div>Name: {user.name}</div>
      <div>Age: {user.age}</div>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="border rounded px-3 py-2 w-full"
        placeholder="Enter name..."
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => setUser({ ...user, age: parseInt(e.target.value) || 0 })}
        className="border rounded px-3 py-2 w-full"
        placeholder="Enter age..."
      />
    </div>
  );
}

export const WithObject: Story = {
  render: () => <ObjectStateDemo />,
};

function ArrayStateDemo() {
  const [items, setItems] = usePersistedState('items-key', [] as string[]);

  const addItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems([...items, newItem]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-lg font-semibold">Array State</div>
      <button onClick={addItem} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Item
      </button>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span>{item}</span>
            <button
              onClick={() => removeItem(index)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const WithArray: Story = {
  render: () => <ArrayStateDemo />,
};
