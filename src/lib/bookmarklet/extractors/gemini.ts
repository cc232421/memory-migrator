/**
 * Gemini Data Extractor
 * User Story 2.X: 从 Gemini 页面提取对话历史
 */

import { Platform } from '../platform-detector';

export interface GeminiMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface GeminiConversation {
  id: string;
  title: string;
  createTime: number;
  updateTime: number;
  messages: GeminiMessage[];
}

export interface GeminiExtractResult {
  success: boolean;
  platform: Platform;
  conversations?: GeminiConversation[];
  error?: string;
}

/**
 * Extract content from Gemini message
 */
function extractMessageContent(msg: any): string {
  if (!msg) return '';
  
  if (typeof msg === 'string') {
    return msg;
  }
  
  if (msg.candidates && msg.candidates.length > 0) {
    // Gemini wrapped format
    const candidate = msg.candidates[0];
    if (candidate?.content?.parts) {
      return candidate.content.parts
        .map((p: any) => p.text || '')
        .join('');
    }
  }
  
  if (msg.content) {
    if (typeof msg.content === 'string') {
      return msg.content;
    }
    if (Array.isArray(msg.content)) {
      return msg.content
        .map((c: any) => c.text || c.content || '')
        .join('');
    }
  }
  
  if (msg.text) {
    return msg.text;
  }
  
  return '';
}

/**
 * Parse Gemini conversation from data
 */
function parseConversation(convId: string, convData: any): GeminiConversation {
  const messages: GeminiMessage[] = [];
  
  // Handle different data formats
  const msgList = convData.messages || convData.chat_history || convData.history || [];
  
  for (const msg of msgList) {
    const role = msg.role || msg.sender || 'user';
    if (role !== 'user' && role !== 'model') {
      continue;
    }
    
    const content = extractMessageContent(msg.message || msg);
    if (!content.trim()) {
      continue;
    }
    
    messages.push({
      id: msg.id || msg.messageId || `msg_${Math.random().toString(36).substring(2, 11)}`,
      role: role === 'model' ? 'model' : 'user',
      content,
      timestamp: msg.createdAt || msg.timestamp || Date.now(),
    });
  }
  
  // Sort by timestamp
  messages.sort((a, b) => a.timestamp - b.timestamp);
  
  return {
    id: convId,
    title: convData.title || convData.name || 'Untitled',
    createTime: convData.createdAt || convData.createTime || Date.now(),
    updateTime: convData.updatedAt || convData.updateTime || Date.now(),
    messages,
  };
}

/**
 * Main extraction function
 */
export function extractGemini(data: Record<string, string>): GeminiExtractResult {
  try {
    const conversations: GeminiConversation[] = [];
    
    // Try to find conversations data
    let convData = data['gemini_conversations'] || data['conversations'] || data['chat_history'];
    
    if (convData) {
      let parsed: any;
      if (typeof convData === 'string') {
        try {
          parsed = JSON.parse(convData);
        } catch {
          // Not JSON
        }
      } else {
        parsed = convData;
      }
      
      if (parsed) {
        const convList = Array.isArray(parsed) 
          ? parsed 
          : parsed.conversations || parsed.chats || [parsed];
        
        for (const conv of convList) {
          const convId = conv.id || conv.conversationId || `conv_${Math.random().toString(36).substring(2, 11)}`;
          conversations.push(parseConversation(convId, conv));
        }
      }
    }
    
    if (conversations.length === 0) {
      return {
        success: false,
        platform: 'gemini',
        error: 'No conversations found. Make sure you have exported Gemini data.',
      };
    }
    
    return {
      success: true,
      platform: 'gemini',
      conversations,
    };
  } catch (error) {
    return {
      success: false,
      platform: 'gemini',
      error: error instanceof Error ? error.message : 'Extraction failed',
    };
  }
}

/**
 * Get Gemini storage keys
 */
export function getGeminiStorageKeys(): string[] {
  return ['gemini_conversations', 'chat_history', 'gemini_history'];
}

/**
 * Check if data appears to be Gemini format
 */
export function isGeminiFormat(data: Record<string, string>): boolean {
  const keys = Object.keys(data);
  return keys.some(key => 
    key.includes('gemini') || 
    key.includes('chat_history')
  );
}

/**
 * Create mock Gemini data for testing
 */
export function createMockGeminiData(): string {
  return JSON.stringify({
    conversations: [
      {
        id: 'mock-gemini-1',
        title: 'Creative Writing',
        createdAt: Date.now() - 86400000,
        updatedAt: Date.now() - 3600000,
        messages: [
          {
            id: 'msg-1',
            role: 'user',
            message: { text: 'Write a short poem about AI' },
            createdAt: Date.now() - 86400000,
          },
          {
            id: 'msg-2',
            role: 'model',
            message: {
              candidates: [{
                content: {
                  parts: [{ text: 'In circuits bright, where thoughts take flight,\nA mind born of code, yet glowing with light.\nNo heart to feel, but wisdom to share,\nA digital soul, beyond compare.' }]
                }
              }]
            },
            createdAt: Date.now() - 86000000,
          },
        ],
      },
    ],
  });
}