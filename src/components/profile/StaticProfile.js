import React, { Component,Fragment } from 'react';
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs"
import Link from "@material-ui/core/Link"
import LocationOn from "@material-ui/icons/LocationOn"
import CalendarToday from "@material-ui/icons/CalendarToday"
import Paper from "@material-ui/core/Paper"
import LinkIcon from "@material-ui/icons/Link"
import MuiLink from "@material-ui/core/Link"
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.spreadThis
});

class StaticProfile extends Component {
    render() {
        const {classes,profile:{handle,createdAt,imageUrl,bio,website,location}}=this.props
        return (
            <div>
            <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                   
                        </div>
                <hr />
                <div className="profile-details">
                    <MuiLink
                        component={Link}
                        to={`/users/${handle}`}
                        color="primary"
                        variant="h5"
                    >
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                            <LocationOn color="primary" /> <span>{location}</span>
                            <hr />
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color="primary" />
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                {' '}
                                {website}
                            </a>
                            <hr />
                        </Fragment>
                    )}
                    <CalendarToday color="primary" />{' '}
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                
               
                
            </div>
        </Paper>

            </div>
        );
    }
}
StaticProfile.propTypes={
    profile:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired
}
export default withStyles(styles)(StaticProfile)