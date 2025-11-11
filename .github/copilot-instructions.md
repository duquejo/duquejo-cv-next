# AI Agent Instructions - duquejo-cv-next

## Project Overview

This is a **Next.js 15 portfolio/CV application** using the App Router with internationalization (i18n), PDF generation, and a dark theme. The project showcases José Duque's professional experience with TypeScript, React, shadcn/ui, and comprehensive testing.

**Key Tech Stack:**

- Next.js 15 with App Router and Server Components
- TypeScript (strict mode)
- React 19
- next-intl for i18n (English/Spanish)
- @pdfme for server-side PDF generation
- shadcn/ui + Tailwind CSS for UI
- Vitest + React Testing Library (unit tests)
- Playwright (e2e tests)
- MSW (Mock Service Worker) for test mocking

## Architecture & Structure

### Internationalization (i18n) Pattern

**Critical:** This project uses **path-based routing WITHOUT locale prefixes** (`localePrefix: 'never'`):

- Routes are `/`, `/career/projects`, `/career/services` (NOT `/en/...` or `/es/...`)
- Locale detection happens via `Accept-Language` header negotiation in `src/i18n/request.ts`
- Route translations defined in `src/i18n/routing.ts` using `pathnames` configuration
- All pages must be wrapped with locale-aware layout from `src/app/layout.tsx`

**Translation Usage:**

```tsx
// In Server Components
import { useTranslations } from 'next-intl';
const t = useTranslations('General');
t('resume.greetings');

// Rich text with React components
import { RichText } from '@/components/general/rich-text';
<RichText>{(tags) => t.rich('resume.excerpt2', tags)}</RichText>;

// For metadata
import { createMetadata } from '@/lib';
export async function metadata() {
  return createMetadata('General');
}
```

**Translation files:** `messages/en.json` and `messages/es.json` with namespaced keys.

### Server Actions & API Routes

**Server Actions** (for server-side logic):

- Located in `src/actions/` (e.g., `pdf.ts`, `github.ts`, `projects.ts`)
- Must use `'use server'` directive at top of file
- Example: `generatePdf()` in `src/actions/pdf.ts` uses `@pdfme/generator`

**API Routes** (for external requests):

- Located in `src/app/api/v1/`
- Example: `/api/v1/pdf/route.ts` handles POST requests with CORS
- Rate limiting applied via middleware for `/api/v1/*` routes
- CORS configuration uses `ALLOWED_ORIGINS` env var

### Middleware Chain

**`src/middleware.ts` handles two concerns:**

1. **Rate limiting** for `/api/v1/*` routes (production only)
   - Implemented in `src/middleware/rate-limiter-middleware.ts`
   - 5 requests per 30s by default
2. **i18n routing** for all other routes via next-intl

```typescript
// Order matters - check API routes first, then i18n
if (pathname.startsWith('/api/v1')) {
  return rateLimitMiddleware(request);
}
return createMiddleware(routing)(request);
```

### Route Groups & Layouts

- Dynamic routing uses `[lang]` folder but locale detection is server-side
- Shared layouts in `src/app/layout.tsx` with `SidebarProvider`, `ThemeProvider`, `EventProvider`

### Component Patterns

**UI Components:**

- Base components in `src/components/ui/` (shadcn/ui - **do not manually edit**)
- Custom components organized by feature: `resume/`, `header/`, `footer/`, `projects/`, etc.
- Use `cn()` utility from `@/lib` for conditional className merging

**State Management:**

- Context providers for theme, sidebar, GitHub events
- Server Components by default - use `'use client'` sparingly
- Client components in `src/components/theme/`, `src/components/events/`

### PDF Generation

**Architecture:**

- Server Action: `src/actions/pdf.ts` - generates PDF using `@pdfme/generator`
- Template: `src/lib/pdf.ts` - defines PDF schema with base64 template
- API: `src/app/api/v1/pdf/route.ts` - exposes PDF generation endpoint
- Base template stored as base64 in `src/lib/constants.ts` (`BASE_PDF`)

**Important:** PDF content is i18n-aware and uses dynamic translations.

## Testing Standards

### Unit Tests (Vitest)

- **Location:** `__tests__/unit/` mirroring `src/` structure
- **Config:** `vitest.config.mts` with jsdom environment
- **Setup:** `setupTests.ts` loads env vars and starts MSW worker
- **Coverage:** Excludes `interfaces/`, `components/ui/`, generates HTML reports

**Running tests:**

```bash
yarn test --run           # Direct run tests evaluation
yarn test:coverage --run  # With coverage
```

**Mocking pattern:**

```typescript
// MSW handlers in src/msw/handlers.ts
import { http, HttpResponse } from 'msw';
export const handlers = [http.get('/api/endpoint', () => HttpResponse.json({ data: 'mocked' }))];
```

### E2E Tests (Playwright)

- **Location:** `__tests__/e2e/`
- **Config:** `playwright.config.ts` - tests against `localhost:3000`
- **Projects:** Desktop Chrome + Mobile Chrome
- **Utilities:** `__tests__/e2e/utils.ts` for shared test helpers

