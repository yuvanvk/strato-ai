import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./db/schema.js";

export const db = drizzle<typeof schema>(postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 }))

export const createDB = (connectionString: string) => {
    const client = postgres(connectionString, { prepare: false, max: 1 })
    return drizzle(client, { schema })
}

export * from "./db/schema.js"
export type Schema = typeof schema;