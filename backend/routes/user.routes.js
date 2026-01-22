import express from 'express';
import {generateNewRefreshToken, login,logOut,resetPassword,signUp, verifyEmail} from '../controllers/user.controller.js'
import {loginSchema,resetPasswordSchema,signUpSchema, verifyEmailSchema} from '../utils/user.validationSchema.js'
import { checkSchema } from 'express-validator';
import { userValidation } from '../middleware/user.validation.js';
import sendOtp from '../services/mail.js'


const router = express.Router();

router.route('/login').post(checkSchema(loginSchema),userValidation,login)
router.route('/signup').post(checkSchema(signUpSchema),userValidation,signUp)
router.route('/refresh').post(generateNewRefreshToken)
router.route('/logout').post(logOut)
router.route('/verify-email').post(checkSchema(verifyEmailSchema),userValidation,verifyEmail)
router.route('/reset-password').post(checkSchema(resetPasswordSchema),userValidation,resetPassword)

router.route('/send-email').post(sendOtp,(req,res)=>{
    return res.status(200).send({success:true,message:"OTP sent successfully"})
})

export default router;