import { serial, varchar,timestamp, pgTable,text } from "drizzle-orm/pg-core";
import { users,roleEnum } from "./user.model.js";

export const workspaces = pgTable("workspaces",{
    id:serial("id").primaryKey().notNull(),
    workspaceName:varchar("workspace_name",{length:20}).notNull().unique(),
    description:varchar("description",{length:255}).notNull(),
    workspacePassword:text("workspace_password").notNull(),
    createdBy:varchar("created_by",{length:32}).references(()=>users.username,{onDelete:'cascade',onUpdate:'cascade'}),
    createdAt:timestamp('created_at').defaultNow().notNull(),
})


export const workspaceUsers = pgTable('workspace_users',{
    id:serial("id").notNull().primaryKey(),
    workspaceName:varchar("workspace_name",{length:20}).notNull().references(()=>workspaces.workspaceName,{onDelete:'cascade'}),
    username:varchar("username",{length:255}).notNull(),
    email:varchar("email",{length:255}).notNull().unique().references(()=>users.email,{onDelete:'cascade'}),
    password:text("password").notNull(),
    role:roleEnum('role').default('member').notNull()
})