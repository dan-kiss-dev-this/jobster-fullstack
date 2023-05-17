const auth = async (req, res, next) => {
    console.log('authenticate user')
    const authHeader = req.headers.authorization
    console.log(66, authHeader)
    next()
}

export default auth