import express from 'express'

import dotenv from 'dotenv';
// look for the .env file in root
dotenv.config()

import connectDB from './db/connect.js';

// middleware
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

// app.listen(port, () => { console.log(`Server is listening on port ${port}`) })


// asnyc as mongoose connect is returning a promise
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        console.log(`Server is listening on port ${port}`)
    } catch (error) {
        console.log(error)
    }
}

start()