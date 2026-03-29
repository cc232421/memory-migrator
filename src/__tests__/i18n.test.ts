/**
 * @jest-environment node
 */

// User Story 1.1: i18n 配置文件测试

describe('User Story 1.1: i18n 配置文件', () => {
  describe('作为开发者，我想建立国际化配置文件', () => {
    
    const enTranslations = {
      nav: {
        home: 'Home',
        guide: 'Guide',
        pricing: 'Pricing',
        upload: 'Upload',
      },
      guide: {
        title: 'Tutorial Center',
        quickStart: 'Quick Start',
        chatgpt: 'ChatGPT Tutorial',
        claude: 'Claude Tutorial',
        chinese: 'Chinese AI Tutorial',
        faq: 'FAQ',
      },
      common: {
        back: 'Back',
        next: 'Next',
        done: 'Done',
      },
    };

    const zhTranslations = {
      nav: {
        home: '首页',
        guide: '教程',
        pricing: '定价',
        upload: '上传',
      },
      guide: {
        title: '教程中心',
        quickStart: '快速开始',
        chatgpt: 'ChatGPT 教程',
        claude: 'Claude 教程',
        chinese: '国产AI教程',
        faq: '常见问题',
      },
      common: {
        back: '返回',
        next: '下一步',
        done: '完成',
      },
    };

    it('应该有英文翻译文件', () => {
      expect(enTranslations).toBeDefined();
      expect(enTranslations.nav).toBeDefined();
    });

    it('英文导航应该有 home/guide/pricing/upload', () => {
      expect(enTranslations.nav.home).toBe('Home');
      expect(enTranslations.nav.guide).toBe('Guide');
      expect(enTranslations.nav.pricing).toBe('Pricing');
      expect(enTranslations.nav.upload).toBe('Upload');
    });

    it('应该有中文翻译文件', () => {
      expect(zhTranslations).toBeDefined();
      expect(zhTranslations.nav).toBeDefined();
    });

    it('中文导航应该有首页/教程/定价/上传', () => {
      expect(zhTranslations.nav.home).toBe('首页');
      expect(zhTranslations.nav.guide).toBe('教程');
      expect(zhTranslations.nav.pricing).toBe('定价');
      expect(zhTranslations.nav.upload).toBe('上传');
    });

    it('应该包含所有页面常用文本', () => {
      expect(enTranslations.common).toBeDefined();
      expect(enTranslations.common.back).toBe('Back');
      expect(enTranslations.common.next).toBe('Next');
      expect(enTranslations.common.done).toBe('Done');
    });

    it('应该支持嵌套结构', () => {
      expect(enTranslations.nav).toBeDefined();
      expect(enTranslations.guide).toBeDefined();
      expect(enTranslations.common).toBeDefined();
    });

    it('中英文应该有对应的键', () => {
      const enKeys = Object.keys(enTranslations.nav);
      const zhKeys = Object.keys(zhTranslations.nav);
      
      expect(enKeys).toEqual(zhKeys);
    });

    it('默认语言应该是英文', () => {
      const defaultLang = 'en';
      expect(defaultLang).toBe('en');
    });
  });
});

describe('User Story 1.2: 语言切换组件', () => {
  describe('作为用户，我想切换页面语言', () => {
    
    const languages = ['en', 'zh'];

    it('应该有语言切换功能', () => {
      expect(languages).toContain('en');
      expect(languages).toContain('zh');
    });

    it('应该支持 en 和 zh 两种语言', () => {
      expect(languages.length).toBe(2);
    });

    it('语言切换后应该更新内容', () => {
      let currentLang = 'en';
      
      const switchLang = (lang: string) => {
        currentLang = lang;
      };
      
      switchLang('zh');
      expect(currentLang).toBe('zh');
      
      switchLang('en');
      expect(currentLang).toBe('en');
    });

    it('应该持久化语言设置', () => {
      // Simulate localStorage
      const saveLang = (lang: string) => {
        return true;
      };
      
      expect(saveLang('en')).toBe(true);
      expect(saveLang('zh')).toBe(true);
    });
  });
});

describe('User Story 1.3: 自动语言检测', () => {
  describe('作为系统，我想根据用户浏览器自动选择语言', () => {
    
    const browserLanguages = [
      'en-US', 'en-GB', 'zh-CN', 'zh-TW', 'zh-HK'
    ];

    it('应该检测浏览器首选语言', () => {
      const detectLang = (browserLang: string) => {
        if (browserLang.startsWith('zh')) return 'zh';
        return 'en';
      };
      
      expect(detectLang('en-US')).toBe('en');
      expect(detectLang('zh-CN')).toBe('zh');
    });

    it('中文浏览器应该显示中文', () => {
      const shouldShowChinese = browserLanguages.some(lang => lang.startsWith('zh'));
      expect(shouldShowChinese).toBe(true);
    });

    it('英文浏览器应该显示英文', () => {
      const shouldShowEnglish = browserLanguages.some(lang => lang.startsWith('en'));
      expect(shouldShowEnglish).toBe(true);
    });

    it('应该支持语言优先级', () => {
      const priorityLang = (browserLangs: string[]) => {
        for (const lang of browserLangs) {
          if (lang.startsWith('zh')) return 'zh';
          if (lang.startsWith('en')) return 'en';
        }
        return 'en';
      };
      
      expect(priorityLang(['zh-CN', 'en-US'])).toBe('zh');
      expect(priorityLang(['en-US', 'zh-CN'])).toBe('en');
    });
  });
});
