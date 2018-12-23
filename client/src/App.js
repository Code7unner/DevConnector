import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

//ROUTES
import PrivateRoute from './components/common/PrivateRoute';

//REDUX
import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from "./actions/authActions";
import { clearCurrentProfile } from './actions/profileActions';

//COMPONENTS
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import DashBoard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

//STYLE
import './App.css';

//STORE ITEM
import store from './store';

//CHECK FOR TOKEN
if (localStorage.jwtToken) {
    //Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //Decode token and get User info
    const decoded = jwt_decode(localStorage.jwtToken);
    //Set User and isAuthenicated
    store.dispatch(setCurrentUser(decoded));

    //Check for expired token
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        //Logout user
        store.dispatch(logoutUser());
        //Clear current profile
        store.dispatch(clearCurrentProfile());
        //Redirect login
        window.location.href = '/login';
    }
}

//MAIN APP
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing} />
                        <div className="container">
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={DashBoard} />
                            </Switch>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path="/create-profile"
                                    component={CreateProfile}
                                />
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;