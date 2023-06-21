import express from "express"
import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobsController.js'
import testUser from '../middleware/testUser.js'

export const jobsRouter = express.Router();

jobsRouter.route('/').post(createJob).get(getAllJobs)
jobsRouter.route('/stats').get(showStats)
jobsRouter.route('/:id').delete(testUser, deleteJob).patch(updateJob)

export default jobsRouter;
