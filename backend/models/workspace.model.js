import { serial, varchar,timestamp, pgTable } from "drizzle-orm/pg-core";
import { users,roleEnum } from "./user.model.js";
import { text } from "drizzle-orm/gel-core";

export const workspaces = pgTable("workspaces",{
    id:serial("id").primaryKey().notNull(),
    workspaceName:varchar("workspace_name",{length:20}).notNull().unique(),
    description:varchar("description",{length:255}).notNull(),
    workspacePassword:text("workspace_password").notNull(),
    adminEmail:varchar("admin_email",{length:255}).notNull().references(()=>users.email),
    adminPassword:text("admin_password").notNull(),
    createdAt:timestamp('created_at').defaultNow().notNull(),
})