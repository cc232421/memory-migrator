import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Language } from '../../i18n/config';

export default function QuickStart() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('m_memory_locale');
      const browserLang = navigator.language?.startsWith('zh') ? 'zh' : 'en';
      const lang: Language = (saved === 'en' || saved === 'zh') ? saved : browserLang;
      setLanguage(lang);
    }
  }, []);

  const t = {
    title: language === 'zh' ? '快速开始' : 'Quick Start',
    description: language === 'zh' ? '3分钟完成 AI 对话导出' : 'Complete AI chat export in 3 minutes',
    step1Title: language === 'zh' ? '选择你的 AI 平台' : 'Choose Your AI Platform',
    step1Desc: language === 'zh' ? '确定你想导出哪个 AI 的对话历史' : 'Decide which AI platform you want to export from',
    step2Title: language === 'zh' ? '导出对话数据' : 'Export Chat Data',
    step2Desc: language === 'zh' ? '根据你的平台选择对应的导出方式' : 'Choose export method based on your platform',
    step2Tip1: language === 'zh' ? '方法一：官方导出（如果有）' : 'Method 1: Official export (if available)',
    step2Tip2: language === 'zh' ? '方法二：本地提取（更快）' : 'Method 2: Local extraction (faster)',
    step2Tip3: language === 'zh' ? '方法三：手动复制（最简单）' : 'Method 3: Manual copy (simplest)',
    step3Title: language === 'zh' ? '上传到 MemoryMigrator' : 'Upload to MemoryMigrator',
    step3Desc: language === 'zh' ? '将导出的文件上传到这里' : 'Upload the exported file here',
    back: language === 'zh' ? '返回教程首页' : 'Back to Tutorial',
    verified: language === 'zh' ? '✅ 完成后验证' : '✅ Verification',
    verifiedDesc: language === 'zh' ? '看到&quot;Export ready!&quot;提示，说明导出成功！' : 'When you see &quot;Export ready!&quot;, the export is successful!',
    stillNeedHelp: language === 'zh' ? '还是不会？' : 'Still need help?',
    viewFAQ: language === 'zh' ? '查看常见问题' : 'View FAQ',
    goUpload: language === 'zh' ? '去上传' : 'Go to Upload',
  };

  const platforms = language === 'zh'
    ? [
        { name: 'ChatGPT', icon: '💬', link: '/guide/chatgpt' },
        { name: 'Claude', icon: '🧠', link: '/guide/claude' },
        { name: 'Gemini', icon: '🌟', link: '/guide/gemini' },
        { name: '国产AI', icon: '🐉', link: '/guide/chinese' },
      ]
    : [
        { name: 'ChatGPT', icon: '💬', link: '/guide/chatgpt' },
        { name: 'Claude', icon: '🧠', link: '/guide/claude' },
        { name: 'Gemini', icon: '🌟', link: '/guide/gemini' },
        { name: 'Chinese AI', icon: '🐉', link: '/guide/chinese' },
      ];

  const steps = [
    { number: 1, title: t.step1Title, description: t.step1Desc, platforms },
    { number: 2, title: t.step2Title, description: t.step2Desc, tips: [t.step2Tip1, t.step2Tip2, t.step2Tip3] },
    { number: 3, title: t.step3Title, description: t.step3Desc, action: '/upload' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0a0a0a',
      color: '#fff',
    }}>
      <Head>
        <title>{t.title} - MemoryMigrator</title>
      </Head>

      <header style={{ padding: '20px 40px', borderBottom: '1px solid #333' }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '20px' }}>
          🐋 MemoryMigrator
        </Link>
      </header>

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
        <Link href="/guide" style={{ color: '#666', textDecoration: 'none' }}>
          ← {t.back}
        </Link>

        <h1 style={{ fontSize: '36px', marginTop: '20px', marginBottom: '16px' }}>
          ⚡ {t.title}
        </h1>
        <p style={{ fontSize: '18px', color: '#888', marginBottom: '40px' }}>
          {t.description}
        </p>

        {steps.map((step, index) => (
          <div key={index} style={{ 
            marginBottom: '40px',
            padding: '24px',
            background: '#1a1a1a',
            borderRadius: '12px',
            border: '1px solid #333',
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '16px' 
            }}>
              <span style={{ 
                background: '#3b82f6', 
                color: '#fff', 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '12px',
              }}>
                {step.number}
              </span>
              <h2 style={{ fontSize: '20px', margin: 0 }}>{step.title}</h2>
            </div>

            <p style={{ color: '#888', marginBottom: '16px' }}>
              {step.description}
            </p>

            {step.platforms && (
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {step.platforms.map((platform, i) => (
                  <Link 
                    key={i}
                    href={platform.link}
                    style={{
                      background: '#252525',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      color: '#fff',
                      textDecoration: 'none',
                      fontSize: '14px',
                    }}
                  >
                    {platform.icon} {platform.name}
                  </Link>
                ))}
              </div>
            )}

            {step.tips && (
              <ul style={{ color: '#666', paddingLeft: '20px', margin: 0 }}>
                {step.tips.map((tip, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{tip}</li>
                ))}
              </ul>
            )}

            {step.action && (
              <Link href={step.action} style={{
                display: 'inline-block',
                background: '#3b82f6',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                marginTop: '16px',
              }}>
                {t.goUpload} →
              </Link>
            )}
          </div>
        ))}

        <div style={{ 
          padding: '24px', 
          background: '#1a3a1a', 
          borderRadius: '12px',
          border: '1px solid #22c55e',
        }}>
          <h3 style={{ color: '#22c55e', marginBottom: '8px' }}>{t.verified}</h3>
          <p style={{ color: '#888', fontSize: '14px' }}>
            {t.verifiedDesc}
          </p>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p style={{ color: '#666', marginBottom: '12px' }}>
            {t.stillNeedHelp}
          </p>
          <Link href="/guide/faq" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            {t.viewFAQ} →
          </Link>
        </div>
      </main>
    </div>
  );
}