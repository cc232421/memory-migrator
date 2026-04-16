/**
 * Claude Conversation Parser
 * User Story 1.3: 支持 Claude 导出格式
 */

export interface ClaudeMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export interface ClaudeConversation {
  id: string;
  title: string;
  messages: ClaudeMessage[];
}

export interface ClaudeParseResult {
  success: boolean;
  conversation?: ClaudeConversation;
  error?: string;
}

// Regex patterns
const CLAUDE_MESSAGE_PATTERN = /(Human|Assistant):\s*([\s\S]*?)(?=(?:Human|Assistant):|$)/gi;
const CLAUDE_SIMPLE_PATTERN = /^(Human|Assistant):\s*(.+)$/gm;
const CLAUDE_DATE_PATTERN = /(Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Jan|Feb)\s+\d{1,2},?\s+\d{4}/i;

/**
 * Parse Claude conversation text
 */
export function parseClaudeText(text: string): ClaudeParseResult {
  try {
    if (!text || typeof text !== 'string') {
      return { success: false, error: 'Input is empty' };
    }

    // Extract title from first line
    const lines = text.trim().split('\n');
    let title = 'Claude Conversation';
    
    // Try to find chat title
    const titleMatch = text.match(/Chat\s+\d+\s*-\s*([^-\n]+)/);
    if (titleMatch) {
      title = titleMatch[1].trim();
    }

    // Parse messages
    const messages: ClaudeMessage[] = [];
    let msgId = 0;

    // Use regex to extract all messages
    const messageRegex = /(Human|Assistant):\s*([\s\S]*?)(?=(?:Human|Assistant):|$)/gi;
    let match;

    while ((match = messageRegex.exec(text)) !== null) {
      const role = match[1].toLowerCase() === 'human' ? 'user' : 'assistant';
      const content = match[2].trim();

      // Skip empty messages
      if (!content) {
        continue;
      }

      messages.push({
        id: `msg-${msgId++}`,
        role,
        content,
      });
    }

    if (messages.length === 0) {
      return { success: false, error: 'No valid conversation messages found' };
    }

    return {
      success: true,
      conversation: {
        id: `claude-${Date.now()}`,
        title,
        messages,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Parsing failed',
    };
  }
}

/**
 * Parse Claude conversation from array format
 */
export function parseClaudeArray(
  messages: Array<{ role: string; text: string }>
): ClaudeParseResult {
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return { success: false, error: 'Message list is empty' };
    }

    const parsedMessages: ClaudeMessage[] = messages
      .filter(msg => msg.role && msg.text)
      .map((msg, index) => ({
        id: `msg-${index}`,
        role: msg.role.toLowerCase() === 'human' ? 'user' : 'assistant',
        content: msg.text.trim(),
      }));

    if (parsedMessages.length === 0) {
      return { success: false, error: 'No valid messages found' };
    }

    return {
      success: true,
      conversation: {
        id: `claude-${Date.now()}`,
        title: 'Claude Conversation',
        messages: parsedMessages,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '解析失败',
    };
  }
}

/**
 * Detect if text is Claude format
 */
export function isClaudeFormat(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  // Check for Claude-specific patterns
  const hasHumanAssistant = /(Human|Assistant):/.test(text);
  const hasChatPrefix = /Chat\s+\d+/.test(text);
  const hasClaudeModel = /claude/i.test(text);

  return hasHumanAssistant || hasChatPrefix || hasClaudeModel;
}

/**
 * Extract title from Claude text
 */
export function extractClaudeTitle(text: string): string {
  // Try to match Chat X - model - date pattern
  const match = text.match(/Chat\s+(\d+)\s*-\s*([^-\n]+)/);
  if (match) {
    return `Chat ${match[1]}: ${match[2].trim()}`;
  }

  return 'Claude Conversation';
}

/**
 * Count messages in Claude text
 */
export function countClaudeMessages(text: string): { user: number; assistant: number; total: number } {
  if (!text) {
    return { user: 0, assistant: 0, total: 0 };
  }

  const userMatches = text.match(/Human:/gi) || [];
  const assistantMatches = text.match(/Assistant:/gi) || [];

  return {
    user: userMatches.length,
    assistant: assistantMatches.length,
    total: userMatches.length + assistantMatches.length,
  };
}
