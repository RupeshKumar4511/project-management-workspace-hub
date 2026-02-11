import { and, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { workspaceUsers } from "../models/workspace.model.js";

const ensureWorkspaceUser = async (req, res, next) => {
    const {workspaceName} = req.body;
    try {
        const [workspaceUser] = await db.select({ username: workspaceUsers.username,role:workspaceUsers.role }).from(workspaceUsers).where(and(eq(workspaceUsers.username, req.user.username), eq(workspaceUsers.workspaceName, workspaceName)));

        if (!workspaceUser) {
            return res.status(401).send({ success: false, message: `Unauthorized Request` })
        }

        req.user.role = workspaceUser.role;
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).send({success:false,message:"Internal Server Error"})
    }
}

export default ensureWorkspaceUser;