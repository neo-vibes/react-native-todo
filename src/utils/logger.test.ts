import { describe, it, expect, vi } from 'vitest';
import { logger } from './logger';

describe('logger', () => {
  it('should log info messages', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    logger.info('test message', { data: 'value' });
    
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const logged = JSON.parse(consoleSpy.mock.calls[0]?.[0] as string);
    expect(logged.level).toBe('info');
    expect(logged.msg).toBe('test message');
    expect(logged.data).toBe('value');
    expect(logged.ts).toBeDefined();
    
    consoleSpy.mockRestore();
  });

  it('should log error messages with stack', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('test error');
    
    logger.error('something failed', error);
    
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    const logged = JSON.parse(consoleSpy.mock.calls[0]?.[0] as string);
    expect(logged.level).toBe('error');
    expect(logged.error).toBe('test error');
    expect(logged.stack).toBeDefined();
    
    consoleSpy.mockRestore();
  });
});
