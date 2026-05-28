// lib/db/schema.ts
import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * Enums
 */
export const voiceVariantEnum = pgEnum("voice_variant", ["SYSTEM", "CUSTOM"]);

export const voiceCategoryEnum = pgEnum("voice_category", [
  "AUDIOBOOK",
  "CONVERSATIONAL",
  "CUSTOMER_SERVICE",
  "GENERAL",
  "NARRATIVE",
  "CHARACTERS",
  "MEDITATION",
  "MOTIVATIONAL",
  "PODCAST",
  "ADVERTISING",
  "VOICEOVER",
  "CORPORATE",
]);

/**
 * Tables
 */
export const voice = pgTable(
  "voice",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.getRandomValues(new Uint8Array(16)).toString()),
    orgId: text("org_id"),
    name: text("name").notNull(),
    description: text("description"),
    category: voiceCategoryEnum("category").default("GENERAL").notNull(),
    language: text("language").default("en-US").notNull(),
    variant: voiceVariantEnum("variant").notNull(),
    r2ObjectKey: text("r2_object_key"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index("voice_variant_idx").on(table.variant),
    index("voice_org_id_idx").on(table.orgId),
  ]
);

export const generation = pgTable(
  "generation",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.getRandomValues(new Uint8Array(16)).toString()),
    orgId: text("org_id").notNull(),
    voiceId: text("voice_id").references(() => voice.id, {
      onDelete: "set null",
    }),
    text: text("text").notNull(),
    voiceName: text("voice_name").notNull(),
    r2ObjectKey: text("r2_object_key"),
    temperature: text("temperature").notNull(), // Use numeric() for actual decimals if needed
    topP: text("top_p").notNull(),
    topK: text("top_k").notNull(),
    repetitionPenalty: text("repetition_penalty").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [
    index("generation_org_id_idx").on(table.orgId),
    index("generation_voice_id_idx").on(table.voiceId),
  ]
);

export type Voice = typeof voice.$inferSelect;
export type NewVoice = typeof voice.$inferInsert;

export type Generation = typeof generation.$inferSelect;
export type NewGeneration = typeof generation.$inferInsert;