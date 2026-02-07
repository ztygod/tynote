# Repository Guidelines

## Project Structure & Module Organization
- `src/`: React + TypeScript app entry (`main.tsx`, `App.tsx`).
- `src/pages/`: route-level screens.
- `src/components/`: shared UI components (Radix/Tailwind).
- `src/hooks/`, `src/store/`, `src/router/`, `src/utils/`, `src/lib/`: app logic, state, routing, utilities.
- `src/assets/`: app assets (icons, images, fonts).
- `public/`: static assets served by Vite.
- `src-tauri/`: Tauri Rust backend (`src-tauri/src`) and app config.

## Build, Test, and Development Commands
- `pnpm dev`: start the Vite dev server.
- `pnpm build`: type-check and build the web bundle.
- `pnpm preview`: preview the production build locally.
- `pnpm tauri dev`: run the desktop app in dev mode (requires Rust + Tauri tooling).
- `pnpm tauri build`: produce a desktop build.

## Coding Style & Naming Conventions
- TypeScript + React with 2-space indentation, double quotes, and semicolons (match existing files).
- File naming: React components use `PascalCase.tsx`; hooks use `useX.ts` in `src/hooks/`.
- Keep module boundaries clear: UI in `components/`, data/state in `store/`, routing in `router/`.
- No enforced formatter/linter configured; keep edits consistent with nearby code.

## Testing Guidelines
- No automated test framework is configured yet; there are no `*.test.*` or `*.spec.*` files.
- If you add tests, document the framework and add a `pnpm test` script.

## Commit & Pull Request Guidelines
- Commit history follows a Conventional Commits style: `feat:`, `fix:`, `chore:` (keep messages short and imperative).
- PRs should include a concise summary and link to related issues when applicable.
- For UI changes, add screenshots or short clips to aid review.

## Security & Configuration Tips
- Tauri permissions and capabilities live under `src-tauri/`; review before adding new APIs.
- Keep secrets out of the repo; use local environment configuration where needed.
