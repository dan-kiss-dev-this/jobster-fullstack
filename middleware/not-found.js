//make a middleware for not found server routes
const notFoundMiddleware = (req, res) => { res.status(404).send('Route does not exist') }

export default notFoundMiddleware