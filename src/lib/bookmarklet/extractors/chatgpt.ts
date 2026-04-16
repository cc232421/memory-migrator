/**
 * ChatGPT Data Extractor
 * User Story 2.2: 从 ChatGPT 页面提取对话历史
 */

import { Platform } from '../platform-detector';

export interface ChatGPTMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatGPTSession {
  id: string;
  title: string;
  createTime: number;
  updateTime: number;
  messages: ChatGPTMessage[];
}

export interface ChatGPTExtractResult {
  success: boolean;
  platform: Platform;
  sessions?: ChatGPTSession[];
  error?: string;
}

/**
 * Extract content from ChatGPT message parts
 */
function extractContent(parts: string[] | undefined): string {
  if (!parts || !Array.isArray(parts)) {
    return '';
  }
  return parts.join('');
}

interface ChatGPTSessionMappingNode {
  id?: string;
  message?: {
    id?: string;
    role: string;
    content?: { parts?: string[] };
    create_time?: number;
  };
}

/**
 * Parse ChatGPT session from conversation data
 */
function parseSession(sessionId: string, sessionData: Record<string, unknown>): ChatGPTSession {
  const messages: ChatGPTMessage[] = [];
  const mapping = (sessionData.mapping || {}) as Record<string, ChatGPTSessionMappingNode>;

  for (const [msgId, msgData] of Object.entries(mapping)) {
    const msg = msgData;
    
    if (!msg.message || !msg.message.role) {
      continue;
    }

    const role = msg.message.role;
    if (role !== 'user' && role !== 'assistant') {
      continue;
    }

    const content = extractContent(msg.message.content?.parts);
    if (!content.trim()) {
      continue;
    }

    messages.push({
      id: msg.id || msgId,
      role,
      content,
      timestamp: msg.message.create_time || 0,
    });
  }

  // Sort by timestamp
  messages.sort((a, b) => a.timestamp - b.timestamp);

  return {
    id: sessionId,
    title: sessionData.title || 'Untitled',
    createTime: sessionData.create_time || 0,
    updateTime: sessionData.update_time || 0,
    messages,
  };
}

/**
 * Main extraction function - accepts mock data object
 * In browser bookmarklet, this would read from localStorage
 */
export function extractChatGPT(data: Record<string, string>): ChatGPTExtractResult {
  try {
    // Parse sessions list
    let sessionsList: any[] = [];
    
    const sessionsData = data['SessionsV2'] || data['sessions'];
    if (sessionsData) {
      try {
        sessionsList = JSON.parse(sessionsData);
      } catch {
        // Invalid sessions data
      }
    }

    // Parse conversation data
    const conversationData = data['conversation'];
    let conversations: Record<string, any> = {};
    
    if (conversationData) {
      try {
        conversations = JSON.parse(conversationData);
      } catch {
        // Invalid conversation data
      }
    }

    // Build sessions with messages
    const sessions: ChatGPTSession[] = [];

    for (const session of sessionsList) {
      const sessionId = session.id;
      const sessionConversations = conversations[sessionId];
      
      if (sessionConversations) {
        sessions.push(parseSession(sessionId, sessionConversations));
      } else {
        // Session without messages
        sessions.push({
          id: sessionId,
          title: session.title || 'Untitled',
          createTime: session.create_time || 0,
          updateTime: session.update_time || 0,
          messages: [],
        });
      }
    }

    if (sessions.length === 0) {
      return {
        success: false,
        platform: 'chatgpt',
        error: 'No conversations found',
      };
    }

    return {
      success: true,
      platform: 'chatgpt',
      sessions,
    };
  } catch (error) {
    return {
      success: false,
      platform: 'chatgpt',
      error: error instanceof Error ? error.message : 'Extraction failed',
    };
  }
}

/**
 * Get the storage keys used by ChatGPT
 */
export function getChatGPTStorageKeys(): string[] {
  return ['SessionsV2', 'conversation', 'chatHistory'];
}

/**
 * Check if data appears to be ChatGPT format
 */
export function isChatGPTFormat(data: Record<string, string>): boolean {
  const keys = Object.keys(data);
  return keys.some(key => 
    key.includes('SessionsV2') || 
    key.includes('conversation') ||
    key.includes('chatHistory')
  );
}
