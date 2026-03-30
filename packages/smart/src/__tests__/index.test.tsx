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
      const exported = Smart[component as keyof typeof Smart];
      expect(exported).toBeDefined();
      // React forward_ref components are objects, not functions
      // Check if it's a valid React component (has $$typeof or is a function)
      const isValidComponent = typeof exported === 'function' || 
        (typeof exported === 'object' && exported?.$$typeof !== undefined);
      expect(isValidComponent).toBe(true);
    });
  });

  it('should export 21 smart components', () => {
    // Count all exported keys
    const componentCount = Object.keys(Smart).length;
    // We export 21 components, but might have type exports too
    expect(componentCount).toBeGreaterThanOrEqual(21);
  });
});
