import Head from 'next/head';
import Link from 'next/link';
import { PRICING } from '../lib/ui-pages';

export default function Pricing() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0a0a0a',
      color: '#fff',
      padding: '40px 20px'
    }}>
      <Head>
        <title>Pricing - MemoryMigrator</title>
      </Head>

      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>← Back</Link>
        
        <h1 style={{ fontSize: '36px', marginTop: '20px', marginBottom: '40px', textAlign: 'center' }}>
          Pricing
        </h1>

        {/* Main Pricing Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', 
          borderRadius: '16px', 
          padding: '48px',
          textAlign: 'center',
          border: '1px solid #333',
          marginBottom: '32px'
        }}>
          <p style={{ color: '#888', marginBottom: '16px', fontSize: '18px' }}>
            Single Export
          </p>
          <p style={{ fontSize: '64px', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>
            ${PRICING.price / 100}
          </p>
          <p style={{ color: '#666', marginBottom: '32px' }}>one-time payment</p>

          <ul style={{ textAlign: 'left', color: '#ccc', marginBottom: '32px', listStyle: 'none', padding: 0 }}>
            {PRICING.features.map((feature, i) => (
              <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#22c55e', marginRight: '12px' }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <Link href="/upload">
            <button style={{
              background: '#3b82f6',
              color: '#fff',
              border: 'none',
              padding: '16px 48px',
              fontSize: '18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              width: '100%'
            }}>
              Get Started
            </button>
          </Link>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>FAQ</h2>
          
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#fff', marginBottom: '8px' }}>Is this a subscription?</h3>
            <p style={{ color: '#888' }}>No, it's a one-time payment. Pay $5 per export.</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#fff', marginBottom: '8px' }}>What payment methods do you accept?</h3>
            <p style={{ color: '#888' }}>We accept all major credit cards through Stripe.</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#fff', marginBottom: '8px' }}>Can I get a refund?</h3>
            <p style={{ color: '#888' }}>Yes, within 7 days if the export fails.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
