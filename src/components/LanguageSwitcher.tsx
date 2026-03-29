/**
 * Language Switcher Component
 * User Story 1.2: 语言切换组件
 */

import { useTranslation } from '../i18n/useTranslation';
import { Language } from '../i18n/config';
import Link from 'next/link';

interface LanguageSwitcherProps {
  currentPath?: string;
}

export default function LanguageSwitcher({ currentPath = '' }: LanguageSwitcherProps) {
  const { language, changeLanguage, isEnglish, isChinese } = useTranslation();

  const handleSwitch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    changeLanguage(isEnglish ? 'zh' : 'en');
  };

  return (
    <button
      onClick={handleSwitch}
      style={{
        background: '#252525',
        border: '1px solid #444',
        borderRadius: '6px',
        padding: '6px 12px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
      title={isEnglish ? 'Switch to Chinese' : '切换到英文'}
    >
      <span style={{ fontSize: '16px' }}>
        {isEnglish ? '🇺🇸' : '🇨🇳'}
      </span>
      <span>{isEnglish ? 'EN' : '中文'}</span>
    </button>
  );
}

/**
 * Language-aware Navigation
 */
export function LanguageNav({ currentPath = '/' }: { currentPath?: string }) {
  const { t, changeLanguage, isEnglish } = useTranslation();

  return (
    <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Link 
        href="/" 
        style={{ 
          color: currentPath === '/' ? '#3b82f6' : '#666', 
          textDecoration: 'none' 
        }}
      >
        {t('nav.home')}
      </Link>
      <Link 
        href="/guide" 
        style={{ 
          color: currentPath.startsWith('/guide') ? '#3b82f6' : '#666', 
          textDecoration: 'none' 
        }}
      >
        {t('nav.guide')}
      </Link>
      <Link 
        href="/pricing" 
        style={{ 
          color: currentPath === '/pricing' ? '#3b82f6' : '#666', 
          textDecoration: 'none' 
        }}
      >
        {t('nav.pricing')}
      </Link>
      <Link 
        href="/upload" 
        style={{ 
          color: currentPath === '/upload' ? '#3b82f6' : '#666', 
          textDecoration: 'none' 
        }}
      >
        {t('nav.upload')}
      </Link>
      
      <LanguageSwitcher />
    </nav>
  );
}
