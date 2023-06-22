import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js'

const auth = async (req, res, next) => {
    console.log('authenticate user via cookieParser package making req.cookies allows cookie to be accessed in req')
    const token = req.cookies.token
    if (!token) {
        throw new UnAuthenticatedError('Authentication Invalid')
    }

    // old way token in storage
    // const authHeader = req.headers.authorization
    // if (!authHeader || !authHeader.startsWith('Bearer')) {
    // 401 error
    // return res.status(401).json({ message: 'Invalid Credentials' })
    // use error object
    // throw new UnAuthenticatedError('Authentication Invalid')
    // }
    // const token = authHeader?.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const testUser = payload.userId === '64933ee97a7a127f2a81948e'
        req.user = { userId: payload.userId, testUser }

        // next() means you are passed to the next middleware
        next()
    } catch (error) {
        console.log(23, error)
        throw new UnAuthenticatedError('Authentication Invalid')
    }


}

export default auth