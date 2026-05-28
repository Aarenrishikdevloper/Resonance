<!-- BEGIN:nextjs-agent-rules -->
# ⚠️ This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data.
Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Agent Rules for ElvenLabs

## General Principles

| # | Rule | Detail |
|---|------|--------|
| 1 | **Type Safety First** | Always use TypeScript. Infer types from Drizzle schemas and React components. |
| 2 | **Server-by-Default** | Prefer Server Components. Mark Client Components explicitly with `"use client"`. |
| 3 | **Multi-Tenant** | All queries must filter by `orgId` for security and data isolation. |
| 4 | **Error Handling** | Wrap async operations in try-catch; return meaningful error messages to clients. |
| 5 | **No Hard-Coded URLs** | Use environment variables and Next.js routing patterns. |

---

## Database & Drizzle Rules

### Schema Modifications

- **Only edit** `lib/db/schema.ts` for table/enum changes
- **After editing schema**, run `npx drizzle-kit generate` to create migrations
- **Never manually edit** migration files — they are auto-generated
- **Always include** `createdAt` and `updatedAt` timestamps on new tables
- **Index critical columns**: `orgId`, foreign keys, frequently filtered fields

---

### Query Patterns

#### ✅ Filter by `orgId` (required)

```typescript
// ✅ CORRECT: Always filter by orgId
const orgVoices = await db
  .select()
  .from(voice)
  .where(eq(voice.orgId, orgId));

// ❌ WRONG: No orgId filter — security risk
const allVoices = await db.select().from(voice);
```

#### ✅ Use Drizzle type inference

```typescript
// ✅ CORRECT: Types inferred directly from schema — always in sync
import { voice, type Voice, type NewVoice } from "@/lib/db/schema";

const createVoice = async (data: NewVoice): Promise<Voice> => {
  return db.insert(voice).values(data).returning();
};

// ❌ WRONG: Hand-written types that drift from schema
interface VoiceDTO {
  id: string;
  name: string;
  // ... prone to sync errors
}
```

---

## Code Examples

### Server Component — fetching org data

```typescript
// app/voices/pageHeader.tsx
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { voice } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function VoicesPage() {
  const { orgId } = await auth();
  if (!orgId) return null;

  const voices = await db
    .select()
    .from(voice)
    .where(eq(voice.orgId, orgId));

  return (
    <div>
      {voices.map((v) => (
        <div key={v.id}>{v.name}</div>
      ))}
    </div>
  );
}
```

### Client Component — interactive UI

```typescript
// components/voice-selector.tsx
"use client"; // Required at top for interactivity

import { useState } from "react";
import { Voice } from "@/lib/db/schema";

export function VoiceSelector({ voices }: { voices: Voice[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      {voices.map((v) => (
        <button key={v.id} onClick={() => setSelected(v.id)}>
          {v.name}
        </button>
      ))}
    </div>
  );
}
```