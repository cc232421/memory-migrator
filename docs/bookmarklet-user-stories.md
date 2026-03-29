# Bookmarklet 提取工具 - 用户故事 (User Stories)

## 产品背景
- **产品名**: AI Chat History Extractor (Bookmarklet)
- **核心功能**: 从各 AI 平台本地存储提取对话历史，一键生成可导入 MemoryMigrator 的 JSON 文件
- **目标用户**: 使用 ChatGPT/Claude/Gemini/Kimi/DeepSeek/通义 的用户

---

## Epic 1: 平台检测

### User Story 1.1: 检测当前页面平台
**作为** 用户
**我想** 访问 AI 聊天页面时自动检测是什么平台
**以便** 确定使用哪个提取器

**验收标准**:
- [ ] 访问 chat.openai.com 返回 "chatgpt"
- [ ] 访问 claude.ai 返回 "claude"
- [ ] 访问 gemini.google.com 返回 "gemini"
- [ ] 访问 kimi.moonshot.cn 返回 "kimi"
- [ ] 访问 chat.deepseek.com 返回 "deepseek"
- [ ] 访问 tongyi.aliyun.com 返回 "tongyi"
- [ ] 访问未知页面返回 "unknown"

---

## Epic 2: 数据提取

### User Story 2.1: 从 LocalStorage 提取数据
**作为** 系统
**我想** 从 LocalStorage 提取对话数据
**以便** 获取用户的聊天历史

**验收标准**:
- [ ] 能读取 LocalStorage 中的键值对
- [ ] 能处理空数据情况
- [ ] 能处理无效 JSON

### User Story 2.2: ChatGPT 数据提取
**作为** 用户
**我想** 从 ChatGPT 页面提取对话历史
**以便** 导出到 MemoryMigrator

**验收标准**:
- [ ] 能检测 ChatGPT 的存储 key
- [ ] 能解析对话结构
- [ ] 能提取消息内容、时间、角色

### User Story 2.3: Claude 数据提取
**作为** 用户
**我想** 从 Claude 页面提取对话历史
**以便** 导出到 MemoryMigrator

**验收标准**:
- [ ] 能检测 Claude 的存储 key
- [ ] 能解析对话结构
- [ ] 能提取消息内容、时间、角色

### User Story 2.4: Gemini 数据提取
**作为** 用户
**我想** 从 Gemini 页面提取对话历史
**以便** 导出到 MemoryMigrator

**验收标准**:
- [ ] 能检测 Gemini 的存储 key
- [ ] 能解析对话结构
- [ ] 能提取消息内容、时间、角色

---

## Epic 3: 格式转换

### User Story 3.1: 统一格式转换
**作为** 系统
**我想** 将各平台数据转换为统一格式
**以便** MemoryMigrator 可以统一处理

**验收标准**:
- [ ] 输出包含 platform 字段
- [ ] 输出包含 timestamp 字段
- [ ] 输出包含 conversations 数组
- [ ] 每个对话包含 id、title、messages
- [ ] 每条消息包含 role、content、time

---

## Epic 4: Bookmarklet 生成

### User Story 4.1: 生成可执行 Bookmarklet
**作为** 用户
**我想** 获取一个可拖到书签栏的 Bookmarklet
**以便** 一键提取当前页面数据

**验收标准**:
- [ ] 生成可复制的 JavaScript 代码
- [ ] 代码可以放入 href 属性
- [ ] 包含所有提取逻辑
- [ ] 触发文件下载

### User Story 4.2: 生成各平台 Bookmarklet
**作为** 用户
**我想** 获取针对特定平台的 Bookmarklet
**以便** 在对应页面使用

**验收标准**:
- [ ] ChatGPT 版本可独立使用
- [ ] Claude 版本可独立使用
- [ ] Gemini 版本可独立使用
- [ ] 通用版本可自动检测

---

## 优先级排序

| 优先级 | Epic | User Story | 预估故事点 |
|--------|------|------------|------------|
| P0 | Epic 1 | 1.1 平台检测 | 3 |
| P1 | Epic 2 | 2.1 LocalStorage 基础 | 2 |
| P1 | Epic 2 | 2.2 ChatGPT 提取 | 5 |
| P2 | Epic 2 | 2.3 Claude 提取 | 3 |
| P2 | Epic 2 | 2.4 Gemini 提取 | 3 |
| P1 | Epic 3 | 3.1 格式转换 | 3 |
| P1 | Epic 4 | 4.1 Bookmarklet 生成 | 5 |
| P2 | Epic 4 | 4.2 各平台版本 | 3 |

---

## 技术约束

1. **KISS 原则**: 每个函数职责单一
2. **高内聚低耦合**: 平台提取器独立，格式转换统一
3. **测试覆盖**: 100% 覆盖率
4. **不影响现有功能**: 新模块与旧代码解耦

---

## 验收标准汇总

### MVP (前3轮迭代)
- [ ] 平台检测功能 (6 tests)
- [ ] ChatGPT 提取器 (8 tests)
- [ ] 统一格式转换 (8 tests)
- [ ] Bookmarklet 生成 (6 tests)

### 完整版
- [ ] Claude 提取器 (6 tests)
- [ ] Gemini 提取器 (6 tests)
- [ ] 各平台独立版本 (6 tests)
