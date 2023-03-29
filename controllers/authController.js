import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'

const register = async (req, res, next) => {
    // user object shows up here and is loaded to mongodb, res is given
    try {
        const user = await User.create(req.body)
        // custom mongoose jwt instance method
        const token = user.createJWT()
        res.status(StatusCodes.OK).json({
            user: {
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                name: user.name,
                location: user.location
            }, token
        })
    } catch (error) {
        // we use next instead of this code to pass the error to the next middleware res.status(500).json({ msg: "there was an error" })
        next(error)
    }
}
const login = async (req, res) => {
    res.send("login user")
}
const updateUser = async (req, res) => {
    res.send("update user")
    // triggered by the hook from mongoose middleware in UserSchema setup
    User.findOneAndUpdate()
}

export { register, login, updateUser }
