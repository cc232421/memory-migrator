/**
 * i18n Hook
 * User Story 1.2 & 1.3: 语言切换组件 + 自动语言检测
 */

import { useState, useEffect, useCallback } from 'react';
import { Language, getTranslations, Translations, getDefaultLanguage } from './config';

const STORAGE_KEY = 'm_memory_locale';

/**
 * Get saved language from localStorage
 */
function getSavedLanguage(): Language {
  if (typeof window === 'undefined') return getDefaultLanguage();
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'zh') return saved;
  } catch {
    // localStorage not available
  }
  return getDefaultLanguage();
}

/**
 * Detect browser language
 */
function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return getDefaultLanguage();
  
  try {
    const browserLang = navigator.language || ((navigator as { userLanguage?: string }).userLanguage) || 'en';
    
    // Check for Chinese
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
  } catch {
    // navigator not available
  }
  
  return getDefaultLanguage();
}

/**
 * useTranslation hook
 */
export function useTranslation() {
  const [language, setLanguage] = useState<Language>(getDefaultLanguage);
  const [translations, setTranslations] = useState<Translations>(getTranslations(getDefaultLanguage()));
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize on mount
  useEffect(() => {
    // Priority: saved > browser > default
    const saved = getSavedLanguage();
    const browser = detectBrowserLanguage();
    const lang = saved || browser;
    
    setLanguage(lang);
    setTranslations(getTranslations(lang));
    setIsInitialized(true);
  }, []);

  // Change language
  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    setTranslations(getTranslations(lang));
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // localStorage not available
    }
  }, []);

  // Toggle language
  const toggleLanguage = useCallback(() => {
    const newLang = language === 'en' ? 'zh' : 'en';
    changeLanguage(newLang);
  }, [language, changeLanguage]);

  // Get translation by key path (e.g., 'nav.home')
  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  }, [translations]);

  return {
    language,
    translations,
    isInitialized,
    changeLanguage,
    toggleLanguage,
    t,
    isEnglish: language === 'en',
    isChinese: language === 'zh',
  };
}

/**
 * Language context for React
 */
export const LanguageContext = {
  useTranslation,
};
