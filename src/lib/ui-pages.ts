/**
 * UI Components and Pages - Integrated with i18n
 * User Story 5.1, 5.2: 用户交互界面 + i18n 集成
 */

import { Language } from '../i18n/config';

export interface PageConfig {
  title: string;
  titleZh?: string;
  description?: string;
  descriptionZh?: string;
  routes: RouteConfig[];
}

export interface RouteConfig {
  path: string;
  name: string;
  nameZh?: string;
  component?: string;
}

export interface PricingInfo {
  price: number; // in cents
  priceId: string;
  features: string[];
  featuresZh: string[];
}

// Page configurations with i18n
export const PAGES: Record<string, PageConfig> = {
  home: {
    title: 'MemoryMigrator - Transfer Your AI History',
    titleZh: 'MemoryMigrator - 转移你的 AI 对话历史',
    description: 'Transfer ChatGPT/Claude history to OpenClaw as long-term memory',
    descriptionZh: '将 ChatGPT/Claude 对话历史迁移到 OpenClaw 作为长期记忆',
    routes: [
      { path: '/', name: 'Home', nameZh: '首页' },
      { path: '/how-it-works', name: 'How It Works', nameZh: '使用教程' },
      { path: '/pricing', name: 'Pricing', nameZh: '定价' },
      { path: '/upload', name: 'Upload', nameZh: '上传' },
      { path: '/bookmarklet', name: 'Bookmarklet', nameZh: '书签工具' },
    ],
  },
};

// Pricing configuration with i18n
export const PRICING: PricingInfo = {
  price: 500, // $5.00
  priceId: 'price_default',
  features: [
    'Export ChatGPT conversations',
    'Export Claude conversations',
    'AI-powered summarization',
    'OpenClaw prompt generation',
    'Skill file generation',
  ],
  featuresZh: [
    '导出 ChatGPT 对话',
    '导出 Claude 对话',
    'AI 智能摘要',
    '生成 OpenClaw 提示词',
    '生成 Skill 文件',
  ],
};

/**
 * Get pricing display text by language
 */
export function getPricingDisplay(lang: Language = 'en'): string {
  return `$${PRICING.price / 100}`;
}

/**
 * Get pricing features by language
 */
export function getPricingFeatures(lang: Language = 'en'): string[] {
  return lang === 'zh' ? PRICING.featuresZh : PRICING.features;
}

/**
 * Get CTA text for home page
 */
export function getHomepageCTA(lang: Language = 'en'): string {
  return lang === 'zh' ? '开始迁移' : 'Start Migration';
}

/**
 * Get value proposition
 */
export function getValueProposition(lang: Language = 'en'): string {
  if (lang === 'zh') {
    return '将你的 AI 对话历史迁移到 OpenClaw 作为长期记忆';
  }
  return 'Transfer your AI chat history to OpenClaw and keep your memory alive';
}

/**
 * Get page title by language
 */
export function getPageTitle(page: string, lang: Language = 'en'): string {
  const pageConfig = PAGES[page];
  if (!pageConfig) return 'MemoryMigrator';
  
  if (lang === 'zh' && pageConfig.titleZh) {
    return pageConfig.titleZh;
  }
  return pageConfig.title;
}

/**
 * Get navigation items by language
 */
export function getNavItems(lang: Language = 'en'): Array<{ path: string; label: string }> {
  const homeNav = PAGES.home.routes;
  return homeNav.map(route => ({
    path: route.path,
    label: lang === 'zh' && route.nameZh ? route.nameZh : route.name,
  }));
}

/**
 * Tutorial steps for ChatGPT export
 */
export function getChatGPTTutorial(lang: Language = 'en'): string[] {
  if (lang === 'zh') {
    return [
      '1. 登录 ChatGPT',
      '2. 进入设置（齿轮图标）',
      '3. 点击"数据控制"',
      '4. 点击"导出数据"',
      '5. 点击"请求导出"',
      '6. JSON 文件就绪后下载',
    ];
  }
  return [
    '1. Log in to ChatGPT',
    '2. Go to Settings (gear icon)',
    '3. Click "Data controls"',
    '4. Click "Export data"',
    '5. Click "Request export"',
    '6. Download the JSON file when ready',
  ];
}

