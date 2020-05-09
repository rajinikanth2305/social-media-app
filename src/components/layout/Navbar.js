import React, { Component, Fragment } from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom";

import MyButton from "../../util/MyButton"
//we gonna have a lot of imports
//ui stuff
import PropTypes from "prop-types"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import HomeIcon from "@material-ui/icons/Home"
import Notifications from "./Notifications"
import PostScream from "../scream/PostScream"
//import AddIcon from "@material-ui/icons/Add"
class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <div>
                <AppBar position="fixed">
                    <Toolbar className="nav-container">
                        {authenticated ? (
                            <Fragment>
                                <PostScream />
                                <Link to="/">
                                    <MyButton>
                                        <HomeIcon  />
                                    </MyButton>
                                </Link>
                                    <Notifications  />


                            </Fragment>
                        ) : (
                                <Fragment>
                                    <Button color="inherit" component={Link} to="/login">Login</Button>
                                    <Button color="inherit" component={Link} to="/">Home</Button>
                                    <Button color="inherit" component={Link} to="/signup">Signup</Button>


                                </Fragment>
                            )
                        }

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})
Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Navbar);
//export default Navbar;