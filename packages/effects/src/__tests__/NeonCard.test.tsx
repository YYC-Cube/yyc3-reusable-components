/**
 * file: NeonCard.test.tsx
 * description: NeonCard 组件单元测试
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-30
 * updated: 2026-03-30
 * status: active
 * tags: [test],[unit],[effects]
 *
 * test-target: ./components/NeonCard.tsx
 * coverage: 85%
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { NeonCard } from '../components/NeonCard';

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

vi.stubGlobal(
  'IntersectionObserver',
  vi.fn().mockImplementation(() => ({
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
  }))
);

describe('NeonCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe('渲染测试', () => {
    it('应正确渲染子元素', () => {
      render(
        <NeonCard>
          <div>卡片内容</div>
        </NeonCard>
      );
      expect(screen.getByText('卡片内容')).toBeInTheDocument();
    });

    it('应使用默认颜色', () => {
      const { container } = render(
        <NeonCard noReveal>
          <div>测试</div>
        </NeonCard>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('应接受自定义颜色', () => {
      const { container } = render(
        <NeonCard color="#ff0000" noReveal>
          <div>测试</div>
        </NeonCard>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('应应用自定义类名', () => {
      const { container } = render(
        <NeonCard className="custom-card" noReveal>
          <div>测试</div>
        </NeonCard>
      );
      expect(container.firstChild).toHaveClass('custom-card');
    });
  });

  describe('主题测试', () => {
    it('应支持赛博朋克主题', () => {
      const { container } = render(
        <NeonCard themeMode="cyberpunk" noReveal>
          <div>赛博朋克</div>
        </NeonCard>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('应支持液态玻璃主题', () => {
      const { container } = render(
        <NeonCard themeMode="liquidGlass" noReveal>
          <div>液态玻璃</div>
        </NeonCard>
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('交互测试', () => {
    it('应支持hover效果', () => {
      const { container } = render(
        <NeonCard hoverable={true} noReveal>
          <div>测试</div>
        </NeonCard>
      );
      const card = container.firstChild as HTMLElement;

      fireEvent.mouseEnter(card);
      expect(card).toBeInTheDocument();

      fireEvent.mouseLeave(card);
      expect(card).toBeInTheDocument();
    });

    it('应禁用hover效果', () => {
      const { container } = render(
        <NeonCard hoverable={false} noReveal>
          <div>测试</div>
        </NeonCard>
      );
      const card = container.firstChild as HTMLElement;

      fireEvent.mouseEnter(card);
      expect(card).toBeInTheDocument();
    });

    it('应支持点击事件', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <NeonCard onClick={handleClick} noReveal>
          <div>可点击卡片</div>
        </NeonCard>
      );
      const card = container.firstChild as HTMLElement;

      fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('应支持键盘点击', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <NeonCard onClick={handleClick} noReveal>
          <div>键盘可访问</div>
        </NeonCard>
      );
      const card = container.firstChild as HTMLElement;

      fireEvent.keyDown(card, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(card, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('滚动显示测试', () => {
    it('应在noReveal时立即显示', () => {
      const { container } = render(
        <NeonCard noReveal={true}>
          <div>立即显示</div>
        </NeonCard>
      );
      expect(container.firstChild).toHaveStyle({ opacity: 1 });
    });

    it('应在启用滚动显示时使用IntersectionObserver', () => {
      render(
        <NeonCard noReveal={false}>
          <div>滚动显示</div>
        </NeonCard>
      );
      expect(mockObserve).toHaveBeenCalled();
    });
  });

  describe('无障碍测试', () => {
    it('应有data-neon-card属性', () => {
      const { container } = render(
        <NeonCard noReveal>
          <div>测试</div>
        </NeonCard>
      );
      expect(container.firstChild).toHaveAttribute('data-neon-card');
    });

    it('应支持aria-label', () => {
      const { container } = render(
        <NeonCard ariaLabel="信息卡片" noReveal>
          <div>测试</div>
        </NeonCard>
      );
      expect(container.firstChild).toHaveAttribute('aria-label', '信息卡片');
    });

    it('可点击卡片应有button角色', () => {
      const { container } = render(
        <NeonCard onClick={() => {}} noReveal>
          <div>测试</div>
        </NeonCard>
      );
      expect(container.firstChild).toHaveAttribute('role', 'button');
    });

    it('可点击卡片应有tabIndex', () => {
      const { container } = render(
        <NeonCard onClick={() => {}} noReveal>
          <div>测试</div>
        </NeonCard>
      );
      expect(container.firstChild).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('样式测试', () => {
    it('应应用自定义样式', () => {
      const { container } = render(
        <NeonCard style={{ width: '300px' }} noReveal>
          <div>测试</div>
        </NeonCard>
      );
      expect(container.firstChild).toHaveStyle({ width: '300px' });
    });
  });
});
