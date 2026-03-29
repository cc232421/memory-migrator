import Head from 'next/head';
import Link from 'next/link';
import { getAllTutorials } from '../lib/ui-pages';

export default function HowItWorks() {
  const tutorials = getAllTutorials();

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0a0a0a',
      color: '#fff',
      padding: '40px 20px'
    }}>
      <Head>
        <title>How It Works - MemoryMigrator</title>
      </Head>

      <main style={{ maxWidth: '700px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>← Back</Link>
        
        <h1 style={{ fontSize: '36px', marginTop: '20px', marginBottom: '40px' }}>How It Works</h1>

        {/* How it Works */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#3b82f6' }}>How It Works</h2>
          <ol style={{ color: '#ccc', lineHeight: '2', paddingLeft: '20px' }}>
            <li>Export your chat history from ChatGPT or Claude</li>
            <li>Upload the export file to MemoryMigrator</li>
            <li>Our AI analyzes and summarizes your conversation</li>
            <li>Copy the generated prompt or download as file</li>
            <li>Import to OpenClaw as long-term memory</li>
          </ol>
        </section>

        {/* ChatGPT Tutorial */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
            💬 ChatGPT Export Guide
          </h2>
          <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '24px' }}>
            {tutorials.chatgpt.map((step, i) => (
              <p key={i} style={{ color: '#ccc', marginBottom: '8px' }}>{step}</p>
            ))}
          </div>
        </section>

        {/* Claude Tutorial */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
            🧠 Claude Export Guide
          </h2>
          <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '24px' }}>
            {tutorials.claude.map((step, i) => (
              <p key={i} style={{ color: '#ccc', marginBottom: '8px' }}>{step}</p>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
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
              Start Migration →
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
