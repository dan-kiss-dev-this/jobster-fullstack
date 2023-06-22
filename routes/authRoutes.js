import express from "express"
import { register, login, updateUser, getCurrentUser, logout } from "../controllers/authController.js";
//auth
import authenticateUser from '../middleware/auth.js'
import testUser from '../middleware/testUser.js'

export const authRouter = express.Router();

import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
    windowMs: 15 * 60,
    max: 10,
    message: 'Too many requests from this IP, please try again in 15 minutes'
})

authRouter.route('/register').post(apiLimiter, register)
authRouter.route('/login').post(apiLimiter, login)
// the user is authenticated before being updated
authRouter.route('/updateUser').patch(authenticateUser, testUser, updateUser)
authRouter.route('/getCurrentUser').get(authenticateUser, getCurrentUser)
authRouter.route('/logout').get(logout)

export default authRouter