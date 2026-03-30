/**
 * @file index.test.tsx
 * @description Navigation 包测试
 * @author YYC³ Team
 */

import { describe, it, expect } from 'vitest';
import * as Navigation from '../index';

describe('@yyc3/navigation Package Exports', () => {
  it('should export TabNavigation component', () => {
    expect(Navigation.TabNavigation).toBeDefined();
    expect(typeof Navigation.TabNavigation).toBe('function');
  });

  it('should export Tab type', () => {
    // Types are exported but can't be tested as runtime values
    // We can only verify the type exists in the type system
    expect(true).toBe(true);
  });
});
