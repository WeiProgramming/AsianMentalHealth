import React, {Component} from 'react';
import * as ROUTES from "../../Constants/routes";
import {Link} from 'react-router-dom';
import './Navigation.css';
import {connect} from 'react-redux';
import {updateNumberOfUsers} from "../../Redux/Public/actions";
import {Menu, MenuItem} from '@material-ui/core';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            username: null
        }
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget})
    };
    handleClose = () => {
        this.setState({anchorEl: null})
    };
    doLogout = () => {
        this.props.fireBase.doLogout();
    }
    render() {
        return this.props.isSignedIn ? (
            <div className="Navigation">
                <nav>
                    <ul>
                        <li>
                            <Link style={{textDecoration: 'none'}} to={`${ROUTES.SHARED}/happiness`}>Home</Link>
                        </li>
                        <li>
                            <Link to={`${ROUTES.SHARED}/happiness`} style={{textDecoration: 'none'}}>Happiness</Link>
                        </li>
                        <li>
                            <Link to={`${ROUTES.SHARED}/troubles`} style={{textDecoration: 'none'}}>Troubles</Link>
                        </li>
                        <li>
                            <Link to={`${ROUTES.SHARED}${ROUTES.PROFILE}`} style={{textDecoration: 'none'}}>Profile</Link>
                        </li>
                        <li>
                            <Link onClick={this.doLogout} to={ROUTES.HOME} style={{textDecoration: 'none'}}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        ) : (
            <div className="Navigation">
                <nav>
                </nav>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        fireBase: state.fireBase.fireBase,
        authUser: state.fireBase.authUser,
        isSignedIn: state.fireBase.isSignedIn
    }
}

export default connect(mapStateToProps)(Navigation);