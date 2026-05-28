# Claude Agent Rules for ElvenLabs

## Project Overview

| Property | Value |
|----------|-------|
| Framework | Next.js 15+ |
| Database | PostgreSQL with Drizzle ORM |
| Styling | Tailwind CSS + shadcn/ui |
| Language | TypeScript |
| Auth | Clerk |

Auth routes: `app/sign-in`, `app/sign-up`, `app/org-selection`

> See `AGENTS.md` for Next.js breaking changes.

---

## Database & Schema

### Drizzle ORM

- Schema defined in `lib/db/schema.ts`
- Use `pgTable`, `pgEnum` for PostgreSQL
- Generate migrations: `npx drizzle-kit generate`
- Migrations stored in `lib/db/migrations/`
- Keep enums co-located with tables in `schema.ts`

### Table Conventions

| Rule | Detail |
|------|--------|
| Column names | `snake_case` in DB, `camelCase` in TypeScript |
| Timestamps | Always include `createdAt` and `updatedAt` |
| Primary keys | `text("id").primaryKey().$defaultFn()` (CUIDs) |
| Indexes | Index frequently queried fields (`orgId`, `voiceId`, etc.) |
| Foreign keys | Use `references()` with appropriate `onDelete` strategy |

### Current Schema

- **Voice** — stores voice profiles (`SYSTEM`/`CUSTOM` variant, `GENERAL` category by default)
- **Generation** — stores voice generation records linked to `Voice`
- Both tables indexed on `orgId` for org-based queries

---

## Code Style & Conventions

### TypeScript

- Strict TSConfig settings (see `tsconfig.json`)
- Infer types from Drizzle schema: `typeof voice.$inferSelect`
- Use `NewVoice = typeof voice.$inferInsert` for insert operations
- Always type props and return values explicitly

### React & Next.js

- Functional components with hooks only (no class components)
- Server Components by default; mark client components with `"use client"` at top
- Route segments follow App Router conventions (folders with `pageHeader.tsx`)
- Use `[[...slug]]` catch-all routes for dynamic parameters

### Styling

- Tailwind utility classes for all styling
- CSS custom properties (e.g. `--font-inter`) have fallbacks in `:root`
- shadcn/ui components live in `components/ui/`
- Global theme and color variables go in `globals.css`

### Environment Variables

- Store in `.env.local` (not committed)
- Reference as `process.env.VARIABLE_NAME`
- Required variables:
    - `DATABASE_URL` — Drizzle connection
    - `NEXT_PUBLIC_CLERK_*` — Clerk auth keys

---

## API & Data Fetching

### Database Queries

- Use Drizzle client directly in Server Components or API routes
- Always import from `lib/db/schema.ts`

```typescript
const voices = await db.select().from(voice).where(eq(voice.orgId, orgId));
```

### API Routes

- Place in `app/api/` using the App Router
- Use HTTP method route handlers: `GET`, `POST`, etc.
- Return JSON with appropriate status codes
- Handle errors gracefully and log unexpected failures

---

## Clerk Integration

### Setup

- Clerk Provider wraps the app in `layout.tsx`
- Sign-in/sign-up pages use Clerk drop-in UI components
- Org selection happens after sign-up

### Accessing User & Org Info

| Context | Hook/Method |
|---------|-------------|
| Client Components | `useUser()` |
| Server Components | `auth()` |

- `auth().orgId` provides the current organization ID
- Always filter queries by `orgId` for multi-tenant safety

---

## Development Workflow

### Before Writing Code

1. Check `AGENTS.md` for Next.js breaking changes
2. Review `lib/db/schema.ts` to understand available tables
3. Read Drizzle docs if unsure about query syntax

### When Adding Features

1. **Database** — Update `lib/db/schema.ts` → run `npx drizzle-kit generate`
2. **API / Server** — Add route handler or Server Component in `app/api/` or `app/`
3. **UI** — Use shadcn/ui components; add to `components/ui/` if missing
4. **Client State** — Use React hooks or Zustand (if added)

### Testing & Debugging

- Inspect queries in Drizzle Studio: `npx drizzle-kit studio`
- Check Clerk user/org context: DevTools → Application → Local Storage
- Validate TypeScript: `npx tsc --noEmit`

---

## Common Query Patterns

```typescript
// Query by organization
const voices = await db
  .select()
  .from(voice)
  .where(eq(voice.orgId, orgId));

// Update a record
await db
  .update(voice)
  .set({ name: "Updated" })
  .where(eq(voice.id, voiceId));

// Delete a record
await db
  .delete(voice)
  .where(eq(voice.id, voiceId));
```

---

*Reference: `AGENTS.md` for Next.js 15+ breaking changes.*