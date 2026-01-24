import express from 'express';
import {generateNewRefreshToken, login,logOut,resetPassword,sendEmailController,signUp, verifyUser} from '../controllers/user.controller.js'
import {loginSchema,resetPasswordSchema,signUpSchema, verifyUserSchema} from '../utils/user.validationSchema.js'
import { checkSchema } from 'express-validator';
import { userValidation } from '../middleware/user.validation.js';
import verifyEmail from '../middleware/verifyEmail.js';
import { authentication } from '../middleware/authenticate.js';


const router = express.Router();

router.route('/login').post(checkSchema(loginSchema),userValidation,login)
router.route('/signup').post(checkSchema(signUpSchema),userValidation,verifyEmail,signUp)
router.route('/refresh').post(generateNewRefreshToken)
router.route('/logout').post(authentication,logOut)
router.route('/verify-user').post(checkSchema(verifyUserSchema),userValidation,verifyUser)
router.route('/reset-password').post(checkSchema(resetPasswordSchema),userValidation,verifyEmail,resetPassword)

router.route('/send-email').post(sendEmailController)

export default router;