/**
 * Bookmarklet Generator
 * User Story 4.1: 生成可执行 Bookmarklet
 */

import { Platform, detectPlatform } from './platform-detector';
import { formatToUnified, toJSON, generateFilename } from './formatter';
import { extractChatGPT } from './extractors/chatgpt';

/**
 * Core extraction logic - reads from localStorage
 * This is what gets embedded in the bookmarklet
 */
function createCoreScript(): string {
  return `
(function() {
  // Platform detection
  var hostname = window.location.hostname;
  var platform = 'unknown';
  
  if (hostname.includes('openai.com')) platform = 'chatgpt';
  else if (hostname.includes('claude.ai')) platform = 'claude';
  else if (hostname.includes('gemini.google.com')) platform = 'gemini';
  else if (hostname.includes('kimi.moonshot.cn')) platform = 'kimi';
  else if (hostname.includes('deepseek.com')) platform = 'deepseek';
  else if (hostname.includes('aliyun.com') && hostname.includes('tongyi')) platform = 'tongyi';
  
  // Collect all localStorage data
  var data = {};
  try {
    for (var key in localStorage) {
      if (localStorage.hasOwnProperty(key) && typeof localStorage[key] === 'string') {
        try {
          data[key] = JSON.parse(localStorage[key]);
        } catch {
          data[key] = localStorage[key];
        }
      }
    }
  } catch(e) {
    console.error('Error reading localStorage:', e);
  }
  
  // Platform-specific extraction
  var conversations = [];
  var timestamp = new Date().toISOString();
  
  if (platform === 'chatgpt') {
    // ChatGPT extraction logic
    var sessions = data['SessionsV2'] || [];
    var conversationsData = data['conversation'] || {};
    
    if (typeof sessions === 'string') {
      try { sessions = JSON.parse(sessions); } catch {}
    }
    
    if (Array.isArray(sessions)) {
      conversations = sessions.map(function(session) {
        var convData = conversationsData[session.id] || {};
        var messages = [];
        
        var mapping = convData.mapping || {};
        for (var msgId in mapping) {
          var msg = mapping[msgId];
          if (msg && msg.message && (msg.message.role === 'user' || msg.message.role === 'assistant')) {
            var content = msg.message.content;
            var text = Array.isArray(content.parts) ? content.parts.join('') : content.text || '';
            messages.push({
              role: msg.message.role,
              content: text,
              time: msg.message.create_time || 0
            });
          }
        }
        
        return {
          id: session.id,
          title: session.title || 'Untitled',
          messages: messages
        };
      });
    }
  }
  
  // Build output
  var output = {
    platform: platform,
    timestamp: timestamp,
    conversations: conversations
  };
  
  // Download
  var json = JSON.stringify(output, null, 2);
  var blob = new Blob([json], {type: 'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'ai-history-' + platform + '-' + new Date().toISOString().slice(0,10) + '.json';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
  
  // Show feedback
  alert('Extracted ' + conversations.length + ' conversations from ' + platform);
})();
  `.trim();
}

/**
 * Generate bookmarklet code
 */
export function generateBookmarklet(): string {
  const script = createCoreScript();
  return `javascript:${script}`;
}

/**
 * Generate bookmarklet for specific platform
 */
export function generatePlatformBookmarklet(platform: Platform): string {
  // For now, use auto-detection version
  // Could return platform-specific optimized version
  return generateBookmarklet();
}

/**
 * Generate bookmarklet href for HTML
 */
export function generateBookmarkletHref(title: string = 'Extract AI History'): string {
  const bookmarklet = generateBookmarklet();
  return bookmarklet;
}

/**
 * Generate bookmarklet with custom title
 */
export function createBookmarkletLink(title: string, platform?: Platform): {
  title: string;
  href: string;
  platform?: Platform;
} {
  return {
    title,
    href: platform ? generatePlatformBookmarklet(platform) : generateBookmarklet(),
    platform,
  };
}

/**
 * Generate all platform bookmarklets
 */
export function generateAllPlatformBookmarklets(): Array<{ platform: Platform; title: string; href: string }> {
  const platforms: Platform[] = ['chatgpt', 'claude', 'gemini', 'kimi', 'deepseek', 'tongyi'];
  
  return platforms.map(platform => ({
    platform,
    title: `Extract ${platform} History`,
    href: generatePlatformBookmarklet(platform),
  }));
}

/**
 * Create HTML for bookmarklet links
 */
export function createBookmarkletHTML(): string {
  const bookmarklets = generateAllPlatformBookmarklets();
  
  let html = '<h2>AI History Extractor</h2>';
  html += '<p>Drag these links to your bookmarks bar:</p>';
  html += '<ul>';
  
  for (const bm of bookmarklets) {
    html += `<li><a href="${bm.href}" title="${bm.title}">${bm.title}</a></li>`;
  }
  
  html += '</ul>';
  
  return html;
}

/**
 * Minify script for production (remove whitespace)
 */
export function minifyScript(script: string): string {
  return script
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,()])\s*/g, '$1')
    .trim();
}
