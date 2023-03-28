import User from "../models/User.js"

const register = async (req, res, next) => {
    // user object shows up here and is loaded to mongodb, res is given
    try {
        const user = await User.create(req.body)
        res.status(201).json({ user })
        console.log(99, user)
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
}

export { register, login, updateUser }
