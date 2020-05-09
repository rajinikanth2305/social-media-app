import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/layout/Navbar"

import themeObject from './util/theme';
import jwtDecode from "jwt-decode";
import { Provider } from "react-redux"
import User from "./pages/User"
import store from "./redux/store"
//import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import AuthRoute from "./util/AuthRoute"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {SET_AUTHENTICATED} from "./redux/type"
import {getUserData, logoutUser} from "./redux/actions/userActions"
import axios from "axios"
const theme = createMuiTheme(themeObject);

axios.defaults.baseURL="https://us-central1-socail-app-c70ed.cloudfunctions.net/api";
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login"
    store.dispatch(logoutUser())
  }
  else {
    store.dispatch({
      type:SET_AUTHENTICATED
    })
    axios.defaults.headers.common['Authorization']=token;
    store.dispatch(getUserData());
  }
}
function App() {
  
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>

      
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login}  />
                <AuthRoute exact path="/signup" component={Signup}  />
                <Route exact path="/user/:handle" component={User} />
                <Route exact path="/user/:handle/scream/:screamId" component={User} />

                </Switch>
            </div>
          </Router>

      
      </Provider>

    </MuiThemeProvider>
  )


}

export default App;
