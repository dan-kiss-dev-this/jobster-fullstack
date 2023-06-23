import React from 'react'
import links from '../utils/links'
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const NavLinks = ({ hideOnClick }) => {
    const { toggleSidebar } = useAppContext()
    return (
        <div className="nav-links">
            {links.map((link) => {
                const { id, text, path, icon } = link;
                return (<NavLink to={path}
                    // isActive prop provided by NavLink
                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    key={id}
                    onClick={hideOnClick && toggleSidebar}
                    end
                >
                    <span className="icon">{icon}</span>
                    {text}
                </NavLink>)
            })}
        </div>
    )
}

export default NavLinks