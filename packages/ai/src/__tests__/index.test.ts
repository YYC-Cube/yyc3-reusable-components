/**
 * @file index.test.ts
 * @description AI 包测试（临时简化版）
 * @author YYC³ Team
 */

import { describe, it, expect } from 'vitest';
import * as AI from '../index';

describe('@yyc3/ai Package (Simplified)', () => {
  it('should export empty object (temporary)', () => {
    expect(Object.keys(AI)).toHaveLength(0);
  });
});
