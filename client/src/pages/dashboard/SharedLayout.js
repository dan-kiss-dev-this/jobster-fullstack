import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout'

const SharedLayout = () => {
    return (
        <Wrapper>
            {/* note the nav stays on all pages and portions are swapped based on the outlet */}
            <nav>
                <Link to="all-jobs">all jobs</Link>
                <Link to="add-job">add job</Link>
            </nav>
            <Outlet />
        </Wrapper>
    )
}

export default SharedLayout