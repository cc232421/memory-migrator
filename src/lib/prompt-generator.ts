/**
 * OpenClaw Prompt Generator
 * User Story 3.1: 生成 OpenClaw 提示词
 */

import { ConversationSummary } from './ai-summary';
import { ChatGPTConversation } from './chatgpt-parser';

export interface PromptConfig {
  title: string;
  includeUserNeeds: boolean;
  includeAiSolutions: boolean;
  includeUserPreferences: boolean;
  includeKeyKnowledge: boolean;
  includeActionItems: boolean;
  customInstructions?: string;
}

/**
 * Default prompt configuration
 */
export const DEFAULT_PROMPT_CONFIG: PromptConfig = {
  title: '对话摘要',
  includeUserNeeds: true,
  includeAiSolutions: true,
  includeUserPreferences: true,
  includeKeyKnowledge: true,
  includeActionItems: true,
};

/**
 * Generate OpenClaw prompt from summary
 */
export function generatePrompt(
  summary: ConversationSummary,
  conversation: ChatGPTConversation,
  config: Partial<PromptConfig> = {}
): string {
  const cfg = { ...DEFAULT_PROMPT_CONFIG, ...config };
  
  const sections: string[] = [];

  // Header
  sections.push(`# ${cfg.title || 'MemoryMigrator 导出的对话记忆'}`);
  sections.push('');
  sections.push(`> 原始对话: ${conversation.title}`);
  sections.push(`> 导出时间: ${new Date().toISOString()}`);
  sections.push('');

  // User needs
  if (cfg.includeUserNeeds && summary.userNeeds) {
    sections.push('## 🎯 用户核心需求');
    sections.push(summary.userNeeds);
    sections.push('');
  }

  // AI solutions
  if (cfg.includeAiSolutions && summary.aiSolutions) {
    sections.push('## 💡 AI 的解决方案');
    sections.push(summary.aiSolutions);
    sections.push('');
  }

  // User preferences
  if (cfg.includeUserPreferences && summary.userPreferences) {
    sections.push('## 👤 用户偏好设置');
    sections.push(summary.userPreferences);
    sections.push('');
  }

  // Key knowledge
  if (cfg.includeKeyKnowledge && summary.keyKnowledge) {
    sections.push('## 📚 关键知识点');
    sections.push(summary.keyKnowledge);
    sections.push('');
  }

  // Action items
  if (cfg.includeActionItems && summary.actionItems) {
    sections.push('## 🚀 后续行动计划');
    sections.push(summary.actionItems);
    sections.push('');
  }

  // Custom instructions
  if (cfg.customInstructions) {
    sections.push('## 📝 自定义指令');
    sections.push(cfg.customInstructions);
    sections.push('');
  }

  // Footer
  sections.push('---');
  sections.push('*以上内容已通过 MemoryMigrator 导入 OpenClaw*');

  return sections.join('\n');
}

/**
 * Generate compact prompt (shorter version)
 */
export function generateCompactPrompt(
  summary: ConversationSummary
): string {
  return `# Memory Export

## 需求
${summary.userNeeds}

## 方案
${summary.aiSolutions}

## 偏好
${summary.userPreferences}

## 知识
${summary.keyKnowledge}
`;
}

/**
 * Generate prompt for specific use case
 */
export function generatePromptForUseCase(
  summary: ConversationSummary,
  conversation: ChatGPTConversation,
  useCase: 'continuation' | 'knowledge' | 'preference'
): string {
  switch (useCase) {
    case 'continuation':
      return generateContinuationPrompt(summary, conversation);
    case 'knowledge':
      return generateKnowledgePrompt(summary);
    case 'preference':
      return generatePreferencePrompt(summary);
    default:
      return generatePrompt(summary, conversation);
  }
}

/**
 * Generate prompt for continuing conversation
 */
function generateContinuationPrompt(
  summary: ConversationSummary,
  conversation: ChatGPTConversation
): string {
  return `# 继续对话上下文

## 历史对话
${conversation.title}

## 用户需求背景
${summary.userNeeds}

## 已讨论内容
${summary.aiSolutions}

请基于以上上下文，继续为用户提供帮助。
`;
}

/**
 * Generate prompt for knowledge retrieval
 */
function generateKnowledgePrompt(summary: ConversationSummary): string {
  return `# 知识库

## 核心概念
${summary.keyKnowledge}

## 详细说明
${summary.aiSolutions}
`;
}

/**
 * Generate prompt for user preference
 */
function generatePreferencePrompt(summary: ConversationSummary): string {
  return `# 用户画像

## 偏好设置
${summary.userPreferences}

## 需求特点
${summary.userNeeds}
`;
}

/**
 * Convert prompt to file content
 */
export function promptToFile(
  summary: ConversationSummary,
  conversation: ChatGPTConversation,
  format: 'markdown' | 'txt' = 'markdown'
): string {
  const content = generatePrompt(summary, conversation);
  
  if (format === 'txt') {
    // Strip markdown for plain text
    return content
      .replace(/#{1,6}\s/g, '')
      .replace(/>\s/g, '')
      .replace(/\*\*/g, '');
  }
  
  return content;
}
