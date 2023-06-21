import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Job from './Job'
import Alert from './Alert'
import Wrapper from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {
    const { getJobs, jobs, isLoading, page, totalJobs, search, searchStatus, searchType, sort, showAlert } = useAppContext();

    useEffect(() => {
        getJobs()
        // note dependency array will trigger new getValues as search inputs change
    }, [search, searchStatus, searchType, sort])

    if (isLoading) {
        return <Loading center />
    }

    if (jobs?.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            {showAlert && <Alert/>}
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
            {/* pagination buttons to be added */}
        </Wrapper>
    )
}

export default JobsContainer