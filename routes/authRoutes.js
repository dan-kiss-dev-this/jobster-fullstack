import express from "express"
import { register, login, updateUser } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
authRouter.route('updateUser').patch(updateUser)

export default authRouter