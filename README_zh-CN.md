<div align="center">

# Tynote

**现代化桌面笔记应用**

[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue.svg)](https://tauri.app/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[English](README.md) | [简体中文](README_zh-CN.md)

</div>

---

> ⚠️ **开发状态**：本项目目前正在积极开发中。功能和 API 可能会发生变化。请谨慎在生产环境中使用。

## 📖 项目简介

Tynote 是一款基于 Tauri 2 和 React 19 构建的强大桌面笔记应用。它结合了原生应用的性能和 Web 技术的灵活性，提供了无缝的笔记体验，并配备了 AI 聊天、多种待办视图和智能搜索等高级功能。

## ✨ 功能特性

### 当前功能
- 📝 **丰富的笔记管理** - 轻松创建、编辑和组织笔记
- ⭐ **收藏笔记** - 快速访问您喜爱的笔记，支持过滤和标签
- ✅ **高级待办系统** - 支持列表、表格、看板、日历和甘特图等多种视图
- 🔗 **快速链接** - 可自定义的常用资源快速访问
- 🔍 **全局搜索** - 快速智能地搜索所有笔记
- 🤖 **AI 聊天集成** - 内置 AI 助手提升生产力
- 📥 **收件箱系统** - 捕获和组织突发的想法和灵感
- 🎨 **现代化界面** - 精美的界面设计，支持深色模式
- 🖥️ **跨平台** - 支持 Windows、macOS 和 Linux 的原生桌面应用

### 计划功能
- 📱 移动端配套应用
- ☁️ 云端同步
- 🔐 端到端加密
- 📊 高级分析和洞察
- 🔌 插件系统支持扩展
- 📤 导出为多种格式（PDF、Markdown、HTML）

## 🛠️ 技术栈

### 前端
- **框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **样式**: Tailwind CSS 4
- **UI 组件**: Radix UI + shadcn/ui 模式
- **状态管理**: Zustand（全局）+ Jotai（局部）
- **路由**: React Router v7
- **拖拽**: @dnd-kit
- **图标**: Lucide React
- **日期处理**: date-fns
- **通知**: Sonner

### 后端
- **桌面框架**: Tauri 2
- **语言**: Rust
- **API**: Tauri Commands

### 开发工具
- **包管理器**: pnpm
- **类型检查**: TypeScript 5.8
- **代码质量**: ESLint + Prettier（推荐）

## 🚀 快速开始

### 前置要求

开始之前，请确保已安装以下工具：
- [Node.js](https://nodejs.org/)（v18 或更高版本）
- [pnpm](https://pnpm.io/)（v8 或更高版本）
- [Rust](https://www.rust-lang.org/)（最新稳定版）
- 您平台的 [Tauri 前置要求](https://tauri.app/v2/guides/prerequisites/)

### 安装步骤

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/tynote.git
cd tynote
```

2. 安装依赖：
```bash
pnpm install
```

3. 启动开发服务器：
```bash
# 仅前端（Web 视图）
pnpm dev

# 完整 Tauri 应用（推荐）
pnpm tauri dev
```

4. 构建生产版本：
```bash
# 构建前端
pnpm build

# 构建 Tauri 应用
pnpm tauri build
```

## 📁 项目结构

```
tynote/
├── src/                          # 前端源代码
│   ├── components/               # React 组件
│   │   ├── layout/              # 布局组件（侧边栏、头部、内容区）
│   │   ├── search/              # 全局搜索功能
│   │   ├── ui/                  # 可复用 UI 组件（Radix UI）
│   │   └── common/              # 共享组件
│   ├── pages/                   # 路由页面
│   │   ├── home/                # 主页（快速链接和统计）
│   │   ├── inbox/               # 收件箱（捕获想法）
│   │   ├── starred/             # 收藏笔记管理
│   │   └── todo/                # 待办系统（多种视图）
│   ├── store/                   # Zustand 状态存储
│   ├── router/                  # React Router 配置
│   ├── lib/                     # 工具函数
│   ├── hooks/                   # 自定义 React Hooks
│   ├── App.tsx                  # 主应用组件
│   └── main.tsx                 # 入口文件
├── src-tauri/                   # Tauri 后端（Rust）
│   ├── src/
│   │   ├── main.rs             # Tauri 主入口
│   │   └── lib.rs              # 库代码
│   ├── tauri.conf.json         # Tauri 配置
│   └── Cargo.toml              # Rust 依赖
├── public/                      # 静态资源
├── CLAUDE.md                    # Claude Code 项目说明
├── package.json                 # Node 依赖
├── vite.config.ts              # Vite 配置
├── tailwind.config.js          # Tailwind CSS 配置
└── tsconfig.json               # TypeScript 配置
```

## 💻 开发指南

### 可用脚本

```bash
# 启动 Vite 开发服务器（仅前端，端口 1420）
pnpm dev

# 启动 Tauri 开发模式（完整应用，支持热重载）
pnpm tauri dev

# 构建生产版本前端
pnpm build

# 构建 Tauri 应用
pnpm tauri build

# 预览生产构建
pnpm preview
```

### 开发技巧

1. **路径别名**：使用 `@` 从 `src/` 目录导入
   ```typescript
   import { Button } from '@/components/ui/button'
   ```

2. **状态管理**：
   - 使用 Zustand 管理全局状态（如搜索、快速链接）
   - 使用 Jotai 管理组件级状态

3. **样式**：
   - Tailwind CSS 4 配合 @tailwindcss/vite 插件
   - 通过 next-themes 默认启用深色模式
   - 使用 `cn()` 工具处理条件类名

4. **Tauri 命令**：
   - 使用 `@tauri-apps/api/core` 从 React 调用 Rust 命令
   - 示例：
   ```typescript
   import { invoke } from '@tauri-apps/api/core'
   const result = await invoke('your_command', { args })
   ```

5. **热模块替换**：
   - 前端 HMR 运行在端口 1421
   - React 代码更改即时重载
   - Rust 代码更改需要重启应用

### 代码风格

- 遵循 TypeScript 最佳实践
- 使用函数式组件和 Hooks
- 优先使用组合而非继承
- 保持组件小而专注
- 编写清晰命名的自文档化代码

## 📦 构建与分发

### 构建生产版本

```bash
# 构建优化后的前端
pnpm build

# 为您的平台构建 Tauri 应用
pnpm tauri build
```

构建的应用将位于 `src-tauri/target/release/bundle/` 目录。

### 平台特定构建

- **Windows**：`.exe` 安装程序和 `.msi` 包
- **macOS**：`.dmg` 磁盘映像和 `.app` 包
- **Linux**：`.deb`、`.AppImage` 等格式

### 配置

编辑 `src-tauri/tauri.conf.json` 以自定义：
- 应用名称和版本
- 窗口大小和行为
- 打包设置和图标
- 安全策略
- 构建目标

## 🤝 贡献指南

我们欢迎贡献！以下是您可以提供帮助的方式：

1. **Fork 仓库**
2. **创建功能分支**：`git checkout -b feature/amazing-feature`
3. **提交更改**：`git commit -m 'Add amazing feature'`
4. **推送到分支**：`git push origin feature/amazing-feature`
5. **开启 Pull Request**

### 贡献准则

- 遵循现有代码风格
- 编写清晰的提交信息
- 为新功能添加测试
- 根据需要更新文档
- 提交前确保所有测试通过

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Tauri](https://tauri.app/) - 桌面应用框架
- [React](https://reactjs.org/) - UI 库
- [Radix UI](https://www.radix-ui.com/) - 无样式 UI 组件
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件模式
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

---

<div align="center">

**Made with ❤️ by the Tynote Team**

[报告问题](https://github.com/yourusername/tynote/issues) · [功能建议](https://github.com/yourusername/tynote/issues) · [项目文档](https://github.com/yourusername/tynote/wiki)

</div>
