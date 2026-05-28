import postgres from "postgres";
import {drizzle} from "drizzle-orm/node-postgres"
import * as schema from "./schema";
// `postgres` is a function factory, not a constructor. Call it directly
// instead of using `new` to avoid TS7009.
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client,{schema});
