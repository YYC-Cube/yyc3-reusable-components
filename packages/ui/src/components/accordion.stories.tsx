/**
 * file: accordion.stories.tsx
 * description: Accordion 组件的 Storybook 文档
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-30
 * updated: 2026-03-30
 * status: active
 * tags: [storybook],[ui],[accordion]
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>什么是 YYC³？</AccordionTrigger>
        <AccordionContent>
          YYC³ 是一个可复用的组件库，提供高质量、可定制的 UI 组件和 Hooks。
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>如何安装使用？</AccordionTrigger>
        <AccordionContent>
          通过 pnpm 安装：<code>pnpm add @yyc3/ui</code>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>支持哪些框架？</AccordionTrigger>
        <AccordionContent>目前主要支持 React 18+，使用 TypeScript 编写。</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>功能特性</AccordionTrigger>
        <AccordionContent>支持单开和多开两种模式，灵活配置。</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>设计理念</AccordionTrigger>
        <AccordionContent>基于 Radix UI 构建，提供无障碍访问和键盘导航支持。</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>主题定制</AccordionTrigger>
        <AccordionContent>使用 Tailwind CSS，支持完全自定义样式。</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>默认展开项</AccordionTrigger>
        <AccordionContent>此项默认展开，通过 defaultValue 属性设置。</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>其他项目</AccordionTrigger>
        <AccordionContent>这是另一个可折叠的内容区域。</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
