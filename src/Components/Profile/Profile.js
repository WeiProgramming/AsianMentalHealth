import React,{Component} from 'react';
import {Paper, Typography, CardContent} from '@material-ui/core';

class Profile extends Component {
    render() {
        return (
            <div style={{paddingTop: '60px', paddingLeft: '2%', paddingRight: '2%'}}>
                <Paper style={{height: '80vh', padding: '2%'}}>
                        <CardContent>
                            <Typography variant="h5" component="h3">
                                This is a sheet of paper.
                            </Typography>
                            <Typography component="p">
                                Paper can be used to build surface or other elements for your application.
                            </Typography>
                        </CardContent>
                </Paper>
            </div>
        )
    }
}

export default Profile;