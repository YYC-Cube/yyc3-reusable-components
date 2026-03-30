/**
 * file: integration.test.tsx
 * description: 特效组件集成测试
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-30
 * updated: 2026-03-30
 * status: active
 * tags: [test],[integration],[effects]
 *
 * test-target: ./components/*
 * coverage: 75%
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { GlitchText } from '../components/GlitchText';
import { NeonCard } from '../components/NeonCard';

// Mock IntersectionObserver
vi.stubGlobal(
  'IntersectionObserver',
  vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
);

// Mock requestAnimationFrame
vi.stubGlobal(
  'requestAnimationFrame',
  vi.fn().mockImplementation((cb: FrameRequestCallback) => {
    return setTimeout(() => cb(0), 16);
  })
);
vi.stubGlobal(
  'cancelAnimationFrame',
  vi.fn().mockImplementation((id: number) => {
    clearTimeout(id);
  })
);

// Mock canvas context
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  setTransform: vi.fn(),
  rect: vi.fn(),
  clip: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  createLinearGradient: vi.fn().mockReturnValue({}),
  createRadialGradient: vi.fn().mockReturnValue({}),
  fillRect: vi.fn(),
  strokeRect: vi.fn(),
  fillText: vi.fn(),
  strokeText: vi.fn(),
  measureText: vi.fn().mockReturnValue({ width: 0 }),
  drawImage: vi.fn(),
});

HTMLCanvasElement.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
  width: 800,
  height: 600,
  left: 0,
  top: 0,
  right: 800,
  bottom: 600,
  x: 0,
  y: 0,
  toJSON: () => ({}),
});

describe('特效组件集成测试', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('NeonCard + GlitchText 组合', () => {
    it('应在NeonCard内正确渲染GlitchText', () => {
      render(
        <NeonCard noReveal>
          <GlitchText>标题文本</GlitchText>
        </NeonCard>
      );

      expect(screen.getByText('标题文本')).toBeInTheDocument();
    });

    it('应支持组合交互', async () => {
      const handleClick = vi.fn();
      const { container } = render(
        <NeonCard onClick={handleClick} noReveal>
          <GlitchText>可点击卡片</GlitchText>
        </NeonCard>
      );

      const card = container.firstChild as HTMLElement;
      fireEvent.click(card);

      expect(handleClick).toHaveBeenCalled();
    });

    it('应支持主题一致性', () => {
      const { container } = render(
        <NeonCard color="#ff0000" noReveal>
          <GlitchText color="#ff0000">红色主题</GlitchText>
        </NeonCard>
      );

      expect(screen.getByText('红色主题')).toBeInTheDocument();
    });
  });

  describe('ParticleCanvas + NeonCard 层叠', () => {
    it('应支持ParticleCanvas作为NeonCard背景', () => {
      const { container } = render(
        <div style={{ position: 'relative', width: 800, height: 600 }}>
          <ParticleCanvas />
          <NeonCard noReveal style={{ position: 'relative', zIndex: 1 }}>
            <div>前景内容</div>
          </NeonCard>
        </div>
      );

      expect(screen.getByText('前景内容')).toBeInTheDocument();
      expect(container.querySelector('canvas')).toBeInTheDocument();
    });
  });

  describe('多组件协同', () => {
    it('应支持多个GlitchText同时存在', () => {
      render(
        <div>
          <GlitchText color="#00f0ff">文本1</GlitchText>
          <GlitchText color="#00ffcc">文本2</GlitchText>
          <GlitchText color="#ff00ff">文本3</GlitchText>
        </div>
      );

      expect(screen.getByText('文本1')).toBeInTheDocument();
      expect(screen.getByText('文本2')).toBeInTheDocument();
      expect(screen.getByText('文本3')).toBeInTheDocument();
    });

    it('应支持多个NeonCard网格布局', () => {
      const { container } = render(
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          <NeonCard color="#00f0ff" noReveal>
            <div>卡片1</div>
          </NeonCard>
          <NeonCard color="#00ffcc" noReveal>
            <div>卡片2</div>
          </NeonCard>
          <NeonCard color="#ff00ff" noReveal>
            <div>卡片3</div>
          </NeonCard>
          <NeonCard color="#ff6600" noReveal>
            <div>卡片4</div>
          </NeonCard>
        </div>
      );

      expect(screen.getByText('卡片1')).toBeInTheDocument();
      expect(screen.getByText('卡片2')).toBeInTheDocument();
      expect(screen.getByText('卡片3')).toBeInTheDocument();
      expect(screen.getByText('卡片4')).toBeInTheDocument();
    });
  });

  describe('性能测试', () => {
    it('应支持快速渲染多个组件', () => {
      const startTime = performance.now();

      render(
        <div>
          {Array.from({ length: 10 }, (_, i) => (
            <NeonCard key={i} noReveal>
              <GlitchText>项目 {i + 1}</GlitchText>
            </NeonCard>
          ))}
        </div>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // 渲染时间应小于100ms
      expect(renderTime).toBeLessThan(200);
    });
  });

  describe('主题切换集成', () => {
    it('应支持赛博朋克主题组件协同', () => {
      const { container } = render(
        <div>
          <ParticleCanvas config={{ colors: ['#00f0ff', '#00d4ff'] }} />
          <NeonCard themeMode="cyberpunk" noReveal>
            <GlitchText color="#00f0ff">赛博朋克</GlitchText>
          </NeonCard>
        </div>
      );

      expect(screen.getByText('赛博朋克')).toBeInTheDocument();
    });

    it('应支持液态玻璃主题组件协同', () => {
      render(
        <NeonCard themeMode="liquidGlass" noReveal>
          <GlitchText color="#00ff87">液态玻璃</GlitchText>
        </NeonCard>
      );

      expect(screen.getByText('液态玻璃')).toBeInTheDocument();
    });
  });

  describe('响应式测试', () => {
    it('应支持小屏幕布局', () => {
      // Mock 小屏幕
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <NeonCard noReveal style={{ width: '100%' }}>
          <GlitchText>移动端</GlitchText>
        </NeonCard>
      );

      expect(screen.getByText('移动端')).toBeInTheDocument();
    });

    it('应支持大屏幕布局', () => {
      // Mock 大屏幕
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      render(
        <NeonCard noReveal style={{ width: '50%' }}>
          <GlitchText>桌面端</GlitchText>
        </NeonCard>
      );

      expect(screen.getByText('桌面端')).toBeInTheDocument();
    });
  });
});
