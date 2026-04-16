/**
 * @jest-environment node
 */
import { jest } from '@jest/globals';
import { parseChatGPTExport } from '@/lib/chatgpt-parser';
import { parseClaudeText } from '@/lib/claude-parser';
import { generatePrompt } from '@/lib/prompt-generator';
import { exportAsMarkdown, exportAsText, generateSkillJSON } from '@/lib/export';

describe('End-to-End Integration Tests', () => {
  describe('ChatGPT Export → Prompt Generation', () => {
    const chatgptExport = {
      id: 'conv-123',
      title: 'Python Learning Session',
      create_time: 1704067200,
      update_time: 1704153600,
      mapping: {
        'msg-1': {
          id: 'msg-1',
          message: {
            role: 'user',
            content: { parts: ['I want to learn Python programming'] },
            create_time: 1704067200,
          },
        },
        'msg-2': {
          id: 'msg-2',
          message: {
            role: 'assistant',
            content: { parts: ['Great! Python is a versatile language. Let me explain the basics...'] },
            create_time: 1704070800,
          },
        },
        'msg-3': {
          id: 'msg-3',
          message: {
            role: 'user',
            content: { parts: ['Can you show me how to use list comprehension?'] },
            create_time: 1704074400,
          },
        },
        'msg-4': {
          id: 'msg-4',
          message: {
            role: 'assistant',
            content: { parts: ['List comprehension is a powerful feature in Python. Here is an example...'] },
            create_time: 1704078000,
          },
        },
      },
    };

    it('should parse ChatGPT export and generate prompt', () => {
      const parseResult = parseChatGPTExport(chatgptExport);
      expect(parseResult.success).toBe(true);
      expect(parseResult.conversation).toBeDefined();
      expect(parseResult.conversation!.messages.length).toBe(4);

      const conversation = parseResult.conversation!;
      expect(conversation.title).toBe('Python Learning Session');

      const prompt = generatePrompt(conversation, { style: 'detailed' });
      expect(prompt).toBeDefined();
      expect(typeof prompt).toBe('string');
      expect(prompt.length).toBeGreaterThan(0);
    });

    it('should export conversation to markdown format', () => {
      const parseResult = parseChatGPTExport(chatgptExport);
      expect(parseResult.success).toBe(true);

      const mockSummary = {
        userNeeds: ['Learn Python'],
        aiSolutions: ['Teaching basics'],
        userPreferences: [],
        keyKnowledge: ['List comprehension'],
        actionItems: [],
      };

      const markdownResult = exportAsMarkdown(mockSummary, parseResult.conversation!);
      expect(markdownResult.content).toContain('Python Learning Session');
      expect(markdownResult.filename).toBeDefined();
    });

    it('should export conversation to text format', () => {
      const parseResult = parseChatGPTExport(chatgptExport);
      expect(parseResult.success).toBe(true);

      const mockSummary = {
        userNeeds: ['Learn Python'],
        aiSolutions: ['Teaching basics'],
        userPreferences: [],
        keyKnowledge: ['List comprehension'],
        actionItems: [],
      };

      const text = exportAsText(mockSummary, parseResult.conversation!);
      expect(text).toBeDefined();
      expect(typeof text).toBe('string');
    });

    it('should generate skill JSON', () => {
      const parseResult = parseChatGPTExport(chatgptExport);
      expect(parseResult.success).toBe(true);

      const mockSummary = {
        userNeeds: ['Learn Python'],
        aiSolutions: ['Teaching basics'],
        userPreferences: [],
        keyKnowledge: ['List comprehension'],
        actionItems: [],
      };

      const skillJson = generateSkillJSON(mockSummary, parseResult.conversation!);
      expect(skillJson).toBeDefined();
      const parsed = JSON.parse(skillJson);
      expect(parsed.name).toBeDefined();
      expect(parsed.instructions).toBeDefined();
    });

    it('should handle different style options', () => {
      const parseResult = parseChatGPTExport(chatgptExport);
      expect(parseResult.success).toBe(true);

      const compactPrompt = generatePrompt(parseResult.conversation!, { style: 'compact' });
      const detailedPrompt = generatePrompt(parseResult.conversation!, { style: 'detailed' });

      expect(compactPrompt).toBeDefined();
      expect(detailedPrompt).toBeDefined();
    });
  });

  describe('Claude Export → Prompt Generation', () => {
    const claudeText = `Chat 1 - claude-3.5-sonnet - Mar 28, 2025

Human: I want to learn Python programming
Assistant: Great! Python is a versatile language. Let me explain the basics...

Human: Can you show me how to use list comprehension?
Assistant: List comprehension is a powerful feature in Python. Here is an example...`;

    it('should parse Claude text and generate prompt', () => {
      const parseResult = parseClaudeText(claudeText);
      expect(parseResult.success).toBe(true);
      expect(parseResult.conversation).toBeDefined();
      expect(parseResult.conversation!.messages.length).toBe(4);

      const conversation = parseResult.conversation!;
      expect(conversation.title).toBe('claude');

      const prompt = generatePrompt(conversation, { style: 'detailed' });
      expect(prompt).toBeDefined();
      expect(typeof prompt).toBe('string');
      expect(prompt.length).toBeGreaterThan(0);
    });

    it('should export Claude conversation to markdown', () => {
      const parseResult = parseClaudeText(claudeText);
      expect(parseResult.success).toBe(true);

      const mockSummary = {
        userNeeds: ['Learn Python'],
        aiSolutions: ['Teaching basics'],
        userPreferences: [],
        keyKnowledge: ['List comprehension'],
        actionItems: [],
      };

      const markdownResult = exportAsMarkdown(mockSummary, parseResult.conversation!);
      expect(markdownResult.filename).toBeDefined();
    });
  });

  describe('Error Handling End-to-End', () => {
    it('should handle invalid ChatGPT data gracefully', () => {
      const invalidData = { title: 'Invalid' };
      const parseResult = parseChatGPTExport(invalidData);
      expect(parseResult.success).toBe(false);
      expect(parseResult.error).toBeDefined();
    });

    it('should handle empty Claude text gracefully', () => {
      const parseResult = parseClaudeText('');
      expect(parseResult.success).toBe(false);
      expect(parseResult.error).toBe('Input is empty');
    });

    it('should handle malformed data without crashing', () => {
      const malformedData = {
        id: 'conv-123',
        title: 'Test',
        create_time: 1704067200,
        update_time: 1704153600,
        mapping: null,
      };
      const parseResult = parseChatGPTExport(malformedData);
      expect(parseResult.success).toBe(false);
      expect(parseResult.error).toBeDefined();
    });
  });

  describe('Multi-Platform Export', () => {
    it('should handle both ChatGPT and Claude exports consistently', () => {
      const chatgptData = {
        id: 'conv-1',
        title: 'Test Chat',
        create_time: 1704067200,
        update_time: 1704153600,
        mapping: {
          'msg-1': {
            id: 'msg-1',
            message: {
              role: 'user',
              content: { parts: ['Hello'] },
              create_time: 1704067200,
            },
          },
          'msg-2': {
            id: 'msg-2',
            message: {
              role: 'assistant',
              content: { parts: ['Hi there!'] },
              create_time: 1704070800,
            },
          },
        },
      };

      const chatgptResult = parseChatGPTExport(chatgptData);
      expect(chatgptResult.success).toBe(true);

      const mockSummary = {
        userNeeds: ['Test'],
        aiSolutions: ['Testing'],
        userPreferences: [],
        keyKnowledge: [],
        actionItems: [],
      };

      const chatgptMarkdown = exportAsMarkdown(mockSummary, chatgptResult.conversation!);
      expect(chatgptMarkdown.content).toContain('Test Chat');
      expect(() => JSON.parse(generateSkillJSON(mockSummary, chatgptResult.conversation!))).not.toThrow();
    });
  });
});