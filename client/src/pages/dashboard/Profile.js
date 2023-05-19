import React, { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import { FormRow, Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {
    // note user and isLoading is coming from the destructured state in appContext
    const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [lastName, setLastName] = useState(user?.lastName)
    const [location, setLocation] = useState(user?.location)

    const handleSubmit = (e) => {
        e.preventDefault()
        // remove below for testing
        // if (!name || !lastName || !email || !location) {
        //     displayAlert()
        //     return
        // }
        // console.log('update user')
        updateUser({ name, email, lastName, location })
    }

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>Profile</h3>
                {showAlert && <Alert />}

                {/* name */}
                <div className="form-center">
                    <FormRow name='name' type='text' value={name} className="form-input" handleChange={(e) => setName(e.target.value)} />
                    <FormRow name='lastName' labelText="last name" type='text' value={lastName} className="form-input" handleChange={(e) => setLastName(e.target.value)} />
                    <FormRow name='email' type='text' value={email} className="form-input" handleChange={(e) => setEmail(e.target.value)} />
                    <FormRow name='location' type='text' value={location} className="form-input" handleChange={(e) => setLocation(e.target.value)} />
                    <button className="btn btn-block" type='submit' disabled={isLoading}>{isLoading ? 'Please wait' : 'Save changes'}</button>
                </div>
            </form>
        </Wrapper>






    )
}

export default Profile