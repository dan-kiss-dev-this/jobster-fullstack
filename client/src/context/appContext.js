import React, { useReducer, useContext } from 'react';
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR } from './actions';
import Reducer from './reducer'
import axios from 'axios'

// const api = axios.create({ baseURL: "http://localhost:000"})

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

// import reducer from './reducer';

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertTypes: '',
    // json parse will make the js object from a json string
    user: user ? JSON.parse(user) : null,
    token: token ? token : null,
    userLocation: userLocation ? userLocation : '',
    jobLocation: userLocation ? userLocation : '',
    showSidebar: false,

    // job state, see the Job.js model in the server for fields to use
    // we set job values in global state so we can edit setup jobs or create new jobs from the same component
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    // jobLocation was made when we created the user see above
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending, interview, declined'],
    status: 'pending'
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    // axios custom instance note headers removed Authorization
    const authFetch = axios.create({
        baseURL: '/api/v1/',
        // headers: {
        //     Authorization: `Bearer ${state.token}`
        // }
    })

    // added bearer token to request header with interceptor
    authFetch.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Bearer ${state.token}`
        return config
    },
        (error) => {
            return Promise.reject(error)
        }
    )

    // change to response before sent to deal with 400 vs 401 error differently
    authFetch.interceptors.response.use((response) => {
        return response
    },
        (error) => {
            if (error.response.status === 401) {
                // if auth expired logout user
                logoutUser()
            }
            return Promise.reject(error)
        }
    )

    // set the token in the axios header, global setup
    //issue is the token is used in all axios requests so if an api from another source is used it will still send the token to the unrelated source
    // axios.defaults.headers['Authorization'] = `Bearer ${state.token}`

    const clearAlert = () => {
        setTimeout(() => { dispatch({ type: CLEAR_ALERT }) }, 3000)
    }

    const displayAlert = () => {
        // note no payload is used here as a value is not provided to the reducer
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        // using stringify here as we can only store strings and we are getting back an object here, JSON.stringify will make a string from a js object which is needed as an object cannot be stored
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    // note current user is the object we pass to this function
    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN });

        try {
            // see how routing is set on server side to get this url
            const response = await axios.post('http://localhost:4000/api/v1/auth/register', currentUser)
            console.log(4040, response)
            const { user, token } = response.data
            const { location } = user

            dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } })
            // local storage later
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            console.log(45, error)
            dispatch({ type: REGISTER_USER_ERROR, payload: { msg: error.response.data.msg } })
        }
        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        console.log(3838, currentUser)

        try {
            // see how routing is set on server side to get this url
            const response = await axios.post('http://localhost:4000/api/v1/auth/login', currentUser)
            console.log(4040, response)
            // const { data } = response;
            const { user, token } = response.data
            const { location } = user

            dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } })
            // local storage later
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            console.log(45, error)
            // error.response.data.msg
            dispatch({ type: LOGIN_USER_ERROR, payload: { msg: 'Invalid Login, ' + error.message } })
        }
        clearAlert()
    }

    const toggleSidebar = () => dispatch({ type: TOGGLE_SIDEBAR })

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })

        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser)
            console.log(130, data)
            const { user, location, token } = data
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location, token }
            })
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            console.log(133, error)
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg }
                })
            }
        }
        clearAlert()

        // example with local storage only
        // const { email, name, lastName, location } = currentUser
        // if (!email || !name || !lastName || !location) {
        //     dispatch({ type: DISPLAY_ALERT })
        //     clearAlert()
        //     return
        // }
        // const fullNewUser = { ...JSON.parse(user), email, name, lastName, location }
        // localStorage.setItem('user', JSON.stringify(fullNewUser))
        // dispatch({ type: UPDATE_USER, payload: fullNewUser })
    }

    //props.children has been destructured as we got the stateful container being returned below
    return (
        <AppContext.Provider value={{ ...state, displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser }}>{children}</AppContext.Provider>
    )
}

// this is a state store that can be passed through the app, custom hook
const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }