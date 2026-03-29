/**
 * i18n Configuration
 * User Story 1.1: i18n 配置文件
 */

export type Language = 'en' | 'zh';

export interface Translations {
  nav: {
    home: string;
    guide: string;
    pricing: string;
    upload: string;
  };
  guide: {
    title: string;
    quickStart: string;
    description: string;
    chatgpt: string;
    claude: string;
    chinese: string;
    faq: string;
  };
  common: {
    back: string;
    next: string;
    done: string;
    learnMore: string;
    tryNow: string;
  };
  home: {
    title: string;
    subtitle: string;
    cta: string;
    features: string[];
  };
  pricing: {
    title: string;
    price: string;
    perExport: string;
    features: string[];
  };
  upload: {
    title: string;
    dragDrop: string;
    orClick: string;
    supportedFormats: string;
  };
  faq: {
    title: string;
    questions: Array<{ q: string; a: string }>;
  };
}

export const en: Translations = {
  nav: {
    home: 'Home',
    guide: 'Guide',
    pricing: 'Pricing',
    upload: 'Upload',
  },
  guide: {
    title: 'Tutorial Center',
    quickStart: 'Quick Start',
    description: 'Step-by-step guide to export your AI conversations',
    chatgpt: 'ChatGPT Tutorial',
    claude: 'Claude Tutorial',
    chinese: 'Chinese AI Tutorial',
    faq: 'FAQ',
  },
  common: {
    back: 'Back',
    next: 'Next',
    done: 'Done',
    learnMore: 'Learn More',
    tryNow: 'Try Now',
  },
  home: {
    title: 'MemoryMigrator',
    subtitle: 'Transfer your AI chat history to OpenClaw as long-term memory',
    cta: 'Start Migration',
    features: [
      'Export ChatGPT conversations',
      'Export Claude conversations',
      'AI-powered summarization',
      'OpenClaw prompt generation',
      'Skill file generation',
    ],
  },
  pricing: {
    title: 'Pricing',
    price: '$5',
    perExport: 'per export',
    features: [
      'Export ChatGPT conversations',
      'Export Claude conversations',
      'AI-powered summarization',
      'OpenClaw prompt generation',
      'Skill file generation',
    ],
  },
  upload: {
    title: 'Upload Export File',
    dragDrop: 'Drag & drop or click to upload',
    orClick: 'Supported formats: .json, .txt',
    supportedFormats: 'Max size: 10MB',
  },
  faq: {
    title: 'FAQ',
    questions: [
      { q: 'What if export fails?', a: 'Check: 1) Logged in to AI platform? 2) Has conversation history? 3) Try refreshing the page.' },
      { q: 'Why is the file empty?', a: 'Possible: 1) No history on platform 2) Export format mismatch 3) Browser cache issue. Try logging in again or using a different browser.' },
      { q: 'Payment failed?', a: 'Check: 1) Card supports international payments? 2) Sufficient balance? 3) Stable network? You can retry or contact support.' },
      { q: 'Which AI platforms are supported?', a: 'Currently: ChatGPT, Claude, Gemini, Kimi, DeepSeek, Tongyi. More coming soon.' },
    ],
  },
};

export const zh: Translations = {
  nav: {
    home: '首页',
    guide: '教程',
    pricing: '定价',
    upload: '上传',
  },
  guide: {
    title: '教程中心',
    quickStart: '快速开始',
    description: '一步一步教你完成 AI 对话导出',
    chatgpt: 'ChatGPT 教程',
    claude: 'Claude 教程',
    chinese: '国产AI教程',
    faq: '常见问题',
  },
  common: {
    back: '返回',
    next: '下一步',
    done: '完成',
    learnMore: '了解更多',
    tryNow: '立即尝试',
  },
  home: {
    title: 'MemoryMigrator',
    subtitle: '将你的 AI 对话历史迁移到 OpenClaw 作为长期记忆',
    cta: '开始迁移',
    features: [
      '导出 ChatGPT 对话',
      '导出 Claude 对话',
      'AI 智能摘要',
      '生成 OpenClaw 提示词',
      '生成 Skill 文件',
    ],
  },
  pricing: {
    title: '定价',
    price: '$5',
    perExport: '每次导出',
    features: [
      '导出 ChatGPT 对话',
      '导出 Claude 对话',
      'AI 智能摘要',
      '生成 OpenClaw 提示词',
      '生成 Skill 文件',
    ],
  },
  upload: {
    title: '上传导出文件',
    dragDrop: '拖拽或点击上传文件',
    orClick: '支持格式: .json, .txt',
    supportedFormats: '最大大小: 10MB',
  },
  faq: {
    title: '常见问题',
    questions: [
      { q: '导不出对话怎么办？', a: '请检查：1) 是否已登录AI平台；2) 是否有对话历史；3) 尝试刷新页面后再次操作。' },
      { q: '导出的文件是空的？', a: '可能原因：1) 该平台没有历史记录；2) 导出格式不匹配；3) 浏览器缓存问题。尝试重新登录或换浏览器。' },
      { q: '支付失败了怎么办？', a: '请检查：1) 银行卡是否支持国际支付；2) 是否有足够余额；3) 网络是否稳定。可以重试或联系客服。' },
      { q: '支持哪些AI平台？', a: '目前支持：ChatGPT、Claude、Gemini、Kimi、DeepSeek、通义千问。更多平台陆续添加中。' },
    ],
  },
};

/**
 * Get translations for a language
 */
export function getTranslations(lang: Language): Translations {
  return lang === 'zh' ? zh : en;
}

/**
 * Get default language
 */
export function getDefaultLanguage(): Language {
  return 'en';
}
