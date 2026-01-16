import express from 'express';
import {login,signUp} from '../controllers/user.controller.js'
import {loginSchema,signUpSchema} from '../utils/user.validationSchema.js'
import { checkSchema } from 'express-validator';
import { userValidation } from '../middleware/user.validation.js';


const router = express.Router();

router.route('/login').post(checkSchema(loginSchema),userValidation,login)
router.route('/signup').post(checkSchema(signUpSchema),userValidation,signUp)
router.route('/refresh').post(generateNewRefreshToken)
