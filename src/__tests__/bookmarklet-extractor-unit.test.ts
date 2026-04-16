/**
 * @jest-environment node
 */
import { jest } from '@jest/globals';
import {
  extractChatGPT,
  getChatGPTStorageKeys,
  isChatGPTFormat,
  ChatGPTSession,
} from '@/lib/bookmarklet/extractors/chatgpt';

describe('ChatGPT Bookmarklet Extractor', () => {
  const mockChatGPTStorageData = {
    'SessionsV2': JSON.stringify([
      {
        id: 'session-001',
        title: 'JavaScript Help',
        create_time: 1704067200,
        update_time: 1704070800,
      },
      {
        id: 'session-002',
        title: 'Python Tutorial',
        create_time: 1703977200,
        update_time: 1703980800,
      },
    ]),
    'conversation': JSON.stringify({
      'session-001': {
        id: 'session-001',
        title: 'JavaScript Help',
        create_time: 1704067200,
        mapping: {
          'msg-1': {
            id: 'msg-1',
            message: {
              role: 'user',
              content: { parts: ['Hello, help me with JavaScript'] },
              create_time: 1704067200,
            },
          },
          'msg-2': {
            id: 'msg-2',
            message: {
              role: 'assistant',
              content: { parts: ['Sure! What would you like to learn?'] },
              create_time: 1704067300,
            },
          },
        },
      },
    }),
  };

  describe('extractChatGPT', () => {
    it('should extract sessions from storage data', () => {
      const result = extractChatGPT(mockChatGPTStorageData);
      expect(result.success).toBe(true);
      expect(result.platform).toBe('chatgpt');
      expect(result.sessions).toBeDefined();
      expect(result.sessions!.length).toBeGreaterThan(0);
    });

    it('should extract session with messages', () => {
      const result = extractChatGPT(mockChatGPTStorageData);
      const session = result.sessions!.find(s => s.id === 'session-001');
      expect(session).toBeDefined();
      expect(session!.messages.length).toBe(2);
    });

    it('should extract session without messages', () => {
      const result = extractChatGPT(mockChatGPTStorageData);
      const session = result.sessions!.find(s => s.id === 'session-002');
      expect(session).toBeDefined();
      expect(session!.messages.length).toBe(0);
    });

    it('should return error when no sessions found', () => {
      const emptyData = {
        'SessionsV2': '[]',
        'conversation': '{}',
      };
      const result = extractChatGPT(emptyData);
      expect(result.success).toBe(false);
      expect(result.error).toBe('No conversations found');
    });

    it('should handle invalid JSON in SessionsV2 gracefully', () => {
      const invalidData = {
        'SessionsV2': 'not-valid-json',
        'conversation': '{}',
      };
      const result = extractChatGPT(invalidData);
      expect(result.success).toBe(false);
      expect(result.error).toBe('No conversations found');
    });

    it('should handle invalid JSON in conversation gracefully', () => {
      const invalidData = {
        'SessionsV2': '[]',
        'conversation': 'not-valid-json',
      };
      const result = extractChatGPT(invalidData);
      expect(result.success).toBe(false);
    });

    it('should filter out empty content messages', () => {
      const dataWithEmpty = {
        'SessionsV2': JSON.stringify([
          {
            id: 'session-001',
            title: 'Test',
            create_time: 1704067200,
            update_time: 1704070800,
          },
        ]),
        'conversation': JSON.stringify({
          'session-001': {
            id: 'session-001',
            title: 'Test',
            create_time: 1704067200,
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
                  create_time: 1704067300,
                },
              },
            },
          },
        }),
      };
      const result = extractChatGPT(dataWithEmpty);
      expect(result.sessions![0].messages.length).toBe(1);
    });

    it('should sort messages by timestamp', () => {
      const result = extractChatGPT(mockChatGPTStorageData);
      const session = result.sessions!.find(s => s.id === 'session-001');
      expect(session!.messages[0].timestamp).toBe(1704067200);
      expect(session!.messages[1].timestamp).toBe(1704067300);
    });
  });

  describe('getChatGPTStorageKeys', () => {
    it('should return storage keys', () => {
      const keys = getChatGPTStorageKeys();
      expect(keys).toContain('SessionsV2');
      expect(keys).toContain('conversation');
      expect(keys).toContain('chatHistory');
    });
  });

  describe('isChatGPTFormat', () => {
    it('should return true for ChatGPT storage data', () => {
      expect(isChatGPTFormat(mockChatGPTStorageData)).toBe(true);
    });

    it('should return true for data with SessionsV2 key', () => {
      expect(isChatGPTFormat({ 'SessionsV2': '[]' })).toBe(true);
    });

    it('should return true for data with conversation key', () => {
      expect(isChatGPTFormat({ 'conversation': '{}' })).toBe(true);
    });

    it('should return true for data with chatHistory key', () => {
      expect(isChatGPTFormat({ 'chatHistory': '[]' })).toBe(true);
    });

    it('should return false for empty data', () => {
      expect(isChatGPTFormat({})).toBe(false);
    });
  });
});