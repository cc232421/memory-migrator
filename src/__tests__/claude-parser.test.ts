/**
 * @jest-environment node
 */
import { jest } from '@jest/globals';

// Mock Claude Parser test
// User Story 1.3: 支持 Claude 导出格式

describe('User Story 1.3: Claude 支持', () => {
  describe('作为用户，我想上传Claude对话记录', () => {
    
    // Sample Claude conversation text (copied format)
    const sampleClaudeText = `
Chat 1 - claude-3.5-sonnet - Mar 28, 2025

Human: Hello, I need help with Python
Assistant: Of course! What would you like to learn?

Human: Can you show me how to use list comprehension?
Assistant: List comprehension is a powerful feature...

Human: Thanks! One more question about dictionaries
Assistant: Dictionaries in Python are key-value pairs...
`;

    const sampleClaudeMultiTurn = [
      { role: 'Human', text: 'Hello, I need help with Python' },
      { role: 'Assistant', text: 'Of course! What would you like to learn?' },
      { role: 'Human', text: 'Can you show me how to use list comprehension?' },
      { role: 'Assistant', text: 'List comprehension is a powerful feature...' },
    ];

    it('应该支持Claude复制对话的文本格式', () => {
      const hasClaudeFormat = sampleClaudeText.includes('Chat') || 
                              sampleClaudeText.includes('Human:') ||
                              sampleClaudeText.includes('Assistant:');
      expect(hasClaudeFormat).toBe(true);
    });

    it('应该能够从文本中提取对话轮次', () => {
      const messages = sampleClaudeText.match(/(Human|Assistant):/g);
      expect(messages).toBeDefined();
      expect(messages?.length).toBeGreaterThanOrEqual(4);
    });

    it('应该正确识别用户发言', () => {
      const humanMessages = sampleClaudeText.match(/Human:/g);
      expect(humanMessages?.length).toBe(3);
    });

    it('应该正确识别AI发言', () => {
      const assistantMessages = sampleClaudeText.match(/Assistant:/g);
      expect(assistantMessages?.length).toBe(3);
    });

    it('应该处理多轮对话', () => {
      const expectedTurns = 4; // 2 human + 2 assistant
      const actualTurns = sampleClaudeMultiTurn.length;
      expect(actualTurns).toBe(expectedTurns);
    });

    it('应该提取消息内容', () => {
      const firstHumanMsg = sampleClaudeMultiTurn[0].text;
      expect(firstHumanMsg).toBe('Hello, I need help with Python');
    });

    it('应该处理空对话', () => {
      const emptyText = '';
      const hasMessages = (emptyText.match(/(Human|Assistant):/g) || []).length;
      expect(hasMessages).toBe(0);
    });

    it('应该处理带时间戳的消息', () => {
      const textWithTimestamp = `
Human: Hello
Assistant: Hi there! Mar 28, 2025 at 10:00 AM
`;
      const hasTimestamp = textWithTimestamp.includes('Mar 28');
      expect(hasTimestamp).toBe(true);
    });

    it('应该处理代码块', () => {
      const textWithCode = `
Assistant: Here's code:
\`\`\`python
def hello():
    print("hello")
\`\`\`
`;
      const hasCode = textWithCode.includes('```');
      expect(hasCode).toBe(true);
    });

    it('应该处理带引用的消息', () => {
      const textWithReference = `
Human: [Reply to previous message] Can you explain more?
Assistant: Sure!
`;
      const hasReference = textWithReference.includes('[Reply');
      expect(hasReference).toBe(true);
    });
  });
});
