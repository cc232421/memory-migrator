/**
 * Bookmarklet Page
 * User Story 2.1: Bookmarklet 功能页面
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Language, getTranslations, Translations } from '../i18n/config';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export default function BookmarkletPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>(getTranslations('en'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('m_memory_locale');
      const browserLang = navigator.language?.startsWith('zh') ? 'zh' : 'en';
      const lang = saved || browserLang;
      setLanguage(lang);
      setTranslations(getTranslations(lang));
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

  // Bookmarklet code - platform detection + extraction
  const bookmarkletCode = `javascript:(function(){
  const platforms=[
    {name:'ChatGPT',check:()=>document.querySelector('[data-testid*="message"]')?.textContent},
    {name:'Claude',check:()=>document.querySelector('.claude-message')?.textContent},
    {name:'Gemini',check:()=>document.querySelector('[role="log"]')?.textContent}
  ];
  for(const p of platforms){
    if(p.check()){
      alert('Platform: '+p.name+'+ detected');
      return;
    }
  }
  alert('No supported AI platform detected');
})();`;

  // Localized text
  const t = {
    title: language === 'zh' ? '书签工具' : 'Bookmarklet',
    description: language === 'zh'
      ? '拖拽到书签栏，快速提取 AI 对话'
      : 'Drag to bookmarks to extract AI chats',
    howToUse: language === 'zh' ? '使用方法' : 'How to Use',
    step1: language === 'zh' ? '1. 拖拽下方按钮到书签栏' : '1. Drag the button below to your bookmarks bar',
    step2: language === 'zh' ? '2. 访问 AI 平台对话页面' : '2. Visit the AI platform conversation page',
    step3: language === 'zh' ? '3. 点击书签开始提取' : '3. Click the bookmark to extract',
    supported: language === 'zh' ? '支持平台' : 'Supported Platforms',
    back: language === 'zh' ? '返回' : 'Back',
  };

  const platforms = language === 'zh'
    ? ['ChatGPT', 'Claude', 'Gemini', 'Kimi', 'DeepSeek', '通义千问']
    : ['ChatGPT', 'Claude', 'Gemini', 'Kimi', 'DeepSeek', 'Tongyi'];

  const navItems = language === 'zh'
    ? [
        { path: '/', label: '首页' },
        { path: '/how-it-works', label: '教程' },
        { path: '/pricing', label: '定价' },
        { path: '/upload', label: '上传' },
      ]
    : [
        { path: '/', label: 'Home' },
        { path: '/how-it-works', label: 'How It Works' },
        { path: '/pricing', label: 'Pricing' },
        { path: '/upload', label: 'Upload' },
      ];

  const seoLang = language === 'zh' ? 'zh-CN' : 'en-US';

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0a0a0a',
      color: '#fff'
    }}>
      <Head>
        <title>{t.title} - MemoryMigrator</title>
        <html lang={seoLang} />
      </Head>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 20px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
            ← {t.back}
          </Link>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px', textAlign: 'center' }}>
          🔖 {t.title}
        </h1>
        <p style={{ fontSize: '16px', color: '#888', marginBottom: '40px', textAlign: 'center' }}>
          {t.description}
        </p>

        {/* Bookmarklet Button */}
        <section style={{ 
          textAlign: 'center', 
          marginBottom: '40px' 
        }}>
          <a
            href={bookmarkletCode}
            style={{
              display: 'inline-block',
              background: '#3b82f6',
              color: '#fff',
              padding: '16px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
            }}
            onClick={(e) => e.preventDefault()}
          >
            🔖 MemoryMigrator
          </a>
        </section>

        {/* How to Use */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', textAlign: 'center' }}>
            {t.howToUse}
          </h2>
          <ol style={{ 
            background: '#1a1a1a', 
            borderRadius: '12px', 
            padding: '24px 24px 24px 40px' 
          }}>
            <li style={{ padding: '12px 0', color: '#ccc', borderBottom: '1px solid #222' }}>
              {t.step1}
            </li>
            <li style={{ padding: '12px 0', color: '#ccc', borderBottom: '1px solid #222' }}>
              {t.step2}
            </li>
            <li style={{ padding: '12px 0', color: '#ccc' }}>
              {t.step3}
            </li>
          </ol>
        </section>

        {/* Supported Platforms */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', textAlign: 'center' }}>
            {t.supported}
          </h2>
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap', 
            justifyContent: 'center' 
          }}>
            {platforms.map((p, i) => (
              <span key={i} style={{
                background: '#1a1a1a',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                color: '#888',
              }}>
                {p}
              </span>
            ))}
          </div>
        </section>

        {/* Navigation with Language Switcher */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher currentLanguage={language} onToggle={toggleLanguage} />
        </nav>
      </main>
    </div>
  );
}