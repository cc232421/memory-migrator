/**
 * @jest-environment node
 */

// User Story 2.X: Claude & Gemini Extractors Tests

describe('User Story 2.X: Claude Extractor', () => {
  describe('作为用户，我想从 Claude 提取对话历史', () => {
    
    const mockClaudeData = {
      'claude_chat_history': JSON.stringify({
        conversations: [
          {
            id: 'conv-1',
            title: 'Code Review',
            created_at: 1700000000000,
            updated_at: 1700000000000,
            chat_messages: [
              {
                id: 'msg-1',
                role: 'human',
                message: { text: 'Review this function' },
                created_at: 1700000000000,
              },
              {
                id: 'msg-2',
                role: 'assistant',
                message: { text: 'This function looks good but could be improved by adding type annotations.' },
                created_at: 1700000000000,
              },
            ],
          },
        ],
      }),
    };

    it('应该能检测 Claude 格式', () => {
      const { isClaudeFormat } = require('../lib/bookmarklet/extractors/claude');
      expect(isClaudeFormat(mockClaudeData)).toBe(true);
    });

    it('应该能提取对话', () => {
      const { extractClaude } = require('../lib/bookmarklet/extractors/claude');
      const result = extractClaude(mockClaudeData);
      expect(result.success).toBe(true);
      expect(result.conversations).toBeDefined();
      expect(result.conversations!.length).toBeGreaterThan(0);
    });

    it('应该能解析消息内容', () => {
      const { extractClaude } = require('../lib/bookmarklet/extractors/claude');
      const result = extractClaude(mockClaudeData);
      const conv = result.conversations![0];
      expect(conv.messages[0].content).toContain('Review');
      expect(conv.messages[1].content).toContain('type annotations');
    });

    it('应该能处理空数据', () => {
      const { extractClaude } = require('../lib/bookmarklet/extractors/claude');
      const result = extractClaude({});
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('应该能获取存储键', () => {
      const { getClaudeStorageKeys } = require('../lib/bookmarklet/extractors/claude');
      const keys = getClaudeStorageKeys();
      expect(keys).toContain('claude_chat_history');
    });
  });
});

describe('User Story 2.X: Gemini Extractor', () => {
  describe('作为用户，我想从 Gemini 提取对话历史', () => {
    
    const mockGeminiData = {
      'gemini_conversations': JSON.stringify({
        conversations: [
          {
            id: 'conv-1',
            title: 'Creative Writing',
            createdAt: 1700000000000,
            updatedAt: 1700000000000,
            messages: [
              {
                id: 'msg-1',
                role: 'user',
                message: { text: 'Write a story' },
                createdAt: 1700000000000,
              },
              {
                id: 'msg-2',
                role: 'model',
                message: { text: 'Once upon a time...' },
                createdAt: 1700000000000,
              },
            ],
          },
        ],
      }),
    };

    it('应该能检测 Gemini 格式', () => {
      const { isGeminiFormat } = require('../lib/bookmarklet/extractors/gemini');
      expect(isGeminiFormat(mockGeminiData)).toBe(true);
    });

    it('应该能提取对话', () => {
      const { extractGemini } = require('../lib/bookmarklet/extractors/gemini');
      const result = extractGemini(mockGeminiData);
      expect(result.success).toBe(true);
      expect(result.conversations).toBeDefined();
    });

    it('应该能解析候选内容格式', () => {
      const mockDataWithCandidates = {
        'gemini_conversations': JSON.stringify({
          conversations: [
            {
              id: 'conv-1',
              messages: [
                {
                  id: 'msg-1',
                  role: 'model',
                  message: {
                    candidates: [{
                      content: {
                        parts: [{ text: 'Generated text' }]
                      }
                    }]
                  },
                },
              ],
            },
          ],
        }),
      };
      const { extractGemini } = require('../lib/bookmarklet/extractors/gemini');
      const result = extractGemini(mockDataWithCandidates);
      expect(result.success).toBe(true);
      expect(result.conversations![0].messages[0].content).toContain('Generated');
    });

    it('应该能处理空数据', () => {
      const { extractGemini } = require('../lib/bookmarklet/extractors/gemini');
      const result = extractGemini({});
      expect(result.success).toBe(false);
    });

    it('应该能获取存储键', () => {
      const { getGeminiStorageKeys } = require('../lib/bookmarklet/extractors/gemini');
      const keys = getGeminiStorageKeys();
      expect(keys).toContain('gemini_conversations');
    });
  });
});

describe('User Story 2.X: Unified Extractor Interface', () => {
  describe('作为系统，我想统一管理所有提取器', () => {
    
    it('所有提取器应该有相同的接口', () => {
      const chatgpt = require('../lib/bookmarklet/extractors/chatgpt');
      const claude = require('../lib/bookmarklet/extractors/claude');
      const gemini = require('../lib/bookmarklet/extractors/gemini');
      
      // Check extract functions exist
      expect(typeof chatgpt.extractChatGPT).toBe('function');
      expect(typeof claude.extractClaude).toBe('function');
      expect(typeof gemini.extractGemini).toBe('function');
      
      // Check format detection
      expect(typeof chatgpt.isChatGPTFormat).toBe('function');
      expect(typeof claude.isClaudeFormat).toBe('function');
      expect(typeof gemini.isGeminiFormat).toBe('function');
    });

    it('所有提取器应该有平台标识', () => {
      const chatgpt = require('../lib/bookmarklet/extractors/chatgpt');
      const claude = require('../lib/bookmarklet/extractors/claude');
      const gemini = require('../lib/bookmarklet/extractors/gemini');
      
      const chatgptResult = chatgpt.extractChatGPT({ 'SessionsV2': '[]' });
      const claudeResult = claude.extractClaude({});
      const geminiResult = gemini.extractGemini({});
      
      expect(chatgptResult.platform).toBe('chatgpt');
      expect(claudeResult.platform).toBe('claude');
      expect(geminiResult.platform).toBe('gemini');
    });
  });
});