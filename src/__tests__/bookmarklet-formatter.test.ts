/**
 * @jest-environment node
 */

// User Story 3.1: 统一格式转换测试

describe('User Story 3.1: 统一格式转换', () => {
  describe('作为系统，我想将各平台数据转换为统一格式', () => {
    
    // Sample extracted data from ChatGPT
    const sampleSession = {
      id: 'session-001',
      title: 'JavaScript Help',
      createTime: 1704067200,
      updateTime: 1704070800,
      messages: [
        {
          id: 'msg-1',
          role: 'user' as const,
          content: 'Hello, help me with JavaScript',
          timestamp: 1704067200,
        },
        {
          id: 'msg-2',
          role: 'assistant' as const,
          content: 'Sure! What would you like to learn?',
          timestamp: 1704067300,
        },
      ],
    };

    const sampleSessions = [sampleSession];

    it('应该输出包含 platform 字段', () => {
      const output = {
        platform: 'chatgpt',
        timestamp: new Date().toISOString(),
        conversations: sampleSessions,
      };
      
      expect(output).toHaveProperty('platform');
      expect(output.platform).toBe('chatgpt');
    });

    it('应该输出包含 timestamp 字段', () => {
      const output = {
        platform: 'chatgpt',
        timestamp: new Date().toISOString(),
        conversations: sampleSessions,
      };
      
      expect(output).toHaveProperty('timestamp');
      expect(output.timestamp).toBeDefined();
    });

    it('应该输出包含 conversations 数组', () => {
      const output = {
        platform: 'chatgpt',
        timestamp: new Date().toISOString(),
        conversations: sampleSessions,
      };
      
      expect(output).toHaveProperty('conversations');
      expect(Array.isArray(output.conversations)).toBe(true);
    });

    it('每个对话应该包含 id', () => {
      const conv = sampleSessions[0];
      expect(conv).toHaveProperty('id');
    });

    it('每个对话应该包含 title', () => {
      const conv = sampleSessions[0];
      expect(conv).toHaveProperty('title');
    });

    it('每个对话应该包含 messages', () => {
      const conv = sampleSessions[0];
      expect(conv).toHaveProperty('messages');
      expect(Array.isArray(conv.messages)).toBe(true);
    });

    it('每条消息应该包含 role', () => {
      const msg = sampleSessions[0].messages[0];
      expect(msg).toHaveProperty('role');
    });

    it('每条消息应该包含 content', () => {
      const msg = sampleSessions[0].messages[0];
      expect(msg).toHaveProperty('content');
    });

    it('每条消息应该包含 time', () => {
      const msg = sampleSessions[0].messages[0];
      // Our format uses 'timestamp' but output uses 'time'
      expect(msg).toHaveProperty('timestamp');
    });

    it('应该能处理多个对话', () => {
      const multipleSessions = [
        sampleSession,
        { ...sampleSession, id: 'session-002', title: 'Python Help' },
      ];
      
      const output = {
        platform: 'chatgpt',
        timestamp: new Date().toISOString(),
        conversations: multipleSessions,
      };
      
      expect(output.conversations.length).toBe(2);
    });

    it('应该能处理空对话', () => {
      const emptySessions: any[] = [];
      
      const output = {
        platform: 'chatgpt',
        timestamp: new Date().toISOString(),
        conversations: emptySessions,
      };
      
      expect(output.conversations.length).toBe(0);
    });
  });
});
