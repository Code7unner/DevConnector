import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from '../utils/setAuthToken';

//Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(() => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Login User
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //Save to local storage
            const { token } = res.data;
            //Set token to local storage
            localStorage.setItem('jwtToken', token);
            //Set token to auth header
            setAuthToken(token);
            //Decode token to get User data
            const decoded = jwt_decode(token);
            //Set current User
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

//Set logged IN user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

//Set logged OUT user
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    //Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};