**Running tests:**

```bash
yarn test:e2e          # Run e2e tests
```

## Development Workflow

### Scripts

```bash
yarn dev               # Development server with Turbopack
yarn build             # Production build
yarn start             # Production server
yarn lint              # ESLint check
yarn format            # Prettier format
yarn analize           # Bundle analyzer
```

### Environment Variables

**Required:**

```env
EVENT_GITHUB_URL="Github feed source"
EVENT_GITHUB_SOURCE="Github token"
PDF_EMAIL="PDF final email"
SITE_URL="Website footer source url"
PDF_FILENAME="PDF download filename"
ALLOWED_ORIGINS="Comma separated allowed origins"
NEXT_PUBLIC_ANALYTICS_ID="Google Analytics Identifier"
```

### Git Conventions

**Commits:** Follow Gitmoji convention (configured in `commitlint.config.mjs`):

```bash
:sparkles: feat(users): users management feature
:bug: fix(api): handle null responses
```

**Husky hooks:** Pre-commit formatting, commit message linting enabled.

## Code Style & Patterns

### Naming Conventions

- **Components:** PascalCase (`HeroImage.tsx`)
- **Utilities:** camelCase (`calculateYears()`)
- **Constants:** UPPER_SNAKE_CASE (`BASE_PDF`, `SOCIAL_DATA`)
- **Types/Interfaces:** PascalCase with Type/Interface suffix (`LanguageType`)

### Import Aliases

Use `@/` for all imports from `src/`:

```typescript
import { cn } from '@/lib';
import type { Social } from '@/interfaces';
import { SOCIAL_DATA } from '@/lib/constants';
```

### Type Safety

- Strict TypeScript enabled - no implicit `any`
- Define interfaces in `src/interfaces/` (e.g., `general-interface.ts`)
- Use `type` for unions/primitives, `interface` for object shapes
- Prefer type imports: `import type { Something } from '...'`

### Styling

- Tailwind utility classes (v4+) - configured in `postcss.config.mjs`
- Use design tokens for consistency
- Dark mode via next-themes with class strategy
- Responsive: mobile-first breakpoints (`sm:`, `md:`, `lg:`)

## Common Tasks

### Adding a new page with i18n

1. Create route in `src/app/[lang]/(group)/page.tsx`
2. Add pathname translation in `src/i18n/routing.ts`:

```typescript
pathnames: {
  '/new-page': {
    en: '/new-page',
    es: '/nueva-pagina',
  }
}
```

3. Add translations in `messages/en.json` and `messages/es.json`
4. Update navigation in `src/components/menu/` or `src/components/sidebar/`

### Adding a shadcn/ui component

```bash
npx shadcn@latest add <component-name>
```

Component will be added to `src/components/ui/` - **do not manually edit**.

### Adding a new server action

1. Create file in `src/actions/<name>.ts`
2. Add `'use server'` at top
3. Export async function(s)
4. Import and use in Server Components or API routes

### Extending tests

**Unit test:**

- Create file in `__tests__/unit/src/` matching source structure
- Import component/function to test
- Mock external dependencies using MSW or vi.mock()
- Use the cli --run flag to execute tests without asking confirmation

**E2E test:**

- Create file in `__tests__/e2e/<feature>.test.ts`
- Use Playwright's `test` and `expect` from fixtures
- Test user flows across multiple pages

## Key Files Reference

- **Routing:** `src/i18n/routing.ts` - locale config + pathnames
- **Middleware:** `src/middleware.ts` - rate limiting + i18n
- **Constants:** `src/lib/constants.ts` - social data, stack, CSP headers
- **Metadata:** `src/lib/metadata.ts` - generates SEO metadata
- **Utilities:** `src/lib/utilities.ts` - helper functions (e.g., `cn()`, `calculateYears()`)
- **Types:** `src/interfaces/general-interface.ts` - shared types

## Security & Performance

- **CSP Headers:** Strict CSP defined in `next.config.ts` (Google Analytics allowed)
- **Rate Limiting:** In-memory rate limiter for API routes (production only)
- **Image Optimization:** Next.js Image component with quality tiers [25, 75, 100]
- **Bundle Analysis:** Available via `yarn analize` (uses `@next/bundle-analyzer`)

## Deployment Considerations

- **Platform:** Vercel (mentioned in README)
- **Environment:** Production checks `NODE_ENV === 'production'` for rate limiting
- **Build:** Standard Next.js build process (`yarn build`)
- **Analytics:** Google Analytics integration via `@next/third-parties`

---

**When making changes:**

1. Maintain type safety - no `any` without explicit reason
2. Follow existing i18n patterns - check `messages/*.json` before hardcoding text
3. Add tests for new features (unit + e2e where appropriate)
4. Run `yarn lint` and `yarn format` before committing
5. Use Gitmoji for commit messages
6. Respect Server/Client Component boundaries - minimize `'use client'` usage
