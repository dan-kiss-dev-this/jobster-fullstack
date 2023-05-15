import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout'
import { BigSidebar, SmallSidebar, Navbar } from "../../components/"

const SharedLayout = () => {
    return (
        <Wrapper>
            <main className="dashboard">
                {/* css is used to show and hide sizebar based on 992px screen size */}
                <SmallSidebar ></SmallSidebar>
                <BigSidebar></BigSidebar>
                <div>
                    <Navbar></Navbar>
                    <div className="dashboard-page">
                        <Outlet />
                    </div>
                </div>
            </main>
            {/* note the nav stays on all pages and portions are swapped based on the outlet */}
            {/* <nav>
                <Link to="all-jobs">all jobs</Link>
                <Link to="add-job">add job</Link>
            </nav> */}

        </Wrapper>
    )
}

export default SharedLayout