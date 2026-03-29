# MemoryMigrator - 部署指南

## 已完成

✅ Next.js 项目构建成功
✅ 生成静态页面: /, /how-it-works, /upload

## Netlify 部署步骤

由于需要用户授权，请在本地终端执行以下命令：

### 1. 登录 Netlify
```bash
netlify login
```
这会打开浏览器进行授权。

### 2. 进入项目目录
```bash
cd /home/admin/.openclaw/workspace-telecom/MemoryMigrator
```

### 3. 初始化 Netlify
```bash
netlify init
```
按照提示创建新站点或连接现有站点。

### 4. 部署到生产环境
```bash
netlify deploy --prod
```

---

## 备选方案: 手动部署

如果不想用 Netlify CLI，也可以：

1. 将 `.next` 目录打包
2. 在 Netlify Dashboard 手动上传
3. 或者使用 Drag & Drop 部署

---

## 项目文件

```
MemoryMigrator/
├── .next/           # 构建输出 (已生成)
├── src/
│   ├── pages/       # Next.js 页面
│   │   ├── index.tsx
│   │   ├── upload.tsx
│   │   └── how-it-works.tsx
│   ├── lib/         # 核心功能
│   └── __tests__/  # 测试
├── netlify.toml     # Netlify 配置
└── package.json
```
