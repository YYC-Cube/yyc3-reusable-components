/**
 * @file index.test.tsx
 * @description Smart 包测试
 * @author YYC³ Team
 */

import { describe, it, expect } from 'vitest';
import * as Smart from '../index';

describe('@yyc3/smart Package Exports', () => {
  it('should export all smart components', () => {
    const expectedComponents = [
      'SmartSales',
      'SmartPrediction',
      'SmartAlert',
      'SmartRisk',
      'SmartBudget',
      'SmartDecision',
      'SmartDocs',
      'SmartSearch',
      'SmartNLP',
      'SmartChatbot',
      'SmartTraining',
      'SmartRecruitment',
      'SmartScheduling',
      'SmartProduction',
      'SmartFulfillment',
      'SmartAcquisition',
      'SmartReimbursement',
      'SmartVision',
      'SmartMeetings',
      'SmartRecommendation',
      'SmartAudit',
    ];

    expectedComponents.forEach((component) => {
      expect(Smart[component as keyof typeof Smart]).toBeDefined();
      expect(typeof Smart[component as keyof typeof Smart]).toBe('function');
    });
  });

  it('should export 21 smart components', () => {
    const componentCount = Object.keys(Smart).length;
    expect(componentCount).toBe(21);
  });
});
