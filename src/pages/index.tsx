import Head from 'next/head';
import Link from 'next/link';
import { PRICING, getValueProposition, getHomepageCTA } from '../lib/ui-pages';

export default function Home() {
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
      </Head>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 20px' }}>
        {/* Hero Section */}
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '20px' }}>
            🐋 MemoryMigrator
          </h1>
          <p style={{ fontSize: '20px', color: '#888', marginBottom: '40px' }}>
            {getValueProposition()}
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
              {getHomepageCTA()}
            </button>
          </Link>
        </header>

        {/* Features */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          {PRICING.features.map((feature, i) => (
            <div key={i} style={{
              background: '#1a1a1a',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #333'
            }}>
              <span style={{ fontSize: '24px', marginRight: '8px' }}>
                {i === 0 ? '💬' : i === 1 ? '🧠' : i === 2 ? '🤖' : i === 3 ? '📝' : '📦'}
              </span>
              <p style={{ color: '#ccc', margin: '12px 0 0' }}>{feature}</p>
            </div>
          ))}
        </section>

        {/* Pricing */}
        <section style={{ textAlign: 'center', padding: '40px', background: '#1a1a1a', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Pricing</h2>
          <p style={{ fontSize: '48px', fontWeight: '700', color: '#3b82f6' }}>
            ${PRICING.price / 100}
          </p>
          <p style={{ color: '#666', marginTop: '8px' }}>per export</p>
        </section>

        {/* Navigation */}
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '60px' }}>
          <Link href="/how-it-works" style={{ color: '#666', textDecoration: 'none' }}>How It Works</Link>
          <Link href="/pricing" style={{ color: '#666', textDecoration: 'none' }}>Pricing</Link>
          <Link href="/upload" style={{ color: '#666', textDecoration: 'none' }}>Upload</Link>
        </nav>
      </main>
    </div>
  );
}