/**
 * Tutorial steps for Claude export
 */
export function getClaudeTutorial(lang: Language = 'en'): string[] {
  if (lang === 'zh') {
    return [
      '1. 在浏览器中打开 Claude',
      '2. 选择要导出的对话',
      '3. 全选文字（Ctrl+A 或 Cmd+A）',
      '4. 复制（Ctrl+C 或 Cmd+C）',
      '5. 粘贴到文本文件并保存为 .txt',
    ];
  }
  return [
    '1. Open Claude in browser',
    '2. Select the conversation you want to export',
    '3. Select all text (Ctrl+A or Cmd+A)',
    '4. Copy (Ctrl+C or Cmd+C)',
    '5. Paste into a text file and save as .txt',
  ];
}

/**
 * Tutorial steps for Gemini export
 */
export function getGeminiTutorial(lang: Language = 'en'): string[] {
  if (lang === 'zh') {
    return [
      '1. 访问 Gemini (gemini.google.com)',
      '2. 使用 Google 账号登录',
      '3. 点击头像',
      '4. 选择"管理您的 Google 账号"',
      '5. 进入"数据与隐私"',
      '6. 滚动到"历史记录设置"',
      '7. 选择"网络与应用活动"',
      '8. 点击"管理活动" > "导出"',
    ];
  }
  return [
    '1. Go to Gemini (gemini.google.com)',
    '2. Sign in with your Google account',
    '3. Click on your profile picture',
    '4. Select "Manage your Google account"',
    '5. Go to "Data & Privacy"',
    '6. Scroll to "History settings"',
    '7. Select "Web & App Activity"',
    '8. Click "Manage activity" > "Export"',
  ];
}

/**
 * Get all tutorial steps
 */
export function getAllTutorials(lang: Language = 'en'): Record<string, string[]> {
  return {
    chatgpt: getChatGPTTutorial(lang),
    claude: getClaudeTutorial(lang),
    gemini: getGeminiTutorial(lang),
  };
}

/**
 * Get FAQ by language
 */
export function getFAQ(lang: Language = 'en'): Array<{ q: string; a: string }> {
  if (lang === 'zh') {
    return [
      { q: '导不出对话怎么办？', a: '请检查：1) 是否已登录AI平台；2) 是否有对话历史；3) 尝试刷新页面后再次操作。' },
      { q: '导出的文件是空的？', a: '可能原因：1) 该平台没有历史记录；2) 导出格式不匹配；3) 浏览器缓存问题。尝试重新登录或换浏览器。' },
      { q: '支付失败了怎么办？', a: '请检查：1) 银行卡是否支持国际支付；2) 是否有足够余额；3) 网络是否稳定。可以重试或联系客服。' },
      { q: '支持哪些AI平台？', a: '目前支持：ChatGPT、Claude、Gemini、Kimi、DeepSeek、通义千问。更多平台陆续添加中。' },
    ];
  }
  return [
    { q: 'What if export fails?', a: 'Check: 1) Logged in to AI platform? 2) Has conversation history? 3) Try refreshing the page.' },
    { q: 'Why is the file empty?', a: 'Possible: 1) No history on platform 2) Export format mismatch 3) Browser cache issue. Try logging in again or using a different browser.' },
    { q: 'Payment failed?', a: 'Check: 1) Card supports international payments? 2) Sufficient balance? 3) Stable network? You can retry or contact support.' },
    { q: 'Which AI platforms are supported?', a: 'Currently: ChatGPT, Claude, Gemini, Kimi, DeepSeek, Tongyi. More coming soon.' },
  ];
}

/**
 * Get home page features by language
 */
