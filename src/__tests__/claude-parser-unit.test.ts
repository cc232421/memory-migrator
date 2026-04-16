/**
 * @jest-environment node
 */
import { jest } from '@jest/globals';
import {
  parseClaudeText,
  parseClaudeArray,
  isClaudeFormat,
  extractClaudeTitle,
  countClaudeMessages,
} from '@/lib/claude-parser';

describe('Claude Parser', () => {
  const sampleClaudeText = `Chat 1 - claude-3.5-sonnet - Mar 28, 2025

Human: Hello, I need help with Python
Assistant: Of course! What would you like to learn?

Human: Can you show me how to use list comprehension?
Assistant: List comprehension is a powerful feature...

Human: Thanks! One more question about dictionaries
Assistant: Dictionaries in Python are key-value pairs...
`;

  describe('parseClaudeText', () => {
    it('should parse valid Claude text format', () => {
      const result = parseClaudeText(sampleClaudeText);
      expect(result.success).toBe(true);
      expect(result.conversation).toBeDefined();
      expect(result.conversation!.messages.length).toBe(6);
    });

    it('should return error for empty input', () => {
      const result = parseClaudeText('');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Input is empty');
    });

    it('should return error for null input', () => {
      const result = parseClaudeText(null as any);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Input is empty');
    });

    it('should return error for non-string input', () => {
      const result = parseClaudeText(123 as any);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Input is empty');
    });

    it('should extract conversation title from Chat pattern', () => {
      const result = parseClaudeText(sampleClaudeText);
      expect(result.conversation!.title).toBe('claude');
    });

    it('should use default title when title pattern not found', () => {
      const text = 'Human: Hello\nAssistant: Hi';
      const result = parseClaudeText(text);
      expect(result.conversation!.title).toBe('Claude Conversation');
    });

    it('should return error when no valid messages found', () => {
      const text = 'This is just some random text without proper format';
      const result = parseClaudeText(text);
      expect(result.success).toBe(false);
      expect(result.error).toBe('No valid conversation messages found');
    });

    it('should convert Human role to user', () => {
      const result = parseClaudeText(sampleClaudeText);
      const userMessages = result.conversation!.messages.filter(m => m.role === 'user');
      expect(userMessages.length).toBe(3);
    });

    it('should convert Assistant role to assistant', () => {
      const result = parseClaudeText(sampleClaudeText);
      const assistantMessages = result.conversation!.messages.filter(m => m.role === 'assistant');
      expect(assistantMessages.length).toBe(3);
    });

    it('should handle messages with empty content', () => {
      const text = 'Human: \nAssistant: Hi';
      const result = parseClaudeText(text);
      expect(result.conversation!.messages.length).toBe(1);
    });

    it('should not throw on valid input', () => {
      expect(() => parseClaudeText(sampleClaudeText)).not.toThrow();
    });
  });

  describe('parseClaudeArray', () => {
    const validArray = [
      { role: 'Human', text: 'Hello, I need help with Python' },
      { role: 'Assistant', text: 'Of course! What would you like to learn?' },
    ];

    it('should parse valid message array', () => {
      const result = parseClaudeArray(validArray);
      expect(result.success).toBe(true);
      expect(result.conversation).toBeDefined();
      expect(result.conversation!.messages.length).toBe(2);
    });

    it('should return error for empty array', () => {
      const result = parseClaudeArray([]);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Message list is empty');
    });

    it('should return error for null input', () => {
      const result = parseClaudeArray(null as any);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Message list is empty');
    });

    it('should return error for non-array input', () => {
      const result = parseClaudeArray('not an array' as any);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Message list is empty');
    });

    it('should filter out messages without role', () => {
      const array = [
        { role: 'Human', text: 'Hello' },
        { text: 'No role' },
      ];
      const result = parseClaudeArray(array);
      expect(result.conversation!.messages.length).toBe(1);
    });

    it('should filter out messages without text', () => {
      const array = [
        { role: 'Human', text: 'Hello' },
        { role: 'Assistant', text: '' },
      ];
      const result = parseClaudeArray(array);
      expect(result.conversation!.messages.length).toBe(1);
    });

    it('should convert human role case-insensitively', () => {
      const array = [
        { role: 'HUMAN', text: 'Hello' },
        { role: 'human', text: 'Hello again' },
      ];
      const result = parseClaudeArray(array);
      expect(result.conversation!.messages.length).toBe(2);
      expect(result.conversation!.messages[0].role).toBe('user');
    });

    it('should return error when all messages filtered out', () => {
      const array = [
        { role: '', text: 'Hello' },
        { role: 'Human', text: '' },
      ];
      const result = parseClaudeArray(array);
      expect(result.success).toBe(false);
      expect(result.error).toBe('No valid messages found');
    });

    it('should not throw on valid input', () => {
      expect(() => parseClaudeArray(validArray)).not.toThrow();
    });
  });

  describe('isClaudeFormat', () => {
    it('should return true for text with Human pattern', () => {
      expect(isClaudeFormat('Human: Hello')).toBe(true);
    });

    it('should return true for text with Assistant pattern', () => {
      expect(isClaudeFormat('Assistant: Hello')).toBe(true);
    });

    it('should return true for text with Chat prefix', () => {
      expect(isClaudeFormat('Chat 1 - test')).toBe(true);
    });

    it('should return true for text with claude model reference', () => {
      expect(isClaudeFormat('claude-3.5-sonnet')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(isClaudeFormat('')).toBe(false);
    });

    it('should return false for null', () => {
      expect(isClaudeFormat(null as any)).toBe(false);
    });

    it('should return false for non-string input', () => {
      expect(isClaudeFormat(123 as any)).toBe(false);
    });

    it('should return false for text without Claude patterns', () => {
      expect(isClaudeFormat('Just some random text')).toBe(false);
    });
  });

  describe('extractClaudeTitle', () => {
    it('should extract title from Chat pattern', () => {
      const title = extractClaudeTitle('Chat 1 - claude-3.5-sonnet - Mar 28, 2025');
      expect(title).toBe('Chat 1: claude');
    });

    it('should return default title when pattern not found', () => {
      const title = extractClaudeTitle('Just some text');
      expect(title).toBe('Claude Conversation');
    });
  });

  describe('countClaudeMessages', () => {
    it('should count human messages', () => {
      const counts = countClaudeMessages(sampleClaudeText);
      expect(counts.user).toBe(3);
    });

    it('should count assistant messages', () => {
      const counts = countClaudeMessages(sampleClaudeText);
      expect(counts.assistant).toBe(3);
    });

    it('should return zeros for empty text', () => {
      const counts = countClaudeMessages('');
      expect(counts.user).toBe(0);
      expect(counts.assistant).toBe(0);
      expect(counts.total).toBe(0);
    });

    it('should return zeros for null', () => {
      const counts = countClaudeMessages(null as any);
      expect(counts.user).toBe(0);
      expect(counts.assistant).toBe(0);
      expect(counts.total).toBe(0);
    });
  });
});