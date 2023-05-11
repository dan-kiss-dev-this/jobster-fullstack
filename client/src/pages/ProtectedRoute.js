import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext'

const ProtectedRoute = ({ children }) => {
    const { user } = useAppContext();
    // note navigate is used by react router dom to change the users url
    if (!user) {
        return <Navigate to="/landing" />
    }
    return (
        children
    )
}

export default ProtectedRoute