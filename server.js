import express from 'express'

import dotenv from 'dotenv';
// look for the.env file in root
dotenv.config()

import cors from 'cors'

// handle async error when you throw the error
import 'express-async-errors'

// db and authenticate
import connectDB from './db/connect.js';

import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js'
//this needs to come later
import errorHandlerMiddleware from "./middleware/error-handler.js"
import authenticateUser from './middleware/auth.js'

import morgan from 'morgan'

//es6 modules used so have this setup for dirname
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

//security packages
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

//cookie setup
import cookieParser from 'cookie-parser'

// es5 format below
// const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

// get absolute path dirname
const __dirname = dirname(fileURLToPath(import.meta.url))

//use to deploy static assets and run whole app off process.env.PORT with $ npm run server
app.use(express.static(path.resolve(__dirname, './client/build')))

// so backend server can talk to front end without cors issue note using proxy in package.json
// app.use(cors())

//to access the json on post requests via express json middleware
app.use(express.json())

//security
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

//cookie
app.use(cookieParser())

const port = process.env.PORT || 5001

// as this '/' endpoint maps to a local file on the client side the '/api/v1' endpoint is used to get the data from the client side.
app.get("/", (req, res) => {
    // throw new Error('error was thrown')
    // res.send(`Welcome to http://localhost:${port}/`)
    res.json({ msg: `Welcome to http://localhost:${port}/` })
})

app.get("/api/v1", (req, res) => {
    // throw new Error('error was thrown')
    // res.send(`Welcome to http://localhost:${port}/`)
    res.json({ msg: `Welcome to http://localhost:${port}/` })
})

app.listen(port, () => { console.log(`Server is listening on port ${port}`) })

// authRouter is hit after accessing this api endpoint
// note we also authenticate the user if they are changing information in their profile, to login we don't authenticate as the user is checked for existence or a new account is made before authentication can occur
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// for front end want to direct url to index.html in the front end build folder as it has the router
//put after server routes above so many git not going to the api routes above comes here
//as we are adding the build create react app to server.js 
//we are only going to run node server on heroku and that will allow us to run the server.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

//app.use says use the routes that exist and if non are found it will use the app.use() middleware
app.use(notFoundMiddleware)

//add error handling at the end
app.use(errorHandlerMiddleware)

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