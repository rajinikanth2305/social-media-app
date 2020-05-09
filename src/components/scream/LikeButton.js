import React, { Component } from 'react';
import MyButton from "../../util/MyButton"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"
import {connect} from "react-redux"
import {likeScream} from "../../redux/actions/dataActions"
import {unlikeScream} from "../../redux/actions/dataActions"

class LikeButton extends Component {
    likedScream=()=>{
        if(this.props.user.likes && this.props.user.likes.find(like=>like.screamId===this.props.screamId))
        return true
        else return false
    }
    likeScream=()=>{

        this.props.likeScream(this.props.screamId)

    }
    unlikeScream=()=>{

        this.props.unlikeScream(this.props.screamId)

    }
    render() {
        const {user:{authenticated}}=this.props
        const likeButton= !authenticated ?(
            <MyButton tip="like">
            <Link to="/login">
            <FavoriteBorder color="primary" />
            </Link>
            </MyButton>
        ):(
            this.likedScream()?(
                <MyButton tip="Undo like" onClick={this.unlikeScream}>
                <FavoriteIcon color="primary" />
                
                </MyButton>
            ):(
                <MyButton tip="like" onClick={this.likeScream}>
                <FavoriteBorder color="primary" />
                
                </MyButton>
            )
        )
        return likeButton;
    }
}

LikeButton.propTypes={
    likeScream:PropTypes.func.isRequired,
    unlikeScream:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    screamId:PropTypes.string.isRequired

}
const mapStateToProps=(state)=>(
    {
        user:state.user
    }
)
const mapActionToProps={
    likeScream,
    unlikeScream
}
export default connect(mapStateToProps,mapActionToProps)(LikeButton)