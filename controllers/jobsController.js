import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'

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
    console.log(2121, req.user)
    // /jobs?status=all or /jobs?status=interview&jobType=remote to grab query parameters
    const { status, jobType, sort, search } = req.query

    const queryObject = {
        //show only user specific jobs
        // createdBy: req.user.userId
    }
    // add params based on condition
    if (status && (status !== 'all')) {
        queryObject.status = status
    }
    if (jobType && (jobType !== 'all')) {
        queryObject.jobType = jobType
    }
    if (search) {
        // regex search in mongodb and i is case insensitive, partial job position match
        queryObject.position = { $regex: search, $options: 'i' }
    }

    // auth middleware gives userId to req object, always auth.js runs before allowing job read access
    // no await before result aka Job to chain sort conditions
    let result = Job.find(queryObject)

    //chain sort conditions
    if (sort === 'latest') {
        result = result.sort('-createdAt')
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt')
    }
    if (sort === 'a-z') {
        result = result.sort('position')
    }
    if (sort === 'z-a') {
        result = result.sort('-position')
    }

    const jobs = await result

    res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
}

const updateJob = async (req, res) => {
    console.log(27, req.params, req)
    const { id: jobId } = req.params

    const { company, position } = req.body

    if (!company || !position) {
        throw new BadRequestError('Please Provide all values')
    }

    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    checkPermissions(req.user, job.createdBy)
    // who can change the job? the person who created it or an admin user, no permissions === unauthorized

    // note if needed to run a hook would use Job.save()
    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true, runValidators: true
    })
    res.status(StatusCodes.OK).json({ updatedJob })
}

const deleteJob = async (req, res) => {
    const { id: jobId } = req.params
    // note if jobId is not what is expected by mongoose get a 500 from mongoose
    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }

    checkPermissions(req.user, job.createdBy)

    await job.remove()
    res.status(StatusCodes.OK).json({
        msg:
            'Success! Job removed'
    })
}

const showStats = async (req, res) => {
    res.send('show stats')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }