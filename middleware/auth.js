import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
    console.log('authenticate user')
    const authHeader = req.headers.authorization
    console.log(66, authHeader)

    if (!authHeader) {
        // 401 error
        // return res.status(401).json({ message: 'Invalid Credentials' })
        // use error object
        throw new UnAuthenticatedError('Authentication Invalid')
    }
    // next() means you are passed to the next middleware
    next()
}

export default auth