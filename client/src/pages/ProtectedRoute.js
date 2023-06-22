import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext'
import Loading from '../components/Loading';

const ProtectedRoute = ({ children }) => {
    const { user, userLoading } = useAppContext();
    // note navigate is used by react router dom to change the users url
    if (userLoading) return <Loading />
    if (!user) {
        return <Navigate to="/landing" />
    }
    return (
        children
    )
}

export default ProtectedRoute