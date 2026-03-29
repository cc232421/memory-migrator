import Head from 'next/head';
import Link from 'next/link';

export default function QuickStart() {
  const steps = [
    {
      number: 1,
      title: '选择你的 AI 平台',
      description: '确定你想导出哪个 AI 的对话历史',
      platforms: [
        { name: 'ChatGPT', icon: '💬', link: '/guide/chatgpt' },
        { name: 'Claude', icon: '🧠', link: '/guide/claude' },
        { name: 'Gemini', icon: '🌟', link: '/guide/gemini' },
        { name: '国产AI', icon: '🐉', link: '/guide/chinese' },
      ],
    },
    {
      number: 2,
      title: '导出对话数据',
      description: '根据你的平台选择对应的导出方式',
      tips: [
        '方法一：官方导出（如果有）',
        '方法二：本地提取（更快）',
        '方法三：手动复制（最简单）',
      ],
    },
    {
      number: 3,
      title: '上传到 MemoryMigrator',
      description: '将导出的文件上传到这里',
      action: '/upload',
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
        <title>快速开始 - MemoryMigrator 教程</title>
      </Head>

      {/* Header */}
      <header style={{ padding: '20px 40px', borderBottom: '1px solid #333' }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '20px' }}>
          🐋 MemoryMigrator
        </Link>
      </header>

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
        <Link href="/guide" style={{ color: '#666', textDecoration: 'none' }}>
          ← 返回教程首页
        </Link>

        <h1 style={{ fontSize: '36px', marginTop: '20px', marginBottom: '16px' }}>
          ⚡ 快速开始
        </h1>
        <p style={{ fontSize: '18px', color: '#888', marginBottom: '40px' }}>
          3分钟完成 AI 对话导出
        </p>

        {/* Steps */}
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

            {/* Platform selection */}
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

            {/* Tips */}
            {step.tips && (
              <ul style={{ color: '#666', paddingLeft: '20px', margin: 0 }}>
                {step.tips.map((tip, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{tip}</li>
                ))}
              </ul>
            )}

            {/* Action */}
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
                去上传 →
              </Link>
            )}
          </div>
        ))}

        {/* Verification */}
        <div style={{ 
          padding: '24px', 
          background: '#1a3a1a', 
          borderRadius: '12px',
          border: '1px solid #22c55e',
        }}>
          <h3 style={{ color: '#22c55e', marginBottom: '8px' }}>✅ 完成后验证</h3>
          <p style={{ color: '#888', fontSize: '14px' }}>
            看到"Export ready!"提示，说明导出成功！
          </p>
        </div>

        {/* More Help */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p style={{ color: '#666', marginBottom: '12px' }}>
            还是不会？
          </p>
          <Link href="/guide/faq" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            查看常见问题 →
          </Link>
        </div>
      </main>
    </div>
  );
}
