import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from '../../i18n/useTranslation';
import { GUIDE_SECTIONS } from '../../lib/guide/navigation';

export default function Guide() {
  const { t, isEnglish } = useTranslation();

  const sections = [
    { 
      key: 'quickStart', 
      href: '/guide/quick-start',
      icon: '⚡',
      color: '#3b82f6'
    },
    { 
      key: 'chatgpt', 
      href: '/guide/chatgpt',
      icon: '💬',
      color: '#10b981'
    },
    { 
      key: 'claude', 
      href: '/guide/claude',
      icon: '🧠',
      color: '#8b5cf6'
    },
    { 
      key: 'chinese', 
      href: '/guide/chinese',
      icon: '🐉',
      color: '#f59e0b'
    },
    { 
      key: 'faq', 
      href: '/guide/faq',
      icon: '❓',
      color: '#ef4444'
    },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0a0a0a',
      color: '#fff',
    }}>
      <Head>
        <title>{t('guide.title')} - MemoryMigrator</title>
      </Head>

      {/* Header */}
      <header style={{ 
        padding: '20px 40px', 
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
          🐋 MemoryMigrator
        </Link>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>{t('nav.home')}</Link>
          <Link href="/guide" style={{ color: '#3b82f6', textDecoration: 'none' }}>{t('nav.guide')}</Link>
          <Link href="/pricing" style={{ color: '#666', textDecoration: 'none' }}>{t('nav.pricing')}</Link>
          <Link href="/upload" style={{ color: '#666', textDecoration: 'none' }}>{t('nav.upload')}</Link>
          <LanguageToggle />
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '16px', textAlign: 'center' }}>
          📖 {t('guide.title')}
        </h1>
        <p style={{ fontSize: '18px', color: '#888', textAlign: 'center', marginBottom: '48px' }}>
          {t('guide.description')}
        </p>

        {/* Quick Start Card */}
        <Link href="/guide/quick-start" style={{ textDecoration: 'none' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
            borderRadius: '16px', 
            padding: '32px',
            marginBottom: '24px',
            border: '2px solid #3b82f6',
            cursor: 'pointer',
          }}>
            <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#3b82f6' }}>
              ⚡ {t('guide.quickStart')}
            </h2>
            <p style={{ color: '#888' }}>
              {isEnglish ? '3 minutes to complete the entire process, suitable for first-time users' : '3分钟完成整个流程，适合第一次使用'}
            </p>
          </div>
        </Link>

        {/* Platform Tutorials */}
        <h2 style={{ fontSize: '24px', marginBottom: '20px', marginTop: '40px' }}>
          {isEnglish ? 'Platform Tutorials' : '各平台教程'}
        </h2>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {sections.slice(1, 4).map((section, index) => (
            <Link 
              key={index}
              href={section.href} 
              style={{ textDecoration: 'none' }}
            >
              <div style={{ 
                background: '#1a1a1a',
                borderRadius: '12px', 
                padding: '24px',
                border: '1px solid #333',
                cursor: 'pointer',
              }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#fff' }}>
                  {section.icon} {t(`guide.${section.key}`)}
                </h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  {t(`guide.${section.key}`)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <Link href="/guide/faq" style={{ textDecoration: 'none' }}>
          <div style={{ 
            background: '#1a1a1a',
            borderRadius: '12px', 
            padding: '24px',
            marginTop: '24px',
            border: '1px solid #333',
          }}>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#fff' }}>
              ❓ {t('guide.faq')}
            </h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              {isEnglish ? 'Have questions? Check the FAQ for answers' : '遇到问题了？看看这里有没有答案'}
            </p>
          </div>
        </Link>

        {/* Need Help */}
        <div style={{ 
          marginTop: '60px', 
          padding: '24px', 
          background: '#1a1a1a', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#888', marginBottom: '16px' }}>
            {isEnglish ? 'Still need help?' : '还是不会？联系我们'}
          </p>
          <Link href="/upload" style={{
            background: '#3b82f6',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            {t('common.tryNow')} →
          </Link>
        </div>
      </main>
    </div>
  );
}

// Simple inline language toggle for now
function LanguageToggle() {
  const { language, changeLanguage } = useTranslation();
  
  return (
    <button
      onClick={() => changeLanguage(language === 'en' ? 'zh' : 'en')}
      style={{
        background: '#252525',
        border: '1px solid #444',
        borderRadius: '6px',
        padding: '6px 12px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      {language === 'en' ? '🇺🇸 EN' : '🇨🇳 中文'}
    </button>
  );
}
