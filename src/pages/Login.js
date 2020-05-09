import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
//MUI stufff
import Grid from "@material-ui/core/Grid"
import {Link} from "react-router-dom"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
//redux stuff
import {connect} from "react-redux"
import {loginUser} from "../redux/actions/userActions"
const styles = (theme) => ({
    ...theme.spreadThis
  });
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: "",
            errors: {}

        }
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.UI.errors)
        {

            this.setState({
                errors:nextProps.UI.errors
            })
        }
        

    }
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
          email: this.state.email,
          password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
      };

    render() {
        const { classes,
            UI:{loading} } = this.props
        const { errors } = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm >
            
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
            </Typography>
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="email"
                            helperText={errors.email}
                            error={errors.email?true:false}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            helperText={errors.password}
                            error={errors.password?true:false}

                            className={classes.textField}
                            value={this.state.pasword}
                            onChange={this.handleChange}
                            fullWidth />
                            {errors.general &&
                            (
                                <Typography variant="body" className={classes.customError}>
                                {errors.general}
                                </Typography>
                            )}
                            <br></br>
                        <Button type="submit" variant="contained" color="primary" disabled={loading} className={classes.button}>Login
                        {loading &&(
                            <CircularProgress size={30} className={classes.progress} />)}</Button>
                        <br></br>
                        
                        <small>Dont have account then please sign up <Link to="/signup">Here</Link></small>
                    
                        </form>

                </Grid>

                <Grid item sm />
            </Grid>
        );
    }
}
Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>(
    {

        user:state.user,
        UI:state.UI

    }
)
const mapActionsToProps={
    loginUser
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Login));