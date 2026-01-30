import { serial, varchar,timestamp, pgTable,text, pgEnum } from "drizzle-orm/pg-core";
import { users,roleEnum } from "./user.model.js";

export const statusEnum = pgEnum('status',[''])
export const projectTypeEnum = pgEnum('project_type',['Planning','Active','Completed','On Hold','Cancelled'])
export const taskTypeEnum = pgEnum('task_type',['Task','Feature','Bug','Improvement','Other'])
export const priorityEnum = pgEnum('priority',['Medium','Low','High'])


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
    username:varchar("username",{length:32}).notNull().references(()=>users.username,{onDelete:'cascade',onUpdate:'cascade'}),
    email:varchar("email",{length:255}).notNull().unique().references(()=>users.email,{onDelete:'cascade'}),
    role:roleEnum('role').default('member').notNull()
})


export const projects = pgTable('projects',{
    id:serial("id").notNull().primaryKey(),
    title:varchar("title",{length:255}).notNull(),
    workspaceName:varchar("workspace_name",{length:20}).notNull().references(()=>workspaces.workspaceName,{onDelete:'cascade'}),
    description:varchar("description",{length:1000}).notNull(),
    status:statusEnum("status").notNull(),
    type:projectTypeEnum('type').notNull(),
    priority:priorityEnum("priority").notNull(),
    projectLead:varchar("project_lead",{length:32}).notNull().references(()=>workspaceUsers.username,{onDelete:'cascade',onUpdate:'cascade'}),
    startDate:timestamp('start_date').defaultNow(),
    endDate:timestamp('end_date').notNull(),
})

export const projectMembers = pgTable('project_members',{
    id:serial("id").notNull().primaryKey(),
    workspaceName:varchar("workspace_name",{length:20}).notNull().references(()=>workspaces.workspaceName,{onDelete:'cascade'}),
    projectName:varchar("project_name",{length:255}).notNull().references(()=>projects.title,{onDelete:'cascade'}),

})

export const tasks = pgTable('tasks',{
    id:serial("id").notNull().primaryKey(),
    projectName:varchar("project_name",{length:255}).notNull().references(()=>projects.title,{onDelete:'cascade'}),
    workspaceName:varchar("workspace_name",{length:20}).notNull().references(()=>workspaces.workspaceName,{onDelete:'cascade'}),
    description:varchar("description",{length:1000}).notNull(),
    type:taskTypeEnum("type").notNull(),
    priority:priorityEnum("priority").notNull(),
    status:statusEnum("status").notNull(),
    assignee:varchar("assignee",{length:32}).notNull().references(()=>workspaceUsers.username,{onDelete:'cascade',onUpdate:'cascade'}),
    dueDate:timestamp('due_date').notNull(),
    
})