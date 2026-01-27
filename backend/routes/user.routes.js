import express from 'express';
import {generateNewRefreshToken, login,logOut,resetPassword,sendEmailController,signUp, verifyUser} from '../controllers/user.controller.js'
import {loginSchema,resetPasswordSchema,signUpSchema, verifyUserSchema} from '../utils/user.validationSchema.js'
import { checkSchema } from 'express-validator';
import { schemaValidation } from '../middleware/schema.validation.js';
import verifyEmail from '../middleware/verifyEmail.js';


const router = express.Router();

router.route('/login').post(checkSchema(loginSchema),schemaValidation,login)
router.route('/signup').post(checkSchema(signUpSchema),schemaValidation,verifyEmail,signUp)
router.route('/refresh').post(generateNewRefreshToken)
router.route('/logout').post(logOut)
router.route('/verify-user').post(checkSchema(verifyUserSchema),schemaValidation,verifyUser)
router.route('/reset-password').post(checkSchema(resetPasswordSchema),schemaValidation,verifyEmail,resetPassword)

router.route('/send-email').post(sendEmailController)

export default router;