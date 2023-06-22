
const attachCookies = ({ res, token }) => {
    const oneDay = 1000 * 60 * 60 * 24
    // cookie expires different then token so set up for the same time, 1 day
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })
}

export default attachCookies