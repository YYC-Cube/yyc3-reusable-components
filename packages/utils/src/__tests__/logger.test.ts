/**
 * @file logger.test.ts
 * @description 日志功能测试
 */

import { Logger, createLogger, LogLevel } from '../logger';
import { vi } from 'vitest';

describe('logger', () => {
  let consoleInfoSpy: any;
  let consoleWarnSpy: any;
  let consoleErrorSpy: any;
  let consoleDebugSpy: any;

  beforeEach(() => {
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleInfoSpy.mockRestore();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleDebugSpy.mockRestore();
  });

  describe('Logger', () => {
    it('should create logger instance', () => {
      const logger = new Logger('TestContext');
      expect(logger).toBeDefined();
    });

    it('should log info messages', () => {
      const logger = new Logger('TestContext');
      logger.info('Test info message');
      expect(consoleInfoSpy).toHaveBeenCalled();
    });

    it('should log warning messages', () => {
      const logger = new Logger('TestContext');
      logger.warn('Test warning message');
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it('should log error messages', () => {
      const logger = new Logger('TestContext');
      logger.error('Test error message');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should log debug messages', () => {
      const logger = new Logger('TestContext');
      logger.debug('Test debug message');
      // Debug only logs in development mode
      if (process.env.NODE_ENV === 'development') {
        expect(consoleDebugSpy).toHaveBeenCalled();
      }
    });

    it('should handle multiple arguments', () => {
      const logger = new Logger('TestContext');
      logger.info('Message', { key: 'value' }, 'extra');
      expect(consoleInfoSpy).toHaveBeenCalled();
    });
  });

  describe('createLogger', () => {
    it('should create logger with context', () => {
      const logger = createLogger('MyContext');
      expect(logger).toBeInstanceOf(Logger);
    });

    it('should create different logger instances', () => {
      const logger1 = createLogger('Context1');
      const logger2 = createLogger('Context2');
      expect(logger1).not.toBe(logger2);
    });
  });

  describe('LogLevel', () => {
    it('should define log levels', () => {
      expect(LogLevel.DEBUG).toBe('DEBUG');
      expect(LogLevel.INFO).toBe('INFO');
      expect(LogLevel.WARN).toBe('WARN');
      expect(LogLevel.ERROR).toBe('ERROR');
    });
  });
});
