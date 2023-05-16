import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import { useAppContext } from '../context/appContext';
import links from '../utils/links'
import { NavLink } from 'react-router-dom';
import Logo from './Logo'

import { Link } from 'react-router-dom';

const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useAppContext()
    return (
        <Wrapper>
            <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
                <div className="content">
                    <button type="button" className="close-btn" onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <div className="nav-links">
                        {links.map((link) => {
                            const { id, text, path, icon } = link;
                            return (<NavLink to={path}
                                // isActive prop provided by NavLink
                                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                key={id}
                                onClick={toggleSidebar}
                            >
                                <span className="icon">{icon}</span>
                                {text}
                            </NavLink>)
                        })}
                    </div>
                    {/* <div className="nav-links">nav links</div> */}
                </div>



            </div>
        </Wrapper>
    )
}

export default SmallSidebar