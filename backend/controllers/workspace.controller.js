import { eq } from 'drizzle-orm';
import {db} from '../config/db.js'
import { users } from '../models/user.model.js';
import {workspaces} from '../models/workspace.model.js'

export const createWorkspace = async(req,res)=>{
    const {workspaceName,adminEmail,description,workspacePassword,adminPassword} = req.body;

    try {
        const [workspace] = await db.select({workspaceName}).from(workspaces);

        if(workspace){
            return res.status(400).send({message:"Workspace name already exist"})
        }
        const [user] = await db.select({email}).from(users).where(eq(users.email,emal))

        if(user.email!==adminEmail){
            return res.status(400).send({message:"admin email does not exist"})
        }

        await db.insert(workspaces).values({workspaceName,adminEmail,description,workspacePassword,adminPassword})

        return res.status(200).send({success:true,message:"workspace created successfully."})

    } catch (error) {
        return res.status(500).send({success:false,message:"Internal Server Error"})
    }


}