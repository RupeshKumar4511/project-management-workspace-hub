import { serial, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";

export const workspaces = pgTable("workspaces",{
    id:serial("id").primaryKey().notNull(),
    name:varchar("company_name",{length:20}).notNull(),
    description:varchar("description",{length:255}).notNull(),
    adminName:varchar("admin_name",{length:32}).notNull(),
    adminPassword:text("admin_password").notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull(),
})