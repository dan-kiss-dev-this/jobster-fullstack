const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    // the next in the auth controller comes here and the error is send to the user
    res.status(500).json({ msg: err })
}

export default errorHandlerMiddleware