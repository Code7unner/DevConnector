import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        //Apply to every request
        axios.defaults.headers.common['Authotization'] = token;
    } else {
        //Delete the auth header
        delete axios.defaults.headers.common['Authotization'];
    }
};

export default setAuthToken;