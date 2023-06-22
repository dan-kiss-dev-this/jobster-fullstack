import User from "../models/User.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import attachCookies from "../utils/attachCookies.js"

const register = async (req, res, next) => {
    // user object shows up here and is loaded to mongodb, res is given
    try {
        const user = await User.create(req.body)
        // custom mongoose jwt instance method
        const token = user.createJWT()
        //token cookie included every time a request is made to the server
        attachCookies({ res, token })

        res.status(StatusCodes.CREATED).json({
            user: {
                email: user.email,
                lastName: user.lastName,
                location: user.location,
                name: user.name,
                location: user.location
            },
            // note token is removed here as it is in the cookie
            // token
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
    //token cookie included every time a request is made to the server so token not in .json below
    attachCookies({ res, token })

    // old version to store token locally not as cookie
    res.status(StatusCodes.OK).json({
        user,
        location: user.location
    })
}

const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body
    if (!email || !name || !lastName || !location) {
        throw new BadRequestError('Please provide all values')
    }

    // note findOne does not return a password
    const user = await User.findOne({ _id: req.user.userId })

    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location

    // item to keep in mind is do not hash an already hashed password as they wont match
    await user.save()

    // make a new token
    const token = user.createJWT()
    //token cookie included every time a request is made to the server so token not in .json below
    attachCookies({ res, token })

    res.status(StatusCodes.OK).json({
        user,
        location: user.location
    })
    // triggered by the hook from mongoose middleware in UserSchema setup
    //User.findOneAndUpdate()
}

const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    res.status(StatusCodes.OK).json({ user, location: user.location })
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({ msg: 'User logged out!' })
}

export { register, login, updateUser, getCurrentUser, logout }
