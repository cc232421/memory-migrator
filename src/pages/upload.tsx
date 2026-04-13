/**
 * Upload Page with i18n + Multi-Platform Support
 * User Story: 集成所有提取器到主站
 */

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Language, getTranslations, Translations } from '../i18n/config';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { UPLOAD_CONFIG } from '../lib/ui-pages';
import { Platform, getSupportedPlatforms, getPlatformName } from '../lib/bookmarklet/platform-detector';

export default function Upload() {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [platform, setPlatform] = useState<Platform>('chatgpt');
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'ready' | 'error'>('idle');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('m_memory_locale');
      const browserLang = navigator.language?.startsWith('zh') ? 'zh' : 'en';
      const lang: Language = (saved === 'en' || saved === 'zh') ? saved : browserLang;
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

  // Supported platforms
  const platforms = getSupportedPlatforms();

  // Localized text
  const t = {
    title: language === 'zh' ? '上传导出文件' : 'Upload Export File',
    selectPlatform: language === 'zh' ? '选择 AI 平台' : 'Select AI Platform',
    dragDrop: language === 'zh' ? '拖拽或点击上传文件' : 'Drag & drop or click to upload',
    formats: language === 'zh' ? '支持格式：.json, .txt' : 'Supported formats: .json, .txt',
    maxSize: language === 'zh' ? '最大：10MB' : 'Max size: 10MB',
    processing: language === 'zh' ? 'AI 处理中...' : 'Processing with AI...',
    ready: language === 'zh' ? '提取就绪！' : 'Extraction ready!',
    download: language === 'zh' ? '下载' : 'Download',
    copy: language === 'zh' ? '复制' : 'Copy',
    back: language === 'zh' ? '返回' : 'Back',
  };

  const navItems = language === 'zh'
    ? [
        { path: '/', label: '首页' },
        { path: '/how-it-works', label: '教程' },
        { path: '/pricing', label: '定价' },
      ]
    : [
        { path: '/', label: 'Home' },
        { path: '/how-it-works', label: 'How It Works' },
        { path: '/pricing', label: 'Pricing' },
      ];

  // Platform labels
  const platformLabels: Record<Platform, string> = {
    chatgpt: language === 'zh' ? 'ChatGPT' : 'ChatGPT',
    claude: language === 'zh' ? 'Claude' : 'Claude',
    gemini: language === 'zh' ? 'Gemini' : 'Gemini',
    kimi: language === 'zh' ? 'Kimi' : 'Kimi',
    deepseek: language === 'zh' ? 'DeepSeek' : 'DeepSeek',
    tongyi: language === 'zh' ? '通义千问' : 'Tongyi',
    unknown: language === 'zh' ? '未知' : 'Unknown',
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (f: File) => {
    if (f.size > UPLOAD_CONFIG.maxSize) {
      setStatus('error');
      return;
    }
    const ext = '.' + f.name.split('.').pop()?.toLowerCase();
    if (!UPLOAD_CONFIG.allowedTypes.includes(ext)) {
      setStatus('error');
      return;
    }
    setFile(f);
    simulateProcessing();
  };

  const simulateProcessing = () => {
    setStatus('uploading');
    setTimeout(() => {
      setStatus('processing');
      setTimeout(() => {
        setStatus('ready');
      }, 1500);
    }, 500);
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

        {/* Platform Selector */}
        <section style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '12px', color: '#888', fontSize: '14px' }}>
            {t.selectPlatform}
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                style={{
                  background: platform === p ? '#3b82f6' : '#1a1a1a',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: platform === p ? '600' : '400',
                }}
              >
                {platformLabels[p]}
              </button>
            ))}
          </div>
        </section>

        {/* Upload Area */}
        {status === 'ready' ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '48px', marginBottom: '20px' }}>✅</p>
            <p style={{ color: '#4ade80', fontSize: '18px', marginBottom: '40px' }}>{t.ready}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button style={{
                background: '#3b82f6',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
              }}>
                {t.download}
              </button>
              <button style={{
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
              }}>
                {t.copy}
              </button>
            </div>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            style={{
              border: dragOver ? '2px solid #3b82f6' : '2px dashed #333',
              borderRadius: '12px',
              padding: '60px 20px',
              textAlign: 'center',
              background: dragOver ? '#1a1a2a' : '#1a1a1a',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <input
              type="file"
              accept=".json,.txt"
              onChange={handleFileSelect}
              style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0 }}
            />
            <p style={{ fontSize: '48px', marginBottom: '20px' }}>📁</p>
            <p style={{ fontSize: '18px', color: '#ccc', marginBottom: '12px' }}>{t.dragDrop}</p>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{t.formats}</p>
            <p style={{ fontSize: '14px', color: '#666' }}>{t.maxSize}</p>
            
            {status === 'uploading' && (
              <p style={{ color: '#3b82f6', marginTop: '20px' }}>Uploading...</p>
            )}
            {status === 'processing' && (
              <p style={{ color: '#3b82f6', marginTop: '20px' }}>{t.processing}</p>
            )}
            {status === 'error' && (
              <p style={{ color: '#ef4444', marginTop: '20px' }}>Error</p>
            )}
          </div>
        )}

        {/* Navigation with Language Switcher */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
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