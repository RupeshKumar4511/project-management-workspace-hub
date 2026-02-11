import express from 'express';
import { createWorkspace,joinWorkspace,createProject } from '../controllers/workspace.controller.js';
import { checkSchema } from 'express-validator';
import { workspaceSchema,joinWorkspaceSchema,createProjectSchema } from '../utils/workspace.validationSchema.js';
import {schemaValidation} from '../middleware/schema.validation.js'
import {authentication} from '../middleware/authenticate.js'
import ensureWorkspaceUser from '../middleware/ensureWorkspaceUser.js';
import restrictTo from '../middleware/restrictTo.js';

const router = express.Router();

router.route('/create-workspace').post(checkSchema(workspaceSchema),schemaValidation,authentication,createWorkspace)
router.route('/join-workspace').post(checkSchema(joinWorkspaceSchema),schemaValidation,authentication,ensureWorkspaceUser,joinWorkspace);
router.route('/create-project').post(checkSchema(createProjectSchema),schemaValidation,authentication,ensureWorkspaceUser,restrictTo(["admin"]),createProject)



export default router;