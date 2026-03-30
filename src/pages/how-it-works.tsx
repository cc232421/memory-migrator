/**
 * How It Works / Tutorial Page - All Platforms
 * User Story: 全平台教程集成
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Language, getTranslations, Translations } from '../i18n/config';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { getAllTutorials, getFAQ } from '../lib/ui-pages';
import { Platform, getSupportedPlatforms } from '../lib/bookmarklet/platform-detector';

export default function HowItWorks() {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Platform>('chatgpt');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('m_memory_locale');
      const browserLang = navigator.language?.startsWith('zh') ? 'zh' : 'en';
      const lang = saved || browserLang;
      setLanguage(lang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('m_memory_locale', newLang);
    }
  };

  // Get tutorials
  const tutorials = getAllTutorials(language);
  const faq = getFAQ(language);

  // Supported platforms
  const platforms = getSupportedPlatforms();

  // Localized text
  const t = {
    title: language === 'zh' ? '使用教程' : 'How It Works',
    description: language === 'zh' 
      ? '一步一步教你完成 AI 对话导出'
      : 'Step-by-step guide to export AI conversations',
    selectPlatform: language === 'zh' ? '选择平台' : 'Select Platform',
    faq: language === 'zh' ? '常见问题' : 'FAQ',
    back: language === 'zh' ? '返回' : 'Back',
  };

  // Platform labels
  const platformLabels: Record<Platform, string> = {
    chatgpt: 'ChatGPT',
    claude: 'Claude',
    gemini: 'Gemini',
    kimi: 'Kimi',
    deepseek: 'DeepSeek',
    tongyi: language === 'zh' ? '通义千问' : 'Tongyi',
    unknown: 'Unknown',
  };

  // Tutorial data for each platform
  const tutorialData: Record<Platform, string[]> = {
    chatgpt: tutorials.chatgpt || [
      '1. Log in to ChatGPT',
      '2. Go to Settings (gear icon)',
      '3. Click "Data controls"',
      '4. Click "Export data"',
      '5. Click "Request export"',
      '6. Download the JSON file when ready',
    ],
    claude: [
      '1. Open Claude in browser',
      '2. Go to Settings',
      '3. Click "Export all data"',
      '4. Select export format (JSON)',
      '5. Click "Request export"',
      '6. Download when ready',
    ],
    gemini: [
      '1. Go to Gemini (gemini.google.com)',
      '2. Sign in with Google account',
      '3. Click profile > My Gemini Activity',
      '4. Click "Export data"',
      '5. Select date range',
      '6. Download JSON',
    ],
    kimi: [
      '1. Open Kimi (kimi.moonshot.cn)',
      '2. Log in to your account',
      '3. Click settings icon',
      '4. Find "Export Data" option',
      '5. Request export',
      '6. Download when ready',
    ],
    deepseek: [
      '1. Open DeepSeek (chat.deepseek.com)',
      '2. Log in to your account',
      '3. Go to Settings',
      '4. Find "Data Management"',
      '5. Click "Export"',
      '6. Download JSON',
    ],
    tongyi: [
      '1. Open Tongyi (tongyi.aliyun.com)',
      '2. Log in to your account',
      '3. Go to Settings',
      '4. Find "Data Export"',
      '5. Request export',
      '6. Download',
    ],
    unknown: [
      '1. Log in to your AI platform',
      '2. Go to Settings',
      '3. Find data export option',
      '4. Request export',
      '5. Wait for processing',
      '6. Download file',
    ],
  };

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

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 20px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
            ← {t.back}
          </Link>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '12px', textAlign: 'center' }}>
          {t.title}
        </h1>
        <p style={{ fontSize: '16px', color: '#888', marginBottom: '40px', textAlign: 'center' }}>
          {t.description}
        </p>

        {/* Platform Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '24px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {platforms.map((p) => (
            <button
              key={p}
              onClick={() => setActiveTab(p)}
              style={{
                background: activeTab === p ? '#3b82f6' : '#1a1a1a',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === p ? '600' : '400',
              }}
            >
              {platformLabels[p]}
            </button>
          ))}
        </div>

        {/* Tutorial Steps */}
        <section style={{ 
          background: '#1a1a1a', 
          borderRadius: '12px', 
          padding: '24px',
          marginBottom: '40px'
        }}>
          <ol style={{ paddingLeft: '20px' }}>
            {tutorialData[activeTab].map((step, i) => (
              <li key={i} style={{ 
                padding: '12px 0', 
                color: '#ccc',
                borderBottom: i < tutorialData[activeTab].length - 1 ? '1px solid #222' : 'none'
              }}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 style={{ fontSize: '20px', marginBottom: '20px', textAlign: 'center' }}>
            {t.faq}
          </h2>
          <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '20px' }}>
            {faq.map((item, i) => (
              <div key={i} style={{ 
                padding: '16px 0', 
                borderBottom: i < faq.length - 1 ? '1px solid #222' : 'none'
              }}>
                <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>{item.q}</p>
                <p style={{ color: '#888', fontSize: '14px' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation with Language Switcher */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
            {language === 'zh' ? '首页' : 'Home'}
          </Link>
          <Link href="/pricing" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
            {language === 'zh' ? '定价' : 'Pricing'}
          </Link>
          <Link href="/upload" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>
            {language === 'zh' ? '上传' : 'Upload'}
          </Link>
          <LanguageSwitcher currentLanguage={language} onToggle={toggleLanguage} />
        </nav>
      </main>
    </div>
  );
}