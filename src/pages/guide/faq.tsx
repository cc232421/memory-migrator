import Head from 'next/head';
import Link from 'next/link';

export default function FAQ() {
  const faqs = [
    {
      question: '导不出对话怎么办？',
      answer: '请检查以下步骤：1) 是否已登录AI平台；2) 是否有对话历史；3) 尝试刷新页面后再次操作。',
    },
    {
      question: '导出的文件是空的？',
      answer: '可能原因：1) 该平台没有历史记录；2) 导出格式不匹配；3) 浏览器缓存问题。尝试重新登录或换浏览器。',
    },
    {
      question: '支付失败了怎么办？',
      answer: '请检查：1) 银行卡是否支持国际支付；2) 是否有足够余额；3) 网络是否稳定。可以重试或联系客服。',
    },
    {
      question: '支持哪些AI平台？',
      answer: '目前支持：ChatGPT、Claude、Gemini、Kimi、DeepSeek、通义千问。更多平台陆续添加中。',
    },
    {
      question: '导出后的文件怎么用？',
      answer: '将导出的JSON文件上传到MemoryMigrator工具，系统会自动生成可导入OpenClaw的提示词。',
    },
    {
      question: '可以退款吗？',
      answer: '如果导出失败，可以申请全额退款。7天内有效。',
    },
    {
      question: '数据安全吗？',
      answer: '所有处理在浏览器本地完成，我们不会保存您的对话数据。',
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
        <title>常见问题 - MemoryMigrator 教程</title>
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
          ❓ 常见问题
        </h1>
        <p style={{ fontSize: '18px', color: '#888', marginBottom: '40px' }}>
          遇到问题了？看看这里有没有答案
        </p>

        {/* FAQ List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {faqs.map((faq, index) => (
            <details 
              key={index}
              style={{ 
                background: '#1a1a1a',
                borderRadius: '12px', 
                border: '1px solid #333',
                padding: '20px',
              }}
            >
              <summary style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                cursor: 'pointer',
                listStyle: 'none',
                color: '#fff',
              }}>
                {faq.question}
              </summary>
              <p style={{ 
                color: '#888', 
                marginTop: '12px', 
                paddingTop: '12px',
                borderTop: '1px solid #333',
                lineHeight: '1.6',
              }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* Contact */}
        <div style={{ 
          marginTop: '48px', 
          padding: '24px', 
          background: '#1a1a1a', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#888', marginBottom: '12px' }}>
            没有找到答案？
          </p>
          <Link href="/upload" style={{
            background: '#3b82f6',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
          }}>
            联系支持 →
          </Link>
        </div>
      </main>
    </div>
  );
}
