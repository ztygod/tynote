# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tynote is a Tauri desktop application built with React 19, TypeScript, and Vite. The frontend uses Radix UI components with Tailwind CSS for styling, and the backend is written in Rust using Tauri 2.

## Development Commands

**Package Manager**: pnpm (required)

```bash
# Start development server (frontend only)
pnpm dev

# Start Tauri development mode (full app)
pnpm tauri dev

# Build for production
pnpm build

# Build Tauri app
pnpm tauri build

# Preview production build
pnpm preview
```

## Architecture

### Frontend Structure

- **Entry Point**: `src/main.tsx` - Sets up React Router, ThemeProvider, and global SearchDialog
- **Path Alias**: `@` maps to `./src` (configured in vite.config.ts)
- **Routing**: React Router v7 configuration in `src/router/`
- **State Management**:
  - Zustand stores in `src/store/` (quicklinks-store, search-store)
  - Jotai for component-level state
- **Pages**: `src/pages/` contains route components (dashboard, home, inbox, starred, todo)
- **Components**:
  - `src/components/layout/` - App layout with sidebar, header, and content areas
  - `src/components/search/` - Global search functionality
  - `src/components/ui/` - Reusable UI components (Radix UI + shadcn/ui)
  - `src/components/common/` - Shared components

### Backend Structure

- **Tauri Backend**: `src-tauri/` contains Rust code
- **Main Entry**: `src-tauri/src/main.rs`
- **Library**: `src-tauri/src/lib.rs`
- **Configuration**: `src-tauri/tauri.conf.json`

### Key Technologies

- **UI Framework**: React 19 with TypeScript
- **Desktop Framework**: Tauri 2
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with @tailwindcss/vite plugin
- **UI Components**: Radix UI primitives + shadcn/ui patterns
- **State**: Zustand (global) + Jotai (local)
- **Routing**: React Router v7
- **Drag & Drop**: @dnd-kit
- **Icons**: lucide-react

## Development Notes

- Vite dev server runs on port 1420 (configured in vite.config.ts)
- HMR runs on port 1421
- Theme system uses next-themes with dark mode as default
- Global search dialog is always mounted and controlled via store
- Tauri commands are invoked from React using `@tauri-apps/api/core`
