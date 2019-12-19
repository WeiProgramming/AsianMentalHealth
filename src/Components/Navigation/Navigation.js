import React, {Component} from 'react';
import * as ROUTES from "../../Constants/routes";
import {Link} from 'react-router-dom';
import './Navigation.css';
import {connect} from 'react-redux';
import {updateNumberOfUsers} from "../../Redux/Public/actions";

class Navigation extends Component {
    componentDidMount() {
        console.log('navigation props',this.props);
        this.props.fireBase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key], uid: key
            }));
            console.log('users', usersList);
            this.props.dispatch(updateNumberOfUsers(usersList));
        });
    }

    doLogout = () => {
        this.props.fireBase.doLogout();
    }
    render() {
        return this.props.isSignedIn ? (
            <div className="Navigation">
                <nav>
                    <ul>
                        <li>
                            <Link style={{textDecoration: 'none'}} to={ROUTES.HOME}>Home</Link>
                        </li>
                        <li>
                            <Link to={`${ROUTES.SHARED}/happiness`} style={{textDecoration: 'none'}}>Discussions</Link>
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
        isSignedIn: state.fireBase.isSignedIn
    }
}

export default connect(mapStateToProps)(Navigation);