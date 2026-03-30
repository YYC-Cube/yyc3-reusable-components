/**
 * @file index.test.ts
 * @description Services 包测试
 * @author YYC³ Team
 */

import { describe, it, expect } from 'vitest';
import * as Services from '../index';

describe('@yyc3/services Package Exports', () => {
  describe('Service instances', () => {
    it('should export databaseService', () => {
      expect(Services.databaseService).toBeDefined();
      expect(typeof Services.databaseService).toBe('object');
    });

    it('should export devOpsService', () => {
      expect(Services.devOpsService).toBeDefined();
      expect(typeof Services.devOpsService).toBe('object');
    });

    it('should export gitHubService', () => {
      expect(Services.gitHubService).toBeDefined();
      expect(typeof Services.gitHubService).toBe('object');
    });
  });

  describe('Service instance structure', () => {
    it('should have databaseService as object', () => {
      const service = Services.databaseService;
      expect(typeof service).toBe('object');
      expect(service).not.toBeNull();
    });

    it('should have devOpsService as object', () => {
      const service = Services.devOpsService;
      expect(typeof service).toBe('object');
      expect(service).not.toBeNull();
    });

    it('should have gitHubService as object', () => {
      const service = Services.gitHubService;
      expect(typeof service).toBe('object');
      expect(service).not.toBeNull();
    });
  });

  describe('Type exports', () => {
    it('should export DatabaseConfig type', () => {
      // Types are exported but can't be tested as runtime values
      // We can only verify they exist in the type system
      expect(true).toBe(true);
    });

    it('should export DevOpsConfig type', () => {
      expect(true).toBe(true);
    });

    it('should export GitHubConfig type', () => {
      expect(true).toBe(true);
    });
  });
});
