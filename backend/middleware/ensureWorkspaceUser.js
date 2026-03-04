import { and, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { workspaceUsers } from "../models/workspace.model.js";

const ensureWorkspaceUser = async (req, res, next) => {
    const {workspaceName} = req.body;
    try {
        const [workspaceUser] = await db.select({ email: workspaceUsers.email,role:workspaceUsers.role , workspaceName: workspaceUsers.workspaceName}).from(workspaceUsers).where(and(eq(workspaceUsers.email, req.user.email), eq(workspaceUsers.workspaceName, workspaceName)));

        if (!workspaceUser) {
            return res.status(401).send({ success: false, message: `Unauthorized Request` })
        }

        req.user.role = workspaceUser.role;
        req.user.workspaceName = workspaceUser.workspaceName;
        
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:"Internal Server Error"})
    }
}

export default ensureWorkspaceUser;