import React from 'react'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components/index'
import { Link, Navigate } from "react-router-dom"
import { useAppContext } from '../context/appContext'

const Landing = () => {
    const { user } = useAppContext();
    return (
        <>
            {user && <Navigate to="/" />}
            <Wrapper>
                <nav>
                    <Logo />
                </nav>
                <div className="container page">
                    <h1>job<span>tracking</span></h1>
                    <p>
                        I'm baby sartorial Brooklyn vinyl, selfies blue bottle swag authentic pickled hell of. Echo park cupping humblebrag, butcher fashion axe umami squid hot chicken authentic af gorpcore. Banh mi chia thundercats marxism polaroid humblebrag organic lyft tote bag cronut microdosing listicle. Four loko venmo VHS chambray iceland meggings neutra DSA cold-pressed green juice.
                    </p>
                    <Link to="/register" className="btn btn-hero">Login/Register</Link>
                    <img src={main} className="img main-img" />
                </div>
            </Wrapper>
        </>
    )
}

export default Landing