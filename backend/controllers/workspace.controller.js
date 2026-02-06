import { and, eq } from 'drizzle-orm';
import {db} from '../config/db.js'
import bcrypt from 'bcrypt'
import { users } from '../models/user.model.js';
import {workspaces, workspaceUsers} from '../models/workspace.model.js'

export const createWorkspace = async(req,res)=>{
    const {workspaceName,createdBy,description,workspacePassword,adminEmail} = req.body;
    
    try {
        const [workspace] = await db.select({name:workspaces.workspaceName}).from(workspaces).where(eq(workspaces.workspaceName,workspaceName));

        if(workspace){
            return res.status(400).send({message:"Workspace name already exist"})
        }

        
        const [user] = await db.select({username:users.username,email:users.email}).from(users).where(eq(users.id,req.user.id))

        
        if(!user || user.username !== createdBy){
            return res.status(400).send({message:"username does not exist"})
        }

        if(user.email!==adminEmail){
            return res.status(400).send({message:"admin email does not exist"})
        }

        await db.transaction(async (tx) => {
            const password = await bcrypt.hash(workspacePassword,10)
            await tx.insert(workspaces).values({workspaceName,createdBy,description,workspacePassword:password})

            await tx.insert(workspaceUsers).values({workspaceName,username:createdBy,email:adminEmail,role:'admin'})
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
        const [workspaceUser] = await db.select({username:workspaceUsers.username}).from(workspaceUsers).where(and(eq(workspaceUsers.username,req.user.username),eq(workspaceUsers.workspaceName,workspaceName)));

        if(!workspaceUser){
            return res.status(401).send({success:false,message:`Unauthorized Request`})
        }

        
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