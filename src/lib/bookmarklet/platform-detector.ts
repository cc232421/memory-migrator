/**
 * Platform Detector
 * User Story 1.1: 检测当前页面平台
 */

export type Platform = 'chatgpt' | 'claude' | 'gemini' | 'kimi' | 'deepseek' | 'tongyi' | 'unknown';

export interface PlatformInfo {
  id: Platform;
  name: string;
  hostname: string;
  storageKeys: string[];
}

/**
 * Platform configurations
 */
export const PLATFORMS: Record<Platform, PlatformInfo> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    hostname: 'chat.openai.com',
    storageKeys: ['conversation', 'chatHistory', 'SessionsV2'],
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    hostname: 'claude.ai',
    storageKeys: ['claude_chat_history', 'conversationHistory'],
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    hostname: 'gemini.google.com',
    storageKeys: ['gemini_conversations', 'chat_history'],
  },
  kimi: {
    id: 'kimi',
    name: 'Kimi',
    hostname: 'kimi.moonshot.cn',
    storageKeys: ['kimi_history', 'chat_sessions'],
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    hostname: 'chat.deepseek.com',
    storageKeys: ['deepseek_history', 'conversation_data'],
  },
  tongyi: {
    id: 'tongyi',
    name: '通义',
    hostname: 'tongyi.aliyun.com',
    storageKeys: ['tongyi_history', 'qwen_sessions'],
  },
  unknown: {
    id: 'unknown',
    name: 'Unknown',
    hostname: '',
    storageKeys: [],
  },
};

/**
 * Platform detection patterns
 */
const PLATFORM_PATTERNS: Array<{ pattern: RegExp; platform: Platform }> = [
  { pattern: /chat\.openai\.com/i, platform: 'chatgpt' },
  { pattern: /claude\.ai/i, platform: 'claude' },
  { pattern: /gemini\.google\.com/i, platform: 'gemini' },
  { pattern: /kimi\.moonshot\.cn/i, platform: 'kimi' },
  { pattern: /chat\.deepseek\.com/i, platform: 'deepseek' },
  { pattern: /tongyi\.aliyun\.com/i, platform: 'tongyi' },
  { pattern: /yi\.taobao\.com/i, platform: 'tongyi' },
];

/**
 * Detect platform from hostname
 */
export function detectPlatform(hostname: string): Platform {
  if (!hostname) {
    return 'unknown';
  }

  for (const { pattern, platform } of PLATFORM_PATTERNS) {
    if (pattern.test(hostname)) {
      return platform;
    }
  }

  return 'unknown';
}

/**
 * Detect platform from URL
 */
export function detectPlatformFromURL(url: string): Platform {
  try {
    const urlObj = new URL(url);
    return detectPlatform(urlObj.hostname);
  } catch {
    return 'unknown';
  }
}

/**
 * Get platform info
 */
export function getPlatformInfo(platform: Platform): PlatformInfo {
  return PLATFORMS[platform] || PLATFORMS.unknown;
}

/**
 * Get storage keys for platform
 */
export function getStorageKeys(platform: Platform): string[] {
  return getPlatformInfo(platform).storageKeys;
}

/**
 * Check if platform is supported
 */
export function isSupportedPlatform(platform: Platform): boolean {
  return platform !== 'unknown';
}

/**
 * Get all supported platforms
 */
export function getSupportedPlatforms(): Platform[] {
  return ['chatgpt', 'claude', 'gemini', 'kimi', 'deepseek', 'tongyi'];
}

/**
 * Get platform display name
 */
export function getPlatformName(platform: Platform): string {
  return getPlatformInfo(platform).name;
}
