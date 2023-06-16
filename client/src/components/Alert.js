import React from 'react'
import { useAppContext } from '../context/appContext'

export const Alert = () => {
    // we are using the context here via custom hook
    // note how instead of passing props, the state via context is used to power the Alert component
    const { alertType, alertText } = useAppContext()
    return (
        <div className={`alert alert-${alertType}`}>{alertText}</div>
    )
}

export default Alert;
