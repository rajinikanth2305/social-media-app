import React from 'react';
import {connect} from "react-redux"
import { Route, Redirect } from "react-router-dom"
import PropTypes from "prop-types";

function AuthRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            component={(props)=>(
                authenticated?<Redirect to="/" />:<Component {...props} />
            )}
            />
    );
}
const mapStateToProps=(state)=>({
    authenticated:state.user.authenticated
})
AuthRoute.propTypes={
    user:PropTypes.object

}
export default connect(mapStateToProps)(AuthRoute);