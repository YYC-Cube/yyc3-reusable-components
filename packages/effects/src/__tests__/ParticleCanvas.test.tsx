/**
 * file: ParticleCanvas.test.tsx
 * description: ParticleCanvas 组件单元测试
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-30
 * updated: 2026-03-30
 * status: active
 * tags: [test],[unit],[effects]
 *
 * test-target: ./components/ParticleCanvas.tsx
 * coverage: 80%
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ParticleCanvas } from '../components/ParticleCanvas';

// Mock requestAnimationFrame
const mockRAF = vi.fn().mockImplementation((cb: FrameRequestCallback) => {
  return setTimeout(() => cb(0), 16);
});
const mockCancelRAF = vi.fn().mockImplementation((id: number) => {
  clearTimeout(id);
});

// Mock canvas context
const mockGetContext = vi.fn().mockReturnValue({
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

describe('ParticleCanvas', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', mockRAF);
    vi.stubGlobal('cancelAnimationFrame', mockCancelRAF);
    vi.stubGlobal('devicePixelRatio', 2);

    // Mock HTMLCanvasElement
    HTMLCanvasElement.prototype.getContext = mockGetContext;
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
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  describe('渲染测试', () => {
    it('应在启用时渲染canvas元素', () => {
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas config={{ enabled: true }} />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('应在禁用时不渲染任何内容', () => {
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas config={{ enabled: false }} />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeNull();
    });

    it('应应用自定义类名', () => {
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas className="custom-class" />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveClass('custom-class');
    });

    it('应应用自定义样式', () => {
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas style={{ zIndex: 10 }} />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveStyle({ zIndex: 10 });
    });
  });

  describe('配置测试', () => {
    it('应使用默认配置', () => {
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('应接受自定义粒子颜色', () => {
      const customColors = ['#ff0000', '#00ff00', '#0000ff'];
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas config={{ colors: customColors }} />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('应接受自定义霓虹强度', () => {
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas config={{ neonIntensity: 50 }} />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('应接受自定义透明度', () => {
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas config={{ opacity: 0.5 }} />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveStyle({ opacity: 0.5 });
    });
  });

  describe('props测试', () => {
    it('应禁用鼠标交互', () => {
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas enableMouseInteraction={false} />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('应禁用自动调整大小', () => {
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas autoResize={false} />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('无障碍测试', () => {
    it('应有aria-hidden属性', () => {
      const { container } = render(
        <div style={{ width: 800, height: 600 }}>
          <ParticleCanvas />
        </div>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
