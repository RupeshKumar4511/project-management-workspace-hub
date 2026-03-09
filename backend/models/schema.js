import * as userSchema from './user.model.js';
import * as workspaceSchema from './workspace.model.js';

export const schema = {
  ...userSchema,
  ...workspaceSchema,
};