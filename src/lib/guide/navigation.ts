/**
 * Guide Navigation Component
 * User Story 1.1: 教程入口导航
 */

import Link from 'next/link';

export interface NavLink {
  text: string;
  href: string;
  active?: boolean;
}

export interface NavProps {
  currentPath?: string;
}

/**
 * Main navigation items
 */
export const NAV_ITEMS: NavLink[] = [
  { text: '首页', href: '/' },
  { text: '教程', href: '/guide' },
  { text: '定价', href: '/pricing' },
  { text: '上传', href: '/upload' },
];

/**
 * Get navigation with active state
 */
export function getNavigationWithActive(currentPath: string): NavLink[] {
  return NAV_ITEMS.map(item => ({
    ...item,
    active: item.href === currentPath || 
             (currentPath.startsWith(item.href) && item.href !== '/'),
  }));
}

/**
 * Check if path is active
 */
export function isActive(href: string, currentPath: string): boolean {
  if (href === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(href);
}

/**
 * Guide page sections
 */
export const GUIDE_SECTIONS = [
  { title: '快速开始', href: '/guide/quick-start', description: '3分钟完成全流程' },
  { title: 'ChatGPT 教程', href: '/guide/chatgpt', description: '官方导出 + Bookmarklet' },
  { title: 'Claude 教程', href: '/guide/claude', description: '手动复制方案' },
  { title: '国产AI教程', href: '/guide/chinese', description: 'Kimi / DeepSeek / 通义' },
  { title: '常见问题', href: '/guide/faq', description: 'FAQ 问答' },
];

/**
 * Get guide sections for display
 */
export function getGuideSections() {
  return GUIDE_SECTIONS;
}

/**
 * Platform tutorials list
 */
export const PLATFORM_TUTORIALS = [
  { 
    platform: 'chatgpt', 
    name: 'ChatGPT', 
    description: '官方导出 + 本地提取',
    difficulty: '简单',
    time: '5分钟',
  },
  { 
    platform: 'claude', 
    name: 'Claude', 
    description: '手动复制方案',
    difficulty: '简单',
    time: '3分钟',
  },
  { 
    platform: 'gemini', 
    name: 'Gemini', 
    description: '手动复制方案',
    difficulty: '简单',
    time: '3分钟',
  },
  { 
    platform: 'kimi', 
    name: 'Kimi', 
    description: '月之暗面 AI',
    difficulty: '中等',
    time: '5分钟',
  },
  { 
    platform: 'deepseek', 
    name: 'DeepSeek', 
    description: '深度求索 AI',
    difficulty: '中等',
    time: '5分钟',
  },
  { 
    platform: 'tongyi', 
    name: '通义', 
    description: '阿里云 AI',
    difficulty: '中等',
    time: '5分钟',
  },
];

/**
 * Get all platform tutorials
 */
export function getPlatformTutorials() {
  return PLATFORM_TUTORIALS;
}
