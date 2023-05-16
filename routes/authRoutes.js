import express from "express"
import { register, login, updateUser } from "../controllers/authController.js";
//auth
import authenticateUser from '../middleware/auth.js'

export const authRouter = express.Router();

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
// the user is authenticated before being updated
authRouter.route('/updateUser').patch(authenticateUser, updateUser)

export default authRouter