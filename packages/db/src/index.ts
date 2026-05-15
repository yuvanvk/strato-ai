import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./db/schema.js";

export const getDB = (d1: DrizzleD1Database) => {
    return drizzle(d1, { schema })
}

export * from "./db/schema.js"
export type Schema = typeof schema;