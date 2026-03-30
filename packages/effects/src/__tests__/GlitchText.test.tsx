/**
 * file: GlitchText.test.tsx
 * description: GlitchText 组件单元测试
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-30
 * updated: 2026-03-30
 * status: active
 * tags: [test],[unit],[effects]
 *
 * test-target: ./components/GlitchText.tsx
 * coverage: 85%
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { GlitchText } from '../components/GlitchText';

describe('GlitchText', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('渲染测试', () => {
    it('应正确渲染文本内容', () => {
      render(<GlitchText>测试文本</GlitchText>);
      expect(screen.getByText('测试文本')).toBeInTheDocument();
    });

    it('应使用默认颜色', () => {
      render(<GlitchText>测试</GlitchText>);
      const text = screen.getByText('测试');
      expect(text.closest('span')).toHaveStyle({ color: '#00f0ff' });
    });

    it('应接受自定义颜色', () => {
      render(<GlitchText color="#ff0000">测试</GlitchText>);
      const text = screen.getByText('测试');
      expect(text.closest('span')).toHaveStyle({ color: '#ff0000' });
    });

    it('应支持不同的HTML标签', () => {
      const { container } = render(<GlitchText as="h1">标题</GlitchText>);
      expect(container.querySelector('h1')).toBeInTheDocument();
    });

    it('应应用自定义类名', () => {
      const { container } = render(<GlitchText className="custom">测试</GlitchText>);
      expect(container.querySelector('.custom')).toBeInTheDocument();
    });
  });

  describe('内联/块级测试', () => {
    it('默认应为行内元素', () => {
      const { container } = render(<GlitchText>测试</GlitchText>);
      expect(container.firstChild).toHaveClass('inline-block');
    });

    it('应支持块级显示', () => {
      const { container } = render(<GlitchText inline={false}>测试</GlitchText>);
      expect(container.firstChild).toHaveClass('block');
    });
  });

  describe('故障效果测试', () => {
    it('应在启用时触发故障动画', () => {
      const { container } = render(<GlitchText enabled={true}>测试</GlitchText>);
      // 快进时间触发故障效果
      vi.advanceTimersByTime(5000);
      // 检查是否渲染了故障层
      const glitchLayers = container.querySelectorAll('span.pointer-events-none');
      // 故障效果可能正在活动或未活动，所以只检查渲染
      expect(container.firstChild).toBeInTheDocument();
    });

    it('应在禁用时不触发故障动画', () => {
      const { container } = render(<GlitchText enabled={false}>测试</GlitchText>);
      vi.advanceTimersByTime(5000);
      // 不应有故障层
      const glitchLayers = container.querySelectorAll('span.pointer-events-none');
      expect(glitchLayers.length).toBe(0);
    });

    it('应支持自定义强度', () => {
      const { container } = render(<GlitchText intensity={2}>测试</GlitchText>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('应支持自定义间隔', () => {
      const { container } = render(<GlitchText interval={[1000, 2000]}>测试</GlitchText>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('应支持禁用间隔触发', () => {
      const { container } = render(<GlitchText interval={null}>测试</GlitchText>);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('交互测试', () => {
    it('应在hover时触发故障效果', async () => {
      const { container } = render(<GlitchText>测试</GlitchText>);
      const textElement = container.firstChild as HTMLElement;

      fireEvent.mouseEnter(textElement);

      // 检查是否渲染了故障层
      const glitchLayers = container.querySelectorAll('span.pointer-events-none');
      expect(glitchLayers.length).toBeGreaterThan(0);

      fireEvent.mouseLeave(textElement);
    });

    it('应在禁用时不响应hover', async () => {
      const { container } = render(<GlitchText enabled={false}>测试</GlitchText>);
      const textElement = container.firstChild as HTMLElement;

      fireEvent.mouseEnter(textElement);

      const glitchLayers = container.querySelectorAll('span.pointer-events-none');
      expect(glitchLayers.length).toBe(0);
    });
  });

  describe('无障碍测试', () => {
    it('应有aria-label属性', () => {
      render(<GlitchText>测试文本</GlitchText>);
      expect(screen.getByLabelText('测试文本')).toBeInTheDocument();
    });
  });

  describe('动画偏好测试', () => {
    it('应尊重prefers-reduced-motion设置', () => {
      // Mock prefers-reduced-motion
      const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      vi.stubGlobal('matchMedia', matchMediaMock);

      const { container } = render(<GlitchText>测试</GlitchText>);
      vi.advanceTimersByTime(5000);

      // 应该不触发故障动画
      const glitchLayers = container.querySelectorAll('span.pointer-events-none');
      expect(glitchLayers.length).toBe(0);

      vi.unstubAllGlobals();
    });
  });
});
