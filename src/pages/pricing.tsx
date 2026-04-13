/**
 * Pricing Page with i18n
 * User Story 5.2: 定价页面
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Language, getTranslations, Translations } from '../i18n/config';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { PRICING, getPricingFeatures } from '../lib/ui-pages';

export default function Pricing() {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>(getTranslations('en'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('m_memory_locale');
      const browserLang = navigator.language?.startsWith('zh') ? 'zh' : 'en';
      const lang: Language = (saved === 'en' || saved === 'zh') ? saved : browserLang;
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

  // Localized text
  const t = {
    title: language === 'zh' ? '定价' : 'Pricing',
    perExport: language === 'zh' ? '每次导出' : 'per export',
    featureLabel: language === 'zh' ? '包含功能' : 'What you get',
    faq: language === 'zh' ? '常见问题' : 'FAQ',
    q1: language === 'zh' ? '这是订阅吗？' : 'Is this a subscription?',
    a1: language === 'zh' ? '不是，是一次性付费。每次导出 $5。' : 'No, it\'s a one-time payment. $5 per export.',
    q2: language === 'zh' ? '支持哪些支付方式？' : 'What payment methods do you accept?',
    a2: language === 'zh' ? '支持所有主流信用卡，通过 Stripe 支付。' : 'We accept all major credit cards through Stripe.',
    q3: language === 'zh' ? '可以退款吗？' : 'Can I get a refund?',
    a3: language === 'zh' ? '可以，7天内导出失败可退款。' : 'Yes, within 7 days if the export fails.',
    back: language === 'zh' ? '返回' : 'Back',
  };

  const features = getPricingFeatures(language);
  const navItems = language === 'zh'
    ? [
        { path: '/', label: '首页' },
        { path: '/how-it-works', label: '教程' },
        { path: '/upload', label: '上传' },
      ]
    : [
        { path: '/', label: 'Home' },
        { path: '/how-it-works', label: 'How It Works' },
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

        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '40px', textAlign: 'center' }}>
          {t.title}
        </h1>

        {/* Pricing Card */}
        <section style={{ 
          textAlign: 'center', 
          padding: '40px', 
          background: '#1a1a1a', 
          borderRadius: '16px',
          marginBottom: '40px'
        }}>
          <p style={{ fontSize: '64px', fontWeight: '700', color: '#3b82f6' }}>
            ${PRICING.price / 100}
          </p>
          <p style={{ color: '#666', marginTop: '8px' }}>{t.perExport}</p>
        </section>

        {/* Features */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', textAlign: 'center' }}>
            {t.featureLabel}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
            {features.map((feature, i) => (
              <li key={i} style={{ padding: '12px 0', color: '#ccc', borderBottom: '1px solid #222' }}>
                ✓ {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', textAlign: 'center' }}>
            {t.faq}
          </h2>
          <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>{t.q1}</p>
              <p style={{ color: '#888', fontSize: '14px' }}>{t.a1}</p>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>{t.q2}</p>
              <p style={{ color: '#888', fontSize: '14px' }}>{t.a2}</p>
            </div>
            <div>
              <p style={{ color: '#fff', fontWeight: '600', marginBottom: '8px' }}>{t.q3}</p>
              <p style={{ color: '#888', fontSize: '14px' }}>{t.a3}</p>
            </div>
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