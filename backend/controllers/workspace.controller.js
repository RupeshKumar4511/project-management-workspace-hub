import { and, eq } from 'drizzle-orm';
import {db} from '../config/db.js'
import bcrypt from 'bcrypt'
import { users } from '../models/user.model.js';
import {workspaces, workspaceUsers, projects} from '../models/workspace.model.js'

export const createWorkspace = async(req,res)=>{
    const {workspaceName,createdBy,description,workspacePassword,adminEmail} = req.body;
    
    try {
        const image = req.files[0];
        const [workspace] = await db.select({name:workspaces.workspaceName}).from(workspaces).where(eq(workspaces.workspaceName,workspaceName));

        if(workspace){
            return res.status(400).send({message:"Workspace name already exist"})
        }

        
        const [user] = await db.select({username:users.username,email:users.email,role:users.role}).from(users).where(eq(users.id,req.user.id))

        
        if(!user || user.username !== createdBy){
            return res.status(400).send({message:"username does not exist"})
        }

        if(user.email!==adminEmail){
            return res.status(400).send({message:"admin email does not exist"})
        }

        if(user.role!=='member' || user.role=='admin'){
            return res.status(401).send({message:"You have logined as guest. No access to create workspace"})
        }

        await db.transaction(async (tx) => {
            const password = await bcrypt.hash(workspacePassword,10)
            await tx.insert(workspaces).values({workspaceName,image,createdBy,description,workspacePassword:password})

            await tx.insert(workspaceUsers).values({workspaceName,username:user.username,role:'admin'})
        })
        

        return res.status(200).send({success:true,message:"workspace created successfully."})

    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:"Internal Server Error"})
    }


}

export const joinWorkspace = async(req,res)=>{
    const {workspaceName,workspacePassword} = req.body;
    try {

        const [workspace] = await db.select({workspaceName:workspaces.workspaceName,workspacePassword:workspaces.workspacePassword}).from(workspaces).where(eq(workspaces.workspaceName,workspaceName))

        if(!workspace){
            return res.status(400).send({success:false,message:`WorkspaceName or WorkspacePassword is Incorrect`})
        }

        
        const isPassEqual = await bcrypt.compare(workspacePassword,workspace.workspacePassword);

        if(!isPassEqual){
            return res.status(400).send({success:false,message:`WorkspaceName or WorkspacePassword is Incorrect`})
        }

        return res.status(200).send({success:true,message:"Join Workspace Successfully",workspaceName:workspace.workspaceName})

    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:"Internal Server Error"})
    }
}

export const createProject = async(req,res)=>{
    const {title,workspaceName,projectLink,description,status,priority,projectLead,startDate,endDate}= req.body;

    const [project] = db.select({title:projects.title}).from(projects).where(and(eq(projects.title,title),eq(projects.workspaceName,workspaceName)))

    if(project){
        return res.status(409).send({success:false,message:"Project name already exists"})
    }

    await db.insert(projects).values({title,workspaceName,projectLink,description,status,priority,projectLead,startDate,endDate});

    res.status(201).send({success:true,message:"project created successfully."})
    
}

// Add and Invite Team Members to workspace
export const addTeamMemberToWorkspace = async(req,res)=>{

}

// Add members to project
export const addTeamMemberToProject = async(req,res)=>{

}

// Create Task in a project and invite to team member 
export const createTask = async(req,res)=>{

}

// update Workspace 
export const updateWorkspace = async(req,res)=>{
    
}

// Update Projects 
export const updateProjects = async(req,res)=>{

}

// Update Team members of a project 
export const updateTeamMember = async(req,res)=>{

}

// Update Task 
export const updateTask = async(req,res)=>{

}

// Get Projects + Project related team member
export const getProjects = async(req,res)=>{

}

// Get team members 
export const getTeamMembers = async(req,res)=>{

}

// delete Workspace 
export const deleteWorkspace = async(req,res)=>{

}

// delete project
export const deleteProject = async(req,res)=>{

}

// delete task
export const deleteTask = async(req,res)=>{

}

// delete Team member from workspace
export const deleteTeamMember = async(req,res)=>{

}

// delete Team member from projects
export const deleteProjectMember = async(req,res)=>{

}

// Add comments 
export const addComments = async(req,res)=>{

}

// Get Comments 
export const getComments = async(req,res)=>{

}

// delete Comments 
export const deleteComments = async(req,res)=>{

}
