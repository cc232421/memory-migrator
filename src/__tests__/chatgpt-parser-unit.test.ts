/**
 * @jest-environment node
 */
import { jest } from '@jest/globals';
import {
  parseChatGPTExport,
  isChatGPTFormat,
  extractTitle,
  countMessages,
  ChatGPTConversation,
} from '@/lib/chatgpt-parser';

describe('ChatGPT Parser', () => {
  const validChatGPTData = {
    id: 'conv-123',
    title: 'Coding Session',
    create_time: 1704067200,
    update_time: 1704153600,
    mapping: {
      'msg-1': {
        id: 'msg-1',
        message: {
          id: 'msg-1',
          role: 'user',
          content: { parts: ['Hello, help me write a function'] },
          create_time: 1704067200,
        },
      },
      'msg-2': {
        id: 'msg-2',
        message: {
          id: 'msg-2',
          role: 'assistant',
          content: { parts: ['Sure, here is a function...'] },
          create_time: 1704070800,
        },
      },
      'msg-3': {
        id: 'msg-3',
        message: {
          id: 'msg-3',
          role: 'user',
          content: { parts: ['Can you make it more efficient?'] },
          create_time: 1704074400,
        },
      },
    },
  };

  describe('parseChatGPTExport', () => {
    it('should parse valid ChatGPT export data', () => {
      const result = parseChatGPTExport(validChatGPTData);
      expect(result.success).toBe(true);
      expect(result.conversation).toBeDefined();
      expect(result.conversation!.title).toBe('Coding Session');
      expect(result.conversation!.messages.length).toBe(3);
    });

    it('should return error for null input', () => {
      const result = parseChatGPTExport(null);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid input data');
    });

    it('should return error for undefined input', () => {
      const result = parseChatGPTExport(undefined);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid input data');
    });

    it('should return error for non-object input', () => {
      const result = parseChatGPTExport('string' as any);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid input data');
    });

    it('should return error when mapping is missing', () => {
      const result = parseChatGPTExport({ title: 'Test' });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Missing mapping field');
    });

    it('should return error when mapping is not an object', () => {
      const result = parseChatGPTExport({ mapping: 'not an object' });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Missing mapping field');
    });

    it('should use default title when title is missing', () => {
      const data = { ...validChatGPTData, title: undefined };
      const result = parseChatGPTExport(data);
      expect(result.success).toBe(true);
      expect(result.conversation!.title).toBe('Untitled Conversation');
    });

    it('should filter out messages without content', () => {
      const data = {
        ...validChatGPTData,
        mapping: {
          'msg-1': {
            id: 'msg-1',
            message: {
              role: 'user',
              content: { parts: ['Valid message'] },
              create_time: 1704067200,
            },
          },
          'msg-2': {
            id: 'msg-2',
            message: {
              role: 'assistant',
              content: { parts: [''] },
              create_time: 1704070800,
            },
          },
        },
      };
      const result = parseChatGPTExport(data);
      expect(result.conversation!.messages.length).toBe(1);
    });

    it('should filter out system messages', () => {
      const data = {
        ...validChatGPTData,
        mapping: {
          'msg-1': {
            id: 'msg-1',
            message: {
              role: 'system',
              content: { parts: ['System message'] },
              create_time: 1704067200,
            },
          },
          'msg-2': {
            id: 'msg-2',
            message: {
              role: 'user',
              content: { parts: ['User message'] },
              create_time: 1704070800,
            },
          },
        },
      };
      const result = parseChatGPTExport(data);
      expect(result.conversation!.messages.length).toBe(1);
      expect(result.conversation!.messages[0].role).toBe('user');
    });

    it('should handle messages with missing message field', () => {
      const data = {
        ...validChatGPTData,
        mapping: {
          'msg-1': {
            id: 'msg-1',
          },
          'msg-2': {
            id: 'msg-2',
            message: {
              role: 'user',
              content: { parts: ['Valid message'] },
              create_time: 1704070800,
            },
          },
        },
      };
      const result = parseChatGPTExport(data);
      expect(result.conversation!.messages.length).toBe(1);
    });

    it('should sort messages by timestamp', () => {
      const result = parseChatGPTExport(validChatGPTData);
      const messages = result.conversation!.messages;
      expect(messages[0].timestamp).toBe(1704067200);
      expect(messages[1].timestamp).toBe(1704070800);
      expect(messages[2].timestamp).toBe(1704074400);
    });

    it('should return conversation with correct structure', () => {
      const result = parseChatGPTExport(validChatGPTData);
      const conversation = result.conversation!;
      expect(conversation).toHaveProperty('id');
      expect(conversation).toHaveProperty('title');
      expect(conversation).toHaveProperty('createTime');
      expect(conversation).toHaveProperty('updateTime');
      expect(conversation).toHaveProperty('messages');
    });

    it('should sort messages chronologically', () => {
      const unsortedData = {
        ...validChatGPTData,
        mapping: {
          'msg-1': {
            id: 'msg-1',
            message: {
              role: 'user',
              content: { parts: ['Later message'] },
              create_time: 1705000000,
            },
          },
          'msg-2': {
            id: 'msg-2',
            message: {
              role: 'assistant',
              content: { parts: ['Earlier response'] },
              create_time: 1704000000,
            },
          },
        },
      };
      const result = parseChatGPTExport(unsortedData);
      expect(result.conversation!.messages[0].content).toBe('Earlier response');
      expect(result.conversation!.messages[1].content).toBe('Later message');
    });
  });

  describe('isChatGPTFormat', () => {
    it('should return true for valid ChatGPT format', () => {
      expect(isChatGPTFormat(validChatGPTData)).toBe(true);
    });

    it('should return false for null input', () => {
      expect(isChatGPTFormat(null)).toBe(false);
    });

    it('should return false for undefined input', () => {
      expect(isChatGPTFormat(undefined)).toBe(false);
    });

    it('should return false for non-object input', () => {
      expect(isChatGPTFormat('string' as any)).toBe(false);
    });

    it('should return false when mapping is missing', () => {
      expect(isChatGPTFormat({ title: 'Test' })).toBe(false);
    });

    it('should return false when mapping is not an object', () => {
      expect(isChatGPTFormat({ mapping: 'string' })).toBe(false);
    });

    it('should return true when mapping exists even if empty', () => {
      expect(isChatGPTFormat({ mapping: {} })).toBe(true);
    });
  });

  describe('extractTitle', () => {
    it('should extract title from data', () => {
      expect(extractTitle(validChatGPTData)).toBe('Coding Session');
    });

    it('should return default title when title is missing', () => {
      expect(extractTitle({ mapping: {} })).toBe('Untitled Conversation');
    });

    it('should return default title when data is null', () => {
      expect(extractTitle(null)).toBe('Untitled Conversation');
    });
  });

  describe('countMessages', () => {
    it('should count user and assistant messages', () => {
      const counts = countMessages(validChatGPTData);
      expect(counts.user).toBe(2);
      expect(counts.assistant).toBe(1);
      expect(counts.total).toBe(3);
    });

    it('should return zeros for missing mapping', () => {
      const counts = countMessages({});
      expect(counts.user).toBe(0);
      expect(counts.assistant).toBe(0);
      expect(counts.total).toBe(0);
    });

    it('should return zeros for null data', () => {
      const counts = countMessages(null);
      expect(counts.user).toBe(0);
      expect(counts.assistant).toBe(0);
      expect(counts.total).toBe(0);
    });
  });
});