import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid"
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import ProfileSkeleton from "../util/ProfileSkeleton"

import ScreamSkeleton from "../util/ScreamSkeleton"
import {getScreams} from "../redux/actions/dataActions"
class Home extends Component {
    state={
        screams:[]
    }
    componentDidMount()
    {
        this.props.getScreams()
      
        //we use axios.get to fetch the data from api and the api link is set in package.json using proxy property
    }
    
    
    render() {
        const {loading,screams}=this.props.data
        let recentScreenMockup=!loading ? (
            screams.map(scream=><Scream key={scream.screamId} scream={scream} />)
        ):(<ScreamSkeleton />)
        return (
            <div>
               <Grid container spacing={10}>
               <Grid item sm={8} xs={12}>
               {recentScreenMockup}
               
               </Grid>
               <Grid item sm={4} xs={12}>
               <Profile />
               
               </Grid>
               
               </Grid>
            </div>
        );
    }
}
Home.propTypes={
    getScreams:PropTypes.func.isRequired,
    data:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>(
    {
        data:state.data
    }
)

export default connect(mapStateToProps,{getScreams})(Home);