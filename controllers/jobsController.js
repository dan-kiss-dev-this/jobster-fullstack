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
    // the auth.js middleware is adding the user id to the request object automatically
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
    // auth middleware gives userId to req object, always auth.js runs before allowing job read access
    const jobs = await Job.find({ createdBy: req.user.userId })
    res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
}

const updateJob = async (req, res) => {
    console.log(27, req.params)
    const { id: jobId } = req.params

    const { company, position } = req.body

    if (!company || !position) {
        throw new BadRequestError('Please Provide all values')
    }

    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    // note if needed to run a hook would use Job.save()
    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true, runValidators: true
    })
    res.status(StatusCodes.OK).json({ updatedJob })
}

const deleteJob = async (req, res) => {
    res.send('delete jobs')
}

const showStats = async (req, res) => {
    res.send('show stats')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }