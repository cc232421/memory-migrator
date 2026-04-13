/**
 * Claude Data Extractor
 * User Story 2.X: 从 Claude 页面提取对话历史
 */

import { Platform } from '../platform-detector';

export interface ClaudeMessage {
  id: string;
  role: 'human' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ClaudeConversation {
  id: string;
  title: string;
  createTime: number;
  updateTime: number;
  messages: ClaudeMessage[];
}

export interface ClaudeExtractResult {
  success: boolean;
  platform: Platform;
  conversations?: ClaudeConversation[];
  error?: string;
}

/**
 * Extract content from Claude message
 */
function extractMessageContent(msg: any): string {
  if (!msg) return '';
  
  // Handle different Claude message formats
  if (typeof msg === 'string') {
    return msg;
  }
  
  if (msg.text) {
    return msg.text;
  }
  
  if (msg.content) {
    if (typeof msg.content === 'string') {
      return msg.content;
    }
    // Array content
    if (Array.isArray(msg.content)) {
      return msg.content
        .filter((c: any) => c.type === 'text' || c.type === 'output_text')
        .map((c: any) => c.text || c.content || '')
        .join('');
    }
  }
  
  return '';
}

/**
 * Parse Claude conversation from data
 */
function parseConversation(convId: string, convData: any): ClaudeConversation {
  const messages: ClaudeMessage[] = [];
  
  // Handle different data structures
  const msgList = convData.chat_messages || convData.messages || convData.history || [];
  
  for (const msg of msgList) {
    const role = msg.role || msg.sender || 'human';
    if (role !== 'human' && role !== 'assistant') {
      continue;
    }
    
    const content = extractMessageContent(msg.message || msg);
    if (!content.trim()) {
      continue;
    }
    
    messages.push({
      id: msg.id || msg.uuid || `msg_${Math.random().toString(36).substring(2, 11)}`,
      role,
      content,
      timestamp: msg.created_at || msg.timestamp || Date.now(),
    });
  }
  
  // Sort by timestamp
  messages.sort((a, b) => a.timestamp - b.timestamp);
  
  return {
    id: convId,
    title: convData.title || convData.name || 'Untitled',
    createTime: convData.created_at || convData.createdTime || Date.now(),
    updateTime: convData.updated_at || convData.updateTime || Date.now(),
    messages,
  };
}

/**
 * Main extraction function
 */
export function extractClaude(data: Record<string, string>): ClaudeExtractResult {
  try {
    const conversations: ClaudeConversation[] = [];
    
    // Try to find conversations data
    let convData = data['claude_chat_history'] || data['conversations'] || data['conversationHistory'];
    
    if (convData) {
      // Try to parse as JSON
      let parsed: any;
      if (typeof convData === 'string') {
        try {
          parsed = JSON.parse(convData);
        } catch {
          // Not JSON, continue
        }
      } else {
        parsed = convData;
      }
      
      if (parsed) {
        // Handle different data formats
        const convList = Array.isArray(parsed) 
          ? parsed 
          : parsed.conversations || parsed.chats || [parsed];
        
        for (const conv of convList) {
          const convId = conv.id || conv.uuid || `conv_${Math.random().toString(36).substring(2, 11)}`;
          conversations.push(parseConversation(convId, conv));
        }
      }
    }
    
    if (conversations.length === 0) {
      return {
        success: false,
        platform: 'claude',
        error: 'No conversations found. Make sure you have exported Claude data.',
      };
    }
    
    return {
      success: true,
      platform: 'claude',
      conversations,
    };
  } catch (error) {
    return {
      success: false,
      platform: 'claude',
      error: error instanceof Error ? error.message : 'Extraction failed',
    };
  }
}

/**
 * Get Claude storage keys
 */
export function getClaudeStorageKeys(): string[] {
  return ['claude_chat_history', 'conversationHistory', 'claude_conversations'];
}

/**
 * Check if data appears to be Claude format
 */
export function isClaudeFormat(data: Record<string, string>): boolean {
  const keys = Object.keys(data);
  return keys.some(key => 
    key.includes('claude') || 
    key.includes('conversationHistory')
  );
}

/**
 * Create mock Claude data for testing
 */
export function createMockClaudeData(): string {
  return JSON.stringify({
    conversations: [
      {
        id: 'mock-claude-1',
        title: 'JavaScript Helper',
        created_at: Date.now() - 86400000,
        updated_at: Date.now() - 3600000,
        chat_messages: [
          {
            id: 'msg-1',
            role: 'human',
            message: { text: 'How do I filter an array in JavaScript?' },
            created_at: Date.now() - 86400000,
          },
          {
            id: 'msg-2',
            role: 'assistant',
            message: { text: 'You can use the filter() method. Here is an example: const numbers = [1,2,3,4,5]; const evens = numbers.filter(n => n % 2 === 0);' },
            created_at: Date.now() - 86000000,
          },
        ],
      },
    ],
  });
}