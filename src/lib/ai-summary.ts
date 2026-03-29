/**
 * AI Summary Generator
 * User Story 2.1: AI 生成对话摘要
 */

import { ChatGPTConversation } from './chatgpt-parser';

export interface ConversationSummary {
  userNeeds: string;
  aiSolutions: string;
  userPreferences: string;
  keyKnowledge: string;
  actionItems: string;
}

export interface SummaryResult {
  success: boolean;
  summary?: ConversationSummary;
  error?: string;
}

// OpenAI API configuration
const OPENAI_MODEL = 'gpt-4o';
const MAX_TOKENS = 2000;

/**
 * Generate AI summary prompt
 */
function buildSummaryPrompt(conversation: ChatGPTConversation): string {
  const conversationText = conversation.messages
    .map(msg => {
      const roleLabel = msg.role === 'user' ? '用户' : 'AI';
      return `[${roleLabel}]: ${msg.content}`;
    })
    .join('\n\n');

  return `
你是一个专业的对话分析师。请分析以下对话，提取结构化信息。

## 对话标题
${conversation.title}

## 对话内容
${conversationText}

## 请提取以下信息

### 1. 用户核心需求/问题 (userNeeds)
用户想要解决什么问题？希望实现什么功能？

### 2. AI的解决方案/回答 (aiSolutions)
AI提供了什么解决方案？代码？建议？

### 3. 用户偏好 (userPreferences)
用户偏好的语气、格式、角色是什么？

### 4. 关键知识点 (keyKnowledge)
对话中涉及的关键技术点、概念是什么？

### 5. 后续行动计划 (actionItems)
用户后续打算做什么？有什么待办？

请以JSON格式输出，字段名为英文：
{
  "userNeeds": "...",
  "aiSolutions": "...",
  "userPreferences": "...",
  "keyKnowledge": "...",
  "actionItems": "..."
}
`;
}

/**
 * Mock function for testing - simulates AI response without API call
 * In production, this would call OpenAI API
 */
export async function generateSummary(
  conversation: ChatGPTConversation
): Promise<SummaryResult> {
  try {
    // Validate input
    if (!conversation || !conversation.messages || conversation.messages.length === 0) {
      return { success: false, error: '对话内容为空' };
    }

    // Build prompt
    const prompt = buildSummaryPrompt(conversation);

    // In production, call OpenAI API here:
    // const response = await openai.chat.completions.create({
    //   model: OPENAI_MODEL,
    //   messages: [{ role: 'user', content: prompt }],
    //   max_tokens: MAX_TOKENS,
    // });

    // For MVP, we'll simulate with a basic extraction
    const summary = await simulateAISummary(conversation);

    return {
      success: true,
      summary,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '生成摘要失败',
    };
  }
}

/**
 * Simulated AI summary for testing
 * This extracts basic information without calling the API
 */
async function simulateAISummary(conversation: ChatGPTConversation): Promise<ConversationSummary> {
  // Extract user messages
  const userMessages = conversation.messages.filter(m => m.role === 'user');
  const assistantMessages = conversation.messages.filter(m => m.role === 'assistant');

  // Basic extraction (simulating AI analysis)
  const userNeeds = userMessages
    .map(m => m.content)
    .join('; ') || '未识别到用户需求';

  const aiSolutions = assistantMessages
    .map(m => m.content)
    .join('\n\n') || '未识别到AI解决方案';

  // Extract preferences (simple keyword matching)
  const allContent = conversation.messages.map(m => m.content).join(' ').toLowerCase();
  const preferences: string[] = [];
  
  if (allContent.includes('efficient') || allContent.includes('performance')) {
    preferences.push('关注代码效率');
  }
  if (allContent.includes('simple') || allContent.includes('basic')) {
    preferences.push('偏好简单实现');
  }
  if (allContent.includes('best') || allContent.includes('better')) {
    preferences.push('追求最佳实践');
  }
  
  const userPreferences = preferences.length > 0 
    ? preferences.join(', ') 
    : '未识别到明显偏好';

  // Extract key knowledge (look for code blocks and technical terms)
  const keyKnowledge = assistantMessages
    .filter(m => m.content.includes('```') || m.content.includes('function'))
    .map(m => m.content)
    .join('; ') || '未识别到关键知识点';

  // Check for action items
  const hasActionItems = userMessages.some(m => 
    m.content.toLowerCase().includes('next') || 
    m.content.toLowerCase().includes('also') ||
    m.content.toLowerCase().includes('can you')
  );
  
  const actionItems = hasActionItems 
    ? '用户可能有后续需求，请参考对话内容' 
    : '未识别到明确的行动计划';

  return {
    userNeeds,
    aiSolutions,
    userPreferences,
    keyKnowledge,
    actionItems,
  };
}

/**
 * Quick summary without full AI processing
 * Used for previews
 */
export function quickSummary(conversation: ChatGPTConversation): string {
  const userMsgCount = conversation.messages.filter(m => m.role === 'user').length;
  const assistantMsgCount = conversation.messages.filter(m => m.role === 'assistant').length;
  
  return `对话包含 ${userMsgCount} 条用户消息，${assistantMsgCount} 条AI回复`;
}

/**
 * Calculate token estimate for API usage
 */
export function estimateTokens(conversation: ChatGPTConversation): number {
  const totalChars = conversation.messages.reduce((sum, m) => sum + m.content.length, 0);
  // Rough estimate: 1 token ≈ 4 characters
  return Math.ceil(totalChars / 4);
}
