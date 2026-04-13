/**
 * Language Switcher Component
 * User Story 1.4: 页面集成 i18n - 语言切换组件
 */

import { Language, getTranslations, Translations } from '../i18n/config';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onToggle: () => void;
  className?: string;
}

/**
 * Language Switcher Button Component
 * 简洁小巧的语言切换按钮，放在导航栏中
 */
export function LanguageSwitcher({ currentLanguage, onToggle, className }: LanguageSwitcherProps) {
  const label = currentLanguage === 'en' ? '中文' : 'EN';
  
  return (
    <button
      onClick={onToggle}
      className={className}
      style={{
        background: 'transparent',
        border: '1px solid #333',
        borderRadius: '4px',
        padding: '4px 8px',
        fontSize: '12px',
        color: '#888',
        cursor: 'pointer',
        marginLeft: '8px',
        transition: 'all 0.2s ease',
      }}
      aria-label={`Switch to ${currentLanguage === 'en' ? 'Chinese' : 'English'}`}
    >
      {label}
    </button>
  );
}

/**
 * NavBar with integrated i18n
 * User Story 1.4, 1.7: 带语言切换的导航栏
 */
interface NavBarProps {
  currentLanguage: Language;
  onToggleLanguage: () => void;
  navItems?: Array<{ path: string; label: string; labelZh?: string }>;
}

export function NavBar({ currentLanguage, onToggleLanguage, navItems }: NavBarProps) {
  const defaultNavItems = [
    { path: '/', label: 'Home', labelZh: '首页' },
    { path: '/how-it-works', label: 'Guide', labelZh: '教程' },
    { path: '/pricing', label: 'Pricing', labelZh: '定价' },
    { path: '/upload', label: 'Upload', labelZh: '上传' },
  ];
  
  const items = navItems || defaultNavItems;
  
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      padding: '16px 0',
      flexWrap: 'wrap',
    }}>
      {items.map((item) => (
        <a
          key={item.path}
          href={item.path}
          style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px',
          }}
        >
          {currentLanguage === 'zh' && item.labelZh ? item.labelZh : item.label}
        </a>
      ))}
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        onToggle={onToggleLanguage}
      />
    </nav>
  );
}

/**
 * Language context provider for Next.js
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children, defaultLanguage = 'en' }: { children: ReactNode; defaultLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<Translations>(getTranslations(defaultLanguage));
  
  useEffect(() => {
    // Load saved language from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('m_memory_locale');
      if (saved === 'en' || saved === 'zh') {
        setLanguage(saved);
        setTranslations(getTranslations(saved));
      }
    }
  }, []);
  
  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
    setTranslations(getTranslations(newLang));
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('m_memory_locale', newLang);
    }
  };
  
  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}