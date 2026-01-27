import express from 'express';
import { createWorkspace } from '../controllers/workspace.controller.js';
import { checkSchema } from 'express-validator';
import { workspaceSchema } from '../utils/workspace.validationSchema.js';
import {schemaValidation} from '../middleware/schema.validation.js'
import {authentication} from '../middleware/authenticate.js'

const router = express.Router();

router.route('/create-workspace').post(checkSchema(workspaceSchema),schemaValidation,authentication,createWorkspace)



export default router;