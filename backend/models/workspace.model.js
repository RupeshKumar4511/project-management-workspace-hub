import { serial, varchar,timestamp, pgTable,text, pgEnum,integer } from "drizzle-orm/pg-core";
import { users } from "./user.model.js";
import { uniqueIndex } from "drizzle-orm/gel-core";

export const workspaceRoleEnum = pgEnum("workspace_user_role",["admin","member"])
export const taskStatusEnum = pgEnum('task_status',['To Do','In Progress','Done'])
export const projectStatusEnum = pgEnum('project_status',['Planning','Active','Completed','On Hold','Cancelled'])
export const taskTypeEnum = pgEnum('task_type',['Task','Feature','Bug','Improvement','Other'])
export const priorityEnum = pgEnum('priority',['Medium','Low','High'])


export const workspaces = pgTable("workspaces",{
    id:serial("id").primaryKey().notNull(),
    workspaceName:varchar("workspace_name",{length:32}).notNull().unique(),
    description:varchar("description",{length:255}).notNull(),
    createdBy:varchar("created_by",{length:32}).references(()=>users.username,{onDelete:'cascade',onUpdate:'cascade'}),
    createdAt:timestamp('created_at').defaultNow().notNull(),
    updatedAt:timestamp('updated_at').notNull().defaultNow()
},(workspaces)=>[
    uniqueIndex('workspace_index').on(workspaces.workspaceName,workspaces.createdBy)
])

export const workspaceUsers = pgTable('workspace_users',{
    id:serial("id").notNull().primaryKey(),
    workspaceName:varchar("workspace_name",{length:32}).notNull().references(()=>workspaces.workspaceName,{onDelete:'cascade',onUpdate:'cascade'}),
    username:varchar("username",{length:32}).notNull().references(()=>users.username,{onDelete:'cascade',onUpdate:'cascade'}).unique(),
    role:workspaceRoleEnum('role').default('member').notNull(),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().defaultNow()
},(workspaceUsers)=>[
    uniqueIndex('workspace_users_index').on(workspaceUsers.workspaceName,workspaceUsers.username)
])

export const projects = pgTable('projects',{
    id:serial("id").notNull().primaryKey(),
    title:varchar("title",{length:255}).notNull(),
    workspaceName:varchar("workspace_name",{length:32}).notNull().references(()=>workspaces.workspaceName,{onDelete:'cascade',onUpdate:'cascade'}),
    projectLink: text("project_link"),
    description:varchar("description",{length:1000}).notNull(),
    status:projectStatusEnum('status').notNull(),
    priority:priorityEnum("priority").notNull(),
    projectLead:varchar("project_lead",{length:32}).notNull().references(()=>workspaceUsers.username,{onDelete:'cascade',onUpdate:'cascade'}),
    startDate:timestamp('start_date').defaultNow(),
    endDate:timestamp('end_date').notNull(),
    progress:integer("progress",{max:100,min:0}).default(0),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().defaultNow()
},(projects)=>[
    uniqueIndex('project_index').on(projects.workspaceName,projects.title)
])

export const projectMembers = pgTable('project_members',{
    id:serial("id").notNull().primaryKey(),
    username:varchar("workspace_username",{length:32}).notNull().references(()=>workspaceUsers.username,{onDelete:'cascade',onUpdate:'cascade'}),
    projectId:integer("project_id").notNull().references(()=>projects.id,{onDelete:'cascade'}),

})

export const tasks = pgTable('tasks',{
    id:serial("id").notNull().primaryKey(),
    title:varchar("title",{length:255}).notNull(),
    projectId:serial("project_id").notNull().references(()=>projects.id,{onDelete:'cascade'}),
    description:varchar("description",{length:1000}).notNull(),
    type:taskTypeEnum("type").notNull(),
    priority:priorityEnum("priority").notNull(),
    status:taskStatusEnum("status").notNull(),
    assignee:varchar("assignee",{length:32}).notNull().references(()=>workspaceUsers.username,{onDelete:'cascade',onUpdate:'cascade'}),
    dueDate:timestamp('due_date').notNull(),
    createdAt:timestamp("created_at").notNull().defaultNow(),
    updatedAt:timestamp('updated_at').notNull().defaultNow()
    
},(tasks)=>[
    uniqueIndex('tasks_index').on(tasks.projectId,tasks.title)
])

export const comments = pgTable('comments',{
    id:serial("id").notNull().primaryKey(),
    taskId:serial("task_id").notNull().references(()=>tasks.id,{onDelete:'cascade'}),
    content:text("content").notNull(),
    username:varchar("username",{length:32}).notNull().references(()=>workspaceUsers.username,{onDelete:'cascade',onUpdate:'cascade'}),
    createdAt:timestamp("created_at").notNull().defaultNow()
    
})