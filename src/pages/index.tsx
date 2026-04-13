/**
 * Home Page with i18n integrated
 * User Story 1.4, 1.5: 首页集成 i18n
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Language, getTranslations, Translations } from '../i18n/config';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { PRICING, getValueProposition, getHomepageCTA, getHomeFeatures, getPricingFeatures } from '../lib/ui-pages';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>(getTranslations('en'));
  const [mounted, setMounted] = useState(false);

  // Initialize language from localStorage or browser
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('m_memory_locale');
      const lang: Language = (saved === 'en' || saved === 'zh') ? saved : 'en';
      
      // Also check browser language
      const browserLang = navigator.language?.startsWith('zh') ? 'zh' : 'en';
      const finalLang: Language = (saved === 'en' || saved === 'zh') ? saved : browserLang;
      
      setLanguage(finalLang);
      setTranslations(getTranslations(finalLang));
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

  // Get localized content
  const subtitle = language === 'zh' 
    ? '将你的 AI 对话历史迁移到 OpenClaw 作为长期记忆'
    : 'Transfer your AI chat history to OpenClaw and keep your memory alive';
  const cta = language === 'zh' ? '开始迁移' : 'Start Migration';
  const features = language === 'zh' 
    ? ['导出 ChatGPT 对话', '导出 Claude 对话', 'AI 智能摘要', '生成 OpenClaw 提示词', '生成 Skill 文件']
    : PRICING.features;
  const featureIcons = ['💬', '🧠', '🤖', '📝', '📦'];
  const pricingLabel = language === 'zh' ? '定价' : 'Pricing';
  const perExport = language === 'zh' ? '每次导出' : 'per export';
  const navItems = language === 'zh'
    ? [
        { path: '/how-it-works', label: '教程' },
        { path: '/pricing', label: '定价' },
        { path: '/upload', label: '上传' },
      ]
    : [
        { path: '/how-it-works', label: 'How It Works' },
        { path: '/pricing', label: 'Pricing' },
        { path: '/upload', label: 'Upload' },
      ];

  // Get SEO lang attribute
  const seoLang = language === 'zh' ? 'zh-CN' : 'en-US';

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0a0a0a',
      color: '#fff'
    }}>
      <Head>
        <title>MemoryMigrator - Transfer Your AI History</title>
        <meta name="description" content="Transfer ChatGPT/Claude history to OpenClaw as long-term memory" />
        <html lang={seoLang} />
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 20px' }}>
        {/* Hero Section */}
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>
            🐋 MemoryMigrator
          </h1>
          <p style={{ fontSize: '20px', color: '#888', marginBottom: '40px' }}>
            {subtitle}
          </p>
          <Link href="/upload">
            <button style={{
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              padding: '16px 32px',
              fontSize: '18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              {cta}
            </button>
          </Link>
        </header>

        {/* Features */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {features.map((feature, i) => (
            <div key={i} style={{
              background: '#1a1a1a',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #333'
            }}>
              <span style={{ fontSize: '24px', marginRight: '8px' }}>
                {featureIcons[i]}
              </span>
              <p style={{ color: '#ccc', margin: '12px 0 0' }}>{feature}</p>
            </div>
          ))}
        </section>

        {/* Pricing */}
        <section style={{ textAlign: 'center', padding: '40px', background: '#1a1a1a', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{pricingLabel}</h2>
          <p style={{ fontSize: '48px', fontWeight: '700', color: '#3b82f6' }}>
            ${PRICING.price / 100}
          </p>
          <p style={{ color: '#666', marginTop: '8px' }}>{perExport}</p>
        </section>

        {/* Navigation with Language Switcher */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} style={{ color: '#666', textDecoration: 'none' }}>
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher
            currentLanguage={language}
            onToggle={toggleLanguage}
          />
        </nav>
      </main>
    </div>
  );
}