import React from 'react'
import Wrapper from "../assets/wrappers/ErrorPage"
import img from "../assets/images/not-found.svg"
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <Wrapper classname="full-page">
            <div>
                <img src={img} alt="not found" />
                <h3>text</h3>
                <p>text</p>
                <Link to="/">Back Home</Link>
            </div>
        </Wrapper>

    );
}





