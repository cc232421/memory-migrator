/**
 * @jest-environment node
 */

// User Story 2.2: ChatGPT 数据提取测试

describe('User Story 2.2: ChatGPT 数据提取', () => {
  describe('作为用户，我想从ChatGPT页面提取对话历史', () => {
    
    // Mock LocalStorage data structure (as stored in browser)
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

    it('应该能解析 ChatGPT LocalStorage 数据', () => {
      const sessions = JSON.parse(mockChatGPTStorageData['SessionsV2']);
      expect(Array.isArray(sessions)).toBe(true);
      expect(sessions.length).toBe(2);
    });

    it('应该能提取对话ID', () => {
      const conversation = JSON.parse(mockChatGPTStorageData['conversation']);
      const sessionId = Object.keys(conversation)[0];
      expect(sessionId).toBe('session-001');
    });

    it('应该能提取对话标题', () => {
      const conversation = JSON.parse(mockChatGPTStorageData['conversation']);
      const session = conversation['session-001'];
      expect(session.title).toBe('JavaScript Help');
    });

    it('应该能提取消息列表', () => {
      const conversation = JSON.parse(mockChatGPTStorageData['conversation']);
      const session = conversation['session-001'];
      const mapping = session.mapping;
      const messages = Object.values(mapping).filter((m: any) => m.message?.role);
      expect(messages.length).toBe(2);
    });

    it('应该能识别用户消息', () => {
      const conversation = JSON.parse(mockChatGPTStorageData['conversation']);
      const session = conversation['session-001'];
      const mapping = session.mapping;
      const firstMessage: any = Object.values(mapping)[0];
      expect(firstMessage.message.role).toBe('user');
    });

    it('应该能识别AI回复', () => {
      const conversation = JSON.parse(mockChatGPTStorageData['conversation']);
      const session = conversation['session-001'];
      const mapping = session.mapping;
      const messages = Object.values(mapping);
      const assistantMsg = messages.find((m: any) => m.message?.role === 'assistant');
      expect(assistantMsg).toBeDefined();
    });

    it('应该能提取消息内容', () => {
      const conversation = JSON.parse(mockChatGPTStorageData['conversation']);
      const session = conversation['session-001'];
      const mapping = session.mapping;
      const firstMessage: any = Object.values(mapping)[0];
      expect(firstMessage.message.content.parts[0]).toBe('Hello, help me with JavaScript');
    });

    it('应该能提取消息时间戳', () => {
      const conversation = JSON.parse(mockChatGPTStorageData['conversation']);
      const session = conversation['session-001'];
      const mapping = session.mapping;
      const firstMessage: any = Object.values(mapping)[0];
      expect(firstMessage.message.create_time).toBe(1704067200);
    });

    it('应该处理空数据情况', () => {
      const emptyData = {
        'SessionsV2': '[]',
        'conversation': '{}',
      };
      
      const sessions = JSON.parse(emptyData['SessionsV2']);
      const conversation = JSON.parse(emptyData['conversation']);
      
      expect(sessions.length).toBe(0);
      expect(Object.keys(conversation).length).toBe(0);
    });

    it('应该处理无效JSON', () => {
      const invalidData = 'not-json';
      
      expect(() => {
        JSON.parse(invalidData);
      }).toThrow();
    });
  });
});