export function getHomeFeatures(lang: Language = 'en'): string[] {
  if (lang === 'zh') {
    return [
      '导出 ChatGPT 对话',
      '导出 Claude 对话',
      'AI 智能摘要',
      '生成 OpenClaw 提示词',
      '生成 Skill 文件',
    ];
  }
  return PRICING.features;
}

/**
 * Upload page text by language
 */
export function getUploadText(lang: Language = 'en'): { title: string; dragDrop: string; formats: string; maxSize: string } {
  if (lang === 'zh') {
    return {
      title: '上传导出文件',
      dragDrop: '拖拽或点击上传文件',
      formats: '支持格式：.json, .txt',
      maxSize: '最大大小：10MB',
    };
  }
  return {
    title: 'Upload Export File',
    dragDrop: 'Drag & drop or click to upload',
    formats: 'Supported formats: .json, .txt',
    maxSize: 'Max size: 10MB',
  };
}

/**
 * Validation for upload page
 */
export interface UploadValidation {
  valid: boolean;
  maxSize: number;
  allowedTypes: string[];
}

export const UPLOAD_CONFIG: Omit<UploadValidation, 'valid'> = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['.json', '.txt'],
};

/**
 * Progress states
 */
export type UploadProgressState = 
  | 'idle'
  | 'uploading'
  | 'processing'
  | 'ready'
  | 'error';

export const UPLOAD_STATES: Record<UploadProgressState, string> = {
  idle: 'Ready to upload',
  uploading: 'Uploading file...',
  processing: 'Processing with AI...',
  ready: 'Export ready!',
  error: 'Something went wrong',
};

export const UPLOAD_STATES_ZH: Record<UploadProgressState, string> = {
  idle: '准备上传',
  uploading: '上传文件中...',
  processing: 'AI 处理中...',
  ready: '导出就绪！',
  error: '出错了',
};

/**
 * Get upload state text
 */
export function getUploadStateText(state: UploadProgressState, lang: Language = 'en'): string {
  return lang === 'zh' ? UPLOAD_STATES_ZH[state] : UPLOAD_STATES[state];
}

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  fileTooLarge: `File is too large. Maximum size is ${UPLOAD_CONFIG.maxSize / 1024 / 1024}MB`,
  fileTooLargeZh: `文件太大。最大允许 ${UPLOAD_CONFIG.maxSize / 1024 / 1024}MB`,
  invalidFileType: `Invalid file type. Allowed: ${UPLOAD_CONFIG.allowedTypes.join(', ')}`,
  invalidFileTypeZh: `不支持的文件类型。仅支持：${UPLOAD_CONFIG.allowedTypes.join(', ')}`,
  uploadFailed: 'Upload failed. Please try again.',
  uploadFailedZh: '上传失败，请重试。',
  paymentFailed: 'Payment failed. Please try again.',
  paymentFailedZh: '支付失败，请重试。',
  processingFailed: 'Processing failed. Please try again.',
  processingFailedZh: '处理失败，请重试。',
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  uploadComplete: 'File uploaded successfully!',
  uploadCompleteZh: '文件上传成功！',
  paymentComplete: 'Payment successful!',
  paymentCompleteZh: '支付成功！',
  exportReady: 'Your export is ready!',
  exportReadyZh: '您的导出已就绪！',
  copiedToClipboard: 'Copied to clipboard!',
  copiedToClipboardZh: '已复制到剪贴板！',
};

/**
 * Get error message by language
 */
export function getErrorMessage(key: keyof typeof ERROR_MESSAGES, lang: Language = 'en'): string {
  if (lang === 'zh' && key + 'Zh' in ERROR_MESSAGES) {
    return (ERROR_MESSAGES as any)[key + 'Zh'];
  }
  return ERROR_MESSAGES[key];
}

/**
 * Get success message by language
 */
export function getSuccessMessage(key: keyof typeof SUCCESS_MESSAGES, lang: Language = 'en'): string {
  if (lang === 'zh' && key + 'Zh' in SUCCESS_MESSAGES) {
    return (SUCCESS_MESSAGES as any)[key + 'Zh'];
  }
  return SUCCESS_MESSAGES[key];
}