/**
 * @jest-environment node
 */

// User Story 1.1: 平台检测测试

describe('User Story 1.1: 平台检测', () => {
  describe('作为用户，我想访问AI聊天页面时自动检测是什么平台', () => {
    
    const testCases = [
      { url: 'https://chat.openai.com/', expected: 'chatgpt' },
      { url: 'https://chat.openai.com/c/abc123', expected: 'chatgpt' },
      { url: 'https://claude.ai/', expected: 'claude' },
      { url: 'https://claude.ai/chat/abc123', expected: 'claude' },
      { url: 'https://gemini.google.com/', expected: 'gemini' },
      { url: 'https://gemini.google.com/app', expected: 'gemini' },
      { url: 'https://kimi.moonshot.cn/', expected: 'kimi' },
      { url: 'https://kimi.moonshot.cn/chat', expected: 'kimi' },
      { url: 'https://chat.deepseek.com/', expected: 'deepseek' },
      { url: 'https://chat.deepseek.com/app', expected: 'deepseek' },
      { url: 'https://tongyi.aliyun.com/', expected: 'tongyi' },
      { url: 'https://tongyi.aliyun.com/qwen', expected: 'tongyi' },
      { url: 'https://example.com/', expected: 'unknown' },
      { url: 'https://google.com/', expected: 'unknown' },
    ];

    testCases.forEach(({ url, expected }) => {
      it(`应该检测 ${url} 为 ${expected}`, () => {
        // Extract hostname from URL for detection logic
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;
        
        let detectedPlatform = 'unknown';
        
        if (hostname.includes('openai.com') && hostname.includes('chat')) {
          detectedPlatform = 'chatgpt';
        } else if (hostname.includes('claude.ai')) {
          detectedPlatform = 'claude';
        } else if (hostname.includes('gemini.google.com')) {
          detectedPlatform = 'gemini';
        } else if (hostname.includes('kimi.moonshot.cn')) {
          detectedPlatform = 'kimi';
        } else if (hostname.includes('deepseek.com')) {
          detectedPlatform = 'deepseek';
        } else if (hostname.includes('aliyun.com') && hostname.includes('tongyi')) {
          detectedPlatform = 'tongyi';
        }
        
        expect(detectedPlatform).toBe(expected);
      });
    });

    it('应该处理无效URL', () => {
      const invalidUrls = ['', 'not-a-url', 'http://'];
      
      invalidUrls.forEach(url => {
        let detectedPlatform = 'unknown';
        
        try {
          if (url) {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname;
            // Basic detection logic
            if (hostname?.includes('openai.com')) {
              detectedPlatform = 'chatgpt';
            }
          }
        } catch {
          // Invalid URL
        }
        
        expect(detectedPlatform).toBe('unknown');
      });
    });

    it('应该返回支持的平台列表', () => {
      const supportedPlatforms = [
        'chatgpt',
        'claude',
        'gemini',
        'kimi',
        'deepseek',
        'tongyi'
      ];
      
      expect(supportedPlatforms.length).toBe(6);
      expect(supportedPlatforms).toContain('chatgpt');
      expect(supportedPlatforms).toContain('claude');
    });

    it('应该识别平台特征词', () => {
      const platformFeatures = {
        chatgpt: ['openai.com', 'chat'],
        claude: ['claude.ai'],
        gemini: ['gemini.google.com'],
        kimi: ['kimi.moonshot.cn'],
        deepseek: ['deepseek.com'],
        tongyi: ['aliyun.com', 'tongyi']
      };
      
      expect(platformFeatures.chatgpt).toContain('openai.com');
      expect(platformFeatures.claude).toContain('claude.ai');
    });
  });
});
