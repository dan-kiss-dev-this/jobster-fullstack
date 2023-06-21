import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from '../components';
import Wrapper from "../assets/wrappers/RegisterPage"
import { useAppContext } from "../context/appContext"
import { useNavigate } from 'react-router-dom'


const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    // showAlert: false,
}

export default function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState);

    //global state
    const state = useAppContext();
    console.log(20, state)
    // via state we destructure these values
    const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } = state
    // [e.target.name] uses brackets to set key dynamically, you use the bracket to set the key to the evaluated string of e.target.name = 'name' so key is 'name' not 'e.target.name' the bracket is how you set the key dynamically in an object
    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const currentUser = { name, email, password }
        console.log(33, currentUser)
        if (isMember) {
            console.log('already a member')
            loginUser(currentUser)
        } else {
            registerUser(currentUser)
        }
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate("/")
            }, 1000)
        }
    }, [user, navigate])

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }


    return (
        <Wrapper className="full-page">
            <div>
                <form className='form' onSubmit={onSubmit}>
                    <Logo />
                    <h3>{values.isMember ? "Login" : "Register"}</h3>
                    {showAlert && <Alert />}
                    {/* name */}
                    {!values.isMember && <FormRow type="text" name="name" value={values.name} handleChange={handleChange} />}
                    {/* email */}
                    <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />
                    {/* pass */}
                    <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />

                    <button type='submit' className="btn btn-block" disabled={isLoading}>
                        submit
                    </button>

                    {/* setup test user  loginUser */}
                    <button type="button" className="btn btn-block btn-hipster" disabled={isLoading} onClick={() => loginUser({ email: 'testUser@test.com', password: 'secret' })}>Demo App</button>
                    <p>
                        {values.isMember ? 'Not a member?' : 'Already a member?'}
                        <button className="member-btn" type="button" onClick={toggleMember}>{values.isMember ? 'Register' : 'Login'}</button>
                    </p>
                </form>
                {/* <TestSample /> */}

            </div>
        </Wrapper>
    )
}



