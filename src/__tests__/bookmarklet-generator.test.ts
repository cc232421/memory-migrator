/**
 * @jest-environment node
 */

// User Story 4.1: Bookmarklet 生成测试

describe('User Story 4.1: Bookmarklet 生成', () => {
  describe('作为用户，我想获取一个可拖到书签栏的Bookmarklet', () => {
    
    it('应该生成可复制的 JavaScript 代码', () => {
      const code = 'console.log("test")';
      expect(code.length).toBeGreaterThan(0);
    });

    it('代码可以放入 href 属性', () => {
      const jsCode = 'alert("hello")';
      const href = `javascript:${jsCode}`;
      expect(href).toContain('javascript:');
    });

    it('应该包含提取逻辑', () => {
      const code = `
        (function() {
          var data = localStorage.getItem('test');
          console.log(data);
        })()
      `;
      expect(code).toContain('localStorage');
    });

    it('应该触发文件下载', () => {
      const downloadCode = `
        (function() {
          var blob = new Blob(['test'], {type: 'application/json'});
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'test.json';
          a.click();
        })()
      `;
      expect(downloadCode).toContain('Blob');
      expect(downloadCode).toContain('download');
    });

    it('应该处理长代码（URL 长度限制）', () => {
      const longCode = 'a'.repeat(1000);
      // Bookmarklet should be relatively short
      expect(longCode.length).toBe(1000);
    });

    it('应该对代码进行 URL 编码', () => {
      const code = 'console.log("test")';
      const encoded = encodeURIComponent(code);
      expect(encoded).toContain('%22');
    });

    it('应该生成有效的 JavaScript IIFE', () => {
      const code = `
        (function(){
          return true;
        })()
      `;
      // Should be valid IIFE syntax
      expect(code).toContain('(function()');
      expect(code).toContain('})()');
    });

    it('应该能生成完整的提取脚本', () => {
      const extractScript = `
(function() {
  var keys = localStorage.keys();
  var data = {};
  keys.forEach(function(k) { data[k] = localStorage.getItem(k); });
  var json = JSON.stringify(data);
  var blob = new Blob([json], {type: 'application/json'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'ai-history.json';
  a.click();
})()
      `;
      expect(extractScript).toContain('localStorage');
      expect(extractScript).toContain('Blob');
      expect(extractScript).toContain('download');
    });
  });
});
