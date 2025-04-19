import { describe, it, expect } from 'vitest';
import { capitalizeWords, truncateString } from './formatters';

describe('formatters', () => {
  describe('capitalizeWords', () => {
    it('should capitalize the first letter of each word', () => {
      expect(capitalizeWords('hello world')).toBe('Hello World');
      expect(capitalizeWords('HELLO WORLD')).toBe('Hello World');
      expect(capitalizeWords('hello   world')).toBe('Hello   World');
    });

    it('should handle empty strings', () => {
      expect(capitalizeWords('')).toBe('');
    });

    it('should handle single words', () => {
      expect(capitalizeWords('hello')).toBe('Hello');
    });
  });

  describe('truncateString', () => {
    it('should truncate strings longer than the specified length', () => {
      expect(truncateString('Hello World', 5)).toBe('Hello...');
      expect(truncateString('Hello World', 8)).toBe('Hello Wo...');
    });

    it('should not truncate strings shorter than the specified length', () => {
      expect(truncateString('Hello', 10)).toBe('Hello');
    });

    it('should handle empty strings', () => {
      expect(truncateString('', 5)).toBe('');
    });
  });
}); 