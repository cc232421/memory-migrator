# MemoryMigrator 🐋

> Transfer your AI chat history to OpenClaw as long-term memory

English | [中文](#中文)

MemoryMigrator is a web tool that helps you export your AI chat history (ChatGPT, Claude, Kimi, DeepSeek, Qwen, etc.) and convert it into prompts that can be imported into OpenClaw, creating persistent AI memory.

---

## ✨ Features

- **Multi-platform Support**: Supports ChatGPT, Claude, and other AI platforms
- **AI-Powered Analysis**: Automatically extracts key information, user preferences, and knowledge points
- **OpenClaw Ready**: Generates prompts and Skill files specifically for OpenClaw
- **Privacy First**: All processing happens in your browser, no data uploaded to servers
- **Simple Workflow**: Upload → AI Analyze → Export → Import

---

## 🚀 Quick Start

### 1. Visit the Website

Go to: https://memory-migrator.vercel.app

### 2. Export Your Chat History

#### ChatGPT
1. Go to Settings → Data controls
2. Click "Export data"
3. Request export
4. Download JSON file when ready

#### Claude
1. Open your conversation
2. Select all (Ctrl+A / Cmd+A)
3. Copy (Ctrl+C / Cmd+C)
4. Save as .txt file

#### Kimi / DeepSeek / 通义
Use browser developer tools to export or manually copy conversations.

### 3. Upload & Process

1. Go to https://memory-migrator.vercel.app/upload
2. Drag & drop or click to upload your export file
3. Wait for AI analysis

### 4. Import to OpenClaw

1. Copy the generated prompt OR
2. Download the .md file
3. Paste into OpenClaw to create persistent memory

---

## 📖 Usage Guide

### Basic Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Export    │ -> │   Upload    │ -> │ AI Analyze  │ -> │   Import   │
│  AI Chat    │    │   to Tool   │    │  Summary    │    │  OpenClaw  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Generated Output

The tool generates:

1. **Prompt (.md)**: Markdown format with conversation summary
2. **Skill (.json)**: OpenClaw-compatible skill file

---

## 🛠 Technical Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 + React |
| Styling | Inline CSS (no dependencies) |
| AI Processing | OpenAI API (GPT-4o) |
| Deployment | Vercel |
| Testing | Jest (TDD) |

---

## 🧪 Development

### Prerequisites

- Node.js 18+
- npm

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
npm test
```

### Run Locally

```bash
npm run dev
```

Visit http://localhost:3000

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
memory-migrator/
├── src/
│   ├── pages/           # Next.js pages
│   │   ├── index.tsx    # Home page
│   │   ├── upload.tsx   # Upload page
│   │   ├── pricing.tsx  # Pricing page
│   │   └── how-it-works.tsx
│   ├── lib/             # Core logic
│   │   ├── chatgpt-parser.ts
│   │   ├── claude-parser.ts
│   │   ├── ai-summary.ts
│   │   ├── prompt-generator.ts
│   │   ├── export.ts
│   │   └── ui-pages.ts
│   └── __tests__/       # Test files
├── docs/                # Documentation
├── netlify.toml
└── package.json
```

---

## 🧪 Test Coverage

All features developed with TDD methodology:

| Module | Tests | Status |
|--------|-------|--------|
| File Upload | 6 | ✅ PASS |
| ChatGPT Parser | 9 | ✅ PASS |
| Claude Parser | 10 | ✅ PASS |
| AI Summary | 10 | ✅ PASS |
| Preview & Edit | 8 | ✅ PASS |
| Prompt Generator | 9 | ✅ PASS |
| Export | 8 | ✅ PASS |
| Payment | 10 | ✅ PASS |
| UI Pages | 10 | ✅ PASS |

**Total: 80 tests, 100% passing**

---

## 💰 Pricing

- **Single Export**: $5 USD
- One-time payment, no subscription

---

## 🔒 Privacy

- All file processing happens in your browser
- No data is sent to external servers (except OpenAI API for summarization)
- Files are automatically deleted after processing
- You control your data

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin main`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🔗 Links

- **Live Demo**: https://memory-migrator.vercel.app
- **GitHub**: https://github.com/cc232421/memory-migrator
- **OpenClaw**: https://openclaw.ai

---

# 中文

## 简介

MemoryMigrator (记忆迁移官) 是一个帮助用户将 AI 对话历史导出并转换为 OpenClaw 提示词的工具。

## 功能特点

- 支持多种 AI 平台：ChatGPT、Claude、Kimi、DeepSeek、通义等
- AI 智能分析对话内容，提取关键信息
- 生成 OpenClaw 专用的提示词和 Skill 文件
- 隐私优先：所有处理在浏览器本地完成

## 使用方法

1. 访问 https://memory-migrator.vercel.app
2. 导出你的 AI 对话历史（各平台方法不同）
3. 上传文件到工具
4. 复制生成的提示词导入 OpenClaw

## 价格

- **单次导出**: $5 美元
- 一次性付费，无需订阅

## 开发

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 本地开发
npm run dev
```

## 技术栈

- Next.js 14 + React
- TypeScript
- Jest (TDD 测试)
- Vercel 部署

---

Made with ❤️ by [cc232421](https://github.com/cc232421)
