import React, { Component,Fragment } from 'react';
import PropTypes from "prop-types"
//redux stuff
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux"
//MUI stufff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from "../../util/MyButton"
import CircularProgress from "@material-ui/core/CircularProgress"
import { postScream,clearErrors } from "../../redux/actions/dataActions";
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"


const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton:{
        position:"relative",
        float:"right",
        marginTop:10
    },
    progressSpinner:{
        position:"absolute"
    },
    closeButton:{
        position:"absolute",
        left:"91%",
        top:"6%"
    }
});
class PostScream extends Component {
    state = {
        open: false,
        body: "",
        errors: {}
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({
            open: false,
            errors:{}
        })
    }
    handleChange=(event)=>
    {
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        this.props.postScream({
            body:this.state.body
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors:nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({
                body:"",
                open: false,
                errors:{}
            
            })
            
        }

    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="post a scream">

                    <AddIcon />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <MyButton tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>

                        <CloseIcon />

                    </MyButton>
                    <DialogTitle>
                        Post a new scream

            </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="scream"
                                multiline
                                rows="3"
                                value={this.state.body}
                                placeholder="post a scream"
                                helperText={errors.body}
                                error={errors.body ? true : false}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button className={classes.submitButton} type="submit" variant="contained" color="primary" disabled={loading}>
                                Submit
                               {loading && (<CircularProgress size={30} className={classes.progressSpinner} />)}
                            </Button>



                        </form>

                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
    }

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,

    UI: PropTypes.object.isRequired
}
const mapStateToProps=(state)=>(
    {

        UI:state.UI

    }
)
export default connect(mapStateToProps, { postScream,clearErrors})(withStyles(styles)(PostScream));