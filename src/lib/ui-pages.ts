/**
 * UI Components and Pages
 * User Story 5.1, 5.2: 用户交互界面
 */

export interface PageConfig {
  title: string;
  description?: string;
  routes: RouteConfig[];
}

export interface RouteConfig {
  path: string;
  name: string;
  component?: string;
}

export interface PricingInfo {
  price: number; // in cents
  priceId: string;
  features: string[];
}

// Page configurations
export const PAGES: Record<string, PageConfig> = {
  home: {
    title: 'MemoryMigrator - Transfer Your AI History',
    description: 'Transfer ChatGPT/Claude history to OpenClaw as long-term memory',
    routes: [
      { path: '/', name: 'Home' },
      { path: '/how-it-works', name: 'How It Works' },
      { path: '/pricing', name: 'Pricing' },
      { path: '/upload', name: 'Upload' },
      { path: '/result', name: 'Result' },
    ],
  },
};

// Pricing configuration
export const PRICING: PricingInfo = {
  price: 500, // $5.00
  priceId: process.env.STRIPE_PRICE_ID || 'price_default',
  features: [
    'Export ChatGPT conversations',
    'Export Claude conversations',
    'AI-powered summarization',
    'OpenClaw prompt generation',
    'Skill file generation',
  ],
};

/**
 * Get pricing display text
 */
export function getPricingDisplay(): string {
  return `$${PRICING.price / 100}`;
}

/**
 * Get CTA text for home page
 */
export function getHomepageCTA(): string {
  return 'Start Migration';
}

/**
 * Get value proposition
 */
export function getValueProposition(): string {
  return 'Transfer your AI chat history to OpenClaw and keep your memory alive';
}

/**
 * Tutorial steps for ChatGPT export
 */
export function getChatGPTTutorial(): string[] {
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
export function getClaudeTutorial(): string[] {
  return [
    '1. Open Claude in browser',
    '2. Select the conversation you want to export',
    '3. Select all text (Ctrl+A or Cmd+A)',
    '4. Copy (Ctrl+C or Cmd+C)',
    '5. Paste into a text file and save as .txt',
  ];
}

/**
 * Get all tutorial steps
 */
export function getAllTutorials(): Record<string, string[]> {
  return {
    chatgpt: getChatGPTTutorial(),
    claude: getClaudeTutorial(),
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

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  fileTooLarge: `File is too large. Maximum size is ${UPLOAD_CONFIG.maxSize / 1024 / 1024}MB`,
  invalidFileType: `Invalid file type. Allowed: ${UPLOAD_CONFIG.allowedTypes.join(', ')}`,
  uploadFailed: 'Upload failed. Please try again.',
  paymentFailed: 'Payment failed. Please try again.',
  processingFailed: 'Processing failed. Please try again.',
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  uploadComplete: 'File uploaded successfully!',
  paymentComplete: 'Payment successful!',
  exportReady: 'Your export is ready!',
  copiedToClipboard: 'Copied to clipboard!',
};
