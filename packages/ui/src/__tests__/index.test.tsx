/**
 * @file index.test.tsx
 * @description UI 包主导出测试
 * @author YYC³ Team
 */

import { describe, it, expect } from 'vitest';
import * as UI from '../index';

describe('@yyc3/ui Package Exports', () => {
  it('should export cn utility function', () => {
    expect(UI.cn).toBeDefined();
    expect(typeof UI.cn).toBe('function');
  });

  it('should export UI components', () => {
    // 验证主要组件导出
    const expectedComponents = [
      'Button',
      'Card',
      'Alert',
      'Dialog',
      'Input',
      'Label',
      'Select',
      'Checkbox',
      'RadioGroup',
      'Switch',
      'Tabs',
      'Tooltip',
      'Badge',
      'Avatar',
      'Progress',
      'Skeleton',
      'Separator',
      'ScrollArea',
    ];

    expectedComponents.forEach((component) => {
      expect(UI[component]).toBeDefined();
    });
  });

  it('should have cn function work correctly', () => {
    const result = UI.cn('class1', 'class2', { class3: true, class4: false });
    expect(result).toContain('class1');
    expect(result).toContain('class2');
    expect(result).toContain('class3');
    expect(result).not.toContain('class4');
  });
});
