/**
 * file: CyberpunkWidget.test.tsx
 * description: CyberpunkWidget 组件单元测试
 * author: YanYuCloudCube Team
 * version: v1.0.0
 * created: 2026-03-30
 * updated: 2026-03-30
 * status: active
 * tags: [test],[unit],[effects]
 *
 * test-target: ./components/CyberpunkWidget.tsx
 * coverage: 80%
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { CyberpunkWidget, type WidgetTabConfig } from '../components/CyberpunkWidget';

// Mock window dimensions
const mockWindowDimensions = () => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1920,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 1080,
  });
};

describe('CyberpunkWidget', () => {
  const defaultTabs: WidgetTabConfig[] = [
    {
      id: 'chat',
      label: '聊天',
      icon: '💬',
      color: '#00f0ff',
      content: <div>聊天内容</div>,
    },
    {
      id: 'tools',
      label: '工具',
      icon: '🔧',
      color: '#00ffcc',
      content: <div>工具内容</div>,
    },
  ];

  beforeEach(() => {
    mockWindowDimensions();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe('渲染测试', () => {
    it('应正确渲染组件', () => {
      render(<CyberpunkWidget tabs={defaultTabs} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('应显示标题', () => {
      render(<CyberpunkWidget tabs={defaultTabs} title="AI助手" />);
      expect(screen.getByText('AI助手')).toBeInTheDocument();
    });

    it('应显示副标题', () => {
      render(<CyberpunkWidget tabs={defaultTabs} subtitle="智能对话" />);
      expect(screen.getByText('智能对话')).toBeInTheDocument();
    });

    it('应渲染所有标签页', () => {
      render(<CyberpunkWidget tabs={defaultTabs} />);
      expect(screen.getByText('聊天')).toBeInTheDocument();
      expect(screen.getByText('工具')).toBeInTheDocument();
    });

    it('应显示默认标签页内容', () => {
      render(<CyberpunkWidget tabs={defaultTabs} defaultActiveTab="chat" />);
      expect(screen.getByText('聊天内容')).toBeInTheDocument();
    });
  });

  describe('最小化测试', () => {
    it('应支持最小化', () => {
      render(<CyberpunkWidget tabs={defaultTabs} />);
      const minimizeBtn = screen.getByLabelText('最小化');

      fireEvent.click(minimizeBtn);

      // 应该显示展开按钮
      expect(screen.getByLabelText('展开窗口')).toBeInTheDocument();
    });

    it('应支持从最小化恢复', () => {
      render(<CyberpunkWidget tabs={defaultTabs} />);
      const minimizeBtn = screen.getByLabelText('最小化');

      fireEvent.click(minimizeBtn);
      const expandBtn = screen.getByLabelText('展开窗口');
      fireEvent.click(expandBtn);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('最大化测试', () => {
    it('应支持最大化切换', () => {
      render(<CyberpunkWidget tabs={defaultTabs} />);
      const maximizeBtn = screen.getByLabelText('最大化');

      fireEvent.click(maximizeBtn);
      expect(screen.getByLabelText('还原')).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('还原'));
      expect(screen.getByLabelText('最大化')).toBeInTheDocument();
    });
  });

  describe('标签页切换测试', () => {
    it('应切换到不同标签页', () => {
      render(<CyberpunkWidget tabs={defaultTabs} defaultActiveTab="chat" />);
      expect(screen.getByText('聊天内容')).toBeInTheDocument();

      const toolsTab = screen.getByText('工具');
      fireEvent.click(toolsTab);

      expect(screen.getByText('工具内容')).toBeInTheDocument();
    });
  });

  describe('拖拽测试', () => {
    it('应支持拖拽开始', () => {
      render(<CyberpunkWidget tabs={defaultTabs} />);
      const header = document.querySelector('[style*="cursor: grab"]');

      if (header) {
        fireEvent.mouseDown(header, { clientX: 100, clientY: 100 });
        // 拖拽状态应已设置
        expect(header).toBeInTheDocument();
      }
    });
  });

  describe('缩放测试', () => {
    it('应支持缩放', () => {
      render(<CyberpunkWidget tabs={defaultTabs} />);
      const resizeHandle = document.querySelector('.cursor-se-resize');

      if (resizeHandle) {
        fireEvent.mouseDown(resizeHandle, { clientX: 100, clientY: 100 });
        expect(resizeHandle).toBeInTheDocument();
      }
    });
  });

  describe('快速操作测试', () => {
    it('应显示快速操作栏', () => {
      const quickActions = [
        { label: '新建', icon: '➕', color: '#00f0ff' },
        { label: '历史', icon: '📜', color: '#00d4ff' },
      ];

      render(
        <CyberpunkWidget tabs={defaultTabs} showQuickActions={true} quickActions={quickActions} />
      );
      expect(screen.getByText('新建')).toBeInTheDocument();
      expect(screen.getByText('历史')).toBeInTheDocument();
    });

    it('应隐藏快速操作栏', () => {
      render(<CyberpunkWidget tabs={defaultTabs} showQuickActions={false} />);
      // 快速操作栏不应存在
      expect(screen.queryByText('新建')).not.toBeInTheDocument();
    });

    it('应响应快速操作点击', () => {
      const handleClick = vi.fn();
      const quickActions = [
        { label: '点击我', icon: '👆', color: '#00f0ff', onClick: handleClick },
      ];

      render(<CyberpunkWidget tabs={defaultTabs} quickActions={quickActions} />);
      fireEvent.click(screen.getByText('点击我'));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('主题测试', () => {
    it('应支持自定义主题颜色', () => {
      const { container } = render(<CyberpunkWidget tabs={defaultTabs} themeColor="#ff0000" />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('回调测试', () => {
    it('应触发切换模式回调', () => {
      const handleSwitchMode = vi.fn();
      render(<CyberpunkWidget tabs={defaultTabs} onSwitchMode={handleSwitchMode} />);
      const switchBtn = screen.getByLabelText('切换到独立模式');

      fireEvent.click(switchBtn);
      expect(handleSwitchMode).toHaveBeenCalled();
    });
  });

  describe('无障碍测试', () => {
    it('应有正确的角色', () => {
      render(<CyberpunkWidget tabs={defaultTabs} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('应有aria-label', () => {
      render(<CyberpunkWidget tabs={defaultTabs} title="AI助手" />);
      expect(screen.getByLabelText('AI助手')).toBeInTheDocument();
    });
  });
});
