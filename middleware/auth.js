import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
    console.log('authenticate user')
    const authHeader = req.headers.authorization
    console.log(66, authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        // 401 error
        // return res.status(401).json({ message: 'Invalid Credentials' })
        // use error object
        throw new UnAuthenticatedError('Authentication Invalid')
    }

    const token = authHeader?.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId }
        // next() means you are passed to the next middleware
        next()
    } catch (error) {
        console.log(23,error)
        throw new UnAuthenticatedError('Authentication Invalid')
    }


}

export default auth