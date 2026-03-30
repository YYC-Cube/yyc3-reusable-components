/**
 * file: carousel.stories.tsx
 * description: Carousel 组件的 Storybook 文档
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-30
 * updated: 2026-03-30
 * status: active
 * tags: [storybook],[ui],[carousel]
 */

import type { Meta, StoryObj } from '@storybook/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const items = [
  { title: '项目 1', color: '#00f0ff' },
  { title: '项目 2', color: '#00d4ff' },
  { title: '项目 3', color: '#00ffcc' },
  { title: '项目 4', color: '#00ffc8' },
  { title: '项目 5', color: '#41ffdd' },
];

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div
              className="p-1"
              style={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                className="flex aspect-square items-center justify-center p-6"
                style={{
                  background: `${item.color}20`,
                  border: `2px solid ${item.color}`,
                  borderRadius: '12px',
                  width: '100%',
                  height: '100%',
                }}
              >
                <span className="text-4xl font-semibold" style={{ color: item.color }}>
                  {item.title}
                </span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const MultipleItems: Story = {
  render: () => (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div
                className="flex items-center justify-center p-6"
                style={{
                  background: `${item.color}20`,
                  border: `2px solid ${item.color}`,
                  borderRadius: '12px',
                  height: '120px',
                }}
              >
                <span className="text-2xl font-semibold" style={{ color: item.color }}>
                  {item.title}
                </span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Autoplay: Story = {
  render: () => (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[]}
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div
              className="flex items-center justify-center p-6"
              style={{
                background: `${item.color}20`,
                border: `2px solid ${item.color}`,
                borderRadius: '12px',
                height: '200px',
              }}
            >
              <span className="text-4xl font-semibold" style={{ color: item.color }}>
                {item.title}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
