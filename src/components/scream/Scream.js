import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
//MUI stuff
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from "../../util/MyButton"
import {Link} from "react-router-dom"
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from "@material-ui/core/styles/withStyles";
import  Typography  from '@material-ui/core/Typography';
import {connect} from 'react-redux'
import PropTypes from "prop-types"
import LikeButton from "./LikeButton"
//icons
import ChatIcon from "@material-ui/icons/Chat"
import { FacebookProvider,LoginButton } from 'react-facebook';

import ScreamDialog from "./ScreamDialog"
import DeleteScream from "./DeleteScream"
const styles = {
    card:
    {
        position:"relative",
        display: "flex",
        marginBottom:20

    },
    image:{
        minWidth:200,
    },
    content:{
        padding:25,
        objectFit:'cover'
    }
}
class Scream extends Component {
    
    render() {
        dayjs.extend(relativeTime)

        const { classes, 
            scream: { screamId, 
                body, 
                createdAt,   
                likeCount, 
                userHandle },
                user:{
                    authenticated,
                    userCredentails:{handle}
                }
             } = this.props
        const {userCredentails:{imageUrl}}=this.props.user
        let {scream:{commentCount,userImage}}=this.props
        if(screamId===this.props.newScream.screamId){
            commentCount=this.props.newScream.commentCount
        }
        if(userImage!==imageUrl && handle===userHandle){
            userImage=imageUrl
        }
        
        const deleteButton=authenticated && userHandle===handle?(
            <DeleteScream screamId={screamId} />
        ):null
        return (
            <Card className={classes.card}>
                <CardMedia 
                image={userImage}
                className={classes.image}
                title="profile Image" />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/user/${userHandle}`} color="primary">{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>

                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={this.props.scream.screamId}/>
                    <span>{likeCount}likes</span>
                    <MyButton tip="comments">
                    
                    <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} comments</span>
                    
      <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/> 

                    </CardContent>
            </Card>
        );
    }
}

const mapStateToProps=(state)=>(
    {
        user:state.user,
        newScream:state.data.scream
    }
)
Scream.propTypes={
    user:PropTypes.object.isRequired,
    scream:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired,
    openDialog:PropTypes.bool





}

export default connect(mapStateToProps)(withStyles(styles)(Scream))