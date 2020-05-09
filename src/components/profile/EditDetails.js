import React, { Component,Fragment } from 'react';
import PropTypes from "prop-types"
//redux stuff
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux"
//MUI stufff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from "@material-ui/icons/Edit"
import MyButton from "../../util/MyButton"

import {editUserDetails} from "../../redux/actions/userActions"
const styles = (theme) => ({
    ...theme.spreadThis,
    
});

class EditDetails extends Component {
    state={
        bio:"",
        website:"",
        location:"",
        open:false
    }
    handleOpen=()=>
    {
        this.setState({
            open:true
        })
        this.mapUserDetailsToState(this.props.userCredentails)
    }
    handleClose=()=>{
        this.setState({
            open:false
        })
    }

    mapUserDetailsToState=(userCredentails)=>
    {
        this.setState({
            bio:userCredentails.bio?userCredentails.bio:"",
            website:userCredentails.website?userCredentails.website:"",
            location:userCredentails.location?userCredentails.location:"",


        })

    }
    componentDidMount()
    {
        const {userCredentails}=this.props
        this.mapUserDetailsToState(userCredentails)
        
    }
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit=()=>
    {
        const userDetails={
            bio:this.state.bio,
            website:this.state.website,
            location:this.state.location



        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    render() {
        const {classes}=this.props
        return (
            <div>
                <Fragment>
                
                <MyButton tip="Edit details" btnClassName="button" placement="bottom" onClick={this.handleOpen}>
                <EditIcon color="primary"/>

                </MyButton>
                <Dialog 
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                <DialogTitle>Edit your details</DialogTitle>
                <DialogContent>
                <form>
                <TextField
                name="bio"
                type="text"
                label="bio"
                multiline
                rows="3"
                placeholder="a short bio about yourself"
                className={classes.TextField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
                />
                <TextField
                name="website"
                type="text"
                label="Website"
                
                placeholder="your personal professional website"
                className={classes.TextField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
                /><TextField
                name="location"
                type="text"
                label="Location"
                placeholder="enter your location"
                className={classes.TextField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
                />

                
                </form>
                
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                Cancel
                
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                save
                
                </Button>
                
                </DialogActions>
                </Dialog>
                </Fragment>
            </div>
        );
    }
}

EditDetails.propTypes={
    editUserDetails:PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>(
    {
        userCredentails:state.user.userCredentails
    }
)
export default connect(mapStateToProps,{editUserDetails})(withStyles(styles)(EditDetails));