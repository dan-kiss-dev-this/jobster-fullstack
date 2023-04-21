import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const register = async (req, res, next) => {
    // user object shows up here and is loaded to mongodb, res is given
    try {
        const user = await User.create(req.body)
        // custom mongoose jwt instance method
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({
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
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide all values')
    }

    // adjust this to include the password for comparison, compare salted password
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        // using return to stop any additional code execution
        return res.status(400).json({ message: 'Invalid Credentials email' })
        // line below here is not working as it makes node fail due to throwing a nested error, to do research more
        // throw new UnAuthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid Credentials password' })
        // line below here is not working as it makes node fail due to throwing a nested error, to do research more
        // throw new UnAuthenticatedError('Invalid Credentials login')
    }
    console.log(4545)
    const token = user.createJWT()
    // to not expose the password
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token, location: user.location })
    //old confirmation
    // res.send("login user")

}

const updateUser = async (req, res) => {
    res.send("update user")
    // triggered by the hook from mongoose middleware in UserSchema setup
    User.findOneAndUpdate()
}

export { register, login, updateUser }
