import React, {Component} from 'react';
import './Landing.css';
import {Button} from '@material-ui/core';
import * as ROUTES from '../../Constants/routes';
import {connect} from 'react-redux';

class LandingPage extends Component {
    handleOnClick = () => {
        this.props.history.push(ROUTES.SIGN_UP);
    }
    render() {
        const {numUsers} = this.props;
        return (
            <div>
                <div className="landing">
                    <h1>Asian Mental Health</h1>
                    <small>You're not alone, we all struggle but let's get through this together</small>
                <hr/>
                    <Button onClick={this.handleOnClick} variant="contained" color="primary">Join Us Smile and Thrive</Button>
                    <h4>There is currently {numUsers} users signed up!</h4>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        numUsers: state.public.numUsers
    }
}

export default connect(mapStateToProps)(LandingPage);