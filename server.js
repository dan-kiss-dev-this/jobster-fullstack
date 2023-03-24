import express from 'express'
//note with node you include the .js import
import notFoundMiddleware from './middleware/not-found.js'
//this needs to come later
import errorHandlerMiddleware from "./middleware/error-handler.js"

// es5 format below
// const express = require('express')
const app = express()

app.get("/", (req, res) => {
    // throw new Error('error')
    res.send('Welcome')
})

//app.use says use the routes that exist and if non are found it will use the app.use() middleware
app.use(notFoundMiddleware)

//add error handling at the end
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001

app.listen(port, () => { console.log(`Server is listening on port ${port}`) })