import Head from 'next/head';
import Link from 'next/link';
import { GUIDE_SECTIONS } from '../../lib/guide/navigation';

export default function Guide() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0a0a0a',
      color: '#fff',
    }}>
      <Head>
        <title>教程 - MemoryMigrator</title>
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
        <nav style={{ display: 'flex', gap: '24px' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>首页</Link>
          <Link href="/guide" style={{ color: '#3b82f6', textDecoration: 'none' }}>教程</Link>
          <Link href="/pricing" style={{ color: '#666', textDecoration: 'none' }}>定价</Link>
          <Link href="/upload" style={{ color: '#666', textDecoration: 'none' }}>上传</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '16px', textAlign: 'center' }}>
          📖 教程中心
        </h1>
        <p style={{ fontSize: '18px', color: '#888', textAlign: 'center', marginBottom: '48px' }}>
          一步一步教你完成 AI 对话导出
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
              ⚡ 快速开始
            </h2>
            <p style={{ color: '#888' }}>3分钟完成整个流程，适合第一次使用</p>
          </div>
        </Link>

        {/* Platform Tutorials */}
        <h2 style={{ fontSize: '24px', marginBottom: '20px', marginTop: '40px' }}>
          各平台教程
        </h2>
        
        <div style={{ display: 'grid', gap: '16px' }}>
          {GUIDE_SECTIONS.slice(1, 5).map((section, index) => (
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
                  {section.title}
                </h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  {section.description}
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
              ❓ 常见问题
            </h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              遇到问题了？看看这里有没有答案
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
            还是不会？联系我们
          </p>
          <Link href="/upload" style={{
            background: '#3b82f6',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            尝试上传 →
          </Link>
        </div>
      </main>
    </div>
  );
}
