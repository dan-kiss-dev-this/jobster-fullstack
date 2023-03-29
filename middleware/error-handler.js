import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    const defaultError = {
        //500
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR ,
        msg: "Somehing went wrong try again later"
    }
    if(err.name === "ValidationError") {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
    }
    // the next in the auth controller comes here and the error is send to the user
    res.status(500).json({ msg: err })
}

export default errorHandlerMiddleware