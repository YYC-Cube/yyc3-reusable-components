import type { Meta, StoryObj } from '@storybook/react';
import { useResponsive } from './useResponsive';

const meta: Meta = {
  title: 'Hooks/useResponsive',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

function ResponsiveDemo() {
  const { isMobile, isTablet, isDesktop, isLargeDesktop, width } = useResponsive();

  return (
    <div className="p-6 space-y-4">
      <div className="text-2xl font-bold">Responsive Information</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-100 rounded">
          <div className="font-semibold">Screen Width</div>
          <div className="text-3xl">{width}px</div>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <div className="font-semibold">Device Type</div>
          <div className="text-xl">
            {isMobile && '📱 Mobile'}
            {isTablet && '📟 Tablet'}
            {isDesktop && '💻 Desktop'}
            {isLargeDesktop && '🖥️ Large Desktop'}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className={`p-2 rounded ${isMobile ? 'bg-green-200' : 'bg-gray-100'}`}>
          Mobile: {isMobile ? '✅' : '❌'}
        </div>
        <div className={`p-2 rounded ${isTablet ? 'bg-green-200' : 'bg-gray-100'}`}>
          Tablet: {isTablet ? '✅' : '❌'}
        </div>
        <div className={`p-2 rounded ${isDesktop ? 'bg-green-200' : 'bg-gray-100'}`}>
          Desktop: {isDesktop ? '✅' : '❌'}
        </div>
        <div className={`p-2 rounded ${isLargeDesktop ? 'bg-green-200' : 'bg-gray-100'}`}>
          Large Desktop: {isLargeDesktop ? '✅' : '❌'}
        </div>
      </div>
      <div className="text-sm text-gray-600">
        Resize your browser window to see the responsive information update
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <ResponsiveDemo />,
};

function ResponsiveLayoutDemo() {
  const { isMobile, isDesktop } = useResponsive();

  return (
    <div className="p-6">
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
        <div className="p-4 bg-red-100 rounded">Item 1</div>
        <div className="p-4 bg-blue-100 rounded">Item 2</div>
        <div className="p-4 bg-green-100 rounded">Item 3</div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Layout changes based on screen size (1 column on mobile, 3 columns on desktop)
      </div>
    </div>
  );
}

export const ResponsiveLayout: Story = {
  render: () => <ResponsiveLayoutDemo />,
};

function ConditionalContentDemo() {
  const { isMobile } = useResponsive();

  return (
    <div className="p-6">
      {isMobile ? (
        <div className="p-4 bg-yellow-100 rounded">
          <div className="font-bold">Mobile Content</div>
          <div>Optimized for small screens</div>
        </div>
      ) : (
        <div className="p-4 bg-purple-100 rounded">
          <div className="font-bold">Desktop Content</div>
          <div>Enhanced experience for larger screens</div>
        </div>
      )}
    </div>
  );
}

export const ConditionalContent: Story = {
  render: () => <ConditionalContentDemo />,
};
