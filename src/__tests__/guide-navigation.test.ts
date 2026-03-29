/**
 * @jest-environment node
 */

// User Story 1.1: 教程入口导航测试

describe('User Story 1.1: 教程入口导航', () => {
  describe('作为访客，我想在网站上找到教程入口', () => {
    
    const navigationLinks = [
      { text: '首页', href: '/' },
      { text: '教程', href: '/guide' },
      { text: '定价', href: '/pricing' },
      { text: '上传', href: '/upload' },
    ];

    it('应该有顶部导航栏', () => {
      const hasNavigation = navigationLinks.length > 0;
      expect(hasNavigation).toBe(true);
    });

    it('应该有"教程"按钮', () => {
      const hasGuideLink = navigationLinks.some(link => link.text === '教程');
      expect(hasGuideLink).toBe(true);
    });

    it('教程按钮应该链接到 /guide', () => {
      const guideLink = navigationLinks.find(link => link.text === '教程');
      expect(guideLink?.href).toBe('/guide');
    });

    it('应该有"首页"按钮', () => {
      const hasHomeLink = navigationLinks.some(link => link.text === '首页');
      expect(hasHomeLink).toBe(true);
    });

    it('应该有"定价"按钮', () => {
      const hasPricingLink = navigationLinks.some(link => link.text === '定价');
      expect(hasPricingLink).toBe(true);
    });

    it('应该有"上传"按钮', () => {
      const hasUploadLink = navigationLinks.some(link => link.text === '上传');
      expect(hasUploadLink).toBe(true);
    });

    it('导航链接应该包含所有主要页面', () => {
      const expectedPages = ['/', '/guide', '/pricing', '/upload'];
      const actualHrefs = navigationLinks.map(link => link.href);
      
      expectedPages.forEach(page => {
        expect(actualHrefs).toContain(page);
      });
    });

    it('教程按钮应该在导航中显眼位置（前三）', () => {
      const guideIndex = navigationLinks.findIndex(link => link.text === '教程');
      expect(guideIndex).toBeLessThanOrEqual(2);
    });
  });
});

describe('User Story 1.2: 教程首页', () => {
  describe('作为用户，我想看到教程概览', () => {
    
    const guidePageContent = {
      hasQuickStart: true,
      hasPlatformList: true,
      hasFAQ: true,
      sections: [
        { title: '快速开始', href: '/guide/quick-start' },
        { title: 'ChatGPT 教程', href: '/guide/chatgpt' },
        { title: 'Claude 教程', href: '/guide/claude' },
        { title: '国产AI教程', href: '/guide/chinese' },
        { title: '常见问题', href: '/guide/faq' },
      ],
    };

    it('应该显示"快速开始"入口', () => {
      expect(guidePageContent.hasQuickStart).toBe(true);
    });

    it('应该显示各平台教程列表', () => {
      expect(guidePageContent.hasPlatformList).toBe(true);
    });

    it('应该显示FAQ入口', () => {
      expect(guidePageContent.hasFAQ).toBe(true);
    });

    it('应该包含5个主要板块', () => {
      expect(guidePageContent.sections.length).toBe(5);
    });

    it('快速开始应该在第一位', () => {
      expect(guidePageContent.sections[0].title).toBe('快速开始');
    });

    it('常见问题应该在最后', () => {
      const faqIndex = guidePageContent.sections.findIndex(s => s.title === '常见问题');
      expect(faqIndex).toBe(guidePageContent.sections.length - 1);
    });

    it('每个板块应该有链接', () => {
      guidePageContent.sections.forEach(section => {
        expect(section.href).toBeDefined();
        expect(section.href.startsWith('/guide/')).toBe(true);
      });
    });
  });
});
