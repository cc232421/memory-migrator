/**
 * Unified Formatter
 * User Story 3.1: 将各平台数据转换为统一格式
 */

import { Platform } from './platform-detector';

export interface UnifiedMessage {
  role: 'user' | 'assistant';
  content: string;
  time: number;
}

export interface UnifiedConversation {
  id: string;
  title: string;
  messages: UnifiedMessage[];
}

export interface UnifiedOutput {
  platform: Platform;
  timestamp: string;
  conversations: UnifiedConversation[];
}

/**
 * Convert platform-specific session to unified format
 */
function convertSession(
  session: { 
    id: string; 
    title: string; 
    createTime?: number; 
    updateTime?: number;
    messages: Array<{ 
      id: string; 
      role: 'user' | 'assistant' | 'system'; 
      content: string; 
      timestamp: number; 
    }>;
  }
): UnifiedConversation {
  return {
    id: session.id,
    title: session.title || 'Untitled',
    messages: session.messages
      .filter(msg => msg.role === 'user' || msg.role === 'assistant')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        time: msg.timestamp || 0,
      })),
  };
}

/**
 * Format platform-specific data to unified output
 */
export function formatToUnified(
  platform: Platform,
  sessions: Array<{
    id: string;
    title: string;
    createTime?: number;
    updateTime?: number;
    messages: Array<{
      id: string;
      role: 'user' | 'assistant' | 'system';
      content: string;
      timestamp: number;
    }>;
  }>
): UnifiedOutput {
  return {
    platform,
    timestamp: new Date().toISOString(),
    conversations: sessions.map(convertSession),
  };
}

/**
 * Convert unified output to JSON string
 */
export function toJSON(output: UnifiedOutput): string {
  return JSON.stringify(output, null, 2);
}

/**
 * Create downloadable JSON blob
 */
export function createDownloadBlob(output: UnifiedOutput): Blob {
  const json = toJSON(output);
  return new Blob([json], { type: 'application/json' });
}

/**
 * Generate filename for export
 */
export function generateFilename(platform: Platform): string {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  return `ai-history-${platform}-${timestamp}.json`;
}

/**
 * Validate unified output structure
 */
export function validateOutput(output: UnifiedOutput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!output.platform) {
    errors.push('Missing platform');
  }
  
  if (!output.timestamp) {
    errors.push('Missing timestamp');
  }
  
  if (!Array.isArray(output.conversations)) {
    errors.push('Missing conversations array');
  } else {
    for (let i = 0; i < output.conversations.length; i++) {
      const conv = output.conversations[i];
      if (!conv.id) errors.push(`Conversation ${i}: missing id`);
      if (!conv.title) errors.push(`Conversation ${i}: missing title`);
      if (!Array.isArray(conv.messages)) {
        errors.push(`Conversation ${i}: missing messages array`);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get statistics from output
 */
export function getStatistics(output: UnifiedOutput): {
  conversationCount: number;
  messageCount: number;
  userMessageCount: number;
  assistantMessageCount: number;
} {
  let userCount = 0;
  let assistantCount = 0;
  
  for (const conv of output.conversations) {
    for (const msg of conv.messages) {
      if (msg.role === 'user') userCount++;
      else if (msg.role === 'assistant') assistantCount++;
    }
  }
  
  return {
    conversationCount: output.conversations.length,
    messageCount: userCount + assistantCount,
    userMessageCount: userCount,
    assistantMessageCount: assistantCount,
  };
}
