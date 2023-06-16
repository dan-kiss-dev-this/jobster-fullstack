import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'

// async due to communication with the database. 
const createJob = async (req, res) => {
    // note jobLocation, jobStatus, jobType can use the default values
    const { company, position } = req.body
    //idea use the company and position to make a new job in mongodb
    if (!position || !company) {
        throw new BadRequestError('Please Provide All Values')
    }
    // the auth middleware is adding the user id to the request object automatically
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
    res.send('get all jobs')
}

const updateJob = async (req, res) => {
    res.send('update job')
}

const deleteJob = async (req, res) => {
    res.send('delete jobs')
}

const showStats = async (req, res) => {
    res.send('show stats')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }