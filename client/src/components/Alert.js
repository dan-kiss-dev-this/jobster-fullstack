import React from 'react'
import { useAppContext } from '../context/appContext'

export const Alert = () => {
    // we are using the context here via custom hook
    const { alertType, alertText } = useAppContext()
    return (
        <div className={`alert alert-${alertType}`}>{alertText}</div>
    )
}

export default Alert;
