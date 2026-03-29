import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { validateFileExtension, validateFileSize, validateFile, getFileMetadata } from '../lib/file-validation';
import { parseChatGPTExport, isChatGPTFormat } from '../lib/chatgpt-parser';
import { parseClaudeText, isClaudeFormat } from '../lib/claude-parser';
import { generateSummary } from '../lib/ai-summary';
import { generatePrompt } from '../lib/prompt-generator';
import { exportAsMarkdown, exportSkill, copyToClipboard } from '../lib/export';
import { UPLOAD_CONFIG, UPLOAD_STATES } from '../lib/ui-pages';
import { ChatGPTConversation } from '../lib/chatgpt-parser';
import { ConversationSummary } from '../lib/ai-summary';

export default function Upload() {
  const [state, setState] = useState<'idle' | 'uploading' | 'processing' | 'ready' | 'error'>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [conversation, setConversation] = useState<ChatGPTConversation | null>(null);
  const [summary, setSummary] = useState<ConversationSummary | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError('');

    // Validate
    const metadata = getFileMetadata(selectedFile);
    const validation = validateFile(metadata);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      setState('error');
      return;
    }

    setState('uploading');

    try {
      const text = await selectedFile.text();
      
      // Try to detect format
      let conv: any = null;
      
      if (isChatGPTFormat(JSON.parse(text))) {
        const result = parseChatGPTExport(JSON.parse(text));
        if (result.success) conv = result.conversation;
      } else if (isClaudeFormat(text)) {
        const result = parseClaudeText(text);
        if (result.success) conv = result.conversation;
      }

      if (!conv) {
        setError('Unable to parse file. Please check the format.');
        setState('error');
        return;
      }

      setConversation(conv);
      setState('processing');

      // Generate summary
      const summaryResult = await generateSummary(conv as ChatGPTConversation);
      if (!summaryResult.success) {
        setError(summaryResult.error || 'Failed to generate summary');
        setState('error');
        return;
      }

      setSummary(summaryResult.summary!);
      
      // Generate prompt
      const generatedPrompt = generatePrompt(summaryResult.summary!, conv as ChatGPTConversation);
      setPrompt(generatedPrompt);
      
      setState('ready');
    } catch (err) {
      setError('Failed to process file');
      setState('error');
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!conversation || !summary) return;
    const { content, filename } = exportAsMarkdown(summary, conversation);
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadSkill = () => {
    if (!conversation || !summary) return;
    const { content, filename } = exportSkill(summary, conversation);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#0a0a0a',
      color: '#fff',
      padding: '40px 20px'
    }}>
      <Head>
        <title>Upload - MemoryMigrator</title>
      </Head>

      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>← Back</Link>
        
        <h1 style={{ fontSize: '32px', marginTop: '20px', marginBottom: '40px' }}>Upload Export File</h1>

        {/* Upload Area */}
        {state !== 'ready' && (
          <div style={{
            border: '2px dashed #333',
            borderRadius: '12px',
            padding: '60px 20px',
            textAlign: 'center',
            background: '#1a1a1a'
          }}>
            <input
              type="file"
              accept=".json,.txt"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
              <p style={{ color: '#ccc', marginBottom: '8px' }}>
                Click to upload or drag and drop
              </p>
              <p style={{ color: '#666', fontSize: '14px' }}>
                {UPLOAD_CONFIG.allowedTypes.join(', ')} up to {UPLOAD_CONFIG.maxSize / 1024 / 1024}MB
              </p>
            </label>
          </div>
        )}

        {/* Processing State */}
        {state === 'uploading' && (
          <p style={{ color: '#3b82f6', marginTop: '20px' }}>Uploading...</p>
        )}

        {state === 'processing' && (
          <p style={{ color: '#3b82f6', marginTop: '20px' }}>🤖 Processing with AI...</p>
        )}

        {/* Error State */}
        {error && (
          <div style={{ 
            background: '#451a1a', 
            border: '1px solid #ef4444',
            borderRadius: '8px', 
            padding: '16px', 
            marginTop: '20px',
            color: '#fca5a5'
          }}>
            {error}
          </div>
        )}

        {/* Success State */}
        {state === 'ready' && summary && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ 
              background: '#1a3a1a', 
              border: '1px solid #22c55e',
              borderRadius: '8px', 
              padding: '16px',
              marginBottom: '20px',
              color: '#86efac'
            }}>
              ✅ Export ready!
            </div>

            {/* Summary Preview */}
            <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '16px' }}>📋 Summary</h3>
              <div style={{ color: '#ccc', lineHeight: '1.8' }}>
                <p><strong style={{ color: '#fff' }}>🎯 需求:</strong> {summary.userNeeds}</p>
                <p><strong style={{ color: '#fff' }}>💡 方案:</strong> {summary.aiSolutions.slice(0, 200)}...</p>
                <p><strong style={{ color: '#fff' }}>👤 偏好:</strong> {summary.userPreferences}</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={handleCopy}
                style={{
                  background: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                {copied ? '✅ Copied!' : '📋 Copy Prompt'}
              </button>
              
              <button 
                onClick={handleDownload}
                style={{
                  background: '#22c55e',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ⬇️ Download .md
              </button>

              <button 
                onClick={handleDownloadSkill}
                style={{
                  background: '#8b5cf6',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                📦 Download Skill
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
