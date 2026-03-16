<div align="center">

# Tynote

**A Modern Desktop Note-Taking Application**

[![Tauri](https://img.shields.io/badge/Tauri-2.0-blue.svg)](https://tauri.app/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[English](README.md) | [简体中文](README_zh-CN.md)

</div>

---

> ⚠️ **Development Status**: This project is currently under active development. Features and APIs may change. Please use with caution in production environments.

## 📖 Overview

Tynote is a powerful desktop note-taking application built with Tauri 2 and React 19. It combines the performance of native applications with the flexibility of web technologies, providing a seamless note-taking experience with advanced features like AI chat, multiple todo views, and intelligent search.

## ✨ Features

### Current Features
- 📝 **Rich Note Management** - Create, edit, and organize notes with ease
- ⭐ **Starred Notes** - Quick access to your favorite notes with filtering and tagging
- ✅ **Advanced Todo System** - Multiple views including List, Table, Kanban, Calendar, and Gantt
- 🔗 **Quick Links** - Customizable quick access to frequently used resources
- 🔍 **Global Search** - Fast and intelligent search across all your notes
- 🤖 **AI Chat Integration** - Built-in AI assistant for enhanced productivity
- 📥 **Inbox System** - Capture and organize incoming thoughts and ideas
- 🎨 **Modern UI** - Beautiful interface with dark mode support
- 🖥️ **Cross-Platform** - Native desktop application for Windows, macOS, and Linux

### Planned Features
- 📱 Mobile companion app
- ☁️ Cloud synchronization
- 🔐 End-to-end encryption
- 📊 Advanced analytics and insights
- 🔌 Plugin system for extensibility
- 📤 Export to multiple formats (PDF, Markdown, HTML)

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui patterns
- **State Management**: Zustand (global) + Jotai (local)
- **Routing**: React Router v7
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Notifications**: Sonner

### Backend
- **Desktop Framework**: Tauri 2
- **Language**: Rust
- **API**: Tauri Commands

### Development Tools
- **Package Manager**: pnpm
- **Type Checking**: TypeScript 5.8
- **Code Quality**: ESLint + Prettier (recommended)

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [Rust](https://www.rust-lang.org/) (latest stable version)
- [Tauri Prerequisites](https://tauri.app/v2/guides/prerequisites/) for your platform

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tynote.git
cd tynote
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development server:
```bash
# Frontend only (web view)
pnpm dev

# Full Tauri app (recommended)
pnpm tauri dev
```

4. Build for production:
```bash
# Build frontend
pnpm build

# Build Tauri app
pnpm tauri build
```

## 📁 Project Structure

```
tynote/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── layout/              # Layout components (sidebar, header, content)
│   │   ├── search/              # Global search functionality
│   │   ├── ui/                  # Reusable UI components (Radix UI)
│   │   └── common/              # Shared components
│   ├── pages/                   # Route pages
│   │   ├── home/                # Home page with quicklinks and stats
│   │   ├── inbox/               # Inbox for capturing ideas
│   │   ├── starred/             # Starred notes management
│   │   └── todo/                # Todo system with multiple views
│   ├── store/                   # Zustand stores
│   ├── router/                  # React Router configuration
│   ├── lib/                     # Utility functions
│   ├── hooks/                   # Custom React hooks
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── src-tauri/                   # Tauri backend (Rust)
│   ├── src/
│   │   ├── main.rs             # Tauri main entry
│   │   └── lib.rs              # Library code
│   ├── tauri.conf.json         # Tauri configuration
│   └── Cargo.toml              # Rust dependencies
├── public/                      # Static assets
├── CLAUDE.md                    # Project instructions for Claude Code
├── package.json                 # Node dependencies
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 💻 Development Guide

### Available Scripts

```bash
# Start Vite dev server (frontend only, port 1420)
pnpm dev

# Start Tauri development mode (full app with hot reload)
pnpm tauri dev

# Build frontend for production
pnpm build

# Build Tauri application
pnpm tauri build

# Preview production build
pnpm preview
```

### Development Tips

1. **Path Alias**: Use `@` to import from `src/` directory
   ```typescript
   import { Button } from '@/components/ui/button'
   ```

2. **State Management**:
   - Use Zustand for global state (e.g., search, quicklinks)
   - Use Jotai for component-level state

3. **Styling**:
   - Tailwind CSS 4 with @tailwindcss/vite plugin
   - Dark mode enabled by default via next-themes
   - Use `cn()` utility for conditional classes

4. **Tauri Commands**:
   - Invoke Rust commands from React using `@tauri-apps/api/core`
   - Example:
   ```typescript
   import { invoke } from '@tauri-apps/api/core'
   const result = await invoke('your_command', { args })
   ```

5. **Hot Module Replacement**:
   - Frontend HMR runs on port 1421
   - Changes to React code reload instantly
   - Rust changes require app restart

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused
- Write self-documenting code with clear naming

## 📦 Building & Distribution

### Build for Production

```bash
# Build optimized frontend
pnpm build

# Build Tauri app for your platform
pnpm tauri build
```

The built application will be available in `src-tauri/target/release/bundle/`.

### Platform-Specific Builds

- **Windows**: `.exe` installer and `.msi` package
- **macOS**: `.dmg` disk image and `.app` bundle
- **Linux**: `.deb`, `.AppImage`, and other formats

### Configuration

Edit `src-tauri/tauri.conf.json` to customize:
- App name and version
- Window size and behavior
- Bundle settings and icons
- Security policies
- Build targets

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) - Desktop application framework
- [React](https://reactjs.org/) - UI library
- [Radix UI](https://www.radix-ui.com/) - Unstyled UI components
- [shadcn/ui](https://ui.shadcn.com/) - UI component patterns
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

<div align="center">

**Made with ❤️ by the Tynote Team**

[Report Bug](https://github.com/yourusername/tynote/issues) · [Request Feature](https://github.com/yourusername/tynote/issues) · [Documentation](https://github.com/yourusername/tynote/wiki)

</div>
