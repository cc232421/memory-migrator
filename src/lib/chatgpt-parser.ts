/**
 * ChatGPT Export Parser
 * User Story 1.2: Parse ChatGPT export JSON
 */

export interface ChatGPTMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatGPTConversation {
  id: string;
  title: string;
  createTime: number;
  updateTime: number;
  messages: ChatGPTMessage[];
}

export interface ParsingResult {
  success: boolean;
  conversation?: ChatGPTConversation;
  error?: string;
}

interface ChatGPTMappingNode {
  id?: string;
  message?: {
    id?: string;
    role: string;
    content?: { parts?: string[] };
    create_time?: number;
  };
}

/**
 * Extract message content from ChatGPT parts array
 */
function extractContent(parts: string[] | undefined): string {
  if (!parts || !Array.isArray(parts) || parts.length === 0) {
    return '';
  }
  return parts.join('');
}

/**
 * Parse ChatGPT export JSON
 */
export function parseChatGPTExport(rawData: any): ParsingResult {
  try {
    if (!rawData || typeof rawData !== 'object') {
      return { success: false, error: 'Invalid input data' };
    }

    if (!rawData.mapping || typeof rawData.mapping !== 'object') {
      return { success: false, error: 'Missing mapping field' };
    }

    const title = rawData.title || 'Untitled Conversation';
    const createTime = rawData.create_time || Math.floor(Date.now() / 1000);
    const updateTime = rawData.update_time || createTime;
    const conversationId = rawData.id || `conv-${Date.now()}`;

    const messages: ChatGPTMessage[] = [];
    const mapping = rawData.mapping;

    for (const [msgId, msgData] of Object.entries(mapping)) {
      const msg = msgData as ChatGPTMappingNode;
      if (!msg.message) {
        continue;
      }

      const role = msg.message.role;
      if (role !== 'user' && role !== 'assistant') {
        continue;
      }

      const content = extractContent(msg.message.content?.parts);
      const timestamp = msg.message.create_time || 0;

      if (!content.trim()) {
        continue;
      }

      messages.push({
        id: msg.id || msgId,
        role,
        content,
        timestamp,
      });
    }

    messages.sort((a, b) => a.timestamp - b.timestamp);

    return {
      success: true,
      conversation: {
        id: conversationId,
        title,
        createTime,
        updateTime,
        messages,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Parse failed',
    };
  }
}

/**
 * Check if data is ChatGPT format
 */
export function isChatGPTFormat(data: any): boolean {
  if (!data || typeof data !== 'object') {
    return false;
  }
  return !!(
    data.mapping &&
    typeof data.mapping === 'object'
  );
}

/**
 * Extract conversation title from export
 */
export function extractTitle(data: any): string {
  return data?.title || 'Untitled Conversation';
}

/**
 * Count messages in export
 */
export function countMessages(data: any): { user: number; assistant: number; total: number } {
  if (!data?.mapping) {
    return { user: 0, assistant: 0, total: 0 };
  }

  let user = 0;
  let assistant = 0;

  for (const msg of Object.values(data.mapping) as ChatGPTMappingNode[]) {
    if (msg.message?.role === 'user') user++;
    else if (msg.message?.role === 'assistant') assistant++;
  }

  return { user, assistant, total: user + assistant };
}
