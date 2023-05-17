import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(44, err)
    const defaultError = {
        //500
        statusCode: err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later",
        fullError: err
    }
    // missing a field such as password
    if (err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = Object.values(err.errors).map((item) => item.message).join(',')

    }
    // duplicate email error
    if (err.code && err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = 'Email already used to register an account, login to the existing account or use a different email address to make new account'
    }
    // the next in the auth controller comes here and the error is send to the user
    res.status(defaultError.statusCode).json({ msg: defaultError.msg, fullError: err })
}

export default errorHandlerMiddleware