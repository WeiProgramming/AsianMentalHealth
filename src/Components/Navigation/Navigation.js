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
    componentDidMount() {
        this.listener = this.props.fireBase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key], uid: key
            }));
            console.log('users', usersList);
            this.props.dispatch(updateNumberOfUsers(usersList));
            // added this to make this work with a listener
            if(this.props.authUser !== null) {
                this.props.fireBase.user(this.props.authUser.uid).once('value').then(snapshot => {
                    this.setState({username: snapshot.val().username})
                })
            }
        });
    }
    componentWillUnmount() {
        this.listener();
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
        const {username} = this.state;
        return this.props.isSignedIn ? (
            <div className="Navigation">
                <nav>
                    <ul>
                        <li>Hi {username}</li>
                        <li>
                            <Link style={{textDecoration: 'none'}} to={ROUTES.HOME}>Home</Link>
                        </li>
                        <li aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                            <Link style={{textDecoration: 'none'}}>Discussions</Link>
                        </li>
                        <li>
                            <Link to={`${ROUTES.SHARED}${ROUTES.PROFILE}`} style={{textDecoration: 'none'}}>Profile</Link>
                        </li>
                        <li>
                            <Link onClick={this.doLogout} to={ROUTES.HOME} style={{textDecoration: 'none'}}>Logout</Link>
                        </li>
                    </ul>
                </nav>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>
                        <Link to={`${ROUTES.SHARED}/happiness`} style={{textDecoration: 'none'}}>Happiness</Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <Link to={`${ROUTES.SHARED}/troubles`} style={{textDecoration: 'none'}}>Troubles</Link>
                    </MenuItem>
                </Menu>
            </div>
        ) : (
            <div className="Navigation">
                <nav>
                    <ul>
                        <li>
                            <Link style={{textDecoration: 'none'}} to={ROUTES.HOME}>Home</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.SIGN_IN} style={{textDecoration: 'none'}}>Sign In</Link>
                        </li>
                    </ul>
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