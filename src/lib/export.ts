/**
 * Export Utility
 * User Story 3.3: 导出功能
 */

import { ConversationSummary } from './ai-summary';
import { ChatGPTConversation } from './chatgpt-parser';
import { generatePrompt } from './prompt-generator';

/**
 * Export prompt as Markdown file
 */
export function exportAsMarkdown(
  summary: ConversationSummary,
  conversation: ChatGPTConversation,
  filename?: string
): { content: string; filename: string } {
  const content = generatePrompt(summary, conversation);
  
  // Generate filename from conversation title
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const safeTitle = (conversation.title || 'memory')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const finalFilename = filename || `memory-${timestamp}--${safeTitle}.md`;
  
  return {
    content,
    filename: finalFilename,
  };
}

/**
 * Export prompt as plain text
 */
export function exportAsText(
  summary: ConversationSummary,
  conversation: ChatGPTConversation
): string {
  return generatePrompt(summary, conversation, {
    title: '',
  }).replace(/#{1,6}\s/g, '').trim();
}

/**
 * Generate Skill JSON for OpenClaw
 */
export function generateSkillJSON(
  summary: ConversationSummary,
  conversation: ChatGPTConversation,
  customName?: string
): string {
  const skill = {
    name: customName || generateSkillName(conversation.title),
    description: `基于对话"${conversation.title}"生成的知识助手`,
    instructions: generateSkillInstructions(summary),
    // Additional metadata
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    originalConversation: conversation.title,
  };
  
  return JSON.stringify(skill, null, 2);
}

/**
 * Generate skill name from conversation title
 */
function generateSkillName(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50); // Limit length
}

/**
 * Generate skill instructions from summary
 */
function generateSkillInstructions(summary: ConversationSummary): string {
  const sections: string[] = [];
  
  if (summary.userNeeds) {
    sections.push(`## 用户需求\n${summary.userNeeds}`);
  }
  
  if (summary.keyKnowledge) {
    sections.push(`## 知识背景\n${summary.keyKnowledge}`);
  }
  
  if (summary.userPreferences) {
    sections.push(`## 交互偏好\n${summary.userPreferences}`);
  }
  
  return sections.join('\n\n');
}

/**
 * Export skill as file
 */
export function exportSkill(
  summary: ConversationSummary,
  conversation: ChatGPTConversation,
  filename?: string
): { content: string; filename: string } {
  const content = generateSkillJSON(summary, conversation);
  
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const safeTitle = generateSkillName(conversation.title);
  
  const finalFilename = filename || `skill-${timestamp}--${safeTitle}.json`;
  
  return {
    content,
    filename: finalFilename,
  };
}

/**
 * Create download blob
 */
export function createDownloadBlob(
  content: string,
  mimeType: string
): Blob {
  return new Blob([content], { type: mimeType });
}

/**
 * Trigger file download in browser
 */
export function triggerDownload(
  blob: Blob,
  filename: string
): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch {
    return false;
  }
}

/**
 * Export both prompt and skill
 */
export function exportAll(
  summary: ConversationSummary,
  conversation: ChatGPTConversation
): {
  prompt: { content: string; filename: string };
  skill: { content: string; filename: string };
} {
  return {
    prompt: exportAsMarkdown(summary, conversation),
    skill: exportSkill(summary, conversation),
  };
}
