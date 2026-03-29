import Head from 'next/head';
import Link from 'next/link';

export default function ChatGPTTutorial() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0a0a0a',
      color: '#fff',
    }}>
      <Head>
        <title>ChatGPT 教程 - MemoryMigrator</title>
      </Head>

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
          💬 ChatGPT 导出教程
        </h1>
        <p style={{ fontSize: '16px', color: '#888', marginBottom: '32px' }}>
          两种方法：官方导出（完整但慢）或本地提取（快速）
        </p>

        {/* Method 1: Official Export */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#22c55e' }}>
            方法一：官方导出（推荐）
          </h2>
          
          <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>步骤 1: 登录 ChatGPT</h3>
            <p style={{ color: '#888', marginBottom: '16px' }}>
              打开 chat.openai.com 并登录你的账号
            </p>

            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>步骤 2: 进入设置</h3>
            <p style={{ color: '#888', marginBottom: '16px' }}>
              点击左下角 Settings（设置）
            </p>

            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>步骤 3: 导出数据</h3>
            <p style={{ color: '#888', marginBottom: '8px' }}>
              Settings → Data controls → Export data
            </p>
            <p style={{ color: '#666', fontSize: '14px' }}>
              ⚠️ 需要等待 24-48 小时，ChatGPT 会发送邮件通知你
            </p>

            <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '16px' }}>步骤 4: 下载</h3>
            <p style={{ color: '#888' }}>
              收到邮件后，点击链接下载 JSON 文件
            </p>
          </div>
        </section>

        {/* Method 2: Local Extract */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#3b82f6' }}>
            方法二：本地提取（更快）
          </h2>
          
          <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>步骤 1: 打开控制台</h3>
            <p style={{ color: '#888', marginBottom: '16px' }}>
              在 ChatGPT 页面按 <code style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>F12</code> 或 <code style={{ background: '#333', padding: '2px 6px', borderRadius: '4px' }}>右键 → 检查</code>
            </p>

            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>步骤 2: 复制数据</h3>
            <p style={{ color: '#888', marginBottom: '16px' }}>
              在 Console 中输入以下代码并按回车：
            </p>
            <pre style={{ 
              background: '#0a0a0a', 
              padding: '16px', 
              borderRadius: '8px', 
              overflow: 'auto',
              fontSize: '12px',
              color: '#22c55e'
            }}>
{`(function(){var d={};for(var k in localStorage)if(k.includes('conversation'))d[k]=localStorage[k];console.log(JSON.stringify(d));})()`}
            </pre>

            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>步骤 3: 保存</h3>
            <p style={{ color: '#888' }}>
              复制控制台输出的内容，保存为 .json 文件
            </p>
          </div>
        </section>

        {/* Upload */}
        <div style={{ 
          padding: '24px', 
          background: '#1a3a1a', 
          borderRadius: '12px',
          border: '1px solid #22c55e',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#22c55e', marginBottom: '12px' }}>✅ 完成后</h3>
          <p style={{ color: '#888', marginBottom: '16px' }}>
            将文件上传到 MemoryMigrator 完成转换
          </p>
          <Link href="/upload" style={{
            background: '#3b82f6',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            去上传 →
          </Link>
        </div>

        {/* Tips */}
        <div style={{ marginTop: '40px', padding: '20px', background: '#1a1a1a', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#f59e0b' }}>
            💡 小贴士
          </h3>
          <ul style={{ color: '#888', paddingLeft: '20px', margin: 0 }}>
            <li>官方导出更完整，包含所有历史</li>
            <li>本地提取更快，但可能不包含最早的消息</li>
            <li>如果遇到问题，刷新页面重试</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
