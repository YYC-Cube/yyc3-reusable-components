/**
 * @file index.test.ts
 * @description Repositories 包测试
 * @author YYC³ Team
 */

import { describe, it, expect } from 'vitest';
import * as Repositories from '../index';

describe('@yyc3/repositories Package Exports', () => {
  it('should export databaseRepository', () => {
    expect(Repositories.databaseRepository).toBeDefined();
    expect(typeof Repositories.databaseRepository).toBe('object');
  });

  it('should export gitHubRepository', () => {
    expect(Repositories.gitHubRepository).toBeDefined();
    expect(typeof Repositories.gitHubRepository).toBe('object');
  });

  it('should have databaseRepository with expected methods', () => {
    const repo = Repositories.databaseRepository;
    
    // Check for database repository methods
    expect(typeof repo.executeQuery).toBe('function');
    expect(typeof repo.insert).toBe('function');
    expect(typeof repo.update).toBe('function');
    expect(typeof repo.deleteRecord).toBe('function');
    expect(typeof repo.checkHealth).toBe('function');
  });

  it('should have gitHubRepository with expected methods', () => {
    const repo = Repositories.gitHubRepository;
    
    // Check for GitHub repository methods
    expect(typeof repo.getRepositories).toBe('function');
    expect(typeof repo.saveRepositories).toBe('function');
    expect(typeof repo.getRepositoryByName).toBe('function');
    expect(typeof repo.saveRepository).toBe('function');
    expect(typeof repo.getBranches).toBe('function');
    expect(typeof repo.saveBranches).toBe('function');
  });
});
