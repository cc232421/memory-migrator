/**
 * Unified Extractor
 * User Story 2.X: 统一提取接口，集成所有平台
 */

import { extractChatGPT, ChatGPTExtractResult, isChatGPTFormat } from './extractors/chatgpt';
import { extractClaude, ClaudeExtractResult, isClaudeFormat } from './extractors/claude';
import { extractGemini, GeminiExtractResult, isGeminiFormat } from './extractors/gemini';
import { Platform, detectPlatform, getSupportedPlatforms } from '../platform-detector';

export type UnifiedExtractResult = ChatGPTExtractResult | ClaudeExtractResult | GeminiExtractResult;

/**
 * Platform extractor interfaces
 */
export interface PlatformExtractor {
  name: string;
  platform: Platform;
  extract: (data: Record<string, string>) => UnifiedExtractResult;
  detectFormat: (data: Record<string, string>) => boolean;
  getStorageKeys: () => string[];
}

/**
 * Get all platform extractors
 */
export function getExtractors(): PlatformExtractor[] {
  return [
    {
      name: 'ChatGPT',
      platform: 'chatgpt',
      extract: (data) => extractChatGPT(data),
      detectFormat: (data) => isChatGPTFormat(data),
      getStorageKeys: () => ['conversation', 'chatHistory', 'SessionsV2'],
    },
    {
      name: 'Claude',
      platform: 'claude',
      extract: (data) => extractClaude(data),
      detectFormat: (data) => isClaudeFormat(data),
      getStorageKeys: () => ['claude_chat_history', 'conversationHistory'],
    },
    {
      name: 'Gemini',
      platform: 'gemini',
      extract: (data) => extractGemini(data),
      detectFormat: (data) => isGeminiFormat(data),
      getStorageKeys: () => ['gemini_conversations', 'chat_history'],
    },
  ];
}

/**
 * Auto-detect platform and extract
 */
export function autoExtract(data: Record<string, string>): UnifiedExtractResult | null {
  const extractors = getExtractors();
  
  for (const extractor of extractors) {
    if (extractor.detectFormat(data)) {
      return extractor.extract(data);
    }
  }
  
  // Try each extractor in order
  for (const extractor of extractors) {
    try {
      const result = extractor.extract(data);
      if (result.success) {
        return result;
      }
    } catch {
      continue;
    }
  }
  
  return null;
}

/**
 * Extract from specific platform
 */
export function extractFromPlatform(data: Record<string, string>, platform: Platform): UnifiedExtractResult | null {
  const extractors = getExtractors();
  const extractor = extractors.find(e => e.platform === platform);
  
  if (!extractor) {
    return null;
  }
  
  return extractor.extract(data);
}

/**
 * Get supported platforms for UI
 */
export function getPlatformOptions(): Array<{ value: Platform; label: string }> {
  return [
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'claude', label: 'Claude' },
    { value: 'gemini', label: 'Gemini' },
    { value: 'kimi', label: 'Kimi' },
    { value: 'deepseek', label: 'DeepSeek' },
    { value: 'tongyi', label: '通义千问' },
  ];
}

/**
 * Detect platform from file content
 */
export function detectPlatformFromData(data: Record<string, string>): Platform {
  const extractors = getExtractors();
  
  for (const extractor of extractors) {
    if (extractor.detectFormat(data)) {
      return extractor.platform;
    }
  }
  
  return 'unknown';
}

/**
 * Create unified export format
 */
export interface UnifiedConversation {
  platform: Platform;
  id: string;
  title: string;
  messages: Array<{
    role: string;
    content: string;
    timestamp: number;
  }>;
}

export function normalizeToUnified(result: UnifiedExtractResult): UnifiedConversation[] {
  if (!result.success || !result.sessions && !result.conversations) {
    return [];
  }
  
  // Handle ChatGPT format
  if ('sessions' in result && result.sessions) {
    return result.sessions.map(session => ({
      platform: result.platform,
      id: session.id,
      title: session.title,
      messages: session.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      })),
    }));
  }
  
  // Handle Claude/Gemini format
  if ('conversations' in result && result.conversations) {
    return result.conversations.map(conv => ({
      platform: result.platform,
      id: conv.id,
      title: conv.title,
      messages: conv.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
      })),
    }));
  }
  
  return [];
}