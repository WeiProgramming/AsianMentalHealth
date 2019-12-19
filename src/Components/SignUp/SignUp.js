import React, {Component} from 'react';
import {Card, CardContent, Typography, TextField, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import * as ROUTES from '../../Constants/routes';
import {Link} from 'react-router-dom';

import './SignUp.css';
import {updateNumberOfUsers} from "../../Redux/Public/actions";

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }
    componentDidMount() {

    }
    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    }

    onClick = () => {
        this.props.fireBase.doSignUpUserWithEmailandPassword(this.state.email, this.state.password).then(authUser => {
            console.log('authUser',authUser);
            this.props.fireBase.user(authUser.user.uid)
                .set({username: this.state.username, email: this.state.email});
            this.props.fireBase.users().on('value',users => {
                const usersObject = users;
                const usersList = Object.keys(usersObject).map(key => {
                    return {
                        ...usersObject[key],
                        uid: key
                    }
                });
                this.props.dispatch(updateNumberOfUsers(usersList));
            })
        }).then(() => {
            this.props.history.push(ROUTES.HOME);
        }).catch(error => {
            // User already created
            console.log('error',error);
            this.props.history.push(ROUTES.SIGN_IN);
        })
    }

    render() {
        const {username, email, password, confirmPassword} = this.state;
        const {number} = this.props;
        let isInvalid = username === '' || email === '' || (password && confirmPassword) === '' || (password !== confirmPassword);
        console.log('invalid form',isInvalid);
        return (
            <div className="signup-container">
                <Card style={{padding: '3%', width: '40%'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Sign Up <p>{number}</p>
                        </Typography>
                        <hr/>
                        <form>
                        <Typography component={'div'} variant={'body2'} style={{marginBottom: '2%'}}>
                            <TextField onChange={this.onChange} name="username" label="username" variant="outlined" className="text-input"/>
                        </Typography>
                        <Typography component={'div'} variant={'body2'} style={{marginBottom: '2%'}}>
                            <TextField onChange={this.onChange} label="email" name="email" variant="outlined" className="text-input"/>
                        </Typography>
                        <Typography component={'div'} variant={'body2'} style={{marginBottom: '2%'}}>
                            <TextField onChange={this.onChange} label="password" name="password" variant="outlined" className="text-input"/>
                        </Typography>
                        <Typography component={'div'} variant={'body2'} style={{marginBottom: '2%'}}>
                            <TextField onChange={this.onChange} label="confirm password" name="confirmPassword" variant="outlined" className="text-input"/>
                        </Typography>
                            <Button variant="outlined" color="primary" disabled={isInvalid} onClick={this.onClick}>
                                Sign up
                            </Button>
                        </form>
                        <hr/>
                        <Typography>
                            <small>Already have an account? Click <Link to={ROUTES.SIGN_IN}>here</Link></small>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fireBase: state.fireBase.fireBase
    }
}

export default connect(mapStateToProps)(SignUp);