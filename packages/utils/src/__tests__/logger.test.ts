import { logger } from '../logger';

describe('logger', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log info messages', () => {
    logger.info('Test info message');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should log warning messages', () => {
    logger.warn('Test warning message');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should log error messages', () => {
    logger.error('Test error message');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should log debug messages', () => {
    logger.debug('Test debug message');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should handle multiple arguments', () => {
    logger.info('Message', { key: 'value' }, 'extra');
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should handle objects', () => {
    logger.info({ message: 'Object message', level: 'info' });
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should handle errors', () => {
    const error = new Error('Test error');
    logger.error(error);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should set log level', () => {
    logger.setLevel('debug');
    logger.debug('Debug message');
    expect(consoleSpy).toHaveBeenCalled();
  });
});